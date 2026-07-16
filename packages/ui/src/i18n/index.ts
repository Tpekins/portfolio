import { useState, useEffect } from "react";

export type Language = "EN" | "FR" | "KO";

const translations = {
  EN: {
    // Common
    common: {
      back: "Back",
      language: "Language",
      darkMode: "Dark mode",
    },
    // Navbar
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      blog: "Blog",
      feed: "Feed",
      contact: "Contact",
    },
    // Footer
    footer: {
      hi: "Hi there,",
      bio: "I'm a full-stack engineer and founder building at the intersection of tech and community. Based in Silicon Mountain and grounded in its spirit, I developed LocalHands to give Africa's artisans and labourers the digital visibility they deserve. Fueled by ambition, I write code, think in systems, and believe Africa's builders are just getting started",
      shortcuts: "Shortcuts:",
      copyright: "© 2026 | All rights reserved | Made with ❤️ by Tiani Pekins.",
    },
    // Home
    home: {
      heroTitle: "Building tomorrow today, One line at a time",
      heroSubtitle: "Because great software doesn't write itself... yet.",
      letsTalk: "Let's Talk",
      downloadCV: "Download CV",
      quickSummary: "Quick Summary",
      summaryTitle: "Crafting Digital Solutions From Concept to Deployment",
      softwareDev: "Software Development",
      softwareDev1: "Architecting web and mobile applications using modern frameworks.",
      softwareDev2: "Building robust solutions that connect and empower communities.",
      communityTech: "Community & Tech",
      communityTech1: "Contributing to local tech ecosystems and guiding aspiring developers.",
      communityTech2: "Mentoring on tech stacks and community-led innovation.",
      productStrategy: "Product Strategy",
      productStrategy1: "Driving projects from concept to deployment with a focus on user impact.",
      productStrategy2: "Collaborating with cross-functional teams to manage full product lifecycles.",
      ctaTitle: "Start your own project with me today",
      selectedWork: "Selected Work",
      myProjects: "My Projects",
      viewAllProjects: "View all projects",
      localhandsLabel: "AI-Powered Content Creation Platform",
      localhandsDesc: "LocalHands is an innovative platform that leverages skilled hands to generate reliable services, quality work, and audio-visual solutions effectively.",
      learnMore: "Learn more",
      myThoughts: "My Thoughts",
      insightsTitle: "Insights & Ideas: My Thoughts on Tech, Design, and Innovation",
      readAllPosts: "Read all posts",
      noPosts: "No posts yet.",
      react: "REACT",
      comm: "COMM",
      readOnMedium: "Read on Medium",
    },
    // About
    about: {
      heroTitle: "I solve problems using software",
      aboutMe: "About Me",
      aboutDesc1: "I'm a passionate software engineer and pursuing my masters in Software Engineering at the University of Buea. As an active participant in Silicon Mountain tech community. I thrive on collaborating to build scalable, innovative solutions that push the boundaries of technology in our region and beyond.",
      aboutDesc2: "I have also founded LocalHands, a non-profit service exchange platform dedicated to empowering the informal economy in Cameroon and across Africa. With 90% of our active population working informally, many face \"information poverty\" and a severe trust gap, relying on inefficient word-of-mouth or paper flyers to find work. LocalHands bridges this gap by providing a digital space where everyday artisans and labourers, from diggers to cocoa harvesters can digitally showcase their skills, build visibility, and seamlessly connect with clients.",
      connections: "Connections",
      peopleMentored: "People Mentored",
      myExperience: "My Experience",
      experienceTitle: "These are my professional experiences.",
      role: "University of Buea",
      subtitle: "MSc Software Engineering",
      period: "Sept 2021 - to date",
      expDesc: "As a MSc Software Engineering student, I am dedicated to deepening my technical expertise and mastering modern software architecture. My focus is on becoming an exceptional software engineer, continuously honing my skills to design, build, and deploy scalable solutions to complex challenges. Driven by a passion for technology, I am committed to using these skills to make a tangible, positive impact on my community and the tech industry.",
      quote: "The future belongs to those who believe in the beauty of their dreams and work relentlessly to turn them into reality. Eleanor Roosevelt",
    },
    // Projects
    projects: {
      heroTitle: "Here are my projects",
      heroSubtitle: "These are some of the projects that I have worked on.",
      reachOut: "Reach out &",
      getPricing: "Get personal pricing",
      name: "LocalHands",
      subtitle: "Connecting Communities, Bridging Information Poverty, and Engineering Trust",
      category: "Platform · Service Marketplace",
      description: "LocalHands is a research-backed, 3-tier service ecosystem engineered to mitigate Information Poverty and formalize trust in Cameroon's informal sector. Informed by a survey of 381 users, it delivers a secure, low-bandwidth digital marketplace optimized for budget smartphones.",
      responsibilities: "Key Responsibilities:",
      resp1: "Socio-Technical Research: Analyzing transaction friction, trust dynamics, and market asymmetry.",
      resp2: "System Architecture: Designing a modular 3-tier system decoupling presentation from core logic.",
      resp3: "Database Design: Modeling optimized PostgreSQL schemas for data consistency and low latency.",
      resp4: "Protocol Engineering: Implementing secure escrow workflows to establish systematic payment trust.",
      resp5: "Deployment & DevOps: Containerizing, deploying, and maintaining production infrastructure.",
      tools: "Tools:",
      tool1: "NestJS & Node.js: Designing modular, secure RESTful APIs and backend service domains.",
      tool2: "PostgreSQL & Prisma: Relational database modeling and type-safe schema management.",
      tool3: "React & TypeScript: Building lightweight, responsive, and state-driven interfaces.",
      tool4: "Docker & Vercel: Containerizing environments and deploying to cloud infrastructure.",
      goToWebsite: "Go To Website",
    },
    // Contact
    contact: {
      heroTitle: "Reach out if you need help or just want to say hello",
      heroSubtitle: "Let's start a conversation that sparks innovation.",
      name: "Name",
      surname: "Surname",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      sending: "Sending...",
      success: "Message Sent!",
      error: "Error! Try Again",
      send: "Send a message",
      role: "Software Engineer",
      bio: "Passionate software engineer dedicated to transforming complex challenges into innovative, user-friendly solutions and inspiring others through mentorship.",
    },
    // Blog
    blog: {
      journal: "The Journal",
      theBlog: "The Blog",
      insights: "Insights and engineering thoughts.",
      all: "All",
      tech: "Tech",
      software: "Software",
      life: "Life",
      community: "Community",
      search: "Search articles...",
      loading: "Loading posts...",
      noPosts: "No posts found.",
      readOn: "Read on",
    },
    // BlogPost
    blogPost: {
      loading: "Loading post...",
      notFound: "Post not found.",
      backToBlog: "Back to blog",
      external: "This article is published on an external platform.",
      readFull: "Read full article",
      by: "By",
    },
    // Feed
    feed: {
      updates: "Updates & Moments",
      theFeed: "The Feed",
      captured: "Captured as it happens.",
      all: "All",
      videos: "Videos",
      photos: "Photos",
      notes: "Notes",
      events: "Events",
      search: "Search feed...",
      loading: "Loading feed...",
      noItems: "No items found.",
      watchOnYouTube: "WATCH ON YOUTUBE",
    },
  },
  FR: {
    // Common
    common: {
      back: "Retour",
      language: "Langue",
      darkMode: "Mode sombre",
    },
    // Navbar
    nav: {
      home: "Accueil",
      projects: "Projets",
      about: "À propos",
      blog: "Blog",
      feed: "Actualités",
      contact: "Contact",
    },
    // Footer
    footer: {
      hi: "Salut,",
      bio: "Je suis Tiani, ingénieur full-stack et fondateur qui construit à l'intersection de la technologie et de la communauté. Basé à Silicon Mountain et ancré dans son esprit, j'ai développé LocalHands pour donner aux artisans et travailleurs d'Afrique la visibilité numérique qu'ils méritent. Animé par l'ambition, j'écris du code, je pense en systèmes, et je crois que les bâtisseurs de l'Afrique ne font que commencer.",
      shortcuts: "Raccourcis :",
      copyright: "© 2026 | Tous droits réservés | Fait avec ❤️ par Tiani Pekins.",
    },
    // Home
    home: {
      heroTitle: "Construire demain aujourd'hui, Une ligne à la fois",
      heroSubtitle: "Parce que le bon logiciel ne s'écrit pas tout seul... encore.",
      letsTalk: "Discutons",
      downloadCV: "Télécharger le CV",
      quickSummary: "Résumé rapide",
      summaryTitle: "Conception de solutions numériques du concept au déploiement",
      softwareDev: "Développement Logiciel",
      softwareDev1: "Conception d'applications web et mobiles utilisant des frameworks modernes.",
      softwareDev2: "Création de solutions robustes qui connectent et autonomisent les communautés.",
      communityTech: "Communauté & Tech",
      communityTech1: "Contribution aux écosystèmes technologiques locaux et mentorat des développeurs en herbe.",
      communityTech2: "Mentorat sur les stacks technologiques et l'innovation communautaire.",
      productStrategy: "Stratégie Produit",
      productStrategy1: "Conduite de projets du concept au déploiement avec un focus sur l'impact utilisateur.",
      productStrategy2: "Collaboration avec des équipes pluridisciplinaires pour gérer des cycles de produit complets.",
      ctaTitle: "Commencez votre projet avec moi aujourd'hui",
      selectedWork: "Travail sélectionné",
      myProjects: "Mes Projets",
      viewAllProjects: "Voir tous les projets",
      localhandsLabel: "Plateforme de création de contenu alimentée par l'IA",
      localhandsDesc: "LocalHands est une plateforme innovante qui exploite des mains qualifiées pour générer des services fiables, un travail de qualité et des solutions audiovisuelles efficaces.",
      learnMore: "En savoir plus",
      myThoughts: "Mes pensées",
      insightsTitle: "Perspectives & Idées : Mes réflexions sur la Tech, le Design et l'Innovation",
      readAllPosts: "Lire tous les articles",
      noPosts: "Aucun article pour l'instant.",
      react: "RÉACTION",
      comm: "COMM",
      readOnMedium: "Lire sur Medium",
    },
    // About
    about: {
      heroTitle: "Je résous des problèmes grâce au logiciel",
      aboutMe: "À propos de moi",
      aboutDesc1: "Je suis un ingénieur logiciel passionné et je poursuis mon master en Génie Logiciel à l'Université de Buea. En tant que participant actif à la communauté tech de Silicon Mountain, je prospère en collaborant pour construire des solutions évolutives et innovantes qui repoussent les limites de la technologie dans notre région et au-delà.",
      aboutDesc2: "J'ai également fondé LocalHands, une plateforme d'échange de services à but non lucratif dédiée à autonomiser l'économie informelle au Cameroun et à travers l'Afrique. Avec 90% de notre population active travaillant dans l'informel, beaucoup font face à une \"pauvreté d'information\" et à un grave déficit de confiance, comptant sur le bouche-à-oreille inefficace ou des prospectus pour trouver du travail. LocalHands comble ce fossé en fournissant un espace numérique où les artisans et travailleurs quotidiens, des terrassiers aux cueilleurs de cacao, peuvent montrer leurs compétences numériquement, construire leur visibilité et se connecter sans friction avec des clients.",
      connections: "Connexions",
      peopleMentored: "Personnes mentorées",
      myExperience: "Mon expérience",
      experienceTitle: "Voici mes expériences professionnelles.",
      role: "Université de Buea",
      subtitle: "MSc Génie Logiciel",
      period: "Sept 2021 - à ce jour",
      expDesc: "En tant qu'étudiant en MSc Génie Logiciel, je suis dédié à approfondir mon expertise technique et à maîtriser l'architecture logicielle moderne. Mon focus est de devenir un ingénieur logiciel exceptionnel, en affinant continuellement mes compétences pour concevoir, construire et déployer des solutions évolutives à des défis complexes. Animé par une passion pour la technologie, je suis déterminé à utiliser ces compétences pour avoir un impact tangible et positif sur ma communauté et l'industrie technologique.",
      quote: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves et travaillent sans relâche pour les transformer en réalité. Eleanor Roosevelt",
    },
    // Projects
    projects: {
      heroTitle: "Voici mes projets",
      heroSubtitle: "Voici quelques-uns des projets sur lesquels j'ai travaillé.",
      reachOut: "Contactez-moi &",
      getPricing: "Obtenir un tarif personnalisé",
      name: "LocalHands",
      subtitle: "Connecter les communautés, combler la pauvreté informationnelle et instaurer la confiance",
      category: "Plateforme · Marché de services",
      description: "LocalHands est un écosystème de services à 3 niveaux fondé sur la recherche, conçu pour atténuer la pauvreté informationnelle et formaliser la confiance dans le secteur informel du Cameroun. Informé par une enquête de 381 utilisateurs, il offre une place de marché numérique sécurisée et à faible bande passante, optimisée pour les smartphones économiques.",
      responsibilities: "Responsabilités clés :",
      resp1: "Recherche sociotechnique : Analyser les frictions transactionnelles, les dynamiques de confiance et les asymétries du marché.",
      resp2: "Architecture système : Concevoir un système modulaire à 3 niveaux séparant la présentation de la logique métier.",
      resp3: "Conception de bases de données : Modéliser des schémas PostgreSQL optimisés pour la cohérence des données et la faible latence.",
      resp4: "Ingénierie des protocoles : Implémenter des flux de travail d'escrow sécurisés pour établir une confiance de paiement systématique.",
      resp5: "Déploiement & DevOps : Conteneuriser, déployer et maintenir l'infrastructure de production.",
      tools: "Outils :",
      tool1: "NestJS & Node.js : Concevoir des API RESTful modulaires et sécurisées et des domaines de services backend.",
      tool2: "PostgreSQL & Prisma : Modélisation de bases de données relationnelles et gestion de schémas typée de manière sécurisée.",
      tool3: "React & TypeScript : Construire des interfaces légères, réactives et pilotées par l'état.",
      tool4: "Docker & Vercel : Conteneuriser les environnements et déployer sur l'infrastructure cloud.",
      goToWebsite: "Visiter le site",
    },
    // Contact
    contact: {
      heroTitle: "Contactez-moi si vous avez besoin d'aide ou si vous voulez simplement dire bonjour",
      heroSubtitle: "Commençons une conversation qui suscite l'innovation.",
      name: "Prénom",
      surname: "Nom",
      email: "Email",
      phone: "Téléphone",
      subject: "Sujet",
      message: "Message",
      sending: "Envoi en cours...",
      success: "Message envoyé !",
      error: "Erreur ! Réessayez",
      send: "Envoyer un message",
      role: "Ingénieur Logiciel",
      bio: "Ingénieur logiciel passionné dédié à transformer des défis complexes en solutions innovantes et conviviales, et à inspirer les autres par le mentorat.",
    },
    // Blog
    blog: {
      journal: "Le Journal",
      theBlog: "Le Blog",
      insights: "Perspectives et réflexions techniques.",
      all: "Tout",
      tech: "Tech",
      software: "Logiciel",
      life: "Vie",
      community: "Communauté",
      search: "Rechercher des articles...",
      loading: "Chargement des articles...",
      noPosts: "Aucun article trouvé.",
      readOn: "Lire sur",
    },
    // BlogPost
    blogPost: {
      loading: "Chargement de l'article...",
      notFound: "Article non trouvé.",
      backToBlog: "Retour au blog",
      external: "Cet article est publié sur une plateforme externe.",
      readFull: "Lire l'article complet",
      by: "Par",
    },
    // Feed
    feed: {
      updates: "Mises à jour & Moments",
      theFeed: "Le Fil",
      captured: "Capturé en temps réel.",
      all: "Tout",
      videos: "Vidéos",
      photos: "Photos",
      notes: "Notes",
      events: "Événements",
      search: "Rechercher dans le fil...",
      loading: "Chargement du fil...",
      noItems: "Aucun élément trouvé.",
      watchOnYouTube: "REGARDER SUR YOUTUBE",
    },
  },
  KO: {
    // Common
    common: {
      back: "뒤로",
      language: "언어",
      darkMode: "다크 모드",
    },
    // Navbar
    nav: {
      home: "홈",
      projects: "프로젝트",
      about: "소개",
      blog: "블로그",
      feed: "피드",
      contact: "연락처",
    },
    // Footer
    footer: {
      hi: "안녕하세요,",
      bio: "저는 기술과 커뮤니티의 교차점에서 개발하는 풀스택 엔지니어이자 창업자입니다. 실리콘 마운틴에 기반을 두고 그 정신을 바탕으로, LocalHands를 개발하여 아프리카의 장인과 노동자들이 디지털 가시성을 얻을 수 있도록 했습니다. 야심으로 추진되며, 저는 코드를 작성하고 시스템을 생각하며, 아프리카의 건설자들이 이제 막 시작하고 있다고 믿습니다.",
      shortcuts: "바로가기:",
      copyright: "© 2026 | 모든 권리 보유 | Tiani Pekins가 ❤️으로 제작",
    },
    // Home
    home: {
      heroTitle: "오늘 내일을 건설하며, 한 줄씩",
      heroSubtitle: "좋은 소프트웨어는 스스로 작성되지 않으니까요... 아직은.",
      letsTalk: "대화하기",
      downloadCV: "이력서 다운로드",
      quickSummary: "간략 요약",
      summaryTitle: "컨셉부터 배포까지 디지털 솔루션 구축",
      softwareDev: "소프트웨어 개발",
      softwareDev1: "현대적인 프레임워크를 사용하여 웹 및 모바일 애플리케이션 설계.",
      softwareDev2: "커뮤니티를 연결하고赋权的 강력한 솔루션 구축.",
      communityTech: "커뮤니티 & 기술",
      communityTech1: "지역 기술 생태계에 기여하고 지망생 개발자들을 지도.",
      communityTech2: "기술 스택과 커뮤니티 주도 혁신에 대한 멘토링.",
      productStrategy: "제품 전략",
      productStrategy1: "사용자 영향에 초점을 맞춰 프로젝트를 컨셉부터 배포까지 주도.",
      productStrategy2: "기능 교차 팀과 협력하여 전체 제품 수명주기 관리.",
      ctaTitle: "오늘 저와 함께 프로젝트를 시작하세요",
      selectedWork: "선택된 작업",
      myProjects: "나의 프로젝트",
      viewAllProjects: "모든 프로젝트 보기",
      localhandsLabel: "AI 기반 콘텐츠 생성 플랫폼",
      localhandsDesc: "LocalHands는 숙련된 손을 활용하여 안정적인 서비스, 고품질 작업 및 효과적인 시청각 솔루션을 생성하는 혁신적인 플랫폼입니다.",
      learnMore: "더 알아보기",
      myThoughts: "나의 생각",
      insightsTitle: "통찰력 & 아이디어: 기술, 디자인 및 혁신에 대한 나의 생각",
      readAllPosts: "모든 게시물 읽기",
      noPosts: "아직 게시물이 없습니다.",
      react: "반응",
      comm: "댓글",
      readOnMedium: "Medium에서 읽기",
    },
    // About
    about: {
      heroTitle: "저는 소프트웨어로 문제를 해결합니다",
      aboutMe: "나에 대해",
      aboutDesc1: "저는 열정적인 소프트웨어 엔지니어이며, 부에아 대학에서 소프트웨어 엔지니어링 석사를 공부하고 있습니다. 실리콘 마운틴 기술 커뮤니티의 적극적인 참여자로서, 우리 지역과 그 너머에서 기술의 경계를 확장하는 확장 가능하고 혁신적인 솔루션을 구축하기 위해 협력하는 것을 즐깁니다.",
      aboutDesc2: "저는 또한 LocalHands를 창립했습니다. 이는 카메룬과 아프리카 전역의 비공식 경제를赋权하는 비영리 서비스 교환 플랫폼입니다. 우리 활동 인구의 90%가 비공식적으로 일하고 있으며, 많은 사람들이 \"정보 빈곤\"과 심각한 신뢰 격차에 직면하여 비효율적인 입소문이나 종이 전단지에 의존하여 일을 찾습니다. LocalHands는 일상의 장인과 노동자들이 디지털 공간에서 기술을 선보이고, 가시성을 구축하며, 고객과 원활하게 연결될 수 있도록 함으로써 이 격차를 해소합니다.",
      connections: "연결",
      peopleMentored: "멘토링한 사람",
      myExperience: "나의 경험",
      experienceTitle: "이것은 나의 전문 경험입니다.",
      role: "부에아 대학",
      subtitle: "소프트웨어 엔지니어링 석사",
      period: "2021년 9월 - 현재",
      expDesc: "소프트웨어 엔지니어링 석사 학생으로서, 저는 기술 전문성을 심화하고 현대적인 소프트웨어 아키텍처를 마스터하는 데 전념하고 있습니다. 복잡한 문제에 대한 확장 가능한 솔루션을 설계, 구축 및 배포하는 기술을 지속적으로 연마하여 뛰어난 소프트웨어 엔지니어가 되는 것이 목표입니다. 기술에 대한 열정으로, 이 기술을 사용하여 커뮤니티와 기술 산업에 실질적이고 긍정적인 영향을 미치는 데 전념하고 있습니다.",
      quote: "미래는 자신의 꿈의 아름다움을 믿고 끊임없이 노력하여 현실로 바꾸는 사람들에게 속합니다. 엘리노어 루즈벨트",
    },
    // Projects
    projects: {
      heroTitle: "여기 제 프로젝트가 있습니다",
      heroSubtitle: "제가 작업한 프로젝트 중 일부입니다.",
      reachOut: "연락하기 &",
      getPricing: "맞춤 가격 받기",
      name: "LocalHands",
      subtitle: "커뮤니티 연결, 정보 빈곤 해소, 신뢰 구축",
      category: "플랫폼 · 서비스 마켓플레이스",
      description: "LocalHands는 카메룬 비공식 서비스 부문에서 정보 빈곤을 완화하고 신뢰를 체계화하기 위해 설계된 연구 기반 3계층 서비스 생태계입니다. 381명의 사용자 설문 조사를 통해 도출된 이 플랫폼은 예산 스마트폰에 최적화된 안전하고 저대역폭 디지털 마켓플레이스를 제공합니다.",
      responsibilities: "주요 책임:",
      resp1: "사회기술 연구: 거래 마찰, 신뢰 역학 및 시장 비대칭 분석.",
      resp2: "시스템 아키텍처: 프레젠테이션을 핵심 로직에서 분리하는 모듈형 3계층 시스템 설계.",
      resp3: "데이터베이스 설계: 데이터 일관성과 저지연을 위한 최적화된 PostgreSQL 스키마 모델링.",
      resp4: "프로토콜 엔지니어링: 체계적인 결제 신뢰 구축을 위한 안전한 에스크로 워크플로 구현.",
      resp5: "배포 및 DevOps: 컨테이너화, 배포 및 프로덕션 인프라 유지 관리.",
      tools: "도구:",
      tool1: "NestJS & Node.js: 모듈형 안전한 RESTful API 및 백엔드 서비스 도메인 설계.",
      tool2: "PostgreSQL & Prisma: 관계형 데이터베이스 모델링 및 타입 안전 스키마 관리.",
      tool3: "React & TypeScript: 가볍고 반응적이며 상태 기반 인터페이스 구축.",
      tool4: "Docker & Vercel: 환경 컨테이너화 및 클라우드 인프라 배포.",
      goToWebsite: "웹사이트 방문",
    },
    // Contact
    contact: {
      heroTitle: "도움이 필요하거나 인사를 하고 싶으시면 연락주세요",
      heroSubtitle: "혁신을 불러일으키는 대화를 시작합시다.",
      name: "이름",
      surname: "성",
      email: "이메일",
      phone: "전화",
      subject: "제목",
      message: "메시지",
      sending: "전송 중...",
      success: "메시지 전송됨!",
      error: "오류! 다시 시도",
      send: "메시지 보내기",
      role: "소프트웨어 엔지니어",
      bio: "복잡한 문제를 혁신적이고 사용자 친화적인 솔루션으로 변환하고 멘토링을 통해 다른 사람들에게 영감을 주는 데 전념하는 열정적인 소프트웨어 엔지니어.",
    },
    // Blog
    blog: {
      journal: "저널",
      theBlog: "블로그",
      insights: "통찰과 엔지니어링 생각.",
      all: "전체",
      tech: "기술",
      software: "소프트웨어",
      life: "생활",
      community: "커뮤니티",
      search: "게시물 검색...",
      loading: "게시물 로딩 중...",
      noPosts: "게시물을 찾을 수 없습니다.",
      readOn: "에서 읽기",
    },
    // BlogPost
    blogPost: {
      loading: "게시물 로딩 중...",
      notFound: "게시물을 찾을 수 없습니다.",
      backToBlog: "블로그로 돌아가기",
      external: "이 기사는 외부 플랫폼에 게시되었습니다.",
      readFull: "전체 기사 읽기",
      by: "작성자",
    },
    // Feed
    feed: {
      updates: "업데이트 & 순간",
      theFeed: "피드",
      captured: "실시간으로 캡처됩니다.",
      all: "전체",
      videos: "동영상",
      photos: "사진",
      notes: "노트",
      events: "이벤트",
      search: "피드 검색...",
      loading: "피드 로딩 중...",
      noItems: "항목을 찾을 수 없습니다.",
      watchOnYouTube: "YOUTUBE에서 보기",
    },
  },
};

export function useTranslation() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("portfolio-lang") as Language) || "EN";
    }
    return "EN";
  });

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("portfolio-lang") as Language;
      if (stored && stored !== lang) {
        setLang(stored);
      }
    };
    const handleCustom = (e: Event) => {
      const stored = (e as CustomEvent).detail as Language;
      if (stored && stored !== lang) {
        setLang(stored);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("portfolio-lang-change", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("portfolio-lang-change", handleCustom);
    };
  }, [lang]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[lang];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  const locale = lang === "FR" ? "fr-FR" : lang === "KO" ? "ko-KR" : "en-US";

  return { t, lang, locale };
}
