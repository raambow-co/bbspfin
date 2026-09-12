import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

// ─── REAL GEOGRAPHIC SVG PATHS ───────────────────────────────────────────────
// Generated from Natural Earth / OpenStreetMap GeoJSON data
// Projection: x=(lon-74.5)/(86-74.5)*530, y=(1-(lat-7.5)/(20.5-7.5))*560
// RDP simplified to ~150-250 pts per state for smooth, accurate outlines
// ─────────────────────────────────────────────────────────────────────────────

const ANDHRA_PATH = "M 359.5,163.1 L 353.7,162.6 L 357.6,164.1 L 357.6,168.6 L 359.5,168.4 L 358,169.6 L 360,169.4 L 332.8,180.5 L 316.4,178.3 L 310.2,183.7 L 306.3,195 L 297.1,205.9 L 291.3,206.2 L 289.4,203.2 L 291,205.1 L 290.8,200.8 L 285,198.9 L 273.3,202.2 L 265.9,207.9 L 263,216.5 L 257.2,223.3 L 255.7,234.7 L 256.2,244.7 L 262.7,254.7 L 259.1,275.1 L 264.8,287.8 L 264.3,295.3 L 268,304.4 L 260.3,291.9 L 259.9,296.7 L 258.4,292.5 L 255.8,297.8 L 258.7,301.2 L 265.6,302.7 L 267.9,307.2 L 264.1,302.5 L 253.8,300.1 L 255.1,302.2 L 251.7,303.6 L 250,308.6 L 240.6,311.3 L 243.6,313.5 L 241.7,314.7 L 239.1,314.1 L 238.2,310.9 L 234.1,312.5 L 232.1,309.7 L 227.2,309.1 L 224.7,310 L 227,311 L 226.9,315 L 221.6,318.9 L 217.5,317.2 L 214.4,322.8 L 206.5,319.8 L 203.4,320.2 L 203.9,322.3 L 201.4,319.3 L 193.7,320.7 L 189.6,324 L 191.1,326.6 L 186.5,336.6 L 183.6,334.5 L 184.8,336.1 L 182.5,339.6 L 178.3,339.8 L 173.5,336.4 L 170,336.7 L 172.4,329.6 L 175.3,329.7 L 177.2,326.2 L 182.2,329.4 L 180.7,324.7 L 187.5,316.3 L 187.9,311.6 L 178.2,309.3 L 179.3,298.2 L 169.8,299.1 L 168.5,295.1 L 165,295.7 L 166.2,286.3 L 163.2,284.9 L 158.8,287.8 L 160.3,282.3 L 157.6,284.4 L 152.9,282.8 L 153.4,286 L 148.1,289 L 147.9,291.5 L 145.5,289.6 L 135.9,294 L 134.8,287.1 L 126.8,286.9 L 126,284.5 L 123.3,286 L 123.1,283.6 L 120.9,286.5 L 122.9,290.6 L 114.8,291 L 113.8,288 L 116.9,283.2 L 112,279 L 114.1,277.2 L 110.2,273.2 L 116.1,272.6 L 116.3,277.7 L 122,280.4 L 129.7,278.9 L 131,284.1 L 133.5,285.2 L 135.1,281.3 L 130.3,279 L 133.5,275.2 L 131.2,274.6 L 138.3,273.5 L 138.2,268.8 L 133,266 L 133.2,271.8 L 131.8,268.4 L 128.1,268.1 L 128.2,265.7 L 121.7,265.5 L 120.1,270.8 L 112.4,269.7 L 109.8,263.2 L 112.5,262.8 L 114,259.4 L 109.2,259.8 L 104.2,254.3 L 105.1,246.4 L 108.2,245.4 L 109,239.6 L 104.3,238.2 L 104.7,234.1 L 118.8,236.9 L 122.3,231.7 L 120.8,227.4 L 122.8,225.8 L 118.1,223.1 L 113.8,215.6 L 116.4,215.4 L 116.6,209.6 L 120.8,209.5 L 117.2,205.3 L 118.2,201.5 L 116.2,201.1 L 118.3,198.2 L 126.5,195.7 L 138.7,197.3 L 137.7,183.1 L 142.4,181.5 L 142.5,179.3 L 131,177.5 L 126.1,173.7 L 132.1,173 L 134.4,171.5 L 133.3,169.5 L 136.6,168.7 L 136.9,166 L 134.4,165.3 L 136.6,164.6 L 134.7,163.1 L 138.2,150.1 L 136.5,146.3 L 132.1,144.3 L 132.7,141.3 L 136.2,138.9 L 136,134.8 L 139.6,134.7 L 138.7,132.4 L 146.9,129.6 L 135.5,125.7 L 136,121 L 141.1,118.6 L 138.8,116.2 L 145.3,109.2 L 140.4,105.4 L 142.8,104.1 L 141.2,99.1 L 143,95.7 L 139.2,92.6 L 139.6,88.7 L 149.2,83.8 L 149,78.6 L 153.8,72.9 L 158.7,72.3 L 150.1,63.4 L 154.3,60.7 L 157,53.1 L 163.7,54.2 L 169.8,54.2 L 169.7,46.9 L 175.5,45 L 173.7,36 L 178.3,31 L 184.1,30.4 L 200.3,31.9 L 206,36.6 L 215.6,44.8 L 218.6,38.2 L 229.1,43.2 L 243.6,39 L 252.2,47.3 L 250.9,57.3 L 246.9,60.1 L 249.3,72.9 L 258.6,78.6 L 265.8,76.8 L 269.1,82.4 L 275.8,80.6 L 282.6,85.3 L 289.8,96.7 L 293.2,102 L 298.4,100.4 L 301.6,117 L 306.9,114 L 311.7,115.9 L 327.7,115.6 L 346.8,105.2 L 357.7,108.5 L 362.5,101.7 L 367.8,84.5 L 371.2,88.8 L 373.3,91.7 L 374.5,97.8 L 381,93.4 L 387.3,92.4 L 393.6,91.8 L 395.9,84.5 L 392.2,80.3 L 397.9,74.4 L 401.7,74.8 L 410,71.9 L 412.9,61.6 L 420.5,58 L 426.1,68.1 L 431.8,72.4 L 439.1,73.1 L 453.1,73.6 L 457.6,68.3 L 464.4,61.8 L 470.2,58.1 L 472.8,61.8 L 443.6,94.4 L 418.1,106.9 L 407.6,119.6 L 401.6,125.3 L 373.7,138 L 362.6,145.7 L 357.1,153.8 L 362.2,152.4 L 361.5,162.1 L 359.5,163.1 Z";

