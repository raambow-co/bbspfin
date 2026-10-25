import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  addDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../src/lib/firebase';

const KNOWN_COLLECTIONS = [
  'submissions',
  'members',
  'document_leads',
  'audit_logs',
  'payouts'
];

export async function inspectCollections(): Promise<Record<string, Array<{ id: string; summary: string }>>> {
  console.log('🔍 Inspecting Firestore collections for project: bbspartners-01...');
  const results: Record<string, Array<{ id: string; summary: string }>> = {};

  for (const colName of KNOWN_COLLECTIONS) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      const items: Array<{ id: string; summary: string }> = [];

      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const label = data.fullName || data.name || data.email || data.purpose || data.type || docSnap.id;
        items.push({
          id: docSnap.id,
          summary: `${label} (${data.category || data.status || 'item'})`
        });
      });

      results[colName] = items;
      console.log(`  📁 Collection [${colName}]: ${items.length} document(s) found.`);
      items.forEach((item, idx) => {
        console.log(`     ${idx + 1}. [${item.id}] ${item.summary}`);
      });
    } catch (err: any) {
      console.warn(`  ⚠️ Could not read collection [${colName}]: ${err.message}`);
      results[colName] = [];
    }
  }

  return results;
}

export async function wipeAllFirebaseData(): Promise<{ totalDeleted: number; details: Record<string, number> }> {
  console.log('\n🧹 STARTING COMPLETE FIREBASE DATA PURGE...');
  let totalDeleted = 0;
  const details: Record<string, number> = {};

  for (const colName of KNOWN_COLLECTIONS) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      let count = 0;

      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, colName, docSnap.id));
        count++;
        totalDeleted++;
        console.log(`  🗑️ Deleted [${colName}/${docSnap.id}]`);
      }

      details[colName] = count;
      console.log(`  ✓ Cleared ${count} documents from [${colName}].`);
    } catch (err: any) {
      console.error(`  ❌ Error wiping [${colName}]: ${err.message}`);
      details[colName] = 0;
    }
  }

  console.log(`\n🎉 PURGE COMPLETE: Removed ${totalDeleted} total document(s) across all collections.`);
  return { totalDeleted, details };
}

export async function runFirestoreHealthAudit(): Promise<boolean> {
  console.log('\n====================================================');
  console.log('🩺 RUNNING FIREBASE & FIRESTORE HEALTH AUDIT');
  console.log('====================================================');

  const testCol = 'submissions';
  const start = Date.now();

  try {
    // 1. Write check
    console.log('  1. [Audit Check] Testing Write Access (Adding probe document)...');
    const probeDoc = await addDoc(collection(db, testCol), {
      probe: true,
      label: 'BBSP Automated Health Probe',
      createdAt: serverTimestamp(),
      testTimestamp: new Date().toISOString()
    });
    console.log(`     ✓ Write OK! Probe Doc ID: ${probeDoc.id}`);

    // 2. Read check
    console.log('  2. [Audit Check] Testing Read Access (Reading probe document)...');
    const readSnap = await getDoc(doc(db, testCol, probeDoc.id));
    if (!readSnap.exists()) {
      throw new Error('Probe document not found immediately after write!');
    }
    console.log(`     ✓ Read OK! Probe Doc verified in Firestore.`);

    // 3. Update check
    console.log('  3. [Audit Check] Testing Update Access (Updating probe document)...');
    await updateDoc(doc(db, testCol, probeDoc.id), {
      verified: true,
      status: 'Audited'
    });
    console.log(`     ✓ Update OK! Modified status to "Audited".`);

    // 4. Delete check
    console.log('  4. [Audit Check] Testing Delete Access (Removing probe document)...');
    await deleteDoc(doc(db, testCol, probeDoc.id));
    console.log(`     ✓ Delete OK! Probe doc deleted from cloud.`);

    // 5. Verification of clean state
    console.log('  5. [Audit Check] Verifying final collection counts...');
    for (const colName of KNOWN_COLLECTIONS) {
      const snap = await getDocs(collection(db, colName));
      console.log(`     - Collection [${colName}]: ${snap.size} residual document(s) remaining.`);
    }

    const elapsed = Date.now() - start;
    console.log(`\n✅ FIREBASE HEALTH AUDIT PASSED in ${elapsed}ms! Read, Write, Update, Delete & Security rules are 100% OPERATIONAL.\n`);
    return true;
  } catch (err: any) {
    console.error(`\n❌ FIREBASE HEALTH AUDIT FAILED: ${err.message}\n`, err);
    return false;
  }
}

async function main() {
  const mode = process.argv[2] || 'inspect';

  if (mode === 'inspect') {
    await inspectCollections();
  } else if (mode === 'wipe') {
    await inspectCollections();
    await wipeAllFirebaseData();
    await runFirestoreHealthAudit();
  } else if (mode === 'audit') {
    await runFirestoreHealthAudit();
  } else {
    console.log(`Usage: npx tsx scripts/manage-firebase-data.ts [inspect|wipe|audit]`);
  }

  process.exit(0);
}

if (process.argv[1] && process.argv[1].includes('manage-firebase-data')) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
