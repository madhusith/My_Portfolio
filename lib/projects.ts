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
}

export const projects: Project[] = [
  {
    id: "valuflow",
    number: "01",
    name: "ValuFlow SL",
    category: "DIGITAL WORKFLOW · GOVERNMENT SYSTEM",
    tagline: "A task and workflow platform digitizing paper-based government valuation workflows.",
    description: "Built for the Department of Valuation in Sri Lanka to transition legacy paper operations to a modern web-based tracking and automated workflow assignment environment.",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Socket.IO", "Redis", "LangChain", "Azure OpenAI"],
    features: [
      "Role-based workflows with dynamic authorization levels",
      "Kanban boards for real-time task movement tracking",
      "Live status sync using Socket.IO",
      "AI-powered valuation file summarization",
      "Intelligent workflow scheduling assistance using OpenAI model integration"
    ],
    problem: "The legacy workflow relied entirely on moving paper files between regional appraisers, supervisors, and administrative officers. This resulted in delayed valuations, missing files, and complete lack of central progress visibility.",
    solution: "We designed a robust Web-based Workflow Management System with custom Kanban pipelines. Every physical file is assigned a digital twin with role-based routing, real-time Socket.IO notifications, and an AI summarization engine to instantly recap multi-page valuation arguments.",
    outcome: "Reduced evaluation turnaround time by 60%, completely eliminated missing file incidents, and provided regional management with real-time process bottlenecks dashboards."
  },
  {
    id: "wishwin",
    number: "02",
    name: "Wishwin LMS",
    category: "EDTECH · LMS",
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
    outcome: "Deployed successfully for over 1,500 active students, sustaining interactive virtual classrooms and reducing administration billing efforts by automating registration approvals."
  },
  {
    id: "jarvis",
    number: "03",
    name: "Jarvis AI Assistant",
    category: "AI · COMPUTER VISION · HCI",
    tagline: "Gesture-based human-computer interaction utilizing computer vision pipelines.",
    description: "A Python application allowing users to control desktop cursor, clicks, and media controls hands-free using computer vision gesture detection.",
    stack: ["Python", "OpenCV", "MediaPipe", "macOS System Integration"],
    features: [
      "High-precision hand landmark tracking via MediaPipe",
      "Pinch-to-click, double-click, and drag gesture triggers",
      "Virtual hand-pose keyboard overlays for touch-free writing",
      "Volume, media playback, and desktop navigation gestures",
      "Sci-fi inspired HUD graphics rendering active canvas boundaries"
    ],
    problem: "Standard touchless interfaces are either sluggish, require expensive specialized depth sensors, or fail to operate reliably in low-light environments using standard webcams.",
    solution: "We implemented an optimized computer vision pipeline. Using MediaPipe, hand landmarks are processed at 60 FPS, passing coordinates through custom mathematical thresholds to filter hand-shakes, mapping clicks and smooth scrolling directly to macOS native events.",
    outcome: "Built a fully functional touchless control interface that works on standard laptop webcams with less than 3% CPU overhead, proving useful for hygienic/clean-room computing environments."
  },
  {
    id: "smartbulb",
    number: "04",
    name: "Smart Bulb Holder",
    category: "IOT · SMART HOME",
    tagline: "Smart lightning node featuring presence detection and scheduling.",
    description: "An ESP32-based hardware project tracking occupant presence using millimeter-wave sensors to automate home light sockets.",
    stack: ["ESP32", "LD2410C mmWave Sensor", "MOSFET Control", "C++", "MQTT"],
    features: [
      "Millimeter-wave micro-motion sensing (detects breathing/still presence)",
      "Dynamic zone lighting maps and customizable schedules",
      "WiFi-based mobile application controls and MQTT sync",
      "Mosquito-repellent pulse frequency simulation control",
      "Multi-user device sharing with secure credentials validation"
    ],
    problem: "Standard PIR motion sensors only trigger on large movements, leaving users in the dark when they sit still (e.g. reading, working) unless they wave their hands periodically.",
    solution: "Built a custom IoT hardware node utilizing the LD2410C millimeter-wave radar sensor connected to an ESP32. By reading raw distance signal-to-noise ratios, the device maintains presence detection even when the occupant is completely motionless, driving power relays silently.",
    outcome: "Achieved zero-error light automation that stays active as long as a person is physically in the room, dropping standby electrical consumption by 18%."
  },
  {
    id: "teafactory",
    number: "05",
    name: "Tea Factory Automation",
    category: "INDUSTRIAL IOT · AUTOMATION",
    tagline: "Real-time industrial IoT monitoring system for black tea manufacturing.",
    description: "An industrial sensor array prototype tracking temperature, humidity, and leaf drying parameters during the tea oxidation and processing cycles.",
    stack: ["ESP8266", "DHT22 Sensors", "InfluxDB", "Grafana", "Node-RED"],
    features: [
      "Multi-point industrial humidity and ambient temperature probes",
      "Real-time Grafana dashboards mapping manufacturing zone statuses",
      "Automatic threshold alerts via Node-RED notifications",
      "Historical data warehousing for tea crop batch analysis"
    ],
    problem: "Consistent quality in black tea processing requires strict temperature and humidity parameters during withering and oxidation. Manual periodic measurements led to ruined tea batches due to unnoticed fluctuations.",
    solution: "Deployed a local mesh of sensor nodes reading withering trough parameters, feeding data over MQTT into a localized database. This feeds real-time monitors in the factory floor, ringing physical alarms if limits are crossed.",
    outcome: "Successfully prototyped an automated microclimate monitor that lowered batch failures by 90% in testing runs, preserving consistent tea leaf processing metrics."
  },
  {
    id: "tnbookstore",
    number: "06",
    name: "TN Book Store ERP",
    category: "DESKTOP SOFTWARE · ERP",
    tagline: "Cross-platform enterprise inventory and sales management system.",
    description: "An Electron-based desktop application managing high-throughput retail bookstore inventory, sales receipts, and analytics.",
    stack: ["Electron", "React", "Node.js", "MySQL", "Tailwind CSS"],
    features: [
      "Fast local inventory search indexing tens of thousands of books",
      "Point of Sale (POS) invoicing system with printable barcode support",
      "Daily/monthly profit graphs and sales dashboards",
      "Automated stock level warnings for reordering popular textbooks"
    ],
    problem: "Bookstores manage massive, multi-category inventory lists that make web-only software slow and dependent on active internet. Legacy desktop solutions were expensive and visually dated.",
    solution: "We packaged a React frontend inside an Electron application, directly linking to a local SQLite/MySQL engine. This guarantees high-speed searches, offline checkout operations, and automated periodic database backups.",
    outcome: "Delivered a lightweight POS software managing over 12,000 active SKU items, running offline checkouts in less than 200ms per transaction."
  },
  {
    id: "clothingwarehouse",
    number: "07",
    name: "Clothing Warehouse ERP",
    category: "JAVA · DATABASE · MANAGEMENT SYSTEM",
    tagline: "Relational database management application for textile warehousing.",
    description: "A desktop system written in Java utilizing relational databases to manage shipping, stocking, and textile vendor records.",
    stack: ["Java", "Java Swing", "JDBC", "MySQL"],
    features: [
      "Textile material category indexing and colorway stock counts",
      "Supplier ledger balances tracking and invoice associations",
      "Optimized SQL procedures managing stock reservation for shipments",
      "Pre-formatted PDF summary reporting for inventory counts"
    ],
    problem: "Textile warehouses require detailed breakdowns of fabric types, colors, dye batches, and suppliers. Basic general ERP systems were too generic and hard to configure.",
    solution: "Designed a tailored Java Swing client connecting via JDBC to an optimized MySQL schema. Set up database triggers to prevent double-booking of physical batches and automate reorder alerts directly to vendor records.",
    outcome: "Stabilized inventory allocation timelines, allowing the operations team to prepare supplier invoices and packing checklists in seconds."
  }
];