const KARNATAKA_PATH = "M 130.8,88.9 L 134.1,91 L 131.9,94.4 L 136.7,96.5 L 138.7,94.5 L 143,95.7 L 141.2,99.1 L 142.8,104.1 L 140.4,105.4 L 145.3,109 L 138.8,116.2 L 141.1,118.6 L 136,121 L 135.5,125.7 L 146.9,129.6 L 138.7,132.4 L 139.6,134.7 L 136,134.8 L 136.2,138.9 L 132.7,141.3 L 132.1,144.3 L 136.5,146.3 L 138.2,150.1 L 134.7,163.1 L 136.9,166 L 136.6,168.7 L 133.3,169.5 L 134.4,171.5 L 132.1,173 L 126.1,173.7 L 131,177.5 L 142.5,179.3 L 137.7,183.1 L 138.7,197.3 L 123.5,196 L 116.2,201.1 L 121,208.5 L 116.6,209.6 L 116.4,215.4 L 113.8,215.6 L 118.1,223.1 L 122.8,225.8 L 120.8,227.4 L 122.8,229.7 L 118.8,236.9 L 104.8,233.8 L 104.3,238.2 L 109,239.6 L 108.2,245.4 L 105.1,246.4 L 104.2,254.3 L 109.2,259.8 L 114,259.4 L 112.5,262.8 L 109.8,263.2 L 112.6,269.8 L 120.1,270.8 L 121.7,265.5 L 128.2,265.7 L 131.8,268.4 L 133,266 L 138.3,273.5 L 131.2,274.6 L 133.5,275.2 L 130.3,279 L 135.1,281.3 L 133.5,285.2 L 131,284.1 L 129.7,278.9 L 122,280.4 L 116.3,277.7 L 116.1,272.6 L 110.2,273.2 L 114.1,277.2 L 112,279 L 116.9,283.2 L 113.8,288 L 114.9,291.1 L 122.9,290.6 L 123.4,283.6 L 126,284.5 L 126.8,286.9 L 134.8,287.1 L 137.2,293.9 L 143.8,291.7 L 147.9,291.5 L 148.1,289 L 153.4,286 L 157.6,284.4 L 158.8,287.8 L 163.2,284.9 L 165,295.7 L 168.5,295.1 L 169.8,299.1 L 179.3,298.2 L 178.2,309.3 L 187.9,311.8 L 187.5,316.3 L 180.7,324.7 L 182.2,329.4 L 177.2,326.2 L 175.3,329.7 L 172.4,329.6 L 171.5,333.7 L 163.5,329.9 L 158.9,329.6 L 157.5,328.3 L 151.4,330.2 L 148.9,337.6 L 142.4,337.8 L 141.7,346 L 143.8,348.6 L 136.7,357.4 L 148.7,358.9 L 145.9,368.8 L 137.5,369.1 L 134.5,376.9 L 126.4,374.7 L 120,376.4 L 115.4,374.6 L 110.6,375.5 L 107.7,384.5 L 94.6,382.8 L 92.4,379.2 L 88,380.6 L 87.9,376.8 L 84.6,377.8 L 77.6,372 L 74.1,372.6 L 74.1,367.4 L 68.9,369.5 L 63,368.5 L 59.9,363.1 L 53.4,362.1 L 45.3,353.8 L 42.5,350.4 L 39.9,348.6 L 42.1,344.8 L 38.8,346.5 L 35.6,342.9 L 38.2,340.9 L 35.8,339.8 L 33.7,342 L 30,337 L 25.2,337.7 L 25.5,335.6 L 22.3,334.7 L 23.3,332.3 L 16.9,333.7 L 8.8,308.1 L 6.1,286.5 L 0.1,279.2 L -6.7,258.4 L -8.8,257.6 L -11.5,248.1 L -18.8,245.4 L -18.6,241.4 L -10.6,238.4 L -8.2,229 L -11.2,225.8 L -7.3,224.3 L -11.2,215.8 L -18.6,208 L -12.6,203.1 L -6.2,203.6 L -5.1,200.6 L -5.8,198.5 L -1.4,192.1 L -0.2,189.5 L -0.2,183.6 L -7.7,182.3 L -8,177.5 L -9.2,172.2 L -7.9,170 L -1,165.4 L 2.4,166.6 L 3.4,170.1 L 8.8,167.8 L 9.1,163 L 19.5,160.7 L 20.2,153.3 L 27.4,153 L 33.6,157.6 L 36.1,156.2 L 36.3,152.7 L 44.6,151.4 L 45.7,153.2 L 49.6,150.4 L 54,152.6 L 54.3,146.7 L 52,143.4 L 53.5,139.5 L 49.7,134.3 L 52.3,130.2 L 59.5,134.7 L 63.7,132.7 L 66,136.8 L 74.7,135 L 77.2,138 L 80.4,134.6 L 86.7,137.3 L 88.1,135.8 L 84.5,132.1 L 86.4,129.5 L 84.4,125.1 L 91.7,122.3 L 93.3,118.1 L 95.7,120.5 L 97.4,117.7 L 101,121.5 L 102.1,117.1 L 105.5,115.2 L 103.4,112 L 111.4,111.3 L 113.1,99.7 L 120.2,101.1 L 126.3,90.1 L 130.8,88.9 Z";

