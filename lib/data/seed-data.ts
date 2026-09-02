import {
  Profile,
  Experience,
  Education,
  Project,
  Skill,
  Certification,
} from "@/types/portfolio";

export const initialProfile: Profile = {
  id: "profile-main",
  name: "Raihan Syeka Pramukastie",
  tagline_id: "Backend Developer | Full-Stack Engineer | Peminat UI/UX",
  tagline_en: "Backend Developer | Full-Stack Engineer | UI/UX Enthusiast",
  bio_short_id:
    "Software engineer dengan fondasi kuat di Computer Science dan fokus pada Backend Development, berpengalaman membangun aplikasi web dan RESTful services dengan Node.js, Laravel, dan Django.",
  bio_short_en:
    "Software engineer with a strong foundation in Computer Science and a focused passion for Backend Development, experienced in building web applications and RESTful services with Node.js, Laravel, and Django.",
  bio_long_id: `Saya adalah seorang Backend Developer dengan latar belakang pendidikan Computer Science Education dari Universitas Pendidikan Indonesia. Sepanjang perjalanan rekayasa perangkat lunak saya, saya memfokuskan diri pada perancangan arsitektur backend yang tangguh, scalable, dan efisien menggunakan Node.js, Laravel, dan Django REST Framework.

Selain keahlian teknis di sisi server, database relasional, dan optimasi API, saya memiliki apresiasi mendalam terhadap pengalaman pengguna (UI/UX). Sensitivitas desain ini memungkinkan saya menjembatani celah antara kebutuhan arsitektur sistem yang kompleks dengan antarmuka yang intuitif dan mudah digunakan bagi pengguna akhir.`,
  bio_long_en: `I am a Backend Developer with a Computer Science Education background from Universitas Pendidikan Indonesia. Throughout my software engineering journey, I have focused on designing robust, scalable, and efficient backend architectures utilizing Node.js, Laravel, and Django REST Framework.

Beyond server-side engineering, relational database schemas, and API optimizations, I maintain a strong sensitivity toward UI/UX design. This cross-disciplinary approach enables me to bridge the gap between complex system architectures and intuitive, seamless user interfaces for end users.`,
  photo_hero_url: "/images/hero/profile.jpg",
  photo_about_url: "/images/about/profile-about.jpg",
  email: "rehaansekap@gmail.com",
  phone: "+6285155167735",
  show_phone: false,
  location: "Lembang, Kabupaten Bandung Barat, Jawa Barat, Indonesia",
  linkedin_url: "https://www.linkedin.com/in/rehansekap/",
  linktree_url: "https://linktr.ee/rehaansekap",
  cv_file_url: "/cv/CV_Raihan_Syeka_Pramukastie.pdf",
};

