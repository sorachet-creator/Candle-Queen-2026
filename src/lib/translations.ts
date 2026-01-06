export type Language = 'TH' | 'EN' | 'CN';

export const translations = {
  TH: {
    // Header
    header: {
      title: 'ร่วมส่งเสด็จสู่สวรรคาลัย',
      lightLantern: 'จุดโคมลอย',
      royalDuties: 'พระราชกรณียกิจ',
    },
    // Hero Section
    hero: {
      title: 'ทะเลเทียนแห่งศรัทธา + จุดโคมลอย',
      subtitle: 'ตัวแทนของความสว่างที่ท่านได้สร้างไว้ในโลก โคมลอยแสดงถึงเราส่งแสงสว่างนี้กลับคืนฟ้าเบื้องบน',
      lanternCount: 'ยอดจุดโคมลอย',
      viewProvinces: 'ดูยอดแต่ละจังหวัด',
      pressButton: 'กดปุ่มด้านล่างเพื่อเริ่มจุดโคมลอย',
      lightLanternBtn: 'จุดโคมลอยถวายความอาลัย',
      scrollDown: 'เลื่อนด้านล่างเพื่อชมพระราชกรณียกิจ',
      queenAlt: 'สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง',
    },
    // Royal Duties Section
    royalDuties: {
      subtitle: 'THE ROYAL DUTIES',
      title: 'พระราชกรณียกิจ',
      description: 'การรวบรวมภาพที่น่าประทับใจและโครงการริเริ่มของพระราชาเพื่อรำลึกถึง พระมหากรุณาธิคุณ',
      year: 'พ.ศ.',
      readMore: 'อ่านเพิ่มเติม',
    },
    // Lantern Flow Modal
    lanternFlow: {
      // Step 1: Region
      selectRegion: 'เลือกภาค',
      selectRegionDesc: 'กรุณาเลือกภาคที่ท่านอาศัยอยู่',
      regions: {
        central: 'ภาคกลาง',
        north: 'ภาคเหนือ',
        northeast: 'ภาคตะวันออกเฉียงเหนือ',
        east: 'ภาคตะวันออก',
        west: 'ภาคตะวันตก',
        south: 'ภาคใต้',
        international: 'ต่างประเทศ',
      },
      // Step 2: Province
      selectProvince: 'เลือกจังหวัด',
      back: 'ย้อนกลับ',
      // Step 3: Question
      province: 'จังหวัด',
      wrongAnswer: 'คำตอบไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
      // Step 4: Release
      payTribute: 'น้อมถวายความอาลัย',
      releaseLantern: 'ปล่อยโคมลอย',
      // Success
      thankYou: 'ขอบคุณที่ร่วมน้อมรำลึก',
      yourLanternFrom: 'โคมลอยของท่านจากจังหวัด',
      hasRisen: 'ได้ลอยขึ้นสู่ฟ้าแล้ว',
      shareTo: 'แชร์ไปยัง',
      close: 'ปิดหน้าต่าง',
      shareText: 'ข้าพเจ้าได้ร่วมจุดโคมลอยถวายความอาลัยแด่สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง',
    },
    // Province Stats Modal
    provinceStats: {
      title: 'ยอดจุดโคมลอยแต่ละจังหวัด',
      totalCountry: 'ยอดรวมทั่วประเทศ',
      searchPlaceholder: 'ค้นหาจังหวัด...',
      noResults: 'ไม่พบจังหวัดที่ค้นหา',
    },
    // Footer
    footer: {
      copyright: '© 2025 สมาคมเทคโนโลยีเพื่อการตลาด (Technology for Marketing Association) เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นการเฉลิมพระเกียรติ',
    },
    // Project Detail
    projectDetail: {
      notFound: 'ไม่พบโครงการที่ต้องการ',
      backHome: 'กลับหน้าหลัก',
      backToRoyalDuties: 'กลับไปยังพระราชกรณียกิจ',
      location: 'พื้นที่ดำเนินการ',
      beneficiaries: 'ผู้ได้รับประโยชน์',
      achievements: 'ผลสำเร็จ',
      achievementCount: 'รายการ',
      keyAchievements: 'ผลสำเร็จที่สำคัญ',
      exploreMore: 'เยี่ยมชมโครงการอื่นๆ',
    },
    // Not Found
    notFound: {
      title: '404',
      message: 'ไม่พบหน้าที่ค้นหา',
      backHome: 'กลับหน้าหลัก',
    },
    // Projects Data
    projects: [
      {
        id: 1,
        year: 2519,
        title: 'มูลนิธิส่งเสริมศิลปาชีพฯ (SUPPORT Foundation)',
        description: 'ส่งเสริมอาชีพงานหัตถกรรม ทอผ้าไหม และงานศิลปะแก่ราษฎร เพื่อสร้างรายได้เสริมและอนุรักษ์ภูมิปัญญาไทยให้คงอยู่สืบไป',
      },
      {
        id: 2,
        year: 2525,
        title: 'โครงการป่ารักน้ำ (Forest Loves Water)',
        description: "ทรงมีพระราชดำริให้ฟื้นฟูสภาพป่าต้นน้ำ เพื่อให้ 'ป่า' ทำหน้าที่ซับน้ำและหล่อเลี้ยงชีวิต 'น้ำ' อันเป็นปัจจัยสำคัญของการดำรงชีวิต",
      },
      {
        id: 3,
        year: 2541,
        title: 'โครงการฟาร์มตัวอย่าง (Model Farm Project)',
        description: 'สร้างแหล่งจ้างงาน ผลิตอาหารที่ปลอดภัย และเป็นแหล่งเรียนรู้ทางการเกษตรที่ทันสมัยแก่ราษฎรในพื้นที่',
      },
      {
        id: 4,
        year: 2522,
        title: 'สถานีพัฒนาเกษตรที่สูง (Highland Agriculture)',
        description: 'ส่งเสริมอาชีพเกษตรกรรมแก่ชาวไทยภูเขา ลดการทำลายป่าต้นน้ำ และฟื้นฟูระบบนิเวศให้กลับมาสมบูรณ์',
      },
      {
        id: 5,
        year: 2540,
        title: 'โครงการคืนช้างสู่ธรรมชาติ (Elephant Reintroduction)',
        description: 'ฟื้นฟูประชากรช้างป่าไทย และจัดสรรพื้นที่ป่าให้เป็นที่อยู่อาศัยที่ปลอดภัย เพื่อการอนุรักษ์ช้างไทยอย่างยั่งยืน',
      },
      {
        id: 6,
        year: 2522,
        title: 'โครงการอนุรักษ์พันธุ์เต่าทะเล (Sea Turtle Conservation)',
        description: 'พระราชทานเกาะมันในเป็นสถานที่เพาะเลี้ยงและอนุรักษ์พันธุ์เต่าทะเล เพื่อปล่อยคืนสู่ธรรมชาติและรักษาสมดุลทางทะเล',
      },
      {
        id: 7,
        year: 2546,
        title: 'การอนุรักษ์โขน (Khon Performance Preservation)',
        description: 'ทรงฟื้นฟูศาสตร์และศิลป์ของการแสดงโขน ตั้งแต่เครื่องแต่งกาย หัวโขน จนถึงกระบวนท่ารำ เพื่อเป็นสมบัติทางวัฒนธรรมของชาติ',
      },
    ],
  },
  EN: {
    // Header
    header: {
      title: 'Together in Royal Remembrance',
      lightLantern: 'Light Lanterns',
      royalDuties: 'Royal Duties',
    },
    // Hero Section
    hero: {
      title: 'Sea of Faith + Lantern Release',
      subtitle: 'Representing the light she created in this world. The lanterns symbolize our sending this light back to the heavens above.',
      lanternCount: 'Lanterns Released',
      viewProvinces: 'View by Province',
      pressButton: 'Press the button below to release a lantern',
      lightLanternBtn: 'Release Lantern in Tribute',
      scrollDown: 'Scroll down to view Royal Duties',
      queenAlt: 'Her Majesty Queen Sirikit The Queen Mother',
    },
    // Royal Duties Section
    royalDuties: {
      subtitle: 'THE ROYAL DUTIES',
      title: 'Royal Duties',
      description: 'A collection of impressive images and royal initiatives to commemorate Her Majesty\'s grace and benevolence.',
      year: 'Year',
      readMore: 'Read More',
    },
    // Lantern Flow Modal
    lanternFlow: {
      selectRegion: 'Select Region',
      selectRegionDesc: 'Please select your region',
      regions: {
        central: 'Central',
        north: 'Northern',
        northeast: 'Northeastern',
        east: 'Eastern',
        west: 'Western',
        south: 'Southern',
        international: 'International',
      },
      selectProvince: 'Select Province',
      back: 'Back',
      province: 'Province',
      wrongAnswer: 'Incorrect answer. Please try again.',
      payTribute: 'Pay Tribute',
      releaseLantern: 'Release Lantern',
      thankYou: 'Thank You for Your Remembrance',
      yourLanternFrom: 'Your lantern from',
      hasRisen: 'has risen to the sky',
      shareTo: 'Share to',
      close: 'Close',
      shareText: 'I have released a lantern in tribute to Her Majesty Queen Sirikit The Queen Mother',
    },
    // Province Stats Modal
    provinceStats: {
      title: 'Lanterns by Province',
      totalCountry: 'Total Nationwide',
      searchPlaceholder: 'Search province...',
      noResults: 'No provinces found',
    },
    // Footer
    footer: {
      copyright: '© 2025 Technology for Marketing Association. This website is created in tribute.',
    },
    // Project Detail
    projectDetail: {
      notFound: 'Project not found',
      backHome: 'Back to Home',
      backToRoyalDuties: 'Back to Royal Duties',
      location: 'Location',
      beneficiaries: 'Beneficiaries',
      achievements: 'Achievements',
      achievementCount: 'items',
      keyAchievements: 'Key Achievements',
      exploreMore: 'Explore Other Projects',
    },
    // Not Found
    notFound: {
      title: '404',
      message: 'Page not found',
      backHome: 'Return to Home',
    },
    // Projects Data
    projects: [
      {
        id: 1,
        year: 1976,
        title: 'SUPPORT Foundation',
        description: 'Promoting handicraft professions, silk weaving, and arts for the people to generate supplementary income and preserve Thai wisdom.',
      },
      {
        id: 2,
        year: 1982,
        title: 'Forest Loves Water Project',
        description: 'A royal initiative to restore watershed forests so that forests can absorb and sustain water for life.',
      },
      {
        id: 3,
        year: 1998,
        title: 'Model Farm Project',
        description: 'Creating employment, producing safe food, and serving as a modern agricultural learning center for local people.',
      },
      {
        id: 4,
        year: 1979,
        title: 'Highland Agriculture Development',
        description: 'Promoting agriculture for hill tribes, reducing watershed deforestation, and restoring ecosystems.',
      },
      {
        id: 5,
        year: 1997,
        title: 'Elephant Reintroduction Foundation',
        description: 'Restoring Thai wild elephant population and allocating safe forest habitats for sustainable elephant conservation.',
      },
      {
        id: 6,
        year: 1979,
        title: 'Sea Turtle Conservation',
        description: 'Royal patronage of Mannai Island as a breeding and conservation site for sea turtles.',
      },
      {
        id: 7,
        year: 2003,
        title: 'Khon Performance Preservation',
        description: 'Reviving the art and science of Khon performance, from costumes and masks to dance movements.',
      },
    ],
  },
  CN: {
    // Header
    header: {
      title: '共同悼念先王后',
      lightLantern: '点灯笼',
      royalDuties: '皇室职责',
    },
    // Hero Section
    hero: {
      title: '信仰之海 + 放天灯',
      subtitle: '代表她在世上创造的光明。天灯象征着我们将这光芒送回天上。',
      lanternCount: '已放天灯数',
      viewProvinces: '按省份查看',
      pressButton: '点击下方按钮放天灯',
      lightLanternBtn: '放天灯致敬',
      scrollDown: '向下滚动查看皇室职责',
      queenAlt: '诗丽吉太后陛下',
    },
    // Royal Duties Section
    royalDuties: {
      subtitle: 'THE ROYAL DUTIES',
      title: '皇室职责',
      description: '收集令人印象深刻的图片和皇室倡议，以纪念陛下的恩典与仁慈。',
      year: '年份',
      readMore: '阅读更多',
    },
    // Lantern Flow Modal
    lanternFlow: {
      selectRegion: '选择地区',
      selectRegionDesc: '请选择您所在的地区',
      regions: {
        central: '中部',
        north: '北部',
        northeast: '东北部',
        east: '东部',
        west: '西部',
        south: '南部',
        international: '国际',
      },
      selectProvince: '选择省份',
      back: '返回',
      province: '省份',
      wrongAnswer: '答案不正确。请再试一次。',
      payTribute: '致敬',
      releaseLantern: '放天灯',
      thankYou: '感谢您的悼念',
      yourLanternFrom: '您来自的天灯',
      hasRisen: '已升上天空',
      shareTo: '分享到',
      close: '关闭',
      shareText: '我已放天灯致敬诗丽吉太后陛下',
    },
    // Province Stats Modal
    provinceStats: {
      title: '各省天灯数量',
      totalCountry: '全国总计',
      searchPlaceholder: '搜索省份...',
      noResults: '未找到省份',
    },
    // Footer
    footer: {
      copyright: '© 2025 市场技术协会。本网站为致敬而建。',
    },
    // Project Detail
    projectDetail: {
      notFound: '未找到项目',
      backHome: '返回首页',
      backToRoyalDuties: '返回皇室职责',
      location: '地点',
      beneficiaries: '受益者',
      achievements: '成就',
      achievementCount: '项',
      keyAchievements: '主要成就',
      exploreMore: '探索其他项目',
    },
    // Not Found
    notFound: {
      title: '404',
      message: '页面未找到',
      backHome: '返回首页',
    },
    // Projects Data
    projects: [
      {
        id: 1,
        year: 1976,
        title: 'SUPPORT基金会',
        description: '为人民推广手工艺、丝绸编织和艺术职业，以创造额外收入并保护泰国智慧。',
      },
      {
        id: 2,
        year: 1982,
        title: '森林爱水项目',
        description: '恢复流域森林的皇家倡议，以便森林能够吸收和维持生命所需的水源。',
      },
      {
        id: 3,
        year: 1998,
        title: '示范农场项目',
        description: '创造就业、生产安全食品，并成为当地人民的现代农业学习中心。',
      },
      {
        id: 4,
        year: 1979,
        title: '高地农业发展',
        description: '为山地部落推广农业，减少流域森林砍伐，恢复生态系统。',
      },
      {
        id: 5,
        year: 1997,
        title: '大象重归自然基金会',
        description: '恢复泰国野生大象种群，为可持续大象保护分配安全的森林栖息地。',
      },
      {
        id: 6,
        year: 1979,
        title: '海龟保护',
        description: '皇室赞助曼乃岛作为海龟的繁殖和保护场所。',
      },
      {
        id: 7,
        year: 2003,
        title: '泰国传统戏剧保护',
        description: '复兴泰国传统戏剧的艺术和科学，从服装和面具到舞蹈动作。',
      },
    ],
  },
} as const;

export type TranslationKey = keyof typeof translations.TH;
