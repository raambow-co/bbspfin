import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCeYjOFGjyTnoBboNpZqy4iUQNfsPZhce4",
  authDomain: "bbspartners-01.firebaseapp.com",
  projectId: "bbspartners-01",
  storageBucket: "bbspartners-01.firebasestorage.app",
  messagingSenderId: "813985229438",
  appId: "1:813985229438:web:29e43c31e108892600462f",
  measurementId: "G-MEPVVD2GPN"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Recursively sanitizes data to guarantee it remains well under Firestore's 1MB limit.
 * Any large base64 strings (> 40KB) are converted into lightweight metadata tags.
 */
function sanitizeForFirestore(val: any): any {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    if (val.startsWith('data:') && val.includes('base64,') && val.length > 40000) {
      return `[Attached Document/Image · ${Math.round(val.length * 0.75 / 1024)} KB]`;
    }
    if (val.length > 200000) {
      return val.substring(0, 200000) + '... [truncated]';
    }
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(item => {
      if (item && typeof item === 'object' && item.base64 && typeof item.base64 === 'string') {
        const sizeKb = Math.round(item.base64.length * 0.75 / 1024);
        return {
          name: item.name || 'document',
          type: item.type || 'application/octet-stream',
          sizeKb,
          attached: true
        };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (typeof val === 'object') {
    const copy: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      copy[k] = sanitizeForFirestore(v);
    }
    return copy;
  }
  return val;
}

export async function submitToFirestore(data: Record<string, any>, collectionName = 'submissions') {
  try {
    const sanitizedData = sanitizeForFirestore(data);
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...sanitizedData,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, docId: docRef.id };
  } catch (err) {
    console.error(`Firestore save failed for ${collectionName}:`, err);
    return { success: false, error: err };
  }
}


/**
 * Normalizes a raw Firestore document snapshot into a standardized LeadRecord
 */
export function normalizeFirestoreDoc(id: string, raw: Record<string, any>): any {
  let submittedAt = raw.submittedAt;
  if (!submittedAt && raw.createdAt) {
    if (typeof raw.createdAt.toDate === 'function') {
      submittedAt = raw.createdAt.toDate().toISOString();
    } else if (raw.createdAt.seconds) {
      submittedAt = new Date(raw.createdAt.seconds * 1000).toISOString();
    } else {
      submittedAt = String(raw.createdAt);
    }
  }
  if (!submittedAt) {
    submittedAt = new Date().toISOString();
  }

  let formattedDate = raw.timestamp;
  if (!formattedDate) {
    try {
      formattedDate = new Date(submittedAt).toLocaleDateString('en-GB');
    } catch {
      formattedDate = 'Recently';
    }
  }

  return {
    id: raw.id || raw.membershipCode || raw.applicationId || id,
    firestoreDocId: id,
    fullName: raw.fullName || raw.name || raw.applicantName || (raw.loanApplicationData ? `${raw.loanApplicationData.firstName || ''} ${raw.loanApplicationData.lastName || ''}`.trim() : 'Applicant'),
    email: raw.email || raw.loanApplicationData?.email || '',
    phone: raw.phone || raw.contact || raw.mobile || raw.loanApplicationData?.contact || '',
    category: raw.category || raw.formType || 'general',
    businessName: raw.businessName || raw.purpose || raw.loanApplicationData?.purpose || '',
    status: raw.status || 'Pending',
    timestamp: formattedDate,
    submittedAt,
    membershipCode: raw.membershipCode,
    applicationId: raw.applicationId || raw.loanApplicationData?.applicationId,
    requiredAmount: raw.requiredAmount || raw.loanApplicationData?.requiredAmount,
    purpose: raw.purpose || raw.loanApplicationData?.purpose,
    tenureMonths: raw.tenureMonths || raw.loanApplicationData?.tenureMonths,
    aadhaarNumber: raw.aadhaarNumber || raw.loanApplicationData?.aadhaarNumber,
    panNumber: raw.panNumber || raw.loanApplicationData?.panNumber,
    bankName: raw.bankName || raw.loanApplicationData?.bankName,
    accountNumber: raw.accountNumber || raw.loanApplicationData?.accountNumber,
    ifscCode: raw.ifscCode || raw.loanApplicationData?.ifscCode,
    transactionId: raw.transactionId,
    amountPaid: raw.amountPaid,
    notes: raw.notes,
    nomineeName: raw.nomineeName,
    nomineeRelation: raw.nomineeRelation,
    attachments: raw.attachments,
    ...raw
  };
}

/**
 * Fetch all live submissions and leads from Firestore
 */
export async function fetchSubmissionsFromFirestore(): Promise<any[]> {
  try {
    const colRef = collection(db, 'submissions');
    const snapshot = await getDocs(colRef);
    const leads: any[] = [];
    snapshot.forEach(docSnap => {
      leads.push(normalizeFirestoreDoc(docSnap.id, docSnap.data()));
    });

    // Also fetch from document_leads if available
    try {
      const docLeadsRef = collection(db, 'document_leads');
      const docLeadsSnap = await getDocs(docLeadsRef);
      docLeadsSnap.forEach(docSnap => {
        // avoid duplicates if already present
        if (!leads.some(l => l.firestoreDocId === docSnap.id)) {
          leads.push(normalizeFirestoreDoc(docSnap.id, docSnap.data()));
        }
      });
    } catch (e) {
      console.warn('Optional document_leads fetch skipped:', e);
    }

    // Sort newest first
    leads.sort((a, b) => {
      const timeA = new Date(a.submittedAt || 0).getTime();
      const timeB = new Date(b.submittedAt || 0).getTime();
      return timeB - timeA;
    });

    return leads;
  } catch (err) {
    console.error('Failed to fetch submissions from Firestore:', err);
    throw err;
  }
}

/**
 * Subscribe to real-time changes in Firestore submissions
 */
export function subscribeToSubmissions(
  onUpdate: (leads: any[]) => void,
  onError?: (err: any) => void
): () => void {
  try {
    const colRef = collection(db, 'submissions');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const leads: any[] = [];
        snapshot.forEach(docSnap => {
          leads.push(normalizeFirestoreDoc(docSnap.id, docSnap.data()));
        });
        leads.sort((a, b) => {
          const timeA = new Date(a.submittedAt || 0).getTime();
          const timeB = new Date(b.submittedAt || 0).getTime();
          return timeB - timeA;
        });
        onUpdate(leads);
      },
      (err) => {
        console.warn('Real-time submissions subscription error:', err);
        if (onError) onError(err);
      }
    );
  } catch (err) {
    console.warn('Failed to attach snapshot listener:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Update lead record status in Firestore
 */
export async function updateSubmissionInFirestore(
  docId: string, 
  updates: Record<string, any>, 
  collectionName = 'submissions'
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.error(`Failed to update doc ${docId} in ${collectionName}:`, err);
    return false;
  }
}

/**
 * Delete lead record from Firestore
 */
export async function deleteSubmissionFromFirestore(
  docId: string, 
  collectionName = 'submissions'
): Promise<boolean> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`Failed to delete doc ${docId} from ${collectionName}:`, err);
    return false;
  }
}

