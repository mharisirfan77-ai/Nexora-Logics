export const INITIAL_DATA = {
  adminConfig: {
    password: "admin123",
    secretSlug: "/Nexora_Logics_admin"
  },
  themeConfig: {
    primaryAccent: "#D2F535", // Electric Lime
    secondaryAccent: "#4B4EFF", // Violet
    amberAccent: "#FF8A3D",
    bgTheme: "#07090E", // Obsidian Dark
    cardBg: "rgba(18, 22, 43, 0.75)",
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: "14px",
    customCss: ""
  },
  siteInfo: {
    brandName: "Nexora Logics",
    tagline: "Digital Solutions That Drive Growth",
    logoUrl: "/logo.jpg",
    email: "nexoralogics650@gmail.com",
    phone: "+92 300 1234567",
    location: "Serving clients worldwide",
    responseTime: "Within 24 hours",
    footerBio: "Digital solutions that drive growth — eBooks, websites, social media, and paid advertising, all under one connected strategy.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com"
  },
  pages: [
    {
      id: "page-home",
      slug: "/",
      title: "Home",
      metaTitle: "Nexora Logics — Digital Solutions That Drive Growth",
      metaDescription: "Nexora Logics builds your eBooks, websites, social presence, and ad campaigns under one connected strategy.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["hero", "reel", "stats", "about", "services", "portfolio", "team", "process", "whyUs", "testimonials", "contact"]
    },
    {
      id: "page-about",
      slug: "/about",
      title: "About Us",
      metaTitle: "About Us — Nexora Logics",
      metaDescription: "Learn about our agency vision, story, core team, and values.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["about", "stats", "team", "whyUs", "testimonials"]
    },
    {
      id: "page-services",
      slug: "/services",
      title: "Services",
      metaTitle: "Our Services — Nexora Logics",
      metaDescription: "eBooks, Web Development, Social Media Marketing, and Paid Ads.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["services", "process", "contact"]
    },
    {
      id: "page-portfolio",
      slug: "/portfolio",
      title: "Portfolio",
      metaTitle: "Portfolio & Case Studies — Nexora Logics",
      metaDescription: "Explore our recent client deliverables and case study breakdowns.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["portfolio", "testimonials", "contact"]
    },
    {
      id: "page-process",
      slug: "/process",
      title: "Process",
      metaTitle: "Our 5-Step Process — Nexora Logics",
      metaDescription: "Discover our predictable 5-step project execution workflow.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["process", "whyUs", "contact"]
    },
    {
      id: "page-why-us",
      slug: "/why-us",
      title: "Why Us",
      metaTitle: "Why Choose Us — Nexora Logics",
      metaDescription: "Why businesses choose Nexora Logics for digital growth.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["whyUs", "stats", "testimonials", "contact"]
    },
    {
      id: "page-contact",
      slug: "/contact",
      title: "Contact",
      metaTitle: "Contact Us — Nexora Logics",
      metaDescription: "Request a quote and get in touch with our agency team.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      sectionIds: ["contact", "testimonials"]
    }
  ],
  customSections: [
    {
      id: "custom-cta-1",
      type: "ctaBanner",
      title: "Ready to Scale Your Brand to New Heights?",
      subtitle: "Get a customized growth proposal within 24 hours with zero obligations.",
      buttonText: "Schedule Strategy Call ↗",
      buttonLink: "/contact",
      bgGradient: "linear-gradient(135deg, #12162B 0%, #1B2140 100%)",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  hero: {
    badge: "Digital Solutions That Drive Growth",
    titleLine1: "Every part of your online presence,",
    titleHighlight: "engineered to work together.",
    description: "Nexora Logics builds your eBooks, websites, social presence, and ad campaigns under one connected strategy — so nothing about your brand ever feels disjointed.",
    primaryCtaText: "Get a Free Quote",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services",
    heroImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  sectionsConfig: {
    stats: { enabled: true, title: "Key Metrics", order: 1 },
    about: { enabled: true, title: "About Us", order: 2 },
    services: { enabled: true, title: "Our Services", order: 3 },
    portfolio: { enabled: true, title: "Portfolio Showcase", order: 4 },
    process: { enabled: true, title: "Our 5-Step Process", order: 5 },
    whyUs: { enabled: true, title: "Why Choose Us", order: 6 },
    testimonials: { enabled: true, title: "Client Reviews", order: 7 },
    contact: { enabled: true, title: "Get In Touch", order: 8 }
  },
  stats: [
    { id: 1, number: "100+", label: "Projects Delivered" },
    { id: 2, number: "04", label: "Core Services" },
    { id: 3, number: "100%", label: "Client Satisfaction" },
    { id: 4, number: "Global", label: "Client Support" }
  ],
  about: {
    sectionLabel: "About Us",
    title: "Transforming ideas into digital success",
    subtitle: "We combine strategy, design, and technical mastery to build brands that stand out and scale.",
    paragraph1: "Nexora Logics is a digital solutions company dedicated to helping businesses thrive in today's competitive online landscape. We bring every part of your digital presence together under ONE team — no juggling multiple freelancers or agencies, no strategy getting lost in translation.",
    paragraph2: "Whether you're a startup launching your first website or an established brand looking to scale, we build customized strategies designed around your goals — not a template pulled off a shelf.",
    aboutImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      { id: 1, icon: "BookOpen", title: "eBook Creation", desc: "From ghostwriting to Amazon KDP publishing" },
      { id: 2, icon: "Code", title: "Web Development", desc: "Custom websites built to convert" },
      { id: 3, icon: "Share2", title: "Social Media Marketing", desc: "Content strategy & brand growth" },
      { id: 4, icon: "Megaphone", title: "Paid Advertising", desc: "Facebook, Google & YouTube Ads" }
    ]
  },
  servicesHeader: {
    sectionLabel: "What We Do",
    title: "Our core services",
    subtitle: "Everything your brand needs to grow online — handled by one team, built around one strategy."
  },
  services: [
    {
      id: "svc-1",
      icon: "BookOpen",
      title: "eBook Creation & Publishing",
      description: "Turn your expertise into a professionally published eBook that builds authority and generates leads.",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      features: ["Ghostwriting & editing", "Cover design & formatting", "Amazon KDP publishing", "Marketing consultation"]
    },
    {
      id: "svc-2",
      icon: "Code",
      title: "Web Development",
      description: "Fast, responsive, conversion-focused websites tailored to your business goals.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: ["Business & portfolio websites", "E-commerce stores", "WordPress & landing pages", "Maintenance & optimization"]
    },
    {
      id: "svc-3",
      icon: "Share2",
      title: "Social Media Marketing",
      description: "Build a consistent, engaging presence across every major platform with a strategy that actually works.",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      features: ["Content creation & scheduling", "Community management", "Audience growth strategies", "Brand awareness campaigns"]
    },
    {
      id: "svc-4",
      icon: "Megaphone",
      title: "Paid Advertising",
      description: "Data-driven ad campaigns built to maximize ROI and deliver measurable results.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      features: ["Facebook & Instagram Ads", "Google & YouTube Ads", "Lead generation campaigns", "Retargeting & optimization"]
    }
  ],
  portfolioHeader: {
    sectionLabel: "Selected Work",
    title: "Creative portfolio showcase",
    subtitle: "Explore our recent projects spanning web engineering, publishing, brand strategies, and high-conversion ad campaigns."
  },
  portfolio: [
    {
      id: "proj-1",
      title: "Apex Fintech Portal",
      category: "Web Development",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description: "A high-performance modern web application built for a global financial advisory agency.",
      client: "Apex Financial Solutions",
      scope: "Full-stack Web App, UI/UX Design, Custom CMS",
      tags: ["React", "Vite", "Node.js", "Tailwind"],
      challenge: "The client needed a real-time analytics dashboard with sub-second page loads and seamless financial data visuals.",
      solution: "We engineered a modular React dynamic portal with interactive charts and glassmorphism aesthetic styling.",
      liveLink: "https://example.com/apex"
    },
    {
      id: "proj-2",
      title: "Mastering Digital Growth eBook",
      category: "eBook Creation",
      thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      description: "A 180-page bestseller guide on scaling e-commerce brands, published on Amazon KDP.",
      client: "Sarah Jenkins, Business Author",
      scope: "Ghostwriting, Interior Formatting, 3D Cover Design, KDP Publishing",
      tags: ["KDP", "Ghostwriting", "eBook", "Design"],
      challenge: "Transform raw consultation notes into a compelling, market-ready digital book with custom diagrams.",
      solution: "Our editorial team structured 10 comprehensive chapters, designed custom graphics, and published it directly to KDP.",
      liveLink: "https://amazon.com"
    },
    {
      id: "proj-3",
      title: "Lumina Gourmet Restaurant Campaign",
      category: "Social Media",
      thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Complete social media rebranding, short-form video production, and community engagement.",
      client: "Lumina Dining Group",
      scope: "Content Creation, Reels Video Production, Community Management",
      tags: ["Instagram", "TikTok", "Branding", "Content Strategy"],
      challenge: "Low local foot traffic and inactive social channels across Instagram and TikTok.",
      solution: "Engineered a viral short-form video strategy that grew Instagram following by 340% in 60 days.",
      liveLink: "https://instagram.com"
    },
    {
      id: "proj-4",
      title: "EcoSmart Solar Paid Ads Scale",
      category: "Paid Advertising",
      thumbnail: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      description: "High-ROI Facebook and Google Search ad campaigns generating 450+ qualified homeowner leads monthly.",
      client: "EcoSmart Energy Systems",
      scope: "Meta Ads, Google Search, Copywriting, Landing Page Optimization",
      tags: ["Facebook Ads", "Google Ads", "Lead Gen", "ROAS"],
      challenge: "High cost-per-lead and unqualified form submissions from previous campaigns.",
      solution: "Rebuilt targeting funnel with multi-step qualifying landing pages, achieving a 4.2x ROAS.",
      liveLink: "https://example.com/ecosmart"
    }
  ],
  team: [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Creative Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Head of Design",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "David Sterling",
      role: "Lead Web Engineer",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Arthur Pendelton",
      role: "Growth & Paid Ads Strategist",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
    }
  ],
  processHeader: {
    sectionLabel: "How We Work",
    title: "Our 5-step process",
    subtitle: "Every project moves through the same clear stages — so you always know what comes next."
  },
  processSteps: [
    { id: 1, stepNumber: "01", title: "Discover", description: "We learn about your business, goals, and target audience." },
    { id: 2, stepNumber: "02", title: "Plan", description: "We map out the strategy and deliverables before any work begins." },
    { id: 3, stepNumber: "03", title: "Execute", description: "Our team builds, writes, or launches based on the agreed plan." },
    { id: 4, stepNumber: "04", title: "Deliver", description: "You review the finished work and we refine based on your feedback." },
    { id: 5, stepNumber: "05", title: "Support", description: "We stay available for updates, questions, and ongoing optimization." }
  ],
  whyUsHeader: {
    sectionLabel: "Why Nexora Logics",
    title: "Your trusted digital partner",
    subtitle: "Here's what keeps our clients coming back."
  },
  whyUs: [
    { id: 1, icon: "Award", title: "Professional Expertise", desc: "Every service is handled by specialists, not generalists trying to do everything." },
    { id: 2, icon: "Sliders", title: "Customized Solutions", desc: "No templates. Every strategy is built around your specific business and goals." },
    { id: 3, icon: "MessageSquare", title: "Transparent Communication", desc: "You always know what's happening, why, and what comes next." },
    { id: 4, icon: "Zap", title: "Fast Delivery", desc: "Clear timelines that we actually stick to — no delays, no excuses." },
    { id: 5, icon: "DollarSign", title: "Affordable Pricing", desc: "Quality work without enterprise-agency price tags. Results that fit your budget." },
    { id: 6, icon: "Users", title: "Long-Term Support", desc: "We don't disappear after delivery. We're here for the long run." }
  ],
  testimonialsHeader: {
    sectionLabel: "Client Reviews",
    title: "What our clients say",
    subtitle: "Real feedback from businesses and creators we've collaborated with."
  },
  testimonials: [
    {
      id: "testi-1",
      name: "Ahmed R.",
      role: "Entrepreneur, Karachi",
      initials: "AR",
      quote: "Nexora Logics took our idea and turned it into a professionally published eBook within weeks. The quality exceeded our expectations.",
      rating: 5
    },
    {
      id: "testi-2",
      name: "Sara K.",
      role: "E-Commerce Brand Owner",
      initials: "SK",
      quote: "Our website traffic doubled within two months of launching with Nexora. Their web development team is top notch.",
      rating: 5
    },
    {
      id: "testi-3",
      name: "Usman M.",
      role: "Restaurant Owner",
      initials: "UM",
      quote: "The social media strategy they built for us completely transformed our brand presence. Highly recommend for any business.",
      rating: 5
    }
  ],
  contactHeader: {
    sectionLabel: "Get In Touch",
    title: "Get a free quote",
    subtitle: "Tell us about your project and we'll get back to you within 24 hours."
  },
  inquiries: [
    {
      id: "inq-1",
      name: "Zainab Ali",
      email: "zainab@example.com",
      phone: "+92 312 9876543",
      service: "Web Development",
      message: "Hi Nexora team, we need a modern e-commerce web platform for our fashion brand. Looking forward to discussing pricing and timeline.",
      date: "2026-08-26T00:30:00Z",
      read: false
    }
  ]
};
