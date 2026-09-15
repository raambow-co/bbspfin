import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

const logoBase64 = readFileSync('public/build-bharat-logo.png').toString('base64');
const logoSrc = `data:image/png;base64,${logoBase64}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Member Quotation & Certificate</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 820px;
      height: 1100px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      padding: 20px;
    }
    .cert-card {
      width: 780px;
      height: 1050px;
      background: #ffffff;
      border-radius: 28px;
      border: 2px solid #0f3478;
      position: relative;
      padding: 38px 44px;
      box-shadow: 0 25px 50px -12px rgba(15, 52, 120, 0.12);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Decorative Corner Accents */
    .corner-tl {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 26px;
      height: 26px;
      border-top: 3px solid #0f3478;
      border-left: 3px solid #0f3478;
      border-top-left-radius: 4px;
    }
    .corner-tr {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 26px;
      height: 26px;
      border-top: 3px solid #0f3478;
      border-right: 3px solid #0f3478;
      border-top-right-radius: 4px;
    }
    .corner-bl {
      position: absolute;
      bottom: 10px;
      left: 10px;
      width: 26px;
      height: 26px;
      border-bottom: 3px solid #0f3478;
      border-left: 3px solid #0f3478;
      border-bottom-left-radius: 4px;
    }
    .corner-br {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 26px;
      height: 26px;
      border-bottom: 3px solid #0f3478;
      border-right: 3px solid #0f3478;
      border-bottom-right-radius: 4px;
    }

    /* Inner Accent Border */
    .inner-border {
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(15, 52, 120, 0.18);
      border-radius: 22px;
      pointer-events: none;
    }

    /* Header */
    .header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 4px;
    }
    .logo-img {
      height: 52px;
      object-fit: contain;
    }
    .company-title {
      font-family: 'Outfit', sans-serif;
      font-size: 28px;
      font-weight: 900;
      color: #0f3478;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .badge-pill {
      background: #0f3478;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 8px 24px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-top: 6px;
      box-shadow: 0 4px 12px rgba(15, 52, 120, 0.25);
    }
    .badge-icon {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    /* Certify Text */
    .certify-text {
      text-align: center;
      font-size: 14.5px;
      font-style: italic;
      color: #64748b;
      margin-top: 14px;
      margin-bottom: 6px;
      font-weight: 500;
    }

    /* Name Box */
    .name-box {
      background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
      border: 1.5px solid #cbd5e1;
      border-radius: 20px;
      padding: 16px 22px;
      text-align: center;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
    }
    .name-title {
      font-family: 'Outfit', sans-serif;
      font-size: 34px;
      font-weight: 900;
      color: #0f3478;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* Info Grid */
    .grid-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 12px;
    }
    .info-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 13px 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }
    .info-label {
      font-size: 10.5px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.2px;
      word-break: break-all;
    }
    .info-value-highlight {
      color: #0f3478;
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 800;
    }

    .full-width-card {
      margin-top: 12px;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 13px 20px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    /* Green Verified Payment Card */
    .payment-card {
      margin-top: 12px;
      background: #ecfdf5;
      border: 1.5px solid #a7f3d0;
      border-radius: 20px;
      padding: 14px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .payment-left {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .payment-label {
      font-size: 11px;
      font-weight: 800;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .payment-amount {
      font-size: 24px;
      font-weight: 900;
      color: #064e3b;
      font-family: 'Outfit', sans-serif;
      letter-spacing: 0.5px;
    }
    .verified-pill {
      background: #059669;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 7px 18px;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 10px rgba(5, 150, 105, 0.25);
    }

    /* Policy Note Container */
    .note-container {
      margin-top: 12px;
      background: #f8fafc;
      border: 1px dashed #94a3b8;
      border-radius: 14px;
      padding: 11px 16px;
      font-size: 10.5px;
      line-height: 1.5;
      color: #475569;
      text-align: justify;
    }
    .note-container strong {
      color: #0f172a;
    }

    /* Footer Section */
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 14px;
      border-top: 1px dashed #cbd5e1;
      margin-top: 10px;
    }
    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 11.5px;
      font-weight: 700;
      color: #334155;
    }
    .footer-item-muted {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }
    .footer-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .signature-name {
      font-family: 'Outfit', sans-serif;
      font-size: 21px;
      font-weight: 900;
      color: #0f3478;
      border-bottom: 2.5px solid #0f3478;
      padding-bottom: 2px;
      display: inline-block;
      margin-bottom: 4px;
    }
    .signature-title {
      font-size: 10px;
      font-weight: 800;
      color: #0f3478;
      text-transform: uppercase;
      letter-spacing: 0.9px;
    }
    .authorized-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      color: #059669;
      margin-top: 3px;
    }
    .icon-svg {
      width: 15px;
      height: 15px;
      display: inline-block;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="cert-card">
    <div class="corner-tl"></div>
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>
    <div class="corner-br"></div>
    <div class="inner-border"></div>

    <!-- Header Section -->
    <div class="header">
      <div class="logo-container">
        <img src="${logoSrc}" alt="Build Bharat Synergy Partners" class="logo-img">
      </div>
      <h1 class="company-title">BUILD BHARAT SYNERGY PARTNERS</h1>
      <div class="badge-pill">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>OFFICIAL MEMBER QUOTATION & CERTIFICATE</span>
      </div>
    </div>

    <!-- Certification Text -->
    <div class="certify-text">
      This is to officially certify
    </div>

    <!-- Name Box -->
    <div class="name-box">
      <h2 class="name-title">D.SUDHEER REDDY</h2>
    </div>

    <!-- Info Grid -->
    <div>
      <div class="grid-row">
        <div class="info-card">
          <div class="info-label">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="7" y1="8" x2="17" y2="8"></line>
              <line x1="7" y1="12" x2="13" y2="12"></line>
            </svg>
            <span>MEMBER ID</span>
          </div>
          <div class="info-value info-value-highlight">Membership ID: BBSP-01</div>
        </div>

        <div class="info-card">
          <div class="info-label">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>MOBILE NUMBER</span>
          </div>
          <div class="info-value">9353018855</div>
        </div>
      </div>

      <div class="full-width-card">
        <div class="info-label">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>EMAIL ADDRESS</span>
        </div>
        <div class="info-value">dsudheer9999@gmail.com</div>
      </div>

      <!-- Registration Fee Paid (Green Container) -->
      <div class="payment-card">
        <div class="payment-left">
          <div class="payment-label">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>REGISTRATION FEE PAID</span>
          </div>
          <div class="payment-amount">₹5,000</div>
        </div>
        <div>
          <span class="verified-pill">
            <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Verified</span>
          </span>
        </div>
      </div>

      <!-- Policy Note Box -->
      <div class="note-container">
        <strong>Note:</strong> If the member does not earn any income, even a single rupee, during the five-year membership period, the full membership amount will be refunded upon completion of five years from the date of membership issuance, subject to the applicable terms and conditions.
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer">
      <div class="footer-left">
        <div class="footer-item">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#0f3478" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Date: Today, 29 Aug 2026</span>
        </div>
        <div class="footer-item footer-item-muted">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Build Bharat Secretariat</span>
        </div>
      </div>

      <div class="footer-right">
        <div class="signature-name">D Sudheer Reddy</div>
        <div class="signature-title">MANAGING DIRECTOR & SUPERADMIN</div>
        <div class="authorized-badge">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Authorized Signatory</span>
        </div>
      </div>
    </div>

  </div>
</body>
</html>
`;

writeFileSync('temp-certificate.html', html);
console.log('Updated temp-certificate.html');
