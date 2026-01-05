import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, Target } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLanterns from '@/components/FloatingLanterns';
import { useLanguage } from '@/contexts/LanguageContext';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';

const projectImages = [project1, project2, project3, project4, project5, project6, project7];

const projectsData = {
  TH: {
    '1': {
      id: 1,
      year: 2519,
      title: 'มูลนิธิส่งเสริมศิลปาชีพฯ',
      subtitle: 'SUPPORT Foundation',
      description: 'มูลนิธิส่งเสริมศิลปาชีพ ในสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ ก่อตั้งขึ้นเพื่อส่งเสริมอาชีพงานหัตถกรรม ทอผ้าไหม และงานศิลปะแก่ราษฎร โดยเฉพาะในชนบทที่ห่างไกล เพื่อสร้างรายได้เสริมและอนุรักษ์ภูมิปัญญาไทยให้คงอยู่สืบไป',
      fullContent: 'สมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ พระบรมราชชนนีพันปีหลวง ทรงก่อตั้งมูลนิธิส่งเสริมศิลปาชีพฯ ขึ้นเมื่อปี พ.ศ. 2519 ด้วยพระราชปณิธานที่จะช่วยเหลือราษฎรที่ยากไร้ให้มีอาชีพเสริม โดยทรงนำงานหัตถกรรมพื้นบ้านที่เกือบจะสูญหายกลับมาฟื้นฟูและพัฒนา ทรงส่งเสริมให้ราษฎรในชนบทเรียนรู้การทอผ้าไหม ทำเครื่องเงิน เครื่องปั้นดินเผา และงานหัตถกรรมอื่นๆ อีกมากมาย',
      location: 'ทั่วประเทศไทย',
      beneficiaries: 'ราษฎรกว่า 100,000 ครอบครัว',
      achievements: [
        'ส่งเสริมอาชีพแก่ราษฎรกว่า 100,000 ครอบครัวทั่วประเทศ',
        'อนุรักษ์ลายผ้าไหมโบราณกว่า 200 ลายที่เกือบสูญหาย',
        'สร้างรายได้รวมกว่า 1,000 ล้านบาทให้แก่ชุมชน',
        'ผ้าไหมไทยเป็นที่รู้จักในระดับสากล',
        'มีศูนย์ศิลปาชีพกระจายอยู่ทั่วทุกภาค',
      ],
    },
    '2': {
      id: 2,
      year: 2525,
      title: 'โครงการป่ารักน้ำ',
      subtitle: 'Forest Loves Water',
      description: "ทรงมีพระราชดำริให้ฟื้นฟูสภาพป่าต้นน้ำ เพื่อให้ 'ป่า' ทำหน้าที่ซับน้ำและหล่อเลี้ยงชีวิต",
      fullContent: 'โครงการป่ารักน้ำเกิดจากพระราชดำริที่ทรงเล็งเห็นว่าป่าไม้และน้ำมีความสัมพันธ์กันอย่างใกล้ชิด หากป่าถูกทำลาย น้ำก็จะหายไปด้วย จึงทรงริเริ่มโครงการนี้เพื่อฟื้นฟูป่าต้นน้ำ โดยให้ราษฎรมีส่วนร่วมในการดูแลรักษาป่า และได้รับประโยชน์จากป่าอย่างยั่งยืน ทรงใช้หลัก "ปลูกป่าในใจคน" เพื่อให้คนรักและหวงแหนป่า',
      location: 'ภาคเหนือและภาคตะวันออกเฉียงเหนือ',
      beneficiaries: 'ชุมชนกว่า 500 หมู่บ้าน',
      achievements: [
        'ฟื้นฟูป่าต้นน้ำกว่า 500,000 ไร่',
        'สร้างฝายชะลอน้ำกว่า 10,000 แห่ง',
        'ชุมชนกว่า 50 หมู่บ้านมีน้ำใช้ตลอดปี',
        'ลดปัญหาน้ำท่วมและภัยแล้ง',
        'สัตว์ป่ากลับมาอาศัยในพื้นที่ฟื้นฟู',
      ],
    },
    '3': {
      id: 3,
      year: 2541,
      title: 'โครงการฟาร์มตัวอย่าง',
      subtitle: 'Model Farm Project',
      description: 'สร้างแหล่งจ้างงาน ผลิตอาหารที่ปลอดภัย และเป็นแหล่งเรียนรู้ทางการเกษตรที่ทันสมัยแก่ราษฎรในพื้นที่',
      fullContent: 'โครงการฟาร์มตัวอย่างตามพระราชดำริ เป็นแหล่งจ้างงานและแหล่งเรียนรู้ด้านการเกษตรที่ทันสมัย มุ่งเน้นการผลิตอาหารที่ปลอดภัยและยั่งยืน ราษฎรสามารถเรียนรู้เทคนิคการเกษตรใหม่ๆ และนำไปประยุกต์ใช้ในพื้นที่ของตนเอง',
      location: 'หลายจังหวัดทั่วประเทศ',
      beneficiaries: 'เกษตรกรและชุมชนท้องถิ่น',
      achievements: [
        'สร้างงานให้ชาวบ้านกว่า 2,000 คน',
        'ผลิตอาหารปลอดสารพิษส่งขายทั่วประเทศ',
        'เป็นแหล่งเรียนรู้รับผู้เยี่ยมชมปีละ 50,000 คน',
        'ถ่ายทอดความรู้สู่เกษตรกรกว่า 10,000 ราย',
        'ต้นแบบเกษตรยั่งยืนระดับประเทศ',
      ],
    },
    '4': {
      id: 4,
      year: 2522,
      title: 'สถานีพัฒนาเกษตรที่สูง',
      subtitle: 'Highland Agriculture Development',
      description: 'ส่งเสริมอาชีพเกษตรกรรมแก่ชาวไทยภูเขา ลดการทำลายป่าต้นน้ำ และฟื้นฟูระบบนิเวศให้กลับมาสมบูรณ์',
      fullContent: 'สถานีพัฒนาเกษตรที่สูงเป็นโครงการที่ช่วยเหลือชาวไทยภูเขาให้มีอาชีพที่มั่นคง โดยไม่ต้องทำไร่เลื่อนลอยซึ่งทำลายป่าต้นน้ำ ทรงส่งเสริมให้ปลูกพืชเมืองหนาวทดแทน เช่น ผัก ผลไม้ กาแฟ และดอกไม้ ซึ่งสร้างรายได้ดีกว่าพืชเสพติด',
      location: 'ภาคเหนือ',
      beneficiaries: 'ชาวไทยภูเขากว่า 30,000 ครัวเรือน',
      achievements: [
        'ส่งเสริมชาวไทยภูเขากว่า 30,000 ครัวเรือน',
        'ลดพื้นที่ทำไร่เลื่อนลอยกว่า 100,000 ไร่',
        'ปลูกพืชเมืองหนาวทดแทนฝิ่นสำเร็จ',
        'สร้างรายได้จากพืชเศรษฐกิจกว่า 500 ล้านบาท/ปี',
        'ฟื้นฟูป่าต้นน้ำได้อย่างยั่งยืน',
      ],
    },
    '5': {
      id: 5,
      year: 2540,
      title: 'โครงการคืนช้างสู่ธรรมชาติ',
      subtitle: 'Elephant Reintroduction Foundation',
      description: 'ฟื้นฟูประชากรช้างป่าไทย และจัดสรรพื้นที่ป่าให้เป็นที่อยู่อาศัยที่ปลอดภัย',
      fullContent: 'โครงการคืนช้างสู่ธรรมชาติเป็นพระราชดำริที่มุ่งหวังให้ช้างไทยได้กลับไปใช้ชีวิตในป่าธรรมชาติ หลังจากที่ช้างเลี้ยงหลายเชือกประสบปัญหาจากการลดลงของงานในอุตสาหกรรมป่าไม้ ทรงจัดสรรพื้นที่ป่าและฟื้นฟูช้างให้สามารถดำรงชีวิตในธรรมชาติได้',
      location: 'ลำปาง และพื้นที่ป่าอนุรักษ์',
      beneficiaries: 'ช้างไทยและระบบนิเวศป่า',
      achievements: [
        'คืนช้างสู่ป่าธรรมชาติกว่า 100 เชือก',
        'จัดสรรพื้นที่ป่ากว่า 100,000 ไร่',
        'ประชากรช้างป่าเพิ่มขึ้น 30%',
        'ลดปัญหาช้างเร่ร่อนในเมือง',
        'เป็นต้นแบบการอนุรักษ์ช้างระดับโลก',
      ],
    },
    '6': {
      id: 6,
      year: 2522,
      title: 'โครงการอนุรักษ์พันธุ์เต่าทะเล',
      subtitle: 'Sea Turtle Conservation',
      description: 'พระราชทานเกาะมันในเป็นสถานที่เพาะเลี้ยงและอนุรักษ์พันธุ์เต่าทะเล',
      fullContent: 'โครงการอนุรักษ์พันธุ์เต่าทะเลที่เกาะมันใน จังหวัดระยอง เป็นโครงการที่พระราชทานพื้นที่เพื่อการเพาะเลี้ยงและอนุรักษ์เต่าทะเลหลากหลายชนิดที่ใกล้สูญพันธุ์ รวมถึงเต่ากระ เต่าตนุ และเต่ามะเฟือง',
      location: 'เกาะมันใน จังหวัดระยอง',
      beneficiaries: 'เต่าทะเลและระบบนิเวศทางทะเล',
      achievements: [
        'ปล่อยลูกเต่าทะเลกว่า 1,000,000 ตัว',
        'อัตราการรอดเพิ่มขึ้น 40%',
        'เป็นศูนย์การเรียนรู้ระดับนานาชาติ',
        'ฟื้นฟูแนวปะการังโดยรอบเกาะ',
        'รับนักท่องเที่ยวเชิงอนุรักษ์ปีละ 20,000 คน',
      ],
    },
    '7': {
      id: 7,
      year: 2546,
      title: 'การอนุรักษ์โขน',
      subtitle: 'Khon Performance Preservation',
      description: 'ทรงฟื้นฟูศาสตร์และศิลป์ของการแสดงโขน ตั้งแต่เครื่องแต่งกาย หัวโขน จนถึงกระบวนท่ารำ',
      fullContent: 'การอนุรักษ์โขนเป็นพระราชกรณียกิจที่ทรงให้ความสำคัญอย่างยิ่ง ทรงฟื้นฟูศิลปะการแสดงโขนอย่างครบวงจร ตั้งแต่การจัดสร้างเครื่องแต่งกาย หัวโขน ไปจนถึงการสืบทอดท่ารำและการแสดง ทำให้โขนกลับมามีชีวิตชีวาและเป็นที่รู้จักในระดับสากล',
      location: 'กรุงเทพมหานครและทั่วประเทศ',
      beneficiaries: 'ศิลปินและผู้สืบทอดมรดกทางวัฒนธรรม',
      achievements: [
        'อนุรักษ์ท่ารำโขนโบราณกว่า 108 ท่า',
        'สร้างช่างฝีมือหัวโขนกว่า 50 คน',
        'โขนได้รับการขึ้นทะเบียนมรดกโลก UNESCO',
        'จัดการแสดงโขนพระราชทานเผยแพร่วัฒนธรรม',
        'สร้างรายได้จากการแสดงกว่า 100 ล้านบาท',
      ],
    },
  },
  EN: {
    '1': {
      id: 1,
      year: 1976,
      title: 'SUPPORT Foundation',
      subtitle: 'Foundation for the Promotion of Supplementary Occupations',
      description: 'Promoting handicraft professions, silk weaving, and arts for the people to generate supplementary income and preserve Thai wisdom.',
      fullContent: 'Her Majesty Queen Sirikit established the SUPPORT Foundation in 1976 with a royal vision to help impoverished citizens earn supplementary income. She revived and developed nearly-lost folk handicrafts, encouraging rural people to learn silk weaving, silverwork, pottery, and many other crafts.',
      location: 'Throughout Thailand',
      beneficiaries: 'Over 100,000 families',
      achievements: [
        'Promoted careers for over 100,000 families nationwide',
        'Preserved over 200 nearly-lost ancient silk patterns',
        'Generated over 1 billion baht in community income',
        'Made Thai silk internationally renowned',
        'Established art centers in every region',
      ],
    },
    '2': {
      id: 2,
      year: 1982,
      title: 'Forest Loves Water Project',
      subtitle: 'Watershed Forest Restoration',
      description: 'A royal initiative to restore watershed forests so that forests can absorb and sustain water for life.',
      fullContent: 'The Forest Loves Water Project arose from the royal insight that forests and water are closely related. If forests are destroyed, water will also disappear. This project was initiated to restore watershed forests through community participation in forest conservation and sustainable use of forest resources.',
      location: 'Northern and Northeastern Thailand',
      beneficiaries: 'Over 500 villages',
      achievements: [
        'Restored over 500,000 rai of watershed forests',
        'Built over 10,000 check dams',
        'Over 50 villages now have year-round water supply',
        'Reduced flood and drought problems',
        'Wildlife has returned to restored areas',
      ],
    },
    '3': {
      id: 3,
      year: 1998,
      title: 'Model Farm Project',
      subtitle: 'Agricultural Learning Center',
      description: 'Creating employment, producing safe food, and serving as a modern agricultural learning center for local people.',
      fullContent: 'The Model Farm Project is an employment and learning center focusing on safe and sustainable food production. Citizens can learn new agricultural techniques and apply them in their own areas.',
      location: 'Multiple provinces nationwide',
      beneficiaries: 'Farmers and local communities',
      achievements: [
        'Created jobs for over 2,000 villagers',
        'Produces organic food for nationwide distribution',
        'Hosts 50,000 visitors annually as a learning center',
        'Transferred knowledge to over 10,000 farmers',
        'National model for sustainable agriculture',
      ],
    },
    '4': {
      id: 4,
      year: 1979,
      title: 'Highland Agriculture Development',
      subtitle: 'Hill Tribe Agricultural Support',
      description: 'Promoting agriculture for hill tribes, reducing watershed deforestation, and restoring ecosystems.',
      fullContent: 'The Highland Agriculture Development Station helps hill tribes establish stable occupations without slash-and-burn farming that destroys watershed forests. Cold climate crops like vegetables, fruits, coffee, and flowers were promoted as alternatives.',
      location: 'Northern Thailand',
      beneficiaries: 'Over 30,000 hill tribe households',
      achievements: [
        'Supported over 30,000 hill tribe households',
        'Reduced slash-and-burn area by over 100,000 rai',
        'Successfully replaced opium with highland crops',
        'Generated over 500 million baht annually from cash crops',
        'Sustainably restored watershed forests',
      ],
    },
    '5': {
      id: 5,
      year: 1997,
      title: 'Elephant Reintroduction Foundation',
      subtitle: 'Wild Elephant Population Restoration',
      description: 'Restoring Thai wild elephant population and allocating safe forest habitats for sustainable elephant conservation.',
      fullContent: 'The Elephant Reintroduction Project aims to return Thai elephants to natural forest habitats after many domesticated elephants faced problems due to declining forestry industry work. Forest areas were allocated and elephants rehabilitated for natural living.',
      location: 'Lampang and conservation forests',
      beneficiaries: 'Thai elephants and forest ecosystems',
      achievements: [
        'Returned over 100 elephants to natural forests',
        'Allocated over 100,000 rai of forest area',
        'Increased wild elephant population by 30%',
        'Reduced urban wandering elephant problems',
        'Became a global model for elephant conservation',
      ],
    },
    '6': {
      id: 6,
      year: 1979,
      title: 'Sea Turtle Conservation',
      subtitle: 'Marine Ecosystem Protection',
      description: 'Royal patronage of Mannai Island as a breeding and conservation site for sea turtles.',
      fullContent: 'The Sea Turtle Conservation Project at Mannai Island, Rayong Province, provides breeding and conservation for various endangered sea turtle species including hawksbill, green, and leatherback turtles.',
      location: 'Mannai Island, Rayong Province',
      beneficiaries: 'Sea turtles and marine ecosystems',
      achievements: [
        'Released over 1,000,000 baby sea turtles',
        'Increased survival rate by 40%',
        'Became an international learning center',
        'Restored coral reefs around the island',
        'Hosts 20,000 eco-tourists annually',
      ],
    },
    '7': {
      id: 7,
      year: 2003,
      title: 'Khon Performance Preservation',
      subtitle: 'Thai Classical Dance Heritage',
      description: 'Reviving the art and science of Khon performance, from costumes and masks to dance movements.',
      fullContent: 'Khon preservation is a highly important royal initiative. Her Majesty revived the complete art of Khon performance, from costume and mask creation to dance movements, making Khon vibrant and internationally recognized again.',
      location: 'Bangkok and nationwide',
      beneficiaries: 'Artists and cultural heritage inheritors',
      achievements: [
        'Preserved over 108 ancient Khon dance movements',
        'Trained over 50 Khon mask craftsmen',
        'Khon registered as UNESCO World Heritage',
        'Royal Khon performances spread Thai culture',
        'Generated over 100 million baht from performances',
      ],
    },
  },
  CN: {
    '1': {
      id: 1,
      year: 1976,
      title: 'SUPPORT基金会',
      subtitle: '职业促进基金会',
      description: '为人民推广手工艺、丝绸编织和艺术职业，以创造额外收入并保护泰国智慧。',
      fullContent: '诗丽吉太后陛下于1976年成立SUPPORT基金会，旨在帮助贫困公民获得额外收入。她复兴和发展了几乎失传的民间手工艺，鼓励农村居民学习丝绸编织、银器制作、陶器等技艺。',
      location: '全泰国',
      beneficiaries: '超过100,000个家庭',
      achievements: [
        '为全国超过100,000个家庭提供职业发展',
        '保护了200多种濒临失传的古代丝绸图案',
        '为社区创造了超过10亿泰铢的收入',
        '使泰国丝绸享誉国际',
        '在各地区建立了艺术中心',
      ],
    },
    '2': {
      id: 2,
      year: 1982,
      title: '森林爱水项目',
      subtitle: '流域森林恢复',
      description: '恢复流域森林的皇家倡议，以便森林能够吸收和维持生命所需的水源。',
      fullContent: '森林爱水项目源于皇家的洞察力：森林和水密切相关。如果森林被破坏，水也会消失。该项目旨在通过社区参与森林保护和可持续利用森林资源来恢复流域森林。',
      location: '泰国北部和东北部',
      beneficiaries: '超过500个村庄',
      achievements: [
        '恢复了超过500,000莱的流域森林',
        '建造了超过10,000座拦水坝',
        '超过50个村庄现在全年有水供应',
        '减少了洪水和干旱问题',
        '野生动物已返回恢复区域',
      ],
    },
    '3': {
      id: 3,
      year: 1998,
      title: '示范农场项目',
      subtitle: '农业学习中心',
      description: '创造就业、生产安全食品，并成为当地人民的现代农业学习中心。',
      fullContent: '示范农场项目是一个就业和学习中心，专注于安全和可持续的食品生产。市民可以学习新的农业技术并应用到自己的地区。',
      location: '全国多个省份',
      beneficiaries: '农民和当地社区',
      achievements: [
        '为超过2,000名村民创造了就业机会',
        '生产有机食品供全国销售',
        '作为学习中心每年接待50,000名访客',
        '向超过10,000名农民传授知识',
        '成为国家可持续农业的典范',
      ],
    },
    '4': {
      id: 4,
      year: 1979,
      title: '高地农业发展',
      subtitle: '山地部落农业支持',
      description: '为山地部落推广农业，减少流域森林砍伐，恢复生态系统。',
      fullContent: '高地农业发展站帮助山地部落建立稳定的职业，避免破坏流域森林的刀耕火种。推广寒冷气候作物如蔬菜、水果、咖啡和花卉作为替代品。',
      location: '泰国北部',
      beneficiaries: '超过30,000个山地部落家庭',
      achievements: [
        '支持了超过30,000个山地部落家庭',
        '减少了超过100,000莱的刀耕火种面积',
        '成功用高地作物替代罂粟',
        '每年从经济作物中创造超过5亿泰铢收入',
        '可持续地恢复了流域森林',
      ],
    },
    '5': {
      id: 5,
      year: 1997,
      title: '大象重归自然基金会',
      subtitle: '野生大象种群恢复',
      description: '恢复泰国野生大象种群，为可持续大象保护分配安全的森林栖息地。',
      fullContent: '大象重归自然项目旨在让泰国大象重返自然森林栖息地，此前许多家养大象因林业工作减少而面临问题。为大象分配了森林区域并进行康复训练。',
      location: '南邦府和保护林',
      beneficiaries: '泰国大象和森林生态系统',
      achievements: [
        '将超过100头大象送回自然森林',
        '分配了超过100,000莱的森林面积',
        '野生大象数量增加了30%',
        '减少了城市游荡大象问题',
        '成为全球大象保护的典范',
      ],
    },
    '6': {
      id: 6,
      year: 1979,
      title: '海龟保护',
      subtitle: '海洋生态系统保护',
      description: '皇室赞助曼乃岛作为海龟的繁殖和保护场所。',
      fullContent: '曼乃岛海龟保护项目位于罗勇府，为各种濒危海龟物种提供繁殖和保护，包括玳瑁、绿海龟和棱皮龟。',
      location: '罗勇府曼乃岛',
      beneficiaries: '海龟和海洋生态系统',
      achievements: [
        '放归了超过1,000,000只幼龟',
        '存活率提高了40%',
        '成为国际学习中心',
        '恢复了岛屿周围的珊瑚礁',
        '每年接待20,000名生态游客',
      ],
    },
    '7': {
      id: 7,
      year: 2003,
      title: '泰国传统戏剧保护',
      subtitle: '泰国古典舞蹈遗产',
      description: '复兴泰国传统戏剧的艺术和科学，从服装和面具到舞蹈动作。',
      fullContent: '泰国传统戏剧保护是一项非常重要的皇家倡议。陛下复兴了完整的传统戏剧表演艺术，从服装和面具制作到舞蹈动作，使其重新焕发活力并获得国际认可。',
      location: '曼谷及全国各地',
      beneficiaries: '艺术家和文化遗产传承者',
      achievements: [
        '保护了108种以上的古代舞蹈动作',
        '培训了50多名面具工匠',
        '被联合国教科文组织列为世界遗产',
        '皇家演出传播泰国文化',
        '演出创造了超过1亿泰铢收入',
      ],
    },
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  
  const currentProjectsData = projectsData[language];
  const project = id ? currentProjectsData[id as keyof typeof currentProjectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gold mb-4">{t.projectDetail.notFound}</h1>
          <Link to="/" className="text-gold hover:text-gold-light">
            {t.projectDetail.backHome}
          </Link>
        </div>
      </div>
    );
  }

  const projectIndex = Number(id) - 1;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingLanterns />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src={projectImages[projectIndex]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/#royal-duties"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.projectDetail.backToRoyalDuties}
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {language === 'TH' ? 'พ.ศ.' : t.royalDuties.year} {project.year}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gold mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-foreground/70">{project.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.projectDetail.location}</p>
              <p className="text-foreground font-medium">{project.location}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.projectDetail.beneficiaries}</p>
              <p className="text-foreground font-medium">{project.beneficiaries}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Target className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.projectDetail.achievements}</p>
              <p className="text-foreground font-medium">{project.achievements.length} {t.projectDetail.achievementCount}</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            className="prose prose-invert max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gold mb-6">{t.projectDetail.exploreMore}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {project.fullContent}
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="bg-secondary/30 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-gold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                ✦
              </span>
              {t.projectDetail.keyAchievements}
            </h3>
            <ul className="space-y-4">
              {project.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4 text-foreground/80"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-semibold shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-1">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="mt-12 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Number(id) > 1 && (
              <Link
                to={`/project/${Number(id) - 1}`}
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {language === 'TH' ? 'โครงการก่อนหน้า' : language === 'EN' ? 'Previous Project' : '上一个项目'}
              </Link>
            )}
            <div className="flex-1" />
            {Number(id) < 7 && (
              <Link
                to={`/project/${Number(id) + 1}`}
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                {language === 'TH' ? 'โครงการถัดไป' : language === 'EN' ? 'Next Project' : '下一个项目'}
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="text-gold hover:text-gold-light transition-colors">
            {t.header.title}
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;