/**
 * Purge all data from Firestore collections (Executive Admin utility)
 */
export async function purgeAllFirestoreData(): Promise<{ success: boolean; count: number }> {
  try {
    const collectionsToPurge = ['submissions', 'document_leads', 'members', 'audit_logs', 'payouts'];
    let count = 0;
    for (const colName of collectionsToPurge) {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, colName, docSnap.id));
        count++;
      }
    }
    return { success: true, count };
  } catch (err) {
    console.error('Failed to purge Firestore data:', err);
    return { success: false, count: 0 };
  }
}

/**
 * Approve a member in Firestore:
 * 1. Updates the submission record in 'submissions' collection
 * 2. Creates/updates a permanent record in 'members' collection
 */
export async function approveMemberInFirestore(lead: any): Promise<{ success: boolean; memberId: string; error?: any }> {
  try {
    const cleanEmail = (lead.email || '').toLowerCase().trim();
    const docId = lead.firestoreDocId || (lead.id && String(lead.id).length > 15 ? lead.id : null);
    const memberCode = lead.membershipCode || lead.applicationId || lead.id || `BBSP-${cleanEmail.slice(0, 4).toUpperCase()}`;

    // 1. Update in 'submissions' collection
    if (docId) {
      await updateDoc(doc(db, 'submissions', docId), {
        status: 'Approved',
        isApproved: true,
        approvedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      // Find submission by email or membershipCode if docId is missing
      const subCol = collection(db, 'submissions');
      if (cleanEmail) {
        const qEmail = query(subCol, where('email', '==', cleanEmail));
        const snap = await getDocs(qEmail);
        snap.forEach(async (d) => {
          await updateDoc(d.ref, {
            status: 'Approved',
            isApproved: true,
            approvedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }
      if (lead.membershipCode) {
        const qCode = query(subCol, where('membershipCode', '==', lead.membershipCode));
        const snap = await getDocs(qCode);
        snap.forEach(async (d) => {
          await updateDoc(d.ref, {
            status: 'Approved',
            isApproved: true,
            approvedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
      }
    }

    // 2. Add to dedicated 'members' collection indexed by clean email
    if (cleanEmail) {
      const memberRef = doc(db, 'members', cleanEmail);
      await setDoc(memberRef, {
        id: memberCode,
        memberId: memberCode,
        membershipCode: memberCode,
        fullName: lead.fullName || lead.name || 'BBSP Partner',
        name: lead.fullName || lead.name || 'BBSP Partner',
        email: cleanEmail,
        phone: lead.phone || '',
        cadre: lead.cadre || lead.membershipCadre || 'District Cadre Syndicate Partner',
        status: 'Approved',
        isApproved: true,
        bankName: lead.bankName || '',
        accountNumber: lead.accountNumber || '',
        ifscCode: lead.ifscCode || '',
        amountPaid: lead.amountPaid || '₹5,000',
        transactionId: lead.transactionId || '',
        approvedAt: serverTimestamp(),
        joinedAt: lead.submittedAt || lead.timestamp || new Date().toISOString()
      }, { merge: true });
    }

    return { success: true, memberId: memberCode };
  } catch (err) {
    console.error('Error approving member in Firestore:', err);
    return { success: false, memberId: lead.membershipCode || lead.id || '', error: err };
  }
}

/**
 * Check if an email belongs to an approved BBSP member
 */
export async function getApprovedMemberByEmail(email: string): Promise<any | null> {
  const cleanEmail = (email || '').toLowerCase().trim();
  if (!cleanEmail) return null;

  try {
    // 1. Check 'members' collection
    const memberDoc = await getDoc(doc(db, 'members', cleanEmail));
    if (memberDoc.exists()) {
      const data = memberDoc.data();
      if (data.status === 'Approved' || data.isApproved === true) {
        return { id: memberDoc.id, ...data };
      }
    }

    // 2. Check 'submissions' collection
    const subCol = collection(db, 'submissions');
    const q = query(subCol, where('email', '==', cleanEmail));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      let found: any = null;
      snapshot.forEach(d => {
        const data = d.data();
        const rawStatus = (data.status || '').toLowerCase().trim();
        if (rawStatus === 'approved' || rawStatus === 'sanctioned' || data.isApproved === true) {
          found = { id: d.id, ...data };
        }
      });
      if (found) return found;
    }
  } catch (e) {
    console.warn('Firestore member lookup warning:', e);
  }

  // 3. Check local cache fallback
  try {
    const rawMembers = localStorage.getItem('bbsp_members');
    if (rawMembers) {
      const list = JSON.parse(rawMembers);
      const m = list.find((item: any) => (item.email || '').toLowerCase().trim() === cleanEmail);
      if (m && (m.status === 'Approved' || m.isApproved === true)) return m;
    }

    const rawEnquiries = localStorage.getItem('bbsp_enquiries');
    if (rawEnquiries) {
      const list = JSON.parse(rawEnquiries);
      const m = list.find((item: any) => (item.email || '').toLowerCase().trim() === cleanEmail);
      if (m && ((m.status || '').toLowerCase().trim() === 'approved' || (m.status || '').toLowerCase().trim() === 'sanctioned' || m.isApproved === true)) {
        return m;
      }
    }
  } catch (e) {}

  return null;
}

export default app;

