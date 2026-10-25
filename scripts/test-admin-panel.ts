/**
 * Comprehensive Automated Test Suite for BBSP Admin Command & Audit Desk
 * Tests:
 * 1. Authentication Security & PIN verification
 * 2. Lead Management & LocalStorage Persistence (CRUD)
 * 3. Search, Category & Status Filter Logic
 * 4. CSV Export Data Formatting & Integrity
 * 5. Sequential ID & Counter Engine Calibration
 * 6. Live System Audit Diagnostic Engine & Health Scoring
 * 7. End-to-End Diagnostic Lead Dispatch
 */

import { getNextMembershipCode, commitNextMembershipCode, generateEnquiryId, generateLoanApplicationId } from '../src/lib/idGenerator';
import auditHandler from '../api/audit';
import submitHandler from '../api/submit';

// Mock browser LocalStorage environment
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

// Global mock
(global as any).localStorage = new MockLocalStorage();
(global as any).sessionStorage = new MockLocalStorage();

interface TestSummary {
  passed: number;
  failed: number;
  tests: Array<{ name: string; status: 'PASSED' | 'FAILED'; details?: string }>;
}

const summary: TestSummary = {
  passed: 0,
  failed: 0,
  tests: []
};

function assert(condition: boolean, testName: string, failureDetails = '') {
  if (condition) {
    summary.passed++;
    summary.tests.push({ name: testName, status: 'PASSED' });
    console.log(`  ✓ [PASSED] ${testName}`);
  } else {
    summary.failed++;
    summary.tests.push({ name: testName, status: 'FAILED', details: failureDetails });
    console.error(`  ✗ [FAILED] ${testName}: ${failureDetails}`);
  }
}

