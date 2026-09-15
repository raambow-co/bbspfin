import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    fullName,
    email,
    phone,
    businessName,
    category,
    aadhaarNumber,
    panNumber,
    accountHolderName,
    bankName,
    accountNumber,
    ifscCode,
    transactionId,
    // File attachments array
    attachments,
    // Legacy support for single attachment
    attachmentBase64,
    attachmentName,
    attachmentType,
    // Full Formal Loan Application Fields
    loanApplicationData,
    notes,
  } = req.body;

  if (!fullName && !loanApplicationData?.firstName) {
    return res.status(400).json({ error: 'Missing required applicant information' });
  }

  const applicantDisplayName = fullName || `${loanApplicationData?.firstName || ''} ${loanApplicationData?.lastName || ''}`.trim() || 'Applicant';
  const applicantEmail = email || loanApplicationData?.email || 'noreply@buildbharatsp.com';
  const applicantPhone = phone || loanApplicationData?.contact || 'N/A';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailAttachments: any[] = [];

    // Parse array of attachments if provided
    if (Array.isArray(attachments) && attachments.length > 0) {
      for (const item of attachments) {
        if (item.base64 && item.name) {
          const rawBase64 = item.base64.includes('base64,')
            ? item.base64.split('base64,')[1]
            : item.base64;
          emailAttachments.push({
            filename: item.name,
            content: rawBase64,
            encoding: 'base64',
            contentType: item.type || 'application/octet-stream',
          });
        }
      }
    } else if (attachmentBase64) {
      emailAttachments.push({
        filename: attachmentName || 'document.png',
        content: attachmentBase64.split('base64,')[1] || attachmentBase64,
        encoding: 'base64',
        contentType: attachmentType || 'image/png',
      });
    }

    let emailHtml = '';
    let emailSubject = '';

    if (category === 'loan-application' && loanApplicationData) {
      // FORMAL 7-STAGE LOAN APPLICATION EMAIL DOSSIER
      const d = loanApplicationData;
      emailSubject = `Formal Loan Application [#${d.applicationId || 'BBSP-LN'}]: ${d.firstName} ${d.lastName} - ₹${Number(d.requiredAmount || 0).toLocaleString('en-IN')}`;

      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          
          <div style="background: #10367D; color: #ffffff; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85; display: block; margin-bottom: 4px;">BuildBharat Loans · Credit Verification Desk</span>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">CUSTOMER LOAN & UPLINE SANCTION DOSSIER</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Application Reference ID: <strong>${d.applicationId || 'BBSP-LN-' + Date.now()}</strong></p>
          </div>

          <!-- SECTION 1: PERSONAL & STATUTORY KYC -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #10367D; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            1. Personal & Statutory KYC Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Full Name:</td><td style="padding: 6px; font-weight: bold; color: #0f172a;">${d.firstName} ${d.middleName || ''} ${d.lastName}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Mother's Name:</td><td style="padding: 6px;">${d.motherName || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Date of Birth / Gender:</td><td style="padding: 6px;">${d.dob || 'N/A'} | ${d.gender || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Marital Status:</td><td style="padding: 6px;">${d.maritalStatus || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">PAN Card Number:</td><td style="padding: 6px; font-family: monospace; font-weight: bold; color: #10367D;">${d.panNumber?.toUpperCase() || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Aadhaar Card Number:</td><td style="padding: 6px; font-family: monospace; font-weight: bold; color: #10367D;">${d.aadhaarNumber || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Email & Contact:</td><td style="padding: 6px;"><a href="mailto:${d.email}">${d.email}</a> | <a href="tel:${d.contact}">${d.contact}</a></td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Present Address:</td><td style="padding: 6px;">${d.presentAddress || 'N/A'}, ${d.city || ''}, ${d.district || ''}, ${d.state || ''} - <strong>${d.pinCode || ''}</strong></td></tr>
          </table>

          <!-- SECTION 2: NOMINEE DETAILS -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #D57530; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            2. Nominee Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Nominee Name:</td><td style="padding: 6px; font-weight: bold;">${d.nomineeFirstName} ${d.nomineeMiddleName || ''} ${d.nomineeLastName}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Relationship with Nominee:</td><td style="padding: 6px;">${d.nomineeRelation || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Nominee Age:</td><td style="padding: 6px;">${d.nomineeAge || 'N/A'} Years</td></tr>
          </table>

          <!-- SECTION 3: BANK DETAILS -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #10367D; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            3. Settlement Bank Account Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Bank Name & Branch:</td><td style="padding: 6px; font-weight: bold;">${d.bankName || 'N/A'} (${d.branchName || 'N/A'})</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Account Number:</td><td style="padding: 6px; font-family: monospace; font-weight: bold;">${d.accountNumber || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">IFSC Code:</td><td style="padding: 6px; font-family: monospace; font-weight: bold; color: #10367D;">${d.ifscCode?.toUpperCase() || 'N/A'}</td></tr>
          </table>

          <!-- SECTION 4: LOAN PARTICULARS -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #10B981; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            4. Loan Particulars & Financial Request
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Required Loan Amount:</td><td style="padding: 6px; font-size: 16px; font-weight: 800; color: #10367D;">₹${Number(d.requiredAmount || 0).toLocaleString('en-IN')}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Sanction Target / Tenure:</td><td style="padding: 6px;">₹${Number(d.sanctionAmount || d.requiredAmount || 0).toLocaleString('en-IN')} | ${d.tenureMonths || '36'} Months</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Processing Fee Acknowledged:</td><td style="padding: 6px; font-weight: bold; color: #D57530;">₹${Number(d.processingFee || 0).toLocaleString('en-IN')} (Non-Refundable Agreed)</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Loan Purpose:</td><td style="padding: 6px; font-weight: bold;">${d.purpose || 'Business / Infrastructure Development'}</td></tr>
          </table>

          <!-- SECTION 5: UP LINE / SPONSOR REFERRAL -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #D57530; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            5. Up Line / Franchise Referral Sponsor
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Upline Name:</td><td style="padding: 6px;">${d.uplineFirstName || ''} ${d.uplineMiddleName || ''} ${d.uplineLastName || ''} (${d.uplineName || 'Direct'})</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Upline Member ID Code:</td><td style="padding: 6px; font-family: monospace; font-weight: bold;">${d.uplineIdCode || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Sponsor ID Code:</td><td style="padding: 6px; font-family: monospace; font-weight: bold;">${d.sponsorIdCode || 'N/A'}</td></tr>
          </table>

          <!-- SECTION 6: EXECUTIVE DETAILS -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #10367D; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            6. Field Executive & DI Branch Verification
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 35%; color: #475569;">Executive Name:</td><td style="padding: 6px;">${d.executiveName || 'Direct Online Submission'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Executive Sponsor ID:</td><td style="padding: 6px; font-family: monospace;">${d.executiveSponsorId || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">DI Code (District/Taluka):</td><td style="padding: 6px; font-family: monospace;">${d.diCode || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; color: #475569;">Rule Explanation Certified:</td><td style="padding: 6px; color: #10B981; font-weight: bold;">✓ Certified by Executive</td></tr>
          </table>

          <!-- SECTION 7: WITNESS DETAILS -->
          <h3 style="color: #10367D; background: #f1f5f9; padding: 8px 14px; border-left: 4px solid #64748b; margin-top: 15px; font-size: 14px; text-transform: uppercase;">
            7. Legal Witness Verification
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 15px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #e2e8f0; width: 50%; vertical-align: top;">
                <strong style="color: #10367D; display: block; margin-bottom: 4px;">WITNESS 1:</strong>
                <div>Name: <strong>${d.witness1Name || 'N/A'}</strong></div>
                <div>Mobile: <strong>${d.witness1Mobile || 'N/A'}</strong></div>
                <div>Address: ${d.witness1Address || 'N/A'}</div>
              </td>
              <td style="padding: 8px; border: 1px solid #e2e8f0; width: 50%; vertical-align: top;">
                <strong style="color: #10367D; display: block; margin-bottom: 4px;">WITNESS 2:</strong>
                <div>Name: <strong>${d.witness2Name || 'N/A'}</strong></div>
                <div>Mobile: <strong>${d.witness2Mobile || 'N/A'}</strong></div>
                <div>Address: ${d.witness2Address || 'N/A'}</div>
              </td>
            </tr>
          </table>

          <!-- ATTACHMENTS SUMMARY -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; margin-top: 15px; font-size: 12px;">
            <strong style="color: #0f172a;">Attached KYC & Financial Proofs:</strong> ${emailAttachments.length} file(s) attached directly to this dispatch.
          </div>

          <div style="margin-top: 20px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            BuildBharat Synergy Partners · Secure Digital Lending Infrastructure · Confidential Application Record
          </div>

    } else if (category === 'document-download' || req.body.formType === 'commission-cadre-pdf-download') {
      emailSubject = `New Document Lead: ${applicantDisplayName} (${applicantPhone})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background: #ffffff;">
          <div style="background: #10367D; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.85; display: block; margin-bottom: 4px;">BuildBharat Synergy Partners · Lead Desk</span>
            <h1 style="margin: 0; font-size: 20px; font-weight: 800;">20 Cadres Commission Document Lead</h1>
          </div>

          <h3 style="color: #333; margin-top: 15px; background: #f4f6fa; padding: 8px 12px; border-left: 4px solid #D57530;">Lead Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 40%; color: #555;">Full Name:</td><td style="padding: 8px; font-weight: bold; color: #10367D;">${applicantDisplayName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">WhatsApp / Mobile:</td><td style="padding: 8px; font-weight: bold;"><a href="tel:${applicantPhone}">${applicantPhone}</a> &nbsp;|&nbsp; <a href="https://wa.me/91${applicantPhone.replace(/\D/g, '')}" target="_blank">Chat on WhatsApp</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Requested Asset:</td><td style="padding: 8px;">BuildBharat 20 Cadres Commission Structure PDF</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #555;">Access Timestamp:</td><td style="padding: 8px;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
          </table>

          <div style="margin-top: 25px; padding: 12px; background: #f8fafc; border-radius: 6px; font-size: 12px; color: #64748b; border: 1px solid #e2e8f0;">
            This lead was captured when the visitor unlocked the official commission schedule. You can follow up directly via WhatsApp or phone.
          </div>
        </div>
      `;
    } else {
      // STANDARD PARTNER KYC ONBOARDING EMAIL
      emailSubject = `New Partner Application [KYC & Bank Verified]: ${applicantDisplayName} (${category?.toUpperCase() || 'GENERAL'})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #10367D; border-bottom: 2px solid #10367D; padding-bottom: 8px;">New Synergy Partner Application</h2>
          
          <h3 style="color: #333; margin-top: 20px; background: #f4f6fa; padding: 8px 12px; border-left: 4px solid #10367D;">1. Personal & Business Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px; font-weight: bold; width: 40%;">Full Name:</td><td style="padding: 6px;">${applicantDisplayName}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Email:</td><td style="padding: 6px;"><a href="mailto:${applicantEmail}">${applicantEmail}</a></td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Phone:</td><td style="padding: 6px;"><a href="tel:${applicantPhone}">${applicantPhone}</a></td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Business / Entity Name:</td><td style="padding: 6px;">${businessName || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Ecosystem Vertical:</td><td style="padding: 6px; text-transform: uppercase;">${category || 'N/A'}</td></tr>
          </table>

          <h3 style="color: #333; margin-top: 20px; background: #f4f6fa; padding: 8px 12px; border-left: 4px solid #D57530;">2. Legal & KYC Identity</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px; font-weight: bold; width: 40%;">Aadhaar Number:</td><td style="padding: 6px; font-family: monospace;">${aadhaarNumber || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">PAN Number:</td><td style="padding: 6px; font-family: monospace; text-transform: uppercase;">${panNumber || 'N/A'}</td></tr>
          </table>

          <h3 style="color: #333; margin-top: 20px; background: #f4f6fa; padding: 8px 12px; border-left: 4px solid #10367D;">3. Banking & Settlement Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px; font-weight: bold; width: 40%;">Account Holder Name:</td><td style="padding: 6px;">${accountHolderName || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Bank Name:</td><td style="padding: 6px;">${bankName || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Account Number:</td><td style="padding: 6px; font-family: monospace;">${accountNumber || 'N/A'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">IFSC Code:</td><td style="padding: 6px; font-family: monospace; text-transform: uppercase;">${ifscCode || 'N/A'}</td></tr>
          </table>

          <h3 style="color: #333; margin-top: 20px; background: #f4f6fa; padding: 8px 12px; border-left: 4px solid #10B981;">4. Payment Verification</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px; font-weight: bold; width: 40%;">Fee Amount:</td><td style="padding: 6px; font-weight: bold; color: #10B981;">₹5,000</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Transaction / UTR ID:</td><td style="padding: 6px; font-family: monospace;">${transactionId || 'Attached Screenshot'}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold;">Documents Attached:</td><td style="padding: 6px;">${emailAttachments.length} file(s) attached</td></tr>
          </table>

          <div style="margin-top: 25px; padding: 12px; background: #fafafa; border-radius: 6px; font-size: 11px; color: #777;">
            Sent automatically via Build Bharat Synergy Partners Portal. Verified documents (Aadhaar, PAN, Payment Screenshot) are attached to this email.
          </div>
        </div>
      `;
    }

    const mailOptions = {
      from: `"${applicantDisplayName}" <${process.env.EMAIL_USER || applicantEmail}>`,
      replyTo: applicantEmail,
      to: 'sudheer@buildbharatsp.com',
      subject: emailSubject,
      html: emailHtml,
      attachments: emailAttachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ success: true, message: 'Application submitted and dispatched successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: (error as Error).message });
  }
}