export const initialExperiences: Experience[] = [
  {
    id: "exp-1",
    type: "work",
    title: "Backend Developer Internship",
    organization: "PT Oxioo Technology Indonesia",
    location: "Malang, Indonesia",
    start_date: "2026-03",
    end_date: "2026-06",
    description_id: [
      "Membangun RESTful API yang scalable menggunakan Laravel",
      "Merancang dan mengoptimasi skema database relasional",
      "Menyusun dokumentasi API komprehensif menggunakan Swagger",
    ],
    description_en: [
      "Engineered scalable RESTful API endpoints using Laravel",
      "Designed and optimized relational database schemas",
      "Authored comprehensive API documentation using Swagger",
    ],
    category_tags: ["Backend", "Laravel", "PostgreSQL", "Swagger"],
    attachments: [
      {
        title: "Surat Keterangan Magang Oxioo.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        title: "Laporan Capaian Kerja.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    media_urls: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    ],
    is_highlighted: true,
    order: 1,
  },
  {
    id: "exp-2",
    type: "work",
    title: "UI/UX Designer",
    organization: "PT Makers Institute",
    location: "Bandung, Indonesia",
    start_date: "2024-11",
    end_date: "2024-12",
    description_id: [
      "Desain UI/UX, wireframe, dan prototype interaktif untuk NEXTActions, TReats Buyer & Mitra",
    ],
    description_en: [
      "UI/UX design, wireframe, and interactive prototypes for NEXTActions, TReats Buyer & Mitra",
    ],
    category_tags: ["UI/UX", "Figma", "Prototyping"],
    attachments: [
      {
        title: "Sertifikat Magang UI-UX.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    media_urls: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    ],
    is_highlighted: true,
    order: 2,
  },
  {
    id: "exp-3",
    type: "work",
    title: "UI/UX Designer & Engineer Internship",
    organization: "PT Widata Intelligent Solution",
    location: "Bandung, Indonesia",
    start_date: "2023-10",
    end_date: "2024-06",
    description_id: [
      "Mengembangkan RumahPendidik — platform pembelajaran berbasis pertanyaan",
      "Merancang sistem UI/UX, wireframe, dan prototipe untuk RumahPendidik",
    ],
    description_en: [
      "Developed RumahPendidik — a question-based learning platform",
      "Designed UI/UX, wireframes, and prototypes for RumahPendidik",
    ],
    category_tags: ["UI/UX", "Full-Stack", "Laravel", "MySQL"],
    is_highlighted: true,
    order: 3,
  },
  {
    id: "exp-4",
    type: "teaching",
    title: "Teacher",
    organization: "SMK Pasundan 1 Bandung",
    location: "Bandung, Indonesia",
    start_date: "2024-02",
    end_date: "2024-06",
    description_id: [
      "Merancang materi kelas 12 tentang dynamic routing, bandwidth management, firewall, dan VLAN",
      "Mengajar sesi praktik jaringan di lab komputer",
      "Menyusun alat evaluasi dan penilaian siswa",
    ],
    description_en: [
      "Designed 12th-grade curriculum on dynamic routing, bandwidth management, firewall, and VLAN",
      "Taught hands-on networking sessions in the computer lab",
      "Developed assessment tools and graded student outcomes",
    ],
    category_tags: ["Teaching", "Networking", "MikroTik"],
    is_highlighted: false,
    order: 4,
  },
  {
    id: "exp-5",
    type: "teaching",
    title: "Database Practicum Assistant",
    organization: "Computer Science Education UPI",
    location: "Bandung, Indonesia",
    start_date: "2023-09",
    end_date: "2024-01",
    description_id: [
      "Mengajar mata kuliah database relasional untuk 40 mahasiswa",
      "Membimbing project simulasi sistem ticket booking",
    ],
    description_en: [
      "Taught relational database courses to 40 students",
      "Guided a ticket-booking system simulation project",
    ],
    category_tags: ["Teaching", "Database", "MySQL"],
    is_highlighted: false,
    order: 5,
  },
  {
    id: "exp-6",
    type: "work",
    title: "Vocational School Student Internship",
    organization: "ICT Research Center, Institut Teknologi Bandung",
    location: "Bandung, Indonesia",
    start_date: "2020-07",
    end_date: "2020-09",
    description_id: [
      "Pengembangan front-end untuk website online course",
      "Konfigurasi IoT-based GPS tracker",
    ],
    description_en: [
      "Front-end development for an online course website",
      "Configured an IoT-based GPS tracker",
    ],
    category_tags: ["Frontend", "IoT"],
    is_highlighted: false,
    order: 6,
  },
  {
    id: "exp-7",
    type: "organization",
    title: "Member — Front-End Developer Student",
    organization: "Google Developer Student Club UPI",
    location: "Bandung, Indonesia",
    start_date: "2021-10",
    end_date: "2025-10",
    description_id: [
      "Workshop, training, dan hackathon bersama komunitas developer global",
    ],
    description_en: [
      "Workshops, training, and hackathons with a global developer community",
    ],
    category_tags: ["Community", "Frontend"],
    attachments: [
      {
        title: "Sertifikat Anggota GDSC UPI.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    media_urls: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    ],
    is_highlighted: false,
    order: 7,
  },
  {
    id: "exp-8",
    type: "organization",
    title: "Member",
    organization: "Bandung Coders",
    location: "Bandung, Indonesia",
    start_date: "2022-08",
    end_date: null,
    description_id: ["Panitia penyelenggara Bandung Coders Bootcamp Batch 2"],
    description_en: ["Organizing committee for Bandung Coders Bootcamp Batch 2"],
    category_tags: ["Community", "Event"],
    is_highlighted: false,
    order: 8,
  },
  {
    id: "exp-9",
    type: "organization",
    title: "Manager Marketing",
    organization: "Generasi Baru Indonesia (GenBI) UPI",
    location: "Bandung, Indonesia",
    start_date: "2024-10",
    end_date: "2025-08",
    description_id: [
      "Optimasi & ekspansi platform media sosial (Instagram, TikTok, website GenBI UPI)",
      "Mengelola website GenBI UPI",
      "Training desain grafis dan copywriting",
    ],
    description_en: [
      "Optimized and expanded social media platforms (Instagram, TikTok, GenBI UPI website)",
      "Managed the GenBI UPI website",
      "Delivered graphic design and copywriting training",
    ],
    category_tags: ["Marketing", "Leadership", "Next.js"],
    attachments: [
      {
        title: "SK Kepengurusan GenBI UPI.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    media_urls: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    ],
    is_highlighted: false,
    order: 9,
  },
];

export const initialEducations: Education[] = [
  {
    id: "edu-1",
    institution: "Universitas Pendidikan Indonesia",
    degree: "Bachelor of Computer Science Education",
    field: "Faculty of Mathematics and Natural Science Education",
    location: "Bandung, Indonesia",
    start_date: "2021-09",
    end_date: "2025-08",
    gpa: "3.77/4.00",
    description_id: [
      "Juara 3 UI/UX DIMASTI-AMLI 2023",
      "Peserta Gemastik 2023 — divisi Cyber Security",
      "Peserta Compfest 16 — divisi Cyber Security",
      "Peserta LIDM 2024 — divisi Microteaching",
      "Peserta HOLOGY 7.0 — divisi UX Designer",
    ],
    description_en: [
      "3rd Champion UI/UX DIMASTI-AMLI 2023",
      "Participant of Gemastik 2023 — Cyber Security division",
      "Participant of Compfest 16 — Cyber Security division",
      "Participant of LIDM 2024 — Microteaching division",
      "Participant of HOLOGY 7.0 — UX Designer division",
    ],
    attachments: [
      {
        title: "Transkrip Nilai Akademik UPI.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        title: "Surat Keterangan Mahasiswa Aktif.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    media_urls: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    ],
    order: 1,
  },
  {
    id: "edu-2",
    institution: "CodePolitan",
    degree: "Certificate",
    field: "Full Stack Web Development (MERN Stack)",
    location: "Online",
    start_date: null,
    end_date: null,
    gpa: null,
    description_id: [
      "Pengembangan frontend modern dengan ReactJS & Tailwind CSS",
      "Backend engineering dengan Node.js, Express.js",
      "Manajemen database: MongoDB & MySQL",
    ],
    description_en: [
      "Modern frontend development with ReactJS & Tailwind CSS",
      "Backend engineering with Node.js, Express.js",
      "Database management: MongoDB & MySQL",
    ],
    attachments: [
      {
        title: "Sertifikat Kelulusan Bootcamp.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    order: 2,
  },
  {
    id: "edu-3",
    institution: "Bandung Coders Bootcamp Batch 1",
    degree: "Certificate",
    field: "Fullstack JavaScript Developer",
    location: "Bandung, Indonesia",
    start_date: "2021-11",
    end_date: "2022-04",
    gpa: null,
    description_id: [
      "Framework Node.js",
      "Perancangan database relasional",
      "Framework Express.js",
    ],
    description_en: [
      "Node.js framework",
      "Relational database design",
      "Express.js framework",
    ],
    order: 3,
  },
  {
    id: "edu-4",
    institution: "Dicoding — Cloud Practitioner Essentials",
    degree: "Certificate",
    field: "AWS Cloud Fundamentals",
    location: "Online",
    start_date: "2021-09",
    end_date: "2021-12",
    gpa: null,
    description_id: [
      "Layanan compute inti AWS (EC2, ELB)",
      "Storage & database (S3, DynamoDB)",
      "AWS Well-Architected Framework",
    ],
    description_en: [
      "AWS core compute (EC2, ELB)",
      "Storage & database (S3, DynamoDB)",
      "AWS Well-Architected Framework",
    ],
    order: 4,
  },
  {
    id: "edu-5",
    institution: "Pakuan Lembang Vocational School",
    degree: "High School Diploma",
    field: "Computer and Network Engineering",
    location: "Bandung Barat, Indonesia",
    start_date: "2018-07",
    end_date: "2021-07",
    gpa: null,
    description_id: [
      "Perancangan topologi jaringan komputer",
      "Konfigurasi jaringan",
    ],
    description_en: [
      "Computer network topology design",
      "Network configuration",
    ],
    order: 5,
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "qr-verification",
    title: "QR Verification System",
    cover_image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    gallery_images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Sistem web end-to-end untuk membuat, mengelola, dan memverifikasi QR code dengan dashboard analitik.",
    short_description_en:
      "End-to-end web system for creating, managing, and verifying QR codes with an analytics dashboard.",
    problem_id:
      "Institusi menghadapi tantangan pemalsuan dokumen fisik dan lambatnya validasi sertifikat manual yang memakan waktu lama serta rawan manipulasi.",
    problem_en:
      "Institutions face challenges with physical document forgery and slow manual certificate verification processes that are prone to manipulation.",
    contribution_id:
      "Merancang skema relasional di Supabase PostgreSQL, membangun RESTful API dengan Express.js dan JWT authentication, serta mengintegrasikan modul pemindai barcode/QR ZXing dan state management Zustand di frontend React.",
    contribution_en:
      "Architected relational schemas on Supabase PostgreSQL, engineered high-throughput RESTful APIs with Express.js and JWT authentication, and integrated ZXing QR scanning with Zustand state management on React.",
    outcome_id:
      "Memangkas waktu verifikasi dokumen dari hitungan menit menjadi di bawah 2 detik dengan tingkat akurasi 100% dan dashboard monitoring real-time.",
    outcome_en:
      "Reduced document verification time from minutes to under 2 seconds with 100% accuracy and real-time validation tracking.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: [
      "React",
      "Vite",
      "Tailwind",
      "Zustand",
      "Express.js",
      "Supabase",
      "JWT",
      "ZXing",
    ],
    live_url: null,
    repo_url: null,
    start_date: "2025-01",
    end_date: "2025-12",
    is_featured: true,
    order: 1,
  },
  {
    id: "proj-2",
    slug: "pramlearn",
    title: "PramLearn",
    cover_image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Platform pembelajaran kolaboratif untuk mengelola kelas, kuis, dan aktivitas kelompok dengan real-time collaboration.",
    short_description_en:
      "Collaborative learning platform for managing classes, quizzes, and group activities with real-time collaboration.",
    problem_id:
      "Pembagian kelompok belajar dan analisis pemahaman siswa dalam kelas digital sering kali tidak merata dan kurang adaptif terhadap tingkat kemampuan masing-masing siswa.",
    problem_en:
      "Grouping students and analyzing collective understanding in digital classrooms is often uneven and lacks adaptation to individual skill levels.",
    contribution_id:
      "Mengembangkan backend service menggunakan Django REST Framework, mengintegrasikan algoritma KMeans Clustering untuk pembentukan kelompok adaptif, dan menghubungkan API ke antarmuka React.js.",
    contribution_en:
      "Engineered backend microservices using Django REST Framework, integrated KMeans Clustering algorithm for automated adaptive study grouping, and hooked APIs into an interactive React.js client.",
    outcome_id:
      "Meningkatkan engagement kelas digital dengan sistem pengelompokan berbasis kecerdasan komputasi dan manajemen kuis terpusat.",
    outcome_en:
      "Boosted classroom engagement through algorithmic grouping and centralized quiz progress tracking.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["Django REST Framework", "React.js", "KMeans Clustering", "Python"],
    live_url: null,
    repo_url: null,
    start_date: "2025-01",
    end_date: "2025-12",
    is_featured: true,
    order: 2,
  },
  {
    id: "proj-3",
    slug: "dlilearn",
    title: "DliLearn",
    cover_image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Platform pembelajaran berbasis project dengan workspace kolaboratif real-time dan native C++ code runner.",
    short_description_en:
      "Project-based learning platform with real-time collaborative workspaces and a native C++ code runner.",
    problem_id:
      "Siswa membutuhkan lingkungan eksekusi kode C++ langsung di peramban tanpa harus menginstall compiler lokal yang kompleks di mesin masing-masing.",
    problem_en:
      "Students require direct in-browser C++ execution environments without dealing with complex local compiler installations.",
    contribution_id:
      "Mengimplementasikan arsitektur Laravel + Inertia.js + React, merancang backend execution worker untuk sandbox kompilasi C++, serta mengintegrasikan editor berbasis web.",
    contribution_en:
      "Architected a Laravel + Inertia.js + React stack, engineered sandboxed C++ compiler backend workers, and integrated a web code editor.",
    outcome_id:
      "Memungkinkan ratusan mahasiswa mengeksekusi dan menguji kode pemrograman algoritma secara instan dengan isolasi aman.",
    outcome_en:
      "Enabled hundreds of students to compile and test algorithm assignments seamlessly with sandboxed security.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["Laravel", "React", "Inertia.js", "Vite", "Tailwind CSS", "C++ Runner"],
    live_url: null,
    repo_url: null,
    start_date: "2026-01",
    end_date: "2026-06",
    is_featured: true,
    order: 3,
  },
  {
    id: "proj-4",
    slug: "hallogic",
    title: "HalLogic",
    cover_image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "E-learning platform berbasis fase (Orientation, Investigation, Evaluation) dengan native C code runner.",
    short_description_en:
      "Phase-based e-learning platform (Orientation, Investigation, Evaluation) with a native C code runner.",
    problem_id:
      "Pembelajaran logika dan pemrograman membutuhkan tahapan kognitif terstruktur agar mahasiswa tidak melompat langsung ke sintaks tanpa memahami pemecahan masalah.",
    problem_en:
      "Teaching logic programming requires structured pedagogical phases so students master problem-solving paradigms before syntax.",
    contribution_id:
      "Membangun modul autentikasi dengan Laravel Fortify, membangun alur pembelajaran bertahap (Orientation -> Investigation -> Evaluation), serta mengeksekusi runner bahasa C.",
    contribution_en:
      "Engineered secure authentication workflows with Laravel Fortify, built multi-phase learning state pipelines, and linked a native C execution engine.",
    outcome_id:
      "Meningkatkan retensi pemahaman mahasiswa pada praktikum pemrograman dasar dengan evaluasi kode otomatis.",
    outcome_en:
      "Improved student retention in introductory computer science through automated code evaluation.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["Laravel", "Fortify", "React", "Inertia.js", "Vite", "Tailwind CSS"],
    live_url: null,
    repo_url: null,
    start_date: "2026-01",
    end_date: "2026-06",
    is_featured: false,
    order: 4,
  },
  {
    id: "proj-5",
    slug: "edugrow",
    title: "EduGrow",
    cover_image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Platform manajemen pendidikan berbasis role untuk kelas, jadwal, progres belajar, dan pembayaran.",
    short_description_en:
      "Role-based education management platform for classes, schedules, learning progress, and payments.",
    problem_id:
      "Lembaga bimbingan belajar kesulitan mengintegrasikan jadwal pengajar, absensi murid, rekapitulasi nilai, dan verifikasi biaya kursus dalam satu pintu.",
    problem_en:
      "Educational institutions struggle to unify tutor schedules, student attendance, grade records, and billing status under a single portal.",
    contribution_id:
      "Mengembangkan REST API berbasis Laravel dan arsitektur frontend dengan Nuxt.js/Vite, merancang sistem Role-Based Access Control (RBAC) multi-level.",
    contribution_en:
      "Engineered Laravel REST APIs and Nuxt.js frontend architectures with fine-grained multi-level Role-Based Access Control (RBAC).",
    outcome_id:
      "Otomatisasi pencatatan jadwal dan laporan progres belajar siswa yang dapat dipantau oleh orang tua secara transparan.",
    outcome_en:
      "Automated tutoring scheduling and enabled transparent progress tracking for parents and students.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["Laravel", "Nuxt.js", "Vite", "Tailwind CSS", "MySQL"],
    live_url: null,
    repo_url: null,
    start_date: "2026-01",
    end_date: "2026-06",
    is_featured: false,
    order: 5,
  },
  {
    id: "proj-6",
    slug: "rumahpendidik",
    title: "RumahPendidik",
    cover_image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Platform pembelajaran berbasis pertanyaan — siswa sebagai penjawab, guru sebagai pembuat soal.",
    short_description_en:
      "Question-based learning platform — students answer, teachers create questions.",
    problem_id:
      "Bank soal ujian yang terfragmentasi menyulitkan guru dalam membuat asesmen terstandar dan mengukur performa siswa secara analitis.",
    problem_en:
      "Fragmented question banks make it difficult for teachers to formulate standardized assessments and gather analytical performance insights.",
    contribution_id:
      "Merancang skema database MySQL untuk penyimpanan relasional bank soal berbobot, mengimplementasikan logika kuis dinamis dan penilaian otomatis.",
    contribution_en:
      "Designed MySQL relational schemas for weighted question banks, implemented dynamic quiz pipelines, and automated grading calculations.",
    outcome_id:
      "Platform sukses digunakan dalam skala sekolah untuk mengotomatisasi evaluasi ribuan butir soal latihan ujian.",
    outcome_en:
      "Successfully deployed across school classrooms to automate evaluation for thousands of exercise items.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["Laravel", "MySQL", "Blade", "Bootstrap"],
    live_url: null,
    repo_url: null,
    start_date: "2023-01",
    end_date: "2023-12",
    is_featured: false,
    order: 6,
  },
  {
    id: "proj-7",
    slug: "genbiupi",
    title: "genbiupi.com",
    cover_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Website informasi program GenBI UPI dan beasiswa Bank Indonesia.",
    short_description_en:
      "Information website for the GenBI UPI program and Bank Indonesia scholarships.",
    problem_id:
      "Pusat informasi kegiatan komunitas beasiswa Bank Indonesia di UPI membutuhkan portal terpadu untuk publikasi agenda, artikel, dan syarat beasiswa.",
    problem_en:
      "Bank Indonesia scholarship community at UPI needed a unified digital presence to publish agendas, articles, and scholarship requirements.",
    contribution_id:
      "Membangun frontend website berkecepatan tinggi menggunakan Next.js dengan optimasi SEO dan layout responsif.",
    contribution_en:
      "Built a high-performance frontend with Next.js featuring SEO optimization and responsive cross-device layouts.",
    outcome_id:
      "Portal berhasil menarik ribuan calon pendaftar beasiswa dan meningkatkan kredibilitas publikasi komunitas.",
    outcome_en:
      "The portal attracted thousands of scholarship applicants and enhanced community outreach credibility.",
    role: "Frontend Developer",
    category: "fullstack",
    tech_stack: ["Next.js", "React", "CSS Modules"],
    live_url: "https://genbiupi.com",
    repo_url: null,
    start_date: "2024-01",
    end_date: "2024-12",
    is_featured: false,
    order: 7,
  },
  {
    id: "proj-8",
    slug: "nextactions",
    title: "NEXTActions",
    cover_image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Sistem kontrol dan monitoring perangkat IoT lewat web dashboard.",
    short_description_en:
      "IoT device control and monitoring system via a web dashboard.",
    problem_id:
      "Pemantauan status perangkat IoT secara remote membutuhkan latensi rendah dan visualisasi telemetry yang mudah dipahami.",
    problem_en:
      "Remote monitoring of IoT telemetry data requires low latency and intuitive dashboard telemetry visualization.",
    contribution_id:
      "Merancang antarmuka dashboard kontrol real-time, mengintegrasikan websocket / REST telemetry endpoints.",
    contribution_en:
      "Designed real-time control dashboards and integrated telemetry endpoints for live sensor feedback.",
    outcome_id:
      "Memudahkan operator mengontrol aktuator dan memantau sensor dari peramban secara real-time.",
    outcome_en:
      "Enabled operators to control actuators and monitor sensors with real-time browser feedback.",
    role: "Full-Stack Developer",
    category: "fullstack",
    tech_stack: ["IoT", "Web Dashboard", "JavaScript", "REST API"],
    live_url: null,
    repo_url: null,
    start_date: "2024-01",
    end_date: "2024-12",
    is_featured: false,
    order: 8,
  },
  {
    id: "proj-9",
    slug: "treats-mitra",
    title: "TReats Mitra",
    cover_image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Aplikasi mobile untuk restoran mengelola permintaan reservasi dari pelanggan TReats Buyer.",
    short_description_en:
      "Mobile app for restaurants to manage reservation requests from TReats Buyer customers.",
    problem_id:
      "Restoran sering kehilangan reservasi pelanggan karena pencatatan manual dan ketiadaan konfirmasi slot meja otomatis.",
    problem_en:
      "Restaurants lose bookings due to manual logbooks and the absence of immediate automated table slot confirmations.",
    contribution_id:
      "Merancang UI/UX alur operasional reservasi restoran dan mengimplementasikan state flow konfirmasi reservasi cepat.",
    contribution_en:
      "Designed UI/UX reservation operational workflows and engineered quick-approval reservation state transitions.",
    outcome_id:
      "Mengurangi konflik jadwal meja dan mempercepat respon restoran kepada pelanggan hingga 50%.",
    outcome_en:
      "Eliminated table booking conflicts and boosted merchant response rate by 50%.",
    role: "Full-Stack Developer",
    category: "mobile",
    tech_stack: ["Mobile", "Figma", "REST API"],
    live_url: null,
    repo_url: null,
    start_date: "2024-01",
    end_date: "2024-12",
    is_featured: false,
    order: 9,
  },
  {
    id: "proj-10",
    slug: "treats-buyer",
    title: "TReats Buyer",
    cover_image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    ],
    short_description_id:
      "Aplikasi mobile untuk reservasi restoran dan pemesanan makanan.",
    short_description_en:
      "Mobile app for restaurant reservations and food ordering.",
    problem_id:
      "Pelanggan kesulitan menemukan ketersediaan meja dan memesan menu sebelum tiba di restoran pada jam sibuk.",
    problem_en:
      "Customers struggle to verify seat availability and pre-order menus prior to arriving during peak hours.",
    contribution_id:
      "Merancang antarmuka pemesanan menu yang mudah digunakan, alur checkout, dan sistem pemilihan slot reservasi.",
    contribution_en:
      "Crafted intuitive menu ordering interfaces, seamless checkout flows, and slot reservation selectors.",
    outcome_id:
      "Menyajikan pengalaman reservasi kuliner digital yang mulus bagi pengguna dengan antarmuka yang bersih.",
    outcome_en:
      "Delivered a seamless digital dining reservation experience with a clean, high-conversion mobile UI.",
    role: "Full-Stack Developer",
    category: "mobile",
    tech_stack: ["Mobile", "Figma", "UI/UX", "REST API"],
    live_url: null,
    repo_url: null,
    start_date: "2024-01",
    end_date: "2024-12",
    is_featured: false,
    order: 10,
  },
];

export const initialSkills: Skill[] = [
  // language
  { id: "sk-1", name: "JavaScript (ES6+)", category: "language", order: 1 },
  { id: "sk-2", name: "TypeScript", category: "language", order: 2 },
  { id: "sk-3", name: "PHP", category: "language", order: 3 },
  { id: "sk-4", name: "Python", category: "language", order: 4 },
  { id: "sk-5", name: "C++", category: "language", order: 5 },
  // backend
  { id: "sk-6", name: "Node.js", category: "backend", order: 6 },
  { id: "sk-7", name: "Express.js", category: "backend", order: 7 },
  { id: "sk-8", name: "Laravel", category: "backend", order: 8 },
  { id: "sk-9", name: "Django REST Framework", category: "backend", order: 9 },
  { id: "sk-10", name: "RESTful API Design", category: "backend", order: 10 },
  { id: "sk-11", name: "JWT Authentication", category: "backend", order: 11 },
  // frontend
  { id: "sk-12", name: "ReactJS", category: "frontend", order: 12 },
  { id: "sk-13", name: "Next.js", category: "frontend", order: 13 },
  { id: "sk-14", name: "Nuxt.js", category: "frontend", order: 14 },
  { id: "sk-15", name: "Inertia.js", category: "frontend", order: 15 },
  { id: "sk-16", name: "Tailwind CSS", category: "frontend", order: 16 },
  // database
  { id: "sk-17", name: "PostgreSQL", category: "database", order: 17 },
  { id: "sk-18", name: "Supabase", category: "database", order: 18 },
  { id: "sk-19", name: "MySQL", category: "database", order: 19 },
  { id: "sk-20", name: "MariaDB", category: "database", order: 20 },
  { id: "sk-21", name: "MongoDB", category: "database", order: 21 },
  // tool
  { id: "sk-22", name: "Git", category: "tool", order: 22 },
  { id: "sk-23", name: "GitLab", category: "tool", order: 23 },
  { id: "sk-24", name: "Postman", category: "tool", order: 24 },
  { id: "sk-25", name: "Swagger / OpenAPI", category: "tool", order: 25 },
  { id: "sk-26", name: "Figma", category: "tool", order: 26 },
  { id: "sk-27", name: "Vite", category: "tool", order: 27 },
  // softskill
  { id: "sk-28", name: "Technical Documentation", category: "softskill", order: 28 },
  { id: "sk-29", name: "Analytical & Computational Thinking", category: "softskill", order: 29 },
  { id: "sk-30", name: "Cross-functional Collaboration", category: "softskill", order: 30 },
  { id: "sk-31", name: "Public Speaking", category: "softskill", order: 31 },
  { id: "sk-32", name: "Leadership", category: "softskill", order: 32 },
  { id: "sk-33", name: "Fast Learner", category: "softskill", order: 33 },
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    title: "3rd Champion UI/UX DIMASTI-AMLI 2023",
    issuer: "DIMASTI-AMLI",
    issue_date: "2023",
    credential_url: null,
    badge_image_url: null,
    attachments: [
      {
        title: "Sertifikat Juara 3 DIMASTI-AMLI.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    order: 1,
  },
  {
    id: "cert-2",
    title: "Awardee Bank Indonesia Scholarship",
    issuer: "Bank Indonesia",
    issue_date: "2023",
    credential_url: null,
    badge_image_url: null,
    attachments: [
      {
        title: "Piagam Penerima Beasiswa BI.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    order: 2,
  },
  {
    id: "cert-3",
    title: "MikroTik Certified Network Associate (MTCNA)",
    issuer: "MikroTik",
    issue_date: "2024",
    credential_url: null,
    badge_image_url: null,
    attachments: [
      {
        title: "Sertifikat Resmi MikroTik MTCNA.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    order: 3,
  },
  {
    id: "cert-4",
    title: "BNSP Certified — Digital Marketing Officer (DMO)",
    issuer: "BNSP",
    issue_date: "2024",
    credential_url: null,
    badge_image_url: null,
    attachments: [
      {
        title: "Sertifikat Kompetensi BNSP.pdf",
        file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
    order: 4,
  },
];
