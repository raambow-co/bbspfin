/**
 * Clean Sequential ID Generator for Build Bharat Synergy Partners (BBSP)
 * Produces structured IDs:
 * - Membership Code: BBSP0001, BBSP0002, BBSP0003...
 * - Enquiry ID: BBSP-ENQ-0001, BBSP-ENQ-0002...
 * - Loan Application ID: BBSP-LN-0001, BBSP-LN-0002...
 */

export function getNextMembershipCode(): string {
  try {
    const rawCount = localStorage.getItem('bbsp_membership_counter');
    let currentCount = rawCount ? parseInt(rawCount, 10) : 1;
    if (isNaN(currentCount) || currentCount < 1) {
      currentCount = 1;
    }
    const padded = currentCount.toString().padStart(4, '0');
    return `BBSP${padded}`;
  } catch {
    return 'BBSP0001';
  }
}

export function commitNextMembershipCode(): string {
  try {
    const code = getNextMembershipCode();
    const rawCount = localStorage.getItem('bbsp_membership_counter');
    let currentCount = rawCount ? parseInt(rawCount, 10) : 1;
    if (isNaN(currentCount) || currentCount < 1) {
      currentCount = 1;
    }
    localStorage.setItem('bbsp_membership_counter', (currentCount + 1).toString());
    return code;
  } catch {
    return 'BBSP0001';
  }
}

export function generateEnquiryId(): string {
  try {
    const rawCount = localStorage.getItem('bbsp_enquiry_counter');
    let currentCount = rawCount ? parseInt(rawCount, 10) : 1001;
    if (isNaN(currentCount) || currentCount < 1) {
      currentCount = 1001;
    }
    localStorage.setItem('bbsp_enquiry_counter', (currentCount + 1).toString());
    const padded = currentCount.toString().padStart(4, '0');
    return `BBSP-ENQ-${padded}`;
  } catch {
    return `BBSP-ENQ-1001`;
  }
}

export function generateLoanApplicationId(): string {
  try {
    const rawCount = localStorage.getItem('bbsp_loan_counter');
    let currentCount = rawCount ? parseInt(rawCount, 10) : 1001;
    if (isNaN(currentCount) || currentCount < 1) {
      currentCount = 1001;
    }
    localStorage.setItem('bbsp_loan_counter', (currentCount + 1).toString());
    const padded = currentCount.toString().padStart(4, '0');
    return `BBSP-LN-${padded}`;
  } catch {
    return `BBSP-LN-1001`;
  }
}