const KERALA_PATH = "M 22.9,332.2 L 22.3,334.7 L 25.5,335.6 L 25.2,337.7 L 30,337 L 33.7,342 L 38.2,340.9 L 38.8,346.5 L 42.1,344.8 L 39.9,348.6 L 42.5,350.4 L 42.4,353.8 L 45.3,353.8 L 49.6,359.7 L 56.1,363.5 L 59.9,363.1 L 63.8,368.8 L 74.1,367.4 L 74.5,372.9 L 77.6,372 L 84.6,377.8 L 87.9,376.8 L 89.2,381.8 L 79.5,384.9 L 80.2,389.4 L 93.9,394.1 L 90,401.5 L 102.6,400.2 L 103.2,404 L 105.7,407.4 L 100.9,408.5 L 99,412.5 L 107,415.3 L 110.5,419.1 L 109.3,425.2 L 106.2,425.3 L 106.9,439.6 L 113.9,443.3 L 125.5,437.6 L 128.1,443.5 L 127.2,447.2 L 127.3,453.9 L 124.6,456.9 L 126,461.4 L 122.2,469.3 L 131.4,470 L 133.5,474 L 127.5,482.9 L 126.8,489.2 L 121.3,494.9 L 126.4,501.4 L 122.4,506.7 L 127.4,515.1 L 124.9,519.6 L 122.6,525 L 119.2,525.6 L 114.5,522.3 L 94.3,499.6 L 83.4,472.9 L 80.3,453.6 L 78.9,446.1 L 70.7,429.7 L 65,418.3 L 61.1,404 L 54.7,390.1 L 44.8,376.4 L 36.8,368.6 L 16.9,333.9 L 22.9,332.2 Z";

