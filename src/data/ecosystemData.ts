export interface CompanyData {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: 'solar' | 'loans' | 'real-estate' | 'education';
  logoPlaceholder: string;
  logo: string;
  websiteUrl: string;
  keyServices: string[];
  metrics: { label: string; value: string }[];
  synergyHighlight: string;
  region: 'telangana' | 'andhra-pradesh' | 'karnataka' | 'goa' | 'tamil-nadu';
  verified: boolean;
}

export interface PillarCategory {
  id: 'solar' | 'loans' | 'real-estate' | 'education';
  title: string;
  subtitle: string;
  iconName: string;
  emoji: string;
  accentColor: string;
  accentGlow: string;
  bgGradient: string;
  bannerImage: string;
  description: string;
  intentKeywords: string[];
  suggestedQueries: string[];
  companies: CompanyData[];
}

export interface RegionalHub {
  id: string;
  state: string;
  hubCity: string;
  coordinates: { x: number; y: number }; // percentage on map
  pillarsActive: string[];
  projectsCount: string;
  highlight: string;
}

export interface SynergyLink {
  from: 'solar' | 'loans' | 'real-estate' | 'education';
  to: 'solar' | 'loans' | 'real-estate' | 'education';
  title: string;
  description: string;
}

export const PILLAR_CATEGORIES: Record<string, PillarCategory> = {
  solar: {
    id: 'solar',
    title: 'Solar / Renewable Energy',
    subtitle: 'Sustainable Energy Solutions',
    iconName: 'Sun',
    emoji: '',
    accentColor: '#A5CEE0',
    accentGlow: 'rgba(165, 206, 224, 0.25)',
    bgGradient: 'linear-gradient(135deg, rgba(165, 206, 224, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)',
    bannerImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    description: 'Empowering communities and enterprises with clean energy, solar installations, and smart power infrastructure.',
    intentKeywords: ['solar', 'renewable', 'energy', 'sun', 'panel', 'panels', 'electricity', 'power', 'rooftop', 'bill', 'reduce bill', 'clean energy'],
    suggestedQueries: ['I want to install solar panels', 'I want to reduce my electricity bill'],
    companies: [
      {
        id: 'company-solar-01',
        name: 'BuildBharat Solar',
        badge: 'Renewable Pillar',
        tagline: 'Powering the Future with Clean Solar Energy',
        shortDescription: 'Industrial solar installations and renewable energy grid configurations for commercial and municipal developers.',
        fullDescription: 'BuildBharat Solar delivers end-to-end clean energy projects across South India. From solar audit to grid integration, we help businesses and homeowners transition to clean power.',
        category: 'solar',
        logoPlaceholder: 'BUILD BHARAT SOLAR',
        logo: '/build-bharat-solar.png',
        websiteUrl: 'https://example.com/solar-infrastructure',
        keyServices: ['Rooftop Solar Solutions', 'Commercial Energy Audits', 'Microgrid & Battery Storage', 'Solar Farm Development'],
        metrics: [
          { label: 'Clean Power', value: '45+ MW' },
          { label: 'CO2 Avoided', value: '62,000 Tons' },
          { label: 'Grid Efficiency', value: '99.4%' }
        ],
        synergyHighlight: 'Partners with Financial Services for 0% down solar equipment financing.',
        region: 'telangana',
        verified: true
      },
      {
        id: 'company-solar-02',
        name: 'Sunshine Renewables',
        badge: 'Solar Enterprise',
        tagline: 'Decentralized Solar Grid Ecosystems',
        shortDescription: 'Rooftop solar and automated smart grids for industrial warehouses and private tech corridors.',
        fullDescription: 'Sunshine Renewables is an industry leader in decentralized rooftop systems, specializing in quick setups for IT campuses and logistics warehouses.',
        category: 'solar',
        logoPlaceholder: 'SUNSHINE RENEWABLES',
        logo: '/build-bharat-solar.png',
        websiteUrl: 'https://example.com/sunshine-solar',
        keyServices: ['Industrial Rooftops', 'Net Metering Approvals', 'Thermal Solar Audits', 'Ecosystem Integration'],
        metrics: [
          { label: 'Grid Power', value: '18+ MW' },
          { label: 'Sites Enabled', value: '110+' },
          { label: 'Uptime Rate', value: '99.9%' }
        ],
        synergyHighlight: 'Collocates clean energy setups with BuildBharat Real Estate logistics hubs.',
        region: 'karnataka',
        verified: true
      },
      {
        id: 'company-solar-03',
        name: 'Deccan Solar Systems',
        badge: 'Eco Infrastructure',
        tagline: 'Reliable Coastal Clean Power Networks',
        shortDescription: 'Heavy-duty solar panel development and storage microgrids engineered for high-humidity coastal zones.',
        fullDescription: 'Deccan Solar Systems builds custom high-durability panels and battery banks engineered specifically for maritime and high-salinity coastal areas.',
        category: 'solar',
        logoPlaceholder: 'DECCAN SOLAR',
        logo: '/build-bharat-solar.png',
        websiteUrl: 'https://example.com/deccan-solar',
        keyServices: ['Coastal Solar Parks', 'Battery Microgrids', 'Corrosion-Resistant Panels', 'Ecosystem Maintenance'],
        metrics: [
          { label: 'Installed', value: '12+ MWp' },
          { label: 'Coastal Projects', value: '45+' },
          { label: 'Panel Efficiency', value: '21.5%' }
        ],
        synergyHighlight: 'Supplies clean power to coastal commercial projects and port warehouses.',
        region: 'andhra-pradesh',
        verified: false
      }
    ]
  },
  loans: {
    id: 'loans',
    title: 'Loans / Financial Services',
    subtitle: 'Capital & Credit Ecosystem',
    iconName: 'Coins',
    emoji: '',
    accentColor: '#80B5CE',
    accentGlow: 'rgba(128, 181, 206, 0.25)',
    bgGradient: 'linear-gradient(135deg, rgba(128, 181, 206, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)',
    bannerImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    description: 'Providing accessible financial capital, business growth loans, property financing, and education credit with transparent terms.',
    intentKeywords: ['loan', 'loans', 'finance', 'financial', 'capital', 'money', 'credit', 'borrow', 'funding', 'business loan', 'mortgage'],
    suggestedQueries: ['I need a business loan', 'I need financial support for expansion'],
    companies: [
      {
        id: 'company-loans-01',
        name: 'BuildBharat Loans',
        badge: 'Finance Pillar',
        tagline: 'Accessible Financial Growth for Ambitions',
        shortDescription: 'Flexible project capital funding, MSME business credit, and project financing solutions for commercial growth.',
        fullDescription: 'BuildBharat Loans simplifies lending with fast digital approvals, tailored repayment structures, and transparent interest rates.',
        category: 'loans',
        logoPlaceholder: 'BUILD BHARAT LOANS',
        logo: '/build-bharat-loans.png',
        websiteUrl: 'https://example.com/capital-credit',
        keyServices: ['MSME Business Capital', 'Green Infrastructure Loans', 'Residential Home Mortgages', 'Skill Education Financing'],
        metrics: [
          { label: 'Disbursed', value: '₹350+ Cr' },
          { label: 'Approval Rate', value: '94%' },
          { label: 'Processing', value: '24-48 Hrs' }
        ],
        synergyHighlight: 'Provides direct financing pathways for Real Estate buyers & Solar adoption.',
        region: 'telangana',
        verified: true
      },
      {
        id: 'company-loans-02',
        name: 'Apex Capital Partners',
        badge: 'Corporate Credit',
        tagline: 'Fueling Industrial Expansion & Scale',
        shortDescription: 'Structured corporate financing, mezzanine debt, and heavy machinery leasing options for industrial expansion.',
        fullDescription: 'Apex Capital Partners provides commercial developers and heavy manufacturers with custom funding terms and asset-backed credit options.',
        category: 'loans',
        logoPlaceholder: 'APEX CAPITAL',
        logo: '/build-bharat-loans.png',
        websiteUrl: 'https://example.com/apex-capital',
        keyServices: ['Corporate Mezzanine Debt', 'Machinery Lease Financing', 'Working Capital Lines', 'Industrial Loans'],
        metrics: [
          { label: 'Active Credit', value: '₹180+ Cr' },
          { label: 'Client Retention', value: '98.5%' },
          { label: 'Min Loan size', value: '₹5 Cr' }
        ],
        synergyHighlight: 'Finances solar farms and heavy machinery procurement for infrastructure setups.',
        region: 'tamil-nadu',
        verified: true
      },
      {
        id: 'company-loans-03',
        name: 'Coastal FinSolutions',
        badge: 'Capital Partner',
        tagline: 'Vibrant Credit Pathways for Micro-Enterprises',
        shortDescription: 'Easy collateral-free working capital lines and retail shop renovation loans for micro-entrepreneurs.',
        fullDescription: 'Coastal FinSolutions provides fast, zero-collateral micro-credit and working capital loans for small retailers and regional distributors.',
        category: 'loans',
        logoPlaceholder: 'COASTAL FIN',
        logo: '/build-bharat-loans.png',
        websiteUrl: 'https://example.com/coastal-fin',
        keyServices: ['Micro-Business Loans', 'Retail Credit Lines', 'Short-Term Inventories', 'E-Billing Capital'],
        metrics: [
          { label: 'Disbursed', value: '₹45+ Cr' },
          { label: 'SMEs Enrolled', value: '1,200+' },
          { label: 'Repayment Rate', value: '96.8%' }
        ],
        synergyHighlight: 'Coordinates retail equipment financing with technical upskilling credits.',
        region: 'andhra-pradesh',
        verified: false
      }
    ]
  },
  'real-estate': {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Property & Space Development',
    iconName: 'Building2',
    emoji: '',
    accentColor: '#5A9CBE',
    accentGlow: 'rgba(90, 156, 190, 0.25)',
    bgGradient: 'linear-gradient(135deg, rgba(90, 156, 190, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Developing sustainable residential complexes, high-grade commercial hubs, and strategic land investments.',
    intentKeywords: ['house', 'home', 'flat', 'apartment', 'real estate', 'property', 'buy property', 'land', 'commercial space', 'plots', 'realty'],
    suggestedQueries: ['I want to buy a property', 'Looking for modern residential flats'],
    companies: [
      {
        id: 'company-realty-01',
        name: 'BuildBharat Real Estate',
        badge: 'Realty Pillar',
        tagline: 'Designing Workspaces & Living Ecosystems of Tomorrow',
        shortDescription: 'Modern green residential zones, A-Grade technology parks, and integrated plotted environments built to LEED standards.',
        fullDescription: 'BuildBharat Real Estate creates thoughtfully engineered developments across major growth cities, integrated with solar energy.',
        category: 'real-estate',
        logoPlaceholder: 'BUILD BHARAT REAL ESTATE',
        logo: '/build-bharat-real-estate.png',
        websiteUrl: 'https://example.com/spaces-realty',
        keyServices: ['Eco Gated Communities', 'Grade-A Office Spaces', 'Integrated Urban Plotted Layouts', 'Property Asset Management'],
        metrics: [
          { label: 'Area Developed', value: '3.2M Sq Ft' },
          { label: 'Happy Families', value: '4,500+' },
          { label: 'Green Certified', value: '100%' }
        ],
        synergyHighlight: 'All developments integrate Solar Power infrastructure and pre-approved home loan pathways.',
        region: 'telangana',
        verified: true
      },
      {
        id: 'company-realty-02',
        name: 'Vista Green Developers',
        badge: 'Sustainable Realty',
        tagline: 'Premium Zero-Carbon Coastal Properties',
        shortDescription: 'Luxury eco-villas, coastal commercial suites, and green hospitality spaces with off-grid solar setups.',
        fullDescription: 'Vista Green Developers builds high-end coastal properties that blend luxury with absolute carbon neutrality, utilizing hybrid battery grids.',
        category: 'real-estate',
        logoPlaceholder: 'VISTA GREEN',
        logo: '/build-bharat-real-estate.png',
        websiteUrl: 'https://example.com/vista-green',
        keyServices: ['Off-Grid Eco Villas', 'Luxury Coastal Suites', 'Boutique Green Resorts', 'LEED Architecture'],
        metrics: [
          { label: 'Villas Built', value: '85+' },
          { label: 'Solar Output', value: '4.5 MW' },
          { label: 'Energy Savings', value: '35%' }
        ],
        synergyHighlight: 'Utilizes 100% renewable grid setups powered by regional Solar partners.',
        region: 'goa',
        verified: true
      },
      {
        id: 'company-realty-03',
        name: 'Horizon Tech Parks',
        badge: 'Tech Infrastructure',
        tagline: 'Next-Gen Smart Infrastructure for IT Corridors',
        shortDescription: 'High-density tech corridors, startup incubators, and shared workspace labs equipped with smart fiber networks.',
        fullDescription: 'Horizon Tech Parks creates specialized infrastructure designed for fast-growing IT teams, complete with integrated dining and gym systems.',
        category: 'real-estate',
        logoPlaceholder: 'HORIZON TECH',
        logo: '/build-bharat-real-estate.png',
        websiteUrl: 'https://example.com/horizon-tech',
        keyServices: ['Shared Workspace Labs', 'Co-Working Incubators', 'Smart Fiber Hubs', 'Venture Infrastructure'],
        metrics: [
          { label: 'IT Parks', value: '6 Projects' },
          { label: 'Desk Capacity', value: '12,000+' },
          { label: 'LEED Rating', value: 'Gold' }
        ],
        synergyHighlight: 'Hosts skill training academies and student incubators within its buildings.',
        region: 'karnataka',
        verified: false
      }
    ]
  },
  education: {
    id: 'education',
    title: 'Education / EdTech',
    subtitle: 'Knowledge & Skill Transformation',
    iconName: 'GraduationCap',
    emoji: '',
    accentColor: '#3B7E9F',
    accentGlow: 'rgba(59, 126, 159, 0.25)',
    bgGradient: 'linear-gradient(135deg, rgba(59, 126, 159, 0.15) 0%, rgba(11, 39, 92, 0.95) 100%)',
    bannerImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    description: 'Empowering future-ready talent through industry-aligned tech bootcamps, executive learning, and career placement.',
    intentKeywords: ['learn', 'education', 'course', 'coding', 'skill', 'upskill', 'degree', 'edtech', 'study', 'train', 'training', 'school'],
    suggestedQueries: ['I want to learn coding', 'I want to upskill my technical career'],
    companies: [
      {
        id: 'company-edtech-01',
        name: 'BuildBharat EduTech',
        badge: 'EdTech Pillar',
        tagline: 'Bridging Industry Demand & Next-Gen Talent',
        shortDescription: 'Project-driven training tracks in software development, utility solar engineering, systems architecture, and data science.',
        fullDescription: 'BuildBharat EduTech delivers practical, outcome-driven education designed by tech industry leaders.',
        category: 'education',
        logoPlaceholder: 'BUILD BHARAT EDUTECH',
        logo: '/build-bharat-education.png',
        websiteUrl: 'https://example.com/learning-academy',
        keyServices: ['Full-Stack Software Engineering', 'AI & Data Science Accelerators', 'Clean Tech & Solar Engineering', 'Enterprise Workforce Upskilling'],
        metrics: [
          { label: 'Learners Trained', value: '18,000+' },
          { label: 'Placement Rate', value: '92%' },
          { label: 'Industry Partners', value: '140+' }
        ],
        synergyHighlight: 'Trains qualified talent for ecosystem businesses and offers zero-upfront cost student financing.',
        region: 'telangana',
        verified: true
      },
      {
        id: 'company-edtech-02',
        name: 'SkillCrafters Academy',
        badge: 'Skill Development',
        tagline: 'Empowering Vocational Excellence at Scale',
        shortDescription: 'Hands-on vocational courses in modern solar grid installation, logistics management, and clean energy operation.',
        fullDescription: 'SkillCrafters Academy builds verified industrial pipelines, preparing technical technicians for clean energy and logistics infrastructure roles.',
        category: 'education',
        logoPlaceholder: 'SKILLCRAFTERS',
        logo: '/build-bharat-education.png',
        websiteUrl: 'https://example.com/skillcrafters',
        keyServices: ['Solar Grid Upkeep', 'Logistics Management', 'E-Vehicle Infrastructure', 'Industrial Certifications'],
        metrics: [
          { label: 'Graduates', value: '6,400+' },
          { label: 'Placement Rate', value: '88%' },
          { label: 'Lab Locations', value: '12 Centers' }
        ],
        synergyHighlight: 'Feeds technical talent directly to local Solar and Real Estate construction setups.',
        region: 'tamil-nadu',
        verified: true
      },
      {
        id: 'company-edtech-03',
        name: 'CareerFlow Labs',
        badge: 'Tech Training',
        tagline: 'Immersive Software Engineering Cohorts',
        shortDescription: 'Direct skill bootcamps in cloud systems, database engineering, and React web application design.',
        fullDescription: 'CareerFlow Labs helps students and engineers launch technology careers with interactive remote bootcamps led by senior developers.',
        category: 'education',
        logoPlaceholder: 'CAREERFLOW',
        logo: '/build-bharat-education.png',
        websiteUrl: 'https://example.com/careerflow',
        keyServices: ['React Web Architecture', 'Cloud Infrastructure', 'Database Orchestrations', 'Interview Prep labs'],
        metrics: [
          { label: 'Cohorts Completed', value: '38+' },
          { label: 'Hiring Partners', value: '95+' },
          { label: 'Salary Hike Avg', value: '60%' }
        ],
        synergyHighlight: 'Aligns software cohorts with tech internships at B2B ecosystem headquarters.',
        region: 'karnataka',
        verified: false
      }
    ]
  }
};

