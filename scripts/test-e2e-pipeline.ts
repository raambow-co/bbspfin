import { 
  submitToFirestore, 
  fetchSubmissionsFromFirestore, 
  updateSubmissionInFirestore, 
  deleteSubmissionFromFirestore 
} from '../src/lib/firebase';

async function runPipelineTest() {
  console.log('--- 1. Submitting new lead to Firestore cloud ---');
  const res = await submitToFirestore({
    fullName: 'Automated E2E Verification Lead',
    email: 'verification@test.com',
    phone: '9999988888',
    category: 'loans',
    businessName: 'E2E Testing Suite',
    status: 'Pending',
    notes: 'Testing live pipeline'
  }, 'submissions');

  if (!res.success || !res.docId) {
    throw new Error('Failed to submit test doc: ' + JSON.stringify(res));
  }
  console.log('✓ Submitted with Doc ID:', res.docId);

  console.log('--- 2. Fetching live leads from Firestore ---');
  const leads = await fetchSubmissionsFromFirestore();
  const found = leads.find(l => l.firestoreDocId === res.docId);
  if (!found) {
    throw new Error('Test lead not found in fetched submissions!');
  }
  console.log(`✓ Found test lead in Firestore list: "${found.fullName}" | Status: "${found.status}"`);

  console.log('--- 3. Testing status update in cloud ---');
  const updateOk = await updateSubmissionInFirestore(res.docId, { status: 'Approved' });
  if (!updateOk) throw new Error('Update failed');
  console.log('✓ Status updated successfully');

  console.log('--- 4. Cleaning up test document from cloud ---');
  const delOk = await deleteSubmissionFromFirestore(res.docId);
  if (!delOk) throw new Error('Delete failed');
  console.log('✓ Cleaned up test document. Complete end-to-end cloud pipeline verified!');

  process.exit(0);
}

runPipelineTest().catch(err => {
  console.error('E2E Test Failed:', err);
  process.exit(1);
});