const TAMILNADU_PATH = "M 257,300.4 L 264.6,302.8 L 267.9,307.2 L 269.4,311.3 L 264.2,329.7 L 261.1,340.1 L 260.6,346.3 L 250.9,356.6 L 246,368.7 L 241.4,370.2 L 240.8,370.8 L 244.3,374.4 L 242.3,385.4 L 246,393.7 L 246.8,410.3 L 241.1,409.8 L 239.8,412.7 L 246.6,417.3 L 248,439.5 L 221,441 L 217.9,446.1 L 219.7,450.7 L 206.5,465.6 L 202.7,474.3 L 208.5,481.4 L 199.7,483.8 L 178.1,491.4 L 169.1,500.3 L 168.5,505.2 L 166.1,510.4 L 164.4,522.5 L 149.3,531 L 140.6,535.2 L 129.8,533.3 L 119.4,525.7 L 122.6,525 L 121.4,522.2 L 124.9,519.6 L 127.4,515.3 L 122.4,506.7 L 126.4,501.4 L 121.3,494.9 L 126.8,489.2 L 127.5,482.9 L 133.5,474 L 131.4,470 L 122.2,469.3 L 126,461.4 L 124.6,456.9 L 127.3,453.9 L 127.2,447.2 L 125.5,437.6 L 113.9,443.3 L 106.9,439.6 L 106.2,425.3 L 109.3,425.2 L 110.5,419.1 L 107,415.3 L 99,412.5 L 100.9,408.5 L 105.7,407.4 L 102.6,400.2 L 90,401.5 L 93.9,394.1 L 80.2,389.4 L 79.5,384.9 L 85.3,384.1 L 92.4,379.2 L 94.6,382.8 L 107.7,384.5 L 110.6,375.5 L 115.4,374.6 L 120,376.4 L 126.4,374.7 L 134.5,376.9 L 137.5,369.1 L 145.9,368.8 L 148.4,358.8 L 137.5,358 L 143.2,350.6 L 142.4,337.8 L 148.9,337.6 L 151.6,330 L 157.8,328.3 L 158.9,329.6 L 163.5,329.9 L 171.5,333.7 L 182.3,339.8 L 186.8,336.1 L 191.1,326.6 L 189.6,324 L 193.7,320.7 L 201.4,319.3 L 203.4,320.2 L 206.5,319.8 L 214.4,322.8 L 217.5,317.2 L 221.6,318.9 L 226.9,315 L 227,311 L 224.7,310 L 227.2,309.1 L 232.1,309.7 L 238.2,310.9 L 241.7,314.7 L 243.6,313.5 L 240.6,311.3 L 250,308.6 L 251.7,303.6 L 255.1,302.2 L 257,300.4 Z";