export const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'telangana',
    state: 'Telangana',
    hubCity: 'Hyderabad Hub',
    coordinates: { x: 46, y: 45 },
    pillarsActive: ['solar', 'loans', 'real-estate', 'education'],
    projectsCount: '28 Active Projects',
    highlight: 'Central Ecosystem Headquarters & Technology Operations Hub. Located at 5-76/03, Surya Vamsi Nagar, Hayath Nagar, Hyderabad. MD: D Sudheer Reddy.'
  },
  {
    id: 'andhra-pradesh',
    state: 'Andhra Pradesh',
    hubCity: 'Vijayawada & Vizag Hub',
    coordinates: { x: 58, y: 52 },
    pillarsActive: ['solar', 'loans', 'real-estate'],
    projectsCount: '23 Active Projects',
    highlight: 'Solar Grid Installations & Coastal Port Infrastructure corridors.'
  },
  {
    id: 'karnataka',
    state: 'Karnataka',
    hubCity: 'Bengaluru & Hubli Hub',
    coordinates: { x: 38, y: 64 },
    pillarsActive: ['solar', 'loans', 'education'],
    projectsCount: '34 Active Projects',
    highlight: 'EdTech Skill Centers & Commercial Hubli-Bengaluru Capital Financing corridors.'
  },
  {
    id: 'goa',
    state: 'Goa',
    hubCity: 'Goa Hub',
    coordinates: { x: 26, y: 60 },
    pillarsActive: ['solar', 'real-estate'],
    projectsCount: '12 Active Projects',
    highlight: 'Eco-Hospitality Real Estate developments & Micro-Solar Microgrids.'
  },
  {
    id: 'tamil-nadu',
    state: 'Tamil Nadu',
    hubCity: 'Chennai Hub',
    coordinates: { x: 50, y: 75 },
    pillarsActive: ['solar', 'loans', 'education'],
    projectsCount: '15 Active Projects',
    highlight: 'Advanced solar cell manufacturing partnership corridors, smart microgrids, and vocational technical education.'
  }
];

