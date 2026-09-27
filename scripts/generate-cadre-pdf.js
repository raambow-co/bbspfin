import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCadrePDF() {
  const pdfDoc = await PDFDocument.create();
  
  // A4 dimensions: 595.28 x 841.89 pt
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  // Colors
  const navyColor = rgb(16 / 255, 54 / 255, 125 / 255); // #10367D
  const darkNavy = rgb(11 / 255, 33 / 255, 71 / 255);
  const goldColor = rgb(213 / 255, 117 / 255, 48 / 255); // #D57530
  const blackColor = rgb(0.1, 0.1, 0.1);
  const whiteColor = rgb(1, 1, 1);
  const lightGrey = rgb(245 / 255, 246 / 255, 248 / 255);
  const yellowHighlight = rgb(255 / 255, 255 / 255, 180 / 255);
  const borderGrey = rgb(200 / 255, 205 / 255, 215 / 255);
  const darkBorder = rgb(30 / 255, 41 / 255, 59 / 255);
  
  // Top Banner Curve / Background
  const bannerHeight = 85;
  page.drawRectangle({
    x: 0,
    y: height - bannerHeight,
    width: width,
    height: bannerHeight,
    color: navyColor,
  });

  // Header Title
  const title1 = "BUILD BHARAT SYNERGY PARTNERS";
  const title1Width = fontBold.widthOfTextAtSize(title1, 16);
  page.drawText(title1, {
    x: (width - title1Width) / 2,
    y: height - 42,
    size: 16,
    font: fontBold,
    color: rgb(255 / 255, 220 / 255, 120 / 255),
  });

  const bannerSub = "VERIFIED PARTNER ECOSYSTEM & MULTI-INDUSTRY REVENUE DISTRIBUTION";
  const bannerSubWidth = fontRegular.widthOfTextAtSize(bannerSub, 8);
  page.drawText(bannerSub, {
    x: (width - bannerSubWidth) / 2,
    y: height - 62,
    size: 8,
    font: fontRegular,
    color: whiteColor,
  });

  // Subtitle
  const subTitle = "REFERRAL & 10 CADRES COMMISSION SCHEDULE";
  const subTitleWidth = fontBold.widthOfTextAtSize(subTitle, 14);
  page.drawText(subTitle, {
    x: (width - subTitleWidth) / 2,
    y: height - 135,
    size: 14,
    font: fontBold,
    color: navyColor,
  });

  const descText = "Official verified 49% revenue distribution on Rs. 5,000 Lifetime Membership";
  const descWidth = fontRegular.widthOfTextAtSize(descText, 9.5);
  page.drawText(descText, {
    x: (width - descWidth) / 2,
    y: height - 150,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5),
  });

  // Table Configuration
  const tableX = 55;
  const tableY = height - 170;
  const tableWidth = width - 110; // 485.28 pt
  const rowHeight = 31;
  
  // Columns: CADERS (145 pt) | DI (90 pt) | COMM % (120 pt) | COMM AMT (130.28 pt)
  const colWidths = [145, 90, 115, 135.28];
  const colPositions = [
    tableX,
    tableX + colWidths[0],
    tableX + colWidths[0] + colWidths[1],
    tableX + colWidths[0] + colWidths[1] + colWidths[2],
  ];

  // Table Header
  page.drawRectangle({
    x: tableX,
    y: tableY - rowHeight,
    width: tableWidth,
    height: rowHeight,
    color: navyColor,
  });

  const headers = ["CADERS", "D.I", "COMM %", "COMM AMT"];
  headers.forEach((h, idx) => {
    const isCenter = idx === 1;
    const isRight = idx >= 2;
    const textSize = 11;
    const textWidth = fontBold.widthOfTextAtSize(h, textSize);
    
    let textX;
    if (isRight) {
      textX = colPositions[idx] + colWidths[idx] - textWidth - 18;
    } else if (isCenter) {
      textX = colPositions[idx] + (colWidths[idx] - textWidth) / 2;
    } else {
      textX = colPositions[idx] + 16;
    }
    
    page.drawText(h, {
      x: textX,
      y: tableY - rowHeight + 10,
      size: textSize,
      font: fontBold,
      color: whiteColor,
    });
  });

  // Data rows
  const rows = [
    { cadre: "REFERAL & 1", di: "—", comm: "20%", amt: "1,000", isSpecial: true },
    { cadre: "2", di: "1", comm: "5%", amt: "250" },
    { cadre: "3", di: "2", comm: "4%", amt: "200" },
    { cadre: "4", di: "3", comm: "3%", amt: "150" },
    { cadre: "5", di: "4", comm: "2%", amt: "100" },
    { cadre: "6", di: "5", comm: "1%", amt: "50" },
    { cadre: "7", di: "5", comm: "1%", amt: "50" },
    { cadre: "8", di: "5", comm: "1%", amt: "50" },
    { cadre: "9", di: "5", comm: "1%", amt: "50" },
    { cadre: "10", di: "5", comm: "1%", amt: "50" },
    { cadre: "SUBTOTAL (1–10)", di: "", comm: "39%", amt: "1,950", isSubtotal: true },
    { cadre: "FRANCHISE POOL", di: "", comm: "8%", amt: "400", isPool: true },
    { cadre: "LOYALTY POOL", di: "", comm: "2%", amt: "100", isPool: true },
    { cadre: "TOTAL ECOSYSTEM POOL", di: "", comm: "49%", amt: "2,450", isTotal: true },
  ];

  let currentY = tableY - rowHeight;

  rows.forEach((r, i) => {
    currentY -= rowHeight;

    let rowBg = i % 2 === 0 ? whiteColor : lightGrey;
    if (r.isSpecial) rowBg = yellowHighlight;
    if (r.isSubtotal) rowBg = rgb(235 / 255, 240 / 255, 250 / 255);
    if (r.isPool) rowBg = rgb(240 / 255, 245 / 255, 255 / 255);
    if (r.isTotal) rowBg = navyColor;

    // Draw background
    page.drawRectangle({
      x: tableX,
      y: currentY,
      width: tableWidth,
      height: rowHeight,
      color: rowBg,
    });

    // Draw bottom border
    page.drawLine({
      start: { x: tableX, y: currentY },
      end: { x: tableX + tableWidth, y: currentY },
      thickness: r.isTotal || r.isSubtotal ? 1.5 : 0.6,
      color: r.isTotal ? navyColor : borderGrey,
    });

    const textColor = r.isTotal ? whiteColor : r.isSpecial ? navyColor : blackColor;
    const f = (r.isTotal || r.isSubtotal || r.isSpecial) ? fontBold : fontRegular;

    // Col 0: CADER
    page.drawText(r.cadre, {
      x: colPositions[0] + 16,
      y: currentY + 10,
      size: (r.isTotal || r.isSubtotal) ? 10 : 10.5,
      font: f,
      color: textColor,
    });

    // Col 1: DI
    if (r.di) {
      const diText = r.di === '—' ? '-' : r.di;
      const diWidth = (r.isSpecial ? fontRegular : fontBold).widthOfTextAtSize(diText, 10.5);
      page.drawText(diText, {
        x: colPositions[1] + (colWidths[1] - diWidth) / 2,
        y: currentY + 10,
        size: 10.5,
        font: r.isSpecial ? fontRegular : fontBold,
        color: r.isSpecial ? rgb(0.5, 0.5, 0.5) : textColor,
      });
    }

    // Col 2: COMM %
    const commWidth = fontBold.widthOfTextAtSize(r.comm, 10.5);
    page.drawText(r.comm, {
      x: colPositions[2] + colWidths[2] - commWidth - 18,
      y: currentY + 10,
      size: 10.5,
      font: fontBold,
      color: r.isTotal ? rgb(255 / 255, 220 / 255, 120 / 255) : textColor,
    });

    // Col 3: COMM AMT
    const amtStr = `Rs. ${r.amt}`;
    const amtWidth = fontBold.widthOfTextAtSize(amtStr, 10.5);
    page.drawText(amtStr, {
      x: colPositions[3] + colWidths[3] - amtWidth - 18,
      y: currentY + 10,
      size: 10.5,
      font: fontBold,
      color: r.isTotal ? rgb(255 / 255, 220 / 255, 120 / 255) : r.isSpecial ? navyColor : textColor,
    });
  });

  // Table Outer Border & Column Grid lines
  page.drawRectangle({
    x: tableX,
    y: currentY,
    width: tableWidth,
    height: tableY - currentY,
    borderColor: darkBorder,
    borderWidth: 1.5,
  });

  // Vertical column dividers
  colPositions.slice(1).forEach((posX) => {
    page.drawLine({
      start: { x: posX, y: tableY },
      end: { x: posX, y: currentY },
      thickness: 0.8,
      color: borderGrey,
    });
  });

  // Footer Notes
  const footerY = currentY - 30;
  const note1 = "* D.I (Direct Introductions): Minimum direct partner sponsorships required to unlock corresponding cadre tier earnings.";
  const note2 = "* Distribution: 49% Ecosystem distribution (39% Cadres 1-10 + 8% Franchise Pool + 2% Loyalty Pool) on Rs. 5,000 fee.";
  const note3 = "* Instant Credit: All earned commissions are credited directly to the verified partner bank account.";

  page.drawText(note1, { x: tableX, y: footerY, size: 8, font: fontRegular, color: rgb(0.3, 0.35, 0.4) });
  page.drawText(note2, { x: tableX, y: footerY - 14, size: 8, font: fontRegular, color: rgb(0.3, 0.35, 0.4) });
  page.drawText(note3, { x: tableX, y: footerY - 28, size: 8, font: fontRegular, color: rgb(0.3, 0.35, 0.4) });

  // Security Seal & Timestamp at bottom
  page.drawLine({
    start: { x: tableX, y: 55 },
    end: { x: tableX + tableWidth, y: 55 },
    thickness: 0.8,
    color: borderGrey,
  });

  const copyright = "Build Bharat Synergy Partners (c) Official Policy Document - Confidential Network Schedule";
  page.drawText(copyright, {
    x: tableX,
    y: 40,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  
  // Save to both public document paths and root
  const outPath1 = path.resolve('public/documents/referral-and-10-cadres-commission-structure.pdf');
  const outPath2 = path.resolve('public/documents/10-cadre-commission-structure.pdf');
  const outPath3 = path.resolve('10 cadre commision pdf.pdf');

  fs.writeFileSync(outPath1, pdfBytes);
  fs.writeFileSync(outPath2, pdfBytes);
  fs.writeFileSync(outPath3, pdfBytes);

  console.log('Successfully generated PDFs at:');
  console.log(' -', outPath1);
  console.log(' -', outPath2);
  console.log(' -', outPath3);
}

generateCadrePDF().catch(console.error);