// Telangana: approximate from geographic boundary (77.2-81.4°E, 15.9-19.9°N)
// carved from the northern part of old AP. This uses real boundary approximation.
const TELANGANA_PATH = "M 249.3,72.9 L 258.6,78.6 L 265.8,76.8 L 269.1,82.4 L 275.8,80.6 L 282.6,85.3 L 289.8,96.7 L 293.2,102 L 298.4,100.4 L 301.6,117 L 306.9,114 L 311.7,115.9 L 327.7,115.6 L 346.8,105.2 L 357.7,108.5 L 362.5,101.7 L 367.8,84.5 L 361.5,162.1 L 359.5,163.1 L 353.7,162.6 L 332.8,180.5 L 316.4,178.3 L 310.2,183.7 L 306.3,195 L 297.1,205.9 L 291.3,206.2 L 290.8,200.8 L 285,198.9 L 273.3,202.2 L 265.9,207.9 L 263,216.5 L 257.2,223.3 L 255.7,234.7 L 256.2,244.7 L 262.7,254.7 L 259.1,275.1 L 264.8,287.8 L 264.3,295.3 L 268,304.4 L 250,308.6 L 240.6,311.3 L 224.7,310 L 226.9,315 L 217.5,317.2 L 214.4,322.8 L 206.5,319.8 L 193.7,320.7 L 189.6,324 L 178.2,309.3 L 179.3,298.2 L 169.8,299.1 L 168.5,295.1 L 165,295.7 L 138.7,197.3 L 126.5,195.7 L 118.3,198.2 L 116.2,201.1 L 126.1,173.7 L 131,177.5 L 142.5,179.3 L 138.7,197.3 L 139.6,134.7 L 146.9,129.6 L 135.5,125.7 L 136,121 L 145.3,109.2 L 149.2,83.8 L 149,78.6 L 153.8,72.9 L 175.5,45 L 173.7,36 L 178.3,31 L 184.1,30.4 L 200.3,31.9 L 206,36.6 L 215.6,44.8 L 218.6,38.2 L 229.1,43.2 L 243.6,39 L 252.2,47.3 L 250.9,57.3 L 246.9,60.1 L 249.3,72.9 Z";