export const SYNERGY_LINKS: SynergyLink[] = [
  {
    from: 'solar',
    to: 'real-estate',
    title: 'Zero-Carbon Real Estate',
    description: 'Rooftop solar integrated directly into BuildBharat Real Estate residential & commercial spaces for 100% clean power operation.'
  },
  {
    from: 'loans',
    to: 'solar',
    title: 'Green Infrastructure Financing',
    description: 'Custom low-interest capital solutions designed to accelerate residential and commercial solar adoption.'
  },
  {
    from: 'education',
    to: 'loans',
    title: 'Income-Share & Student Credit',
    description: 'Financing pathways enabling students to access high-value tech education with zero upfront burden.'
  },
  {
    from: 'real-estate',
    to: 'education',
    title: 'Learning Centers & Innovation Hubs',
    description: 'Physical state-of-the-art learning centers built within BuildBharat Real Estate developments across key cities.'
  }
];

// Helper to retrieve all companies flat list
export const ALL_COMPANIES: CompanyData[] = Object.values(PILLAR_CATEGORIES).flatMap(p => p.companies);

export function matchQueryToPillar(query: string): {
  matchedCategory: PillarCategory | null;
  confidence: number;
  matchedKeywords: string[];
  isExactMatch: boolean;
} {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    return { matchedCategory: null, confidence: 0, matchedKeywords: [], isExactMatch: false };
  }

  const scores: Record<string, { category: PillarCategory; score: number; keywords: string[] }> = {};

  Object.values(PILLAR_CATEGORIES).forEach((category) => {
    let score = 0;
    const matchedKeywords: string[] = [];

    // Check exact suggested queries first
    for (const sq of category.suggestedQueries) {
      if (cleanQuery.includes(sq.toLowerCase()) || sq.toLowerCase().includes(cleanQuery)) {
        score += 10;
      }
    }

    // Check keywords
    category.intentKeywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(cleanQuery)) {
        score += 3;
        matchedKeywords.push(kw);
      } else if (cleanQuery.includes(kw)) {
        score += 1;
        matchedKeywords.push(kw);
      }
    });

    scores[category.id] = { category, score, keywords: matchedKeywords };
  });

  let bestMatch: { category: PillarCategory; score: number; keywords: string[] } | null = null;

  Object.values(scores).forEach((item) => {
    if (!bestMatch || item.score > bestMatch.score) {
      bestMatch = item;
    }
  });

  if (bestMatch && (bestMatch as any).score > 0) {
    const confidence = Math.min(100, Math.round(((bestMatch as any).score / 6) * 100));
    return {
      matchedCategory: (bestMatch as any).category,
      confidence,
      matchedKeywords: (bestMatch as any).keywords,
      isExactMatch: (bestMatch as any).score >= 5
    };
  }

  return { matchedCategory: null, confidence: 0, matchedKeywords: [], isExactMatch: false };
}
