/**
 * Centralized Portfolio Data & Configuration for Vishnukumar R
 * -----------------------------------------------------------
 * Contains all personal information, verified URLs, project data,
 * asset references, and service endpoints.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Vishnukumar R",
    firstName: "Vishnukumar",
    lastName: "R",
    title: "Aspiring Full Stack Developer",
    badge: "Open for Internships & Projects",
    tagline: "Still learning, still struggling, but never willing to give up",
    bio: "I am a B.E. Computer Science and Engineering student at RVS College of Engineering and Technology with a strong interest in Full Stack Development and Artificial Intelligence. I enjoy learning new technologies and applying them to solve real-world problems through projects and practical experience. I am continuously improving my technical and problem-solving skills while preparing for opportunities in the software industry.",
    email: "vishnunlp10th@gmail.com",
    phone: "9940123510",
    phoneFormatted: "+91 99401 23510",
    profileImage: "/assets/profile.jpg",
    resumePath: "/assets/resume.pdf"
  },

  socialLinks: {
    linkedin: {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vishnukumar-r-108539339",
      handle: "in/vishnukumar-r-108539339"
    },
    github: {
      name: "GitHub",
      url: "https://github.com/vishnukumar-r947",
      handle: "github.com/vishnukumar-r947"
    },
    leetcode: {
      name: "LeetCode",
      url: "https://leetcode.com/u/buddy_code/",
      handle: "leetcode.com/u/buddy_code/"
    }
  },

  aboutHighlights: [
    {
      icon: "degree",
      label: "Degree",
      value: "B.E. Computer Science & Engineering",
      subvalue: "RVS College of Engg. & Tech."
    },
    {
      icon: "academic",
      label: "Current Stage",
      value: "III Year • V Semester",
      subvalue: "Batch 2024 – 2028"
    },
    {
      icon: "role",
      label: "Career Focus",
      value: "Full Stack Developer",
      subvalue: "Modern Web & Backend"
    },
    {
      icon: "ai",
      label: "Special Interest",
      value: "Artificial Intelligence",
      subvalue: "Practical AI & Data Solutions"
    },
    {
      icon: "mindset",
      label: "Core Mindset",
      value: "Continuous Learner",
      subvalue: "Grit, Problem Solving & Growth"
    }
  ],

  education: {
    degree: "B.E. Computer Science and Engineering",
    institution: "RVS College of Engineering and Technology",
    currentYear: "III Year",
    currentSemester: "V Semester",
    duration: "2024 – 2028",
    cgpa: "8.7",
    cgpaScale: "10.0",
    highlights: [
      "Strong academic standing with an 8.7 CGPA",
      "Focused coursework on Data Structures, OOP, DBMS, and Web Technologies",
      "Active participation in campus tech initiatives and hands-on laboratory projects"
    ]
  },

  skills: [
    {
      category: "Programming",
      description: "Core languages used for problem solving and software logic",
      items: [
        { name: "C", level: "Practicing" },
        { name: "Java", level: "Practicing" },
        { name: "Python", level: "Practicing" }
      ]
    },
    {
      category: "Web Development",
      description: "Building responsive, modern, and interactive user interfaces",
      items: [
        { name: "HTML", level: "Working with" },
        { name: "CSS", level: "Working with" },
        { name: "JavaScript", level: "Working with" },
        { name: "React.js", level: "Learning & Building" }
      ]
    },
    {
      category: "Backend / Full Stack",
      description: "Server runtime, routing, and scalable web API architecture",
      items: [
        { name: "Node.js", level: "Practicing" },
        { name: "Express.js", level: "Practicing" },
        { name: "REST API concepts", level: "Applying" }
      ]
    },
    {
      category: "Database",
      description: "Relational data modeling, querying, and database architecture",
      items: [
        { name: "SQL", level: "Practicing" },
        { name: "MySQL", level: "Practicing" },
        { name: "DBMS", level: "Foundational" }
      ]
    },
    {
      category: "AI / Data",
      description: "Intelligent systems, data exploration, and analytics",
      items: [
        { name: "Artificial Intelligence", level: "Exploring & Applying" },
        { name: "Machine Learning fundamentals", level: "Learning" },
        { name: "Data Science fundamentals", level: "Learning" },
        { name: "Data Analysis", level: "Practicing" }
      ]
    },
    {
      category: "Development Tools",
      description: "Modern toolchain for version control, coding, and deployment",
      items: [
        { name: "Git", level: "Workflow" },
        { name: "GitHub", level: "Collaboration" },
        { name: "VS Code", level: "Primary IDE" },
        { name: "Netlify", level: "Web Hosting" }
      ]
    },
    {
      category: "Core Computer Science",
      description: "Fundamental principles governing computational efficiency & design",
      items: [
        { name: "Data Structures", level: "Core Coursework" },
        { name: "Object-Oriented Programming", level: "Core Coursework" },
        { name: "Database Management Systems", level: "Core Coursework" }
      ]
    }
  ],

  languages: [
    {
      name: "English",
      proficiency: "Fluent",
      desc: "Professional technical communication, presentations & documentation"
    },
    {
      name: "Tamil",
      proficiency: "Bilingual / Native",
      desc: "Native conversational fluency and interpersonal communication"
    },
    {
      name: "Japanese",
      proficiency: "Elementary",
      desc: "Foundational vocabulary, basic conversational grammar & script learning"
    }
  ],

  projects: [
    {
      id: "01",
      number: "01",
      title: "AI Sentinel",
      category: "AI + IoT + Predictive Maintenance + Worker Safety",
      highlight: "Affordable AI-based predictive machine failure and worker safety solution for MSMEs.",
      description: "AI Sentinel is an inexpensive platform that uses artificial intelligence and Internet of Things (IoT) technologies to support predictive maintenance and worker safety, specifically designed for small and medium-sized manufacturing businesses.",
      features: [
        "Predictive machine failure detection using sensor data analytics",
        "Real-time worker safety monitoring and workplace hazard alerts",
        "Cost-effective architecture tailored specifically for MSME constraints",
        "Centralized web dashboard for real-time plant telemetry"
      ],
      technologies: ["AI", "IoT", "ESP32", "Predictive Maintenance", "Machine Learning", "Web Dashboard"],
      type: "Hardware + Software System",
      hasDemo: false,
      hasGithub: false,
      demoUrl: null,
      githubUrl: null
    },
    {
      id: "02",
      number: "02",
      title: "UyirNila – AI-Powered Women’s Health Companion",
      category: "HealthTech • Web Application",
      highlight: "Rule-based AI companion designed to track, analyze, and support women's health patterns.",
      description: "Designed the application to track and analyze women’s health patterns. Developed a rule-based AI system to provide personalized recommendations based on user inputs.",
      features: [
        "Cycle tracking and menstrual wellness pattern analysis",
        "Mood analysis based on daily logging and symptom checkpoints",
        "AI-based health suggestions tailored to personal cycle phases",
        "Rule-based AI system delivering customized, actionable wellness recommendations",
        "Lightweight, accessible web application deployed on Netlify"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "AI", "Web Application", "Netlify"],
      type: "Web Application",
      hasDemo: true,
      hasGithub: false,
      demoUrl: "https://uyirnila.netlify.app/",
      githubUrl: null
    },
    {
      id: "03",
      number: "03",
      title: "NeuroAI",
      subtitle: "AI-based System for Early Neurological Risk Prediction using OS-level Typing Analytics",
      category: "Healthcare AI • Research Project",
      highlight: "Published Research: Early neurological risk prediction via non-invasive OS-level keystroke telemetry.",
      description: "An AI-based system designed for early neurological risk prediction using OS-level typing analytics.",
      features: [
        "Non-invasive OS-level keystroke dynamics and rhythm capture",
        "Machine learning models trained to detect micro-deviations in typing cadences",
        "Early stage risk indicators for motor and neurological impairment",
        "Peer-reviewed academic research published in conference proceedings"
      ],
      technologies: ["Artificial Intelligence", "Machine Learning", "Typing Analytics", "Predictive Analytics"],
      type: "Published Research Project",
      isPublished: true,
      publicationBadge: "Published Research",
      publicationDetails: {
        conference: "NCRCTIT’26 Conference Proceedings",
        venue: "RVS Technical Campus, Coimbatore",
        date: "March 12, 2026",
        isbn: "978-81-999288-7-9"
      },
      hasDemo: false,
      hasGithub: false,
      demoUrl: null,
      githubUrl: null
    }
  ],

  experience: [
    {
      company: "SkillSync",
      role: "Data Science Intern",
      type: "Internship",
      description: "Created a dashboard using Data Science-related concepts and practical data analysis work.",
      keyContributions: [
        "Applied practical Data Science techniques to process and analyze dataset patterns",
        "Engineered an interactive dashboard for clear visual representation of insights",
        "Gained hands-on exposure to real-world data pipelines and analysis workflows"
      ],
      technologies: ["Data Science", "Data Analysis", "Dashboard", "Python"]
    }
  ],

  publication: {
    title: "NeuroAI – AI-based System for Early Neurological Risk Prediction using OS-level Typing Analytics",
    paperName: "NeuroAI",
    status: "Published",
    conference: "NCRCTIT’26 Conference Proceedings",
    venue: "RVS Technical Campus, Coimbatore",
    date: "March 12, 2026",
    isbn: "978-81-999288-7-9",
    summary: "A peer-reviewed research contribution presenting an AI-driven framework for early neurological risk prediction through non-intrusive operating system keystroke dynamic analytics."
  },

  hackathonsAndActivities: {
    title: "Hackathons & Innovation Activities",
    description: "Actively participating in collaborative hackathons, competitive problem-solving sessions, and practical technology challenges to build impactful solutions under fast-paced environments.",
    focusAreas: [
      { name: "Artificial Intelligence", desc: "Building practical machine learning models and intelligent pipelines" },
      { name: "Full Stack Development", desc: "Developing end-to-end responsive web applications" },
      { name: "IoT & Hardware Interfacing", desc: "Connecting smart sensors with cloud-based dashboards" },
      { name: "Data Science & Analytics", desc: "Extracting actionable insights from complex datasets" },
      { name: "Problem Solving", desc: "Algorithmic thinking and efficient software architecture" },
      { name: "Practical Innovation", desc: "Tackling real-world challenges for industry and society" }
    ]
  },

  // Contact Service Configuration (Formspree / EmailJS)
  contactService: {
    provider: "formspree", // Options: "formspree" | "emailjs"
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Easily update with your Formspree endpoint when ready
    emailjs: {
      publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
      serviceId: "YOUR_SERVICE_ID",
      templateId: "YOUR_TEMPLATE_ID"
    }
  }
};

// Global export
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
