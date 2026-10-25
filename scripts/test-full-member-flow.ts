import { 
  submitToFirestore, 
  approveMemberInFirestore, 
  getApprovedMemberByEmail,
  deleteSubmissionFromFirestore,
  db
} from '../src/lib/firebase';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

async function runCompleteE2EFlowTest() {
  console.log('====================================================');
  console.log('🧪 LIVE FULL WORKFLOW VERIFICATION TEST');
  console.log('====================================================\n');

  const testEmail = 'verify.flow@buildbharatsp.com';
  const testMemberCode = 'BBSP9999';

  try {
    // ----------------------------------------------------
    // STEP 1: USER REGISTERS VIA "PARTNER UP"
    // ----------------------------------------------------
    console.log('▶ Step 1: User submits Partner Registration form with email:', testEmail);
    const regPayload = {
      formType: 'partner-registration',
      id: testMemberCode,
      membershipCode: testMemberCode,
      fullName: 'Live Flow Test Partner',
      email: testEmail,
      phone: '9848099999',
      category: 'partner-franchise',
      status: 'Pending',
      amountPaid: '₹5,000',
      bankName: 'HDFC Bank',
      accountNumber: '50100482910394',
      ifscCode: 'HDFC0000123',
      transactionId: 'UPI98472910482',
      submittedAt: new Date().toISOString()
    };

    const submitRes = await submitToFirestore(regPayload, 'submissions');
    if (!submitRes.success || !submitRes.docId) {
      throw new Error('Failed to submit registration to Firestore: ' + JSON.stringify(submitRes));
    }
    const docId = submitRes.docId;
    console.log(`  ✓ Registration recorded in Firestore cloud! Doc ID: ${docId} | Status: Pending\n`);

    // ----------------------------------------------------
    // STEP 2: USER TRIES TO LOGIN BEFORE ADMIN APPROVAL
    // ----------------------------------------------------
    console.log('▶ Step 2: User attempts Member Login before Admin approval...');
    const preApprovalCheck = await getApprovedMemberByEmail(testEmail);
    if (preApprovalCheck) {
      throw new Error('Security Breach: Member accessed dashboard BEFORE admin approved!');
    }
    console.log('  ✓ Access Gate Verified: Login is BLOCKED because status is still "Pending".\n');

    // ----------------------------------------------------
    // STEP 3: ADMIN REVIEWS & CLICKS "APPROVE" IN DASHBOARD
    // ----------------------------------------------------
    console.log('▶ Step 3: Admin opens /admin and clicks "Approve" for this partner...');
    const approveRes = await approveMemberInFirestore({
      firestoreDocId: docId,
      id: testMemberCode,
      membershipCode: testMemberCode,
      email: testEmail,
      fullName: 'Live Flow Test Partner',
      phone: '9848099999',
      bankName: 'HDFC Bank',
      amountPaid: '₹5,000',
      status: 'Approved'
    });

    if (!approveRes.success) {
      throw new Error('Admin approval failed: ' + JSON.stringify(approveRes));
    }
    console.log(`  ✓ Admin Approval Successful! Member assigned ID: ${approveRes.memberId}\n`);

    // ----------------------------------------------------
    // STEP 4: USER LOGS IN USING THE EXACT SAME EMAIL ID
    // ----------------------------------------------------
    console.log('▶ Step 4: User now logs in using their registered Email ID...');
    const postApprovalMember = await getApprovedMemberByEmail(testEmail);
    if (!postApprovalMember) {
      throw new Error('Login failed: Approved member not found in Firestore!');
    }

    console.log('  ✓ Authentication SUCCESSFUL!');
    console.log('  ✓ Member Name   :', postApprovalMember.fullName || postApprovalMember.name);
    console.log('  ✓ Member Email  :', postApprovalMember.email);
    console.log('  ✓ Member ID     :', postApprovalMember.membershipCode || postApprovalMember.id);
    console.log('  ✓ Cadre Status  :', postApprovalMember.status);
    console.log('  ✓ Member Portal unlocked and ready for dashboard rendering!\n');

    // ----------------------------------------------------
    // STEP 5: CLEANUP TEST ARTIFACTS FROM CLOUD
    // ----------------------------------------------------
    console.log('▶ Step 5: Teardown & Clean up test records from Firestore...');
    await deleteSubmissionFromFirestore(docId, 'submissions');
    await deleteDoc(doc(db, 'members', testEmail));
    console.log('  ✓ Cleaned up test submission & member records from live cloud database.\n');

    console.log('====================================================');
    console.log('🎉 VERIFICATION COMPLETE: THE ENTIRE WORKFLOW IS 100% WORKING!');
    console.log('====================================================');

    process.exit(0);
  } catch (err: any) {
    console.error('❌ Flow test failed:', err);
    process.exit(1);
  }
}

runCompleteE2EFlowTest();