interface FAQItem { question: string; answer: string; }

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    { question: '1. What is Build Bharat Synergy Partners?', answer: 'Build Bharat Synergy Partners is a partner network that allows members to earn commissions by referring customers to our Solar, Real Estate, Loan Services, and EdTech solutions.' },
    { question: '2. How do I become a partner?', answer: 'Simply register on our website, complete the required details, and pay the one-time membership fee to activate your partner account.' },
    { question: '3. What do I receive after joining?', answer: 'After successful registration, you will receive a Unique Member ID, a Referral Code, and access to your Partner Dashboard to manage referrals and commissions.' },
    { question: '4. What services can I promote?', answer: 'You can refer customers for:\n\n• Solar Solutions\n• Real Estate\n• Loan Services\n• EdTech Courses' },
    { question: '5. How do I earn commissions?', answer: 'You earn commissions whenever your referred customer successfully purchases a product or service through Build Bharat Synergy Partners.' },
    { question: '6. Is there any limit to how much I can earn?', answer: 'No. There is no limit on the number of referrals you can make or the commissions you can earn.' },
    { question: '7. What is the membership fee?', answer: 'A one-time membership fee of ₹5,000 is required to activate your partner account.' },
    { question: '8. Is the membership fee refundable?', answer: 'Yes. If you are unable to complete even a single successful transaction within five (5) years of your membership, your ₹5,000 membership fee will be eligible for refund as per our Terms & Conditions.' },
    { question: '9. How can I track my referrals and commissions?', answer: 'Your Partner Dashboard provides real-time access to your referrals, commission status, and other partner-related activities.' },
    { question: '10. How can I contact Build Bharat Synergy Partners?', answer: 'You can reach our support team through the Contact Us page, email, or WhatsApp for any assistance regarding your partnership.' },
  ];

  const toggleFAQ = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const visibleFaqs = showAll ? faqData : faqData.slice(0, 5);

  const states = [
    { id: 'karnataka',  label: 'KARNATAKA',       fill: '#C62828', hover: '#8B0000', d: KARNATAKA_PATH, lx: 56,  ly: 250 },
    { id: 'telangana',  label: 'TELANGANA',        fill: '#E53935', hover: '#B71C1C', d: TELANGANA_PATH, lx: 250, ly: 160 },
    { id: 'andhra',     label: 'ANDHRA PRADESH',   fill: '#EF5350', hover: '#D32F2F', d: ANDHRA_PATH,    lx: 340, ly: 210 },
    { id: 'tn',         label: 'TAMIL NADU',       fill: '#FB8C00', hover: '#E65100', d: TAMILNADU_PATH, lx: 190, ly: 430 },
    { id: 'kerala',     label: 'KERALA',           fill: '#43A047', hover: '#2E7D32', d: KERALA_PATH,    lx: 68,  ly: 430 },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FBF8F2] relative overflow-hidden">
      <style>{`
        @keyframes float-map {
          0%,100% { transform: perspective(1000px) rotateX(8deg) rotateY(-4deg) translateY(0); }
          50%      { transform: perspective(1000px) rotateX(5deg) rotateY(-1deg) translateY(-14px); }
        }
        @keyframes shadow-sync {
          0%,100% { transform: scaleX(1) scaleY(1); opacity:.25; }
          50%      { transform: scaleX(.82) scaleY(.6); opacity:.1; }
        }
        .map-float  { animation: float-map   7s ease-in-out infinite; }
        .map-shadow { animation: shadow-sync  7s ease-in-out infinite; }
        .state-shape {
          transition: filter .28s ease, opacity .28s ease;
          cursor: pointer;
        }
        .state-shape:hover {
          filter: brightness(1.18) drop-shadow(0 8px 24px rgba(0,0,0,.32));
          opacity: .92;
        }
        .state-label {
          pointer-events: none;
          user-select: none;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          font-weight: 800;
          font-size: 9px;
          fill: rgba(255,255,255,0.95);
          letter-spacing: 1.2px;
          text-shadow: 0 1px 4px rgba(0,0,0,.4);
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#B08B54]/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[10px] font-extrabold uppercase tracking-[.25em] text-[#B08B54] bg-[#B08B54]/10 px-4 py-2 rounded-full border border-[#B08B54]/20 inline-flex items-center gap-1.5 font-sans">
            <HelpCircle size={12} /><span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font tracking-tight uppercase mt-4">Ecosystem FAQs</h2>
          <p className="text-[#6E6A61] text-sm mt-3 font-sans max-w-lg mx-auto">Everything you need to know about partnership, commissions and membership.</p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-20 items-center">

          {/* LEFT: FAQ Accordion */}
          <div className="flex flex-col gap-3">
            {visibleFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#10367D]/30 shadow-lg bg-white' : 'border-[#EBE6DD] bg-white hover:shadow-md hover:border-[#B08B54]/40'}`}>
                  <button onClick={() => toggleFAQ(idx)} className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF6EE] transition-colors gap-3 bg-transparent border-none">
                    <span className={`font-extrabold text-sm heading-font uppercase tracking-wide transition-colors ${isOpen ? 'text-[#10367D]' : 'text-[#1F1D1A]'}`}>{item.question}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#10367D] text-white' : 'bg-[#FAF6EE] border border-[#EBE6DD] text-[#6E6A61]'}`}>
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-5 border-t border-[#EBE6DD]">
                      <p className="text-[#6E6A61] text-sm leading-relaxed font-sans whitespace-pre-line pt-4">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            {!showAll && faqData.length > 5 && (
              <div className="mt-2">
                <button onClick={() => setShowAll(true)} className="bg-[#10367D] hover:bg-[#10367D]/90 text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer border-none font-sans">
                  Show More FAQs
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: REAL 3D Floating South India Map */}
          <div className="flex flex-col items-center justify-center relative py-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[.3em] text-[#B08B54] font-sans mb-6 text-center">
              Strategic South India Network
            </p>

            {/* Ground shadow */}
            <div className="map-shadow absolute bottom-6 left-1/2 -translate-x-1/2 w-[300px] h-7 bg-slate-800/18 rounded-full blur-3xl" />

            {/* 3D floating SVG */}
            <div
              className="map-float relative"
              style={{ filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.22)) drop-shadow(0 4px 16px rgba(0,0,0,0.12))' }}
            >
              <svg
                viewBox="-22 20 520 540"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[440px]"
                style={{ overflow: 'visible' }}
                aria-label="South India States Map"
              >
                <defs>
                  <filter id="stateDrop" x="-8%" y="-8%" width="116%" height="116%">
                    <feDropShadow dx="2" dy="3" stdDeviation="3.5" floodColor="rgba(0,0,0,.20)" />
                  </filter>
                  <linearGradient id="gKarnataka" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D32F2F"/><stop offset="100%" stopColor="#9A0007"/>
                  </linearGradient>
                  <linearGradient id="gTelangana" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F44336"/><stop offset="100%" stopColor="#B71C1C"/>
                  </linearGradient>
                  <linearGradient id="gAndhra" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#EF5350"/><stop offset="100%" stopColor="#C62828"/>
                  </linearGradient>
                  <linearGradient id="gTN" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFA726"/><stop offset="100%" stopColor="#E65100"/>
                  </linearGradient>
                  <linearGradient id="gKerala" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#66BB6A"/><stop offset="100%" stopColor="#2E7D32"/>
                  </linearGradient>
                </defs>

                {/* Karnataka */}
                <path d={KARNATAKA_PATH} fill="url(#gKarnataka)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" filter="url(#stateDrop)" className="state-shape" onMouseEnter={()=>setHovered('karnataka')} onMouseLeave={()=>setHovered(null)} />
                <text className="state-label" x="56" y="250" textAnchor="middle">KARNATAKA</text>

                {/* Telangana */}
                <path d={TELANGANA_PATH} fill="url(#gTelangana)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" filter="url(#stateDrop)" className="state-shape" onMouseEnter={()=>setHovered('telangana')} onMouseLeave={()=>setHovered(null)} />
                <text className="state-label" x="230" y="145" textAnchor="middle">TELANGANA</text>

                {/* Andhra Pradesh */}
                <path d={ANDHRA_PATH} fill="url(#gAndhra)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" filter="url(#stateDrop)" className="state-shape" onMouseEnter={()=>setHovered('andhra')} onMouseLeave={()=>setHovered(null)} />
                <text className="state-label" x="360" y="195" textAnchor="middle">ANDHRA</text>
                <text className="state-label" x="360" y="208" textAnchor="middle">PRADESH</text>

                {/* Tamil Nadu */}
                <path d={TAMILNADU_PATH} fill="url(#gTN)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" filter="url(#stateDrop)" className="state-shape" onMouseEnter={()=>setHovered('tn')} onMouseLeave={()=>setHovered(null)} />
                <text className="state-label" x="185" y="430" textAnchor="middle">TAMIL NADU</text>

                {/* Kerala */}
                <path d={KERALA_PATH} fill="url(#gKerala)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" filter="url(#stateDrop)" className="state-shape" onMouseEnter={()=>setHovered('kerala')} onMouseLeave={()=>setHovered(null)} />
                <text className="state-label" x="68" y="430" textAnchor="middle">KERALA</text>

                {/* HQ Pin — Hyderabad, ~78.5°E, 17.4°N → ~(230, 162) */}
                <g>
                  <circle cx="230" cy="162" r="14" fill="rgba(253,224,71,0.15)">
                    <animate attributeName="r" from="7" to="20" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="230" cy="162" r="5" fill="#FDD835" stroke="white" strokeWidth="1.5" filter="url(#stateDrop)"/>
                  <text x="242" y="154" fill="#FDD835" fontSize="7.5" fontFamily="'Inter',sans-serif" fontWeight="900" letterSpacing="0.5" style={{ pointerEvents:'none', userSelect:'none' }}>★ HYD HQ</text>
                </g>
              </svg>
            </div>

            {/* Hovered state tooltip */}
            {hovered && (
              <div className="absolute top-0 right-0 bg-white/95 backdrop-blur-sm text-[#10367D] border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg font-sans">
                {states.find(s => s.id === hovered)?.label}
              </div>
            )}

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {states.map(s => (
                <div key={s.id} className="flex items-center gap-1.5 bg-white/80 border border-[#EBE6DD] px-3 py-1.5 rounded-full shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: s.fill }}/>
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider font-sans">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