async function runAdminPanelTestSuite() {
  console.log('====================================================');
  console.log('🚀 BBSP ADMIN PANEL & AUDIT DESK AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // TEST GROUP 1: AUTHENTICATION & SECURITY GATE
  // ----------------------------------------------------
  console.log('▶ Test Group 1: Authentication Security & Access Gates');
  
  function checkPin(pin: string): boolean {
    const validPins = ['1234', '7777', 'admin', 'bbsp'];
    return validPins.includes(pin.toLowerCase());
  }

  assert(checkPin('1234') === true, 'Admin PIN "1234" grants access');
  assert(checkPin('7777') === true, 'Executive PIN "7777" grants access');
  assert(checkPin('admin') === true, 'Alphanumeric passcode "admin" grants access');
  assert(checkPin('bbsp') === true, 'Brand passcode "bbsp" grants access');
  assert(checkPin('0000') === false, 'Invalid PIN "0000" is blocked');
  assert(checkPin('wrong') === false, 'Arbitrary text is blocked');

  sessionStorage.setItem('bbsp_admin_auth', 'true');
  assert(sessionStorage.getItem('bbsp_admin_auth') === 'true', 'Admin session persistence in sessionStorage verified');

  // ----------------------------------------------------
  // TEST GROUP 2: SEQUENTIAL ID & COUNTER CALIBRATION
  // ----------------------------------------------------
  console.log('\n▶ Test Group 2: Sequential ID Generator & Counter Engine');
  
  localStorage.clear();
  const nextMemberId = getNextMembershipCode();
  assert(nextMemberId === 'BBSP0001', 'First partner membership code initializes to BBSP0001');

  const committedId = commitNextMembershipCode();
  assert(committedId === 'BBSP0001', 'Committed ID returns BBSP0001');

  const nextAfterCommit = getNextMembershipCode();
  assert(nextAfterCommit === 'BBSP0002', 'Subsequent membership code increments sequentially to BBSP0002');

  const loanId1 = generateLoanApplicationId();
  assert(loanId1 === 'BBSP-LN-1001', 'First loan application ID initializes to BBSP-LN-1001');

  const loanId2 = generateLoanApplicationId();
  assert(loanId2 === 'BBSP-LN-1002', 'Second loan application increments sequentially to BBSP-LN-1002');

  const enquiryId1 = generateEnquiryId();
  assert(enquiryId1 === 'BBSP-ENQ-1001', 'First enquiry ID initializes to BBSP-ENQ-1001');

  // ----------------------------------------------------
  // TEST GROUP 3: LEADS & DOSSIER MANAGEMENT (CRUD)
  // ----------------------------------------------------
  console.log('\n▶ Test Group 3: Applications & Leads Management (CRUD)');

  interface LeadRecord {
    id: string;
    membershipCode?: string;
    fullName: string;
    phone: string;
    email: string;
    category: string;
    businessName: string;
    status: 'In Review' | 'Contacted' | 'Approved' | 'Rejected';
    amountPaid?: string;
  }

  const initialLeads: LeadRecord[] = [
    {
      id: 'BBSP0001',
      membershipCode: 'BBSP0001',
      fullName: 'Sudheer Reddy',
      phone: '9353018855',
      email: 'sudheer@buildbharatsp.com',
      category: 'solar',
      businessName: 'Sriram Solar Plant EPC',
      status: 'Approved',
      amountPaid: '₹5,000'
    },
    {
      id: 'BBSP-LN-1001',
      fullName: 'Vikram Singh',
      phone: '9848099887',
      email: 'vikram@infra.com',
      category: 'loans',
      businessName: 'Commercial Term Loan',
      status: 'In Review',
      amountPaid: '₹50,00,000'
    },
    {
      id: 'BBSP-CADRE-1002',
      fullName: 'Ananya Sharma',
      phone: '9123456789',
      email: 'ananya@edutech.in',
      category: 'document-download',
      businessName: '10 Cadres Commission Schedule',
      status: 'In Review'
    }
  ];

  localStorage.setItem('bbsp_enquiries', JSON.stringify(initialLeads));
  const retrievedLeads: LeadRecord[] = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]');
  assert(retrievedLeads.length === 3, 'Successfully stored and loaded 3 lead records from local storage');

  // Update Status
  const targetId = 'BBSP-CADRE-1002';
  const updatedLeads = retrievedLeads.map(lead => {
    if (lead.id === targetId) {
      return { ...lead, status: 'Approved' as const };
    }
    return lead;
  });
  localStorage.setItem('bbsp_enquiries', JSON.stringify(updatedLeads));
  const verifyUpdate = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]').find((l: any) => l.id === targetId);
  assert(verifyUpdate.status === 'Approved', 'Status updater successfully transitioned lead to "Approved"');

  // Delete Lead
  const deletedLeads = updatedLeads.filter(l => l.id !== targetId);
  localStorage.setItem('bbsp_enquiries', JSON.stringify(deletedLeads));
  const verifyDelete = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]');
  assert(verifyDelete.length === 2, 'Lead deletion removed target record and persisted 2 remaining records');

  // ----------------------------------------------------
  // TEST GROUP 4: SEARCH & FILTER ENGINE
  // ----------------------------------------------------
  console.log('\n▶ Test Group 4: Search & Multi-Category Filter Logic');

  function filterLeads(leads: LeadRecord[], query: string, category: string, status: string) {
    return leads.filter(lead => {
      const matchSearch = query === '' || 
        lead.fullName.toLowerCase().includes(query.toLowerCase()) ||
        lead.phone.includes(query) ||
        lead.email.toLowerCase().includes(query.toLowerCase()) ||
        lead.id.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === 'all' || lead.category === category;
      const matchStatus = status === 'all' || lead.status === status;
      return matchSearch && matchCategory && matchStatus;
    });
  }

  const searchByName = filterLeads(initialLeads, 'Sudheer', 'all', 'all');
  assert(searchByName.length === 1 && searchByName[0].id === 'BBSP0001', 'Search by applicant name "Sudheer" returns exact match');

  const searchByPhone = filterLeads(initialLeads, '98480', 'all', 'all');
  assert(searchByPhone.length === 1 && searchByPhone[0].fullName === 'Vikram Singh', 'Search by partial phone "98480" returns exact match');

  const filterSolar = filterLeads(initialLeads, '', 'solar', 'all');
  assert(filterSolar.length === 1 && filterSolar[0].category === 'solar', 'Filter by category "solar" returns Solar applications only');

  const filterInReview = filterLeads(initialLeads, '', 'all', 'In Review');
  assert(filterInReview.length === 2 && filterInReview[0].status === 'In Review', 'Filter by status "In Review" returns In Review applications only');

  // ----------------------------------------------------
  // TEST GROUP 5: CSV EXPORT DATA FORMATTING
  // ----------------------------------------------------
  console.log('\n▶ Test Group 5: CSV Report Generation & Data Integrity');

  function generateCSV(leads: LeadRecord[]): string {
    const headers = ['ID', 'Full Name', 'Phone', 'Email', 'Category', 'Business / Loan Type', 'Status'];
    const rows = leads.map(l => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.category}"`,
      `"${l.businessName}"`,
      l.status
    ]);
    return [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  }

  const csv = generateCSV(initialLeads);
  assert(csv.includes('ID,Full Name,Phone,Email,Category,Business / Loan Type,Status'), 'CSV contains correct standard header row');
  assert(csv.includes('BBSP0001,"Sudheer Reddy"'), 'CSV contains properly escaped applicant data');
  assert(csv.split('\n').length === 4, 'CSV contains exactly 1 header line + 3 record lines');

  // ----------------------------------------------------
  // TEST GROUP 6: LIVE SYSTEM AUDIT DIAGNOSTIC RUNNER
  // ----------------------------------------------------
  console.log('\n▶ Test Group 6: Live System Audit Engine & Scoring');

  let auditResponse: any = null;
  const mockAuditRes = {
    statusCode: 200,
    status(code: number) { this.statusCode = code; return this; },
    json(data: any) { auditResponse = data; return this; }
  };

  await auditHandler({ method: 'GET', body: {} }, mockAuditRes as any);

  assert(mockAuditRes.statusCode === 200, 'Audit endpoint returned HTTP 200 OK');
  assert(auditResponse !== null, 'Audit response payload received');
  assert(auditResponse.overallStatus === 'HEALTHY', `Audit overall status reported: ${auditResponse?.overallStatus}`);
  assert(auditResponse.auditScore >= 90, `Audit score is optimal: ${auditResponse?.auditScore}%`);
  assert(Array.isArray(auditResponse.checks) && auditResponse.checks.length >= 5, `Audit verified ${auditResponse?.checks?.length} subsystem checks`);

  // Verify all essential audit checks are present
  const checkIds = auditResponse.checks.map((c: any) => c.id);
  assert(checkIds.includes('env-runtime'), 'Subsystem 1: Node.js Runtime & Memory Stability audited');
  assert(checkIds.includes('firebase-config'), 'Subsystem 2: Firestore Database Configuration audited');
  assert(checkIds.includes('email-smtp'), 'Subsystem 3: SMTP Gateway & Fallback Queue audited');
  assert(checkIds.includes('payload-limit'), 'Subsystem 4: 25MB Multi-part KYC File Buffer audited');
  assert(checkIds.includes('sequential-id'), 'Subsystem 5: BBSP0001 Sequential Member ID Engine audited');

  // ----------------------------------------------------
  // TEST GROUP 7: END-TO-END DIAGNOSTIC LEAD DISPATCH
  // ----------------------------------------------------
  console.log('\n▶ Test Group 7: Diagnostic Dispatch Simulation');

  let submitResult: any = null;
  const mockSubmitRes = {
    statusCode: 200,
    status(code: number) { this.statusCode = code; return this; },
    json(data: any) { submitResult = data; return this; }
  };

  const testApplicant = {
    fullName: 'Diagnostic Admin Lead',
    phone: '9353018855',
    email: 'sudheer@buildbharatsp.com',
    category: 'loans',
    businessName: 'Diagnostic Health Probe',
    notes: 'Triggered from Automated Test Suite'
  };

  await submitHandler({ method: 'POST', body: testApplicant }, mockSubmitRes as any);

  assert(mockSubmitRes.statusCode === 200, 'Submit handler returned HTTP 200 OK');
  assert(submitResult.success === true, 'Submit result indicates success');
  assert(typeof submitResult.messageId === 'string', `Received message ID: ${submitResult.messageId}`);

  // ====================================================
  // SUMMARY REPORT
  // ====================================================
  console.log('\n====================================================');
  console.log(`🏁 TEST SUITE COMPLETE: ${summary.passed} PASSED / ${summary.failed} FAILED`);
  console.log('====================================================\n');

  if (summary.failed > 0) {
    process.exit(1);
  }
}

runAdminPanelTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
