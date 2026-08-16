export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "saloonshyani",
    number: "01",
    name: "Saloon Shyani",
    category: "WEB APP · CUSTOM CRM · ONGOING",
    tagline: "Customized dashboard system for salon scheduling and operation records.",
    description: "A tailored business manager portal for Saloon Shyani, handling bookings, stylist schedules, and client treatment histories.",
    stack: ["React", "CSS3", "Node.js", "Express.js", "MySQL"],
    features: [
      "Stylist shift calendar mapping daily availability",
      "Client profile registry logging past styles and treatments",
      "Service category price calculators and invoice builders",
      "Direct dashboard overview of weekly service revenues"
    ],
    problem: "Saloon Shyani required a highly customized booking and registry dashboard aligned with their physical salon layouts and staff structures that standard booking systems couldn't accommodate.",
    solution: "Developing a custom Web UI using React for managing staff schedules, service rates, and client visits, backed by a Node.js REST API.",
    outcome: "Ongoing development; currently in internal client review and feedback loops.",
    githubUrl: "https://github.com/madhusith/Saloon-System",
    image: "/images/Saloon Shyani.png"
  },
  {
    id: "wishwin",
    number: "02",
    name: "Wishwin LMS",
    category: "EDTECH · LMS · ONGOING",
    tagline: "A gamified virtual learning management system for regional tuition students.",
    description: "An educational platform designed for live streaming, recorded classes, and automatic quizzes, customized with voice integration and AI-guided learning analysis.",
    stack: ["React", "Node.js", "Express", "MySQL", "PayHere", "OBS", "AI Assistance"],
    features: [
      "Live stream embedding with real-time class chats",
      "Automated payment processing with PayHere gateway integration",
      "Interactive Sinhala quizzes with voice feedback responses",
      "Gamified leaderboards and dynamic level systems",
      "AI weak-area analysis mapping topic performance for student study suggestions"
    ],
    problem: "Regional tutoring institutes lacked affordable, localized, and interactive software that offered both online stream distribution and quiz-based feedback in local languages (Sinhala).",
    solution: "A complete LMS portal featuring secure video players linked to live RTMP feeds, automatic PDF handout generators, dynamic quizzes with Web Audio API response logging, and an intelligent dashboard displaying individual progress metrics.",
    outcome: "Deployed successfully for over 1,500 active students, sustaining interactive virtual classrooms and reducing administration billing efforts by automating registration approvals.",
    image: "/images/LMS.png"
  },
  {
    id: "jarvis",
    number: "03",
    name: "Javis AI Assistant",
    category: "AI · COMPUTER VISION · HCI · HALF DONE",
    tagline: "Gesture-based desktop automation system using computer vision.",
    description: "A Python automation assistant tracking hand pose land-markers via MediaPipe to control computer systems hands-free.",
    stack: ["Python", "OpenCV", "MediaPipe", "macOS System Integration"],
    features: [
      "Real-time finger tracking coordinate calculations",
      "Pinch, drag, double-click, and media toggle triggers",
      "Sci-fi custom display canvas HUD indicators",
      "Gesture keyboard overlays for virtual typing input"
    ],
    problem: "Touchless computer controls often require complex depth cameras or exhibit excessive lag on standard device webcams.",
    solution: "Built a lightweight gesture tracking thread using MediaPipe pipeline, passing tracking results through dynamic smoothing equations to prevent jitter before firing OS signals.",
    outcome: "Currently half-completed. The basic mouse movement, cursor control, and gesture clicks are fully functional under minimal CPU overhead.",
    githubUrl: "https://github.com/madhusith/JAVIS_handGesture",
    image: "/images/JAVIS.png"
  },
  {
    id: "teafactory",
    number: "04",
    name: "IoT: Tea Factory Withering Automation",
    category: "IOT · INDUSTRIAL AUTOMATION · ONGOING",
    tagline: "Automation concept designed to optimize black tea leaf-withering.",
    description: "An industrial IoT monitoring and optimization concept utilizing sensor arrays and real-time environmental controls to manage moisture drying.",
    stack: ["ESP32 / ESP8266", "DHT22 Sensors", "Ambient Control Probes", "MQTT", "Node-RED"],
    features: [
      "Multi-point temperature and humidity leaf bed probes",
      "MQTT protocol data transport to dashboard coordinator",
      "Intelligent fan speed adjustment triggers based on humidity",
      "Historical drying stats storage for batch quality audits"
    ],
    problem: "Consistent quality in black tea processing requires strict temperature and humidity parameters during withering. Manual measurements led to ruined tea batches due to unnoticed fluctuations.",
    solution: "Designed a localized sensor grid using ESP32 nodes to feed real-time climate data to an automation controller that regulates ventilation.",
    outcome: "Ongoing concept design and planning; under active discussion to define hardware constraints and physical system integrations."
  },
  {
    id: "bookshoperp",
    number: "05",
    name: "BookShop ERP System",
    category: "ELECTRON · DESKTOP SOFTWARE · DATABASE",
    tagline: "Cross-platform desktop application for bookstore sales and catalog ERP.",
    description: "An enterprise POS and inventory catalog dashboard designed for book publishers, built using Electron, React, Node.js, and MySQL.",
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "Electron"],
    features: [
      "High-speed local catalog search indexing thousands of entries",
      "Interactive checkout POS supporting printable paper invoices",
      "Analytics dashboard rendering profit, sales, and categories charts",
      "Low-stock reorder thresholds with alert triggers"
    ],
    problem: "Bespoke retail booksellers manage huge catalogs that make standard web applications slow, particularly during high-volume offline periods.",
    solution: "Built an Electron desktop application wrapper hosting a React user interface connected to a local Node.js server. The application communicates with MySQL to guarantee low latencies.",
    outcome: "Delivered a standalone POS software running offline checkouts under 200ms and organizing over 12,000 active SKU items.",
    githubUrl: "https://github.com/madhusith/bookshop-erp-pro",
    image: "/images/ERP.jpeg"
  },
  {
    id: "vipluxurysaloon",
    number: "06",
    name: "The VIP Luxury Saloon Booking System",
    category: "WEB APPLICATION · SCHEDULING · SERVERLESS",
    tagline: "An elegant, real-time online reservation platform for salon clients.",
    description: "A client reservation web application utilizing HTML5, CSS3, Vanilla JS, and Firebase Realtime Database to automate stylist scheduling and services booking.",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "Firebase"],
    features: [
      "Real-time reservation calendar synchronized dynamically",
      "Auto-clash detection for beauticians and time slots",
      "Stylists profile dashboard and service menu calculators",
      "Responsive, elegant mobile-first booking interface"
    ],
    problem: "Manual phone reservations and spreadsheet bookings frequently created overlaps and schedule double-bookings, confusing coordinators and customers.",
    solution: "Created a responsive vanilla client connecting directly to Firebase. Read/write operations use database rules to enforce appointment constraints, locking slots instantly.",
    outcome: "Launched live at vip-luxury-saloon.web.app, successfully organizing customer bookings and eliminating schedule conflicts.",
    liveUrl: "https://vip-luxury-saloon.web.app/",
    image: "/images/VIP Saloon.png"
  },
  {
    id: "neuromatch",
    number: "07",
    name: "Neuro Match Game",
    category: "C++ · GAME DEVELOPMENT",
    tagline: "A classic memory and matching card game built natively in C++.",
    description: "A high-performance command-line based puzzle game designed to test cognitive matching and memory speed, written from scratch in C++.",
    stack: ["C++", "STL", "Console Graphics", "Data Structures"],
    features: [
      "Interactive grid size configuration",
      "Real-time flip and match calculations",
      "Latency and accuracy statistics logging",
      "Optimized standard output buffer management"
    ],
    problem: "Console games in C++ often suffer from poorly structured game loops, messy state updates, or bad visual spacing on different terminal widths.",
    solution: "Built a discrete State Machine controlling game states (Menu, Gameplay, Evaluation, Leaderboard) coupled with clear screen buffering and standard library containers (vector, map) for inventory management.",
    outcome: "Produced a lightweight, zero-dependency native command-line game that processes player matching actions and computes statistics with sub-millisecond latencies.",
    githubUrl: "https://github.com/madhusith/Neuro-Match",
    image: "/images/NUERO.jpeg"
  },
  {
    id: "clothingwarehouse",
    number: "08",
    name: "Clothing Warehouse Management System",
    category: "JAVA · DESKTOP SOFTWARE · DATABASE",
    tagline: "A desktop enterprise database application managing clothing stock and supplier records.",
    description: "A textile inventory management system built with Java Swing and MySQL, allowing multi-role stock tracking, automated ledger logs, and billing reports.",
    stack: ["Java", "Java Swing", "JDBC", "MySQL"],
    features: [
      "Textile material category indexing and fabric batch counts",
      "Supplier ledger and payment transaction records",
      "Optimized transaction triggers protecting concurrent reserves",
      "Automatic PDF ledger sheet generation"
    ],
    problem: "Textile warehouses require detailed fabric category and supplier ledger tracking, which standard generic software fails to represent without massive configuration.",
    solution: "Designed a custom Java Swing desktop frontend that runs queries via JDBC against a highly normalized MySQL database schema with transaction controls.",
    outcome: "Slashed shipment planning time, preventing double-allocations and digitizing inventory records across physical warehouse aisles.",
    githubUrl: "https://github.com/madhusith/Clothing-Warehouse-Management-",
    image: "/images/Clothing.jpeg"
  }
];
