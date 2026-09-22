export const INITIAL_DATA = {
  adminConfig: {
    password: "admin123",
    secretSlug: "/Nexora_Logics_admin"
  },
  themeConfig: {
    primaryAccent: "#2E7A9E", // Deep Teal / Blue-Teal (Attached landing page)
    secondaryAccent: "#1F5C79", // Deep Lime / Navy Accent
    amberAccent: "#1B3F63", // Deep Navy Accent
    bgTheme: "#0B0B0C", // Ink Dark Background
    cardBg: "#161616", // Surface Card Background
    fontHeading: "'Archivo', -apple-system, sans-serif",
    fontBody: "'Inter', -apple-system, sans-serif",
    borderRadius: "999px",
    customCss: ""
  },
  activeThemeId: "theme-obsidian-dark",
  themes: [
    {
      id: "theme-obsidian-dark",
      name: "Nexora Upwork & Obsidian Theme",
      version: "1.5.0",
      author: "Nexora Logics Team",
      description: "Official Nexora Logics Theme featuring the deep teal cyan (#2E7A9E), ink dark (#0B0B0C), and Archivo typography from the official landing page identity.",
      isSystem: true,
      screenshot: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      colors: {
        primaryAccent: "#2E7A9E",
        secondaryAccent: "#1F5C79",
        amberAccent: "#1B3F63",
        bgTheme: "#0B0B0C",
        cardBg: "#161616"
      },
      typography: {
        fontHeading: "'Archivo', -apple-system, sans-serif",
        fontBody: "'Inter', -apple-system, sans-serif"
      },
      cssContent: `/* Nexora Official Upwork Theme Styles */
:root {
  --ink: #0B0B0C;
  --surface: #161616;
  --surface-2: #1D1D1D;
  --line: #2A2A2A;
  --lime: #2E7A9E;
  --lime-deep: #1F5C79;
  --navy: #1B3F63;
  --white: #FFFFFF;
  --grey: #A6A6A6;
  --grey-2: #707070;
  --bg-dark: #0B0B0C;
  --card-bg: #161616;
  --card-border: #2A2A2A;
  --font-heading: 'Archivo', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}
.hero-badge {
  box-shadow: 0 0 25px rgba(46, 122, 158, 0.25);
  border-color: rgba(46, 122, 158, 0.3);
}`,
      files: [
        { name: "style.css", path: "style.css", content: "/* Theme Name: Nexora Obsidian Dark (Logo Palette)\nAuthor: Nexora Logics Team\nVersion: 1.4.0 */\nbody { background-color: #070C18; color: #FFFFFF; }" },
        { name: "theme.json", path: "theme.json", content: '{\n  "$schema": "https://schemas.wp.org/trunk/theme.json",\n  "version": 2,\n  "settings": {\n    "color": {\n      "palette": [\n        { "slug": "primary", "color": "#00C9A7", "name": "Electric Teal Cyan" },\n        { "slug": "secondary", "color": "#1B4985", "name": "Tech Navy Sapphire" }\n      ]\n    }\n  }\n}' },
        { name: "index.php", path: "index.php", content: "<?php get_header(); ?>\n<main class='site-main'><?php the_content(); ?></main>\n<?php get_footer(); ?>" },
        { name: "header.php", path: "header.php", content: "<!DOCTYPE html>\n<html <?php language_attributes(); ?>>\n<head><meta charset='UTF-8'><?php wp_head(); ?></head>" }
      ]
    },
    {
      id: "theme-twentytwentyfour-dark",
      name: "Twenty Twenty-Four Dark",
      version: "1.0.0",
      author: "WordPress.org Community",
      description: "A versatile, dark-themed block layout WordPress theme designed for editorial flexibility and modern minimalism.",
      isSystem: true,
      screenshot: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      colors: {
        primaryAccent: "#38BDF8",
        secondaryAccent: "#818CF8",
        amberAccent: "#F59E0B",
        bgTheme: "#0F172A",
        cardBg: "rgba(30, 41, 59, 0.8)"
      },
      typography: {
        fontHeading: "'Plus Jakarta Sans', sans-serif",
        fontBody: "'Inter', sans-serif"
      },
      cssContent: `/* Twenty Twenty-Four Dark Theme Styles */
:root {
  --lime: #38BDF8;
  --violet: #818CF8;
  --bg-dark: #0F172A;
}
.btn-primary, .btn-hero-primary {
  border-radius: 8px !important;
  background: linear-gradient(135deg, #38BDF8 0%, #818CF8 100%) !important;
  color: #0F172A !important;
}`,
      files: [
        { name: "style.css", path: "style.css", content: "/* Theme Name: Twenty Twenty-Four Dark\nAuthor: WordPress.org Community\nVersion: 1.0.0 */" },
        { name: "theme.json", path: "theme.json", content: '{\n  "version": 2,\n  "settings": {\n    "color": {\n      "palette": [\n        { "slug": "primary", "color": "#38BDF8", "name": "Sky Blue" }\n      ]\n    }\n  }\n}' }
      ]
    },
    {
      id: "theme-astra-cyber",
      name: "Astra Cyber Neon",
      version: "3.9.5",
      author: "Brainstorm Force",
      description: "Fast, lightweight WordPress theme customized with vibrant neon cyber highlights and glassmorphism cards.",
      isSystem: true,
      screenshot: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      colors: {
        primaryAccent: "#00F2FE",
        secondaryAccent: "#4FACFE",
        amberAccent: "#FF007F",
        bgTheme: "#050B14",
        cardBg: "rgba(10, 20, 40, 0.85)"
      },
      typography: {
        fontHeading: "'Outfit', sans-serif",
        fontBody: "'Roboto', sans-serif"
      },
      cssContent: `/* Astra Cyber Neon Styles */
:root {
  --lime: #00F2FE;
  --violet: #4FACFE;
  --bg-dark: #050B14;
}
.navbar-brand, h1, h2, h3 {
  letter-spacing: -0.5px;
}`,
      files: [
        { name: "style.css", path: "style.css", content: "/* Theme Name: Astra Cyber Neon\nAuthor: Brainstorm Force\nVersion: 3.9.5 */" }
      ]
    },
    {
      id: "theme-neve-light",
      name: "Neve Minimalist Light",
      version: "3.7.0",
      author: "ThemeIsle",
      description: "Clean, high-contrast light theme with elegant typography and responsive layout components.",
      isSystem: true,
      screenshot: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
      colors: {
        primaryAccent: "#2563EB",
        secondaryAccent: "#7C3AED",
        amberAccent: "#D97706",
        bgTheme: "#F8FAFC",
        cardBg: "#FFFFFF"
      },
      typography: {
        fontHeading: "'Playfair Display', serif",
        fontBody: "'Inter', sans-serif"
      },
      cssContent: `/* Neve Minimalist Light Styles */
:root {
  --lime: #2563EB;
  --violet: #7C3AED;
  --bg-dark: #F8FAFC;
}
body {
  color: #0F172A !important;
}
.service-card, .portfolio-card, .admin-card {
  background: #FFFFFF !important;
  color: #0F172A !important;
  border: 1px solid #E2E8F0 !important;
}`,
      files: [
        { name: "style.css", path: "style.css", content: "/* Theme Name: Neve Minimalist Light\nAuthor: ThemeIsle\nVersion: 3.7.0 */" }
      ]
    }
  ],
  siteInfo: {
    brandName: "Nexora Logics",
    tagline: "Digital Solutions That Drive Growth",
    logoUrl: "/logo.jpg",
    email: "nexoralogics650@gmail.com",
    phone: "+92 300 1234567",
    location: "Serving clients worldwide",
    responseTime: "Within 24 hours",
    footerBio: "Complete digital growth solutions — marketing, websites, apps, games, AI automation, content and lead generation — delivered by one connected team.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com"
  },
  pages: [
    {
      id: "page-home",
      slug: "/",
      title: "Home",
      metaTitle: "Nexora Logics — Digital Growth, Built & Automated",
      metaDescription: "Digital marketing, websites, apps, games, AI automation, content and growth solutions from one connected team.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["hero", "stats", "about", "services", "process", "whyUs", "portfolio", "testimonials", "contact"]
    },
    {
      id: "page-about",
      slug: "/about",
      title: "About Us",
      metaTitle: "About Us — Nexora Logics",
      metaDescription: "Learn about our agency vision, story, and values.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["about", "stats", "whyUs", "testimonials"]
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
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["services", "contact"]
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
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["portfolio", "testimonials", "contact"]
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
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["whyUs", "stats", "testimonials", "contact"]
    },
    {
      id: "page-blog",
      slug: "/blog",
      title: "Blog & Insights",
      metaTitle: "Blog & Articles — Nexora Logics",
      metaDescription: "Latest digital marketing insights, eBook publishing tips, and web dev strategies.",
      isSystem: true,
      inNavbar: true,
      inFooter: true,
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["contact"]
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
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["contact", "testimonials"]
    },
    {
      id: "page-upwork-outreach",
      slug: "/upwork-outreach",
      title: "Upwork Outreach",
      metaTitle: "Nexora Logics — Upwork Outreach Management",
      metaDescription: "Stop wasting hours bidding. Start closing more deals on Upwork. End-to-end Upwork account management.",
      isSystem: true,
      inNavbar: false,
      inFooter: false,
      status: "Published",
      date: "2026-08-26",
      sectionIds: ["upworkOutreach"]
    }
  ],
  posts: [
    {
      id: "post-1",
      title: "How to Build a High-Converting Web Application in 2026",
      slug: "how-to-build-high-converting-web-application-2026",
      category: "Web Development",
      tags: ["React", "UI/UX", "Conversion"],
      author: "Nexora Team",
      date: "2026-08-25",
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      excerpt: "Discover the core principles of modern web engineering, page speed optimization, and dynamic CMS user experiences.",
      content: "Building a high-converting web application requires more than aesthetics. It demands sub-second load times, intuitive user flows, clear call-to-action buttons, and seamless mobile responsiveness. In this guide, we break down the exact tech stack and architectural choices behind top-performing business websites."
    },
    {
      id: "post-2",
      title: "The Author's Guide to Publishing Bestselling eBooks on Amazon KDP",
      slug: "authors-guide-to-publishing-bestselling-ebooks-amazon-kdp",
      category: "eBook Publishing",
      tags: ["Amazon KDP", "Publishing", "Writing"],
      author: "Marcus Vance",
      date: "2026-08-20",
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      excerpt: "Learn how to turn your raw ideas into a professionally formatted eBook with custom cover design and KDP keyword targeting.",
      content: "Publishing on Amazon KDP offers authors unprecedented reach. However, 80% of self-published books fail due to poor cover formatting, weak metadata, or unstructured chapters. Follow our step-by-step checklist to write, format, and launch your book to rank in top categories."
    },
    {
      id: "post-3",
      title: "Scaling Paid Advertising: Facebook & Google Ads ROAS Strategies",
      slug: "scaling-paid-advertising-facebook-google-ads-roas-strategies",
      category: "Paid Advertising",
      tags: ["Meta Ads", "Google Ads", "ROAS"],
      author: "Arthur Pendelton",
      date: "2026-08-15",
      status: "Published",
      featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      excerpt: "Uncover data-driven ad funnel structures that lower cost-per-lead and double return on ad spend.",
      content: "Paid advertising is predictable when you stop guessing and start testing creative variations. Learn how to structure broad targeting campaigns, build high-converting landing pages, and set up automated retargeting funnels."
    }
  ],
  mediaLibrary: [
    {
      id: "media-1",
      name: "Nexora Official Logo",
      url: "/logo.jpg",
      type: "image/jpeg",
      size: "32 KB",
      date: "2026-08-26"
    },
    {
      id: "media-2",
      name: "Team Strategy Workspace",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      type: "image/jpeg",
      size: "240 KB",
      date: "2026-08-25"
    },
    {
      id: "media-3",
      name: "Web Development Showcase",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      type: "image/jpeg",
      size: "180 KB",
      date: "2026-08-24"
    },
    {
      id: "media-4",
      name: "eBook Publishing Cover Art",
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      type: "image/jpeg",
      size: "210 KB",
      date: "2026-08-23"
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
    badge: "Creativity + Technology + AI + Growth",
    titleLine1: "One team for everything your",
    titleHighlight: "digital growth needs.",
    description: "Nexora Logics combines digital marketing, web and app development, game development, AI automation, content creation, branding and lead generation into one practical growth system.",
    primaryCtaText: "Get a Free Quote",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Services",
    secondaryCtaLink: "/services",
    heroImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  upworkContent: {
    heroBadge: "Upwork Outreach Management",
    heroTitle: "Stop wasting hours bidding.",
    heroHighlight: "Start closing more deals on Upwork.",
    heroDescription: "We manage your Upwork account end to end — from optimized proposals to booked meetings. You just focus on closing.",
    primaryCta: "Get a free profile audit",
    primaryCtaNote: "For existing profiles",
    secondaryCta: "Get a 3-month roadmap",
    secondaryCtaNote: "For new profiles",
    finalTitle: "Ready to unlock Upwork as your growth channel?",
    finalDescription: "Get started today with a free profile audit if you have an account, or a 3-month roadmap if you're just starting out.",
    finalCta: "Claim your free profile audit",
    faq: [
      { q: "Do you need access to my Upwork account?", a: "Yes. We work inside the account to optimize positioning, identify relevant jobs, prepare proposals, manage outreach and keep the pipeline organized. Access should always be provided using the safest method available to you." },
      { q: "Who is this service best for?", a: "Professionals, established freelancers and agencies that have a clear service offer and want a consistent Upwork acquisition system without spending hours every day on bidding." },
      { q: "Do you guarantee a fixed number of projects?", a: "No fixed number of closed projects can be guaranteed because results depend on profile strength, niche competitiveness, offer quality, response speed, Connects budget and sales closing ability." },
      { q: "Can you help a brand-new profile?", a: "Yes. New profiles typically need more foundation work first, so we focus on profile setup, positioning, portfolio readiness and a structured roadmap before scaling outreach." }
    ]
  },
  sectionsConfig: {
    stats: { enabled: true, title: "Key Metrics", order: 1 },
    about: { enabled: true, title: "About Us", order: 2 },
    services: { enabled: true, title: "Our Services", order: 3 },
    portfolio: { enabled: true, title: "Portfolio Showcase", order: 4 },
    whyUs: { enabled: true, title: "Why Choose Us", order: 5 },
    testimonials: { enabled: true, title: "Client Reviews", order: 6 },
    contact: { enabled: true, title: "Get In Touch", order: 7 }
  },
  stats: [
    { id: 1, number: "100+", label: "Projects Delivered" },
    { id: 2, number: "07", label: "Service Pillars" },
    { id: 3, number: "100%", label: "Client Satisfaction" },
    { id: 4, number: "Global", label: "Client Support" }
  ],
  about: {
    sectionLabel: "About Us",
    title: "Transforming ideas into digital success",
    subtitle: "We combine strategy, design, and technical mastery to build brands that stand out and scale.",
    paragraph1: "At Nexora Logics, we help businesses grow, connect with their audience, and build a powerful digital presence through complete digital marketing, development, automation and content solutions.",
    paragraph2: "Whether you're a startup building your brand or an established business ready to scale, we combine creativity, technology, AI and marketing expertise to deliver practical, result-driven solutions tailored to your goals.",
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
    subtitle: "Strategy, creative, development and automation under one roof — built around your business goals."
  },
  services: [
    {
      id: "svc-1", icon: "Share2", title: "Digital Marketing & Social Media",
      description: "Build awareness, engagement and demand with coordinated organic and paid social campaigns.",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
      features: ["Social media marketing", "Facebook & Instagram marketing", "Content calendars & community", "Brand growth strategy"]
    },
    {
      id: "svc-2", icon: "Megaphone", title: "Paid Advertising & Lead Generation",
      description: "Performance campaigns designed to generate qualified leads, sales and measurable growth.",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      features: ["Meta & Google campaigns", "Campaign management", "Retargeting", "Lead generation funnels"]
    },
    {
      id: "svc-3", icon: "Code", title: "Website & E-Commerce Development",
      description: "Fast, responsive websites and online stores designed around conversion and easy management.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: ["Custom websites", "WordPress", "WooCommerce", "Landing pages & optimization"]
    },
    {
      id: "svc-4", icon: "Smartphone", title: "Mobile App Development",
      description: "User-focused mobile products for customer experiences, internal workflows and scalable digital services.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      features: ["iOS & Android", "Cross-platform apps", "UI/UX", "API integrations"]
    },
    {
      id: "svc-5", icon: "Gamepad2", title: "Game Development",
      description: "Interactive 2D and 3D game experiences built for engagement, entertainment and branded activations.",
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      features: ["2D & 3D games", "Mobile games", "Prototype development", "Game UI & mechanics"]
    },
    {
      id: "svc-6", icon: "Cpu", title: "AI Automation & AI Solutions",
      description: "Automate repetitive work, connect business systems and add practical AI to your customer and team workflows.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      features: ["AI agents & assistants", "Workflow automation", "CRM integrations", "Custom AI-powered tools"]
    },
    {
      id: "svc-7", icon: "BookOpen", title: "Content, Branding & eBook Creation",
      description: "Create polished brand assets and long-form content that educate, build authority and support your campaigns.",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      features: ["Content creation", "Branding", "eBook writing & design", "Publishing support"]
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
