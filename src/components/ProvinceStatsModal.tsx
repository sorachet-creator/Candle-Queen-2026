import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

interface ProvinceStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Region = 'international' | 'central' | 'north' | 'northeast' | 'east' | 'south';

interface ProvinceData {
  name: { TH: string; EN: string; CN: string };
  count: number;
  region: Region;
}

const regionNames: Record<Region, { TH: string; EN: string; CN: string }> = {
  international: { TH: 'ต่างประเทศ', EN: 'International', CN: '国际' },
  central: { TH: 'ภาคกลาง', EN: 'Central Region', CN: '中部地区' },
  north: { TH: 'ภาคเหนือ', EN: 'Northern Region', CN: '北部地区' },
  northeast: { TH: 'ภาคตะวันออกเฉียงเหนือ', EN: 'Northeastern Region', CN: '东北部地区' },
  east: { TH: 'ภาคตะวันออก', EN: 'Eastern Region', CN: '东部地区' },
  south: { TH: 'ภาคใต้', EN: 'Southern Region', CN: '南部地区' },
};

const internationalData = { name: { TH: 'ต่างประเทศ', EN: 'International', CN: '国际' }, count: 8500000 };

const provinceData: ProvinceData[] = [
  // ภาคกลาง (Central)
  { name: { TH: 'กรุงเทพมหานคร', EN: 'Bangkok', CN: '曼谷' }, count: 12500000, region: 'central' },
  { name: { TH: 'นนทบุรี', EN: 'Nonthaburi', CN: '暖武里' }, count: 1300000, region: 'central' },
  { name: { TH: 'ปทุมธานี', EN: 'Pathum Thani', CN: '巴吞他尼' }, count: 1100000, region: 'central' },
  { name: { TH: 'สมุทรปราการ', EN: 'Samut Prakan', CN: '北榄' }, count: 1200000, region: 'central' },
  { name: { TH: 'พระนครศรีอยุธยา', EN: 'Phra Nakhon Si Ayutthaya', CN: '大城' }, count: 850000, region: 'central' },
  { name: { TH: 'อ่างทอง', EN: 'Ang Thong', CN: '红统' }, count: 280000, region: 'central' },
  { name: { TH: 'ลพบุรี', EN: 'Lopburi', CN: '华富里' }, count: 750000, region: 'central' },
  { name: { TH: 'สิงห์บุรี', EN: 'Sing Buri', CN: '信武里' }, count: 210000, region: 'central' },
  { name: { TH: 'ชัยนาท', EN: 'Chai Nat', CN: '猜纳' }, count: 330000, region: 'central' },
  { name: { TH: 'สระบุรี', EN: 'Saraburi', CN: '北标' }, count: 640000, region: 'central' },
  { name: { TH: 'นครนายก', EN: 'Nakhon Nayok', CN: '那空那育' }, count: 260000, region: 'central' },
  { name: { TH: 'นครปฐม', EN: 'Nakhon Pathom', CN: '佛统' }, count: 920000, region: 'central' },
  { name: { TH: 'สมุทรสาคร', EN: 'Samut Sakhon', CN: '龙仔厝' }, count: 570000, region: 'central' },
  { name: { TH: 'สมุทรสงคราม', EN: 'Samut Songkhram', CN: '夜功' }, count: 190000, region: 'central' },
  { name: { TH: 'สุพรรณบุรี', EN: 'Suphan Buri', CN: '素攀武里' }, count: 850000, region: 'central' },
  { name: { TH: 'กาญจนบุรี', EN: 'Kanchanaburi', CN: '北碧' }, count: 890000, region: 'central' },
  { name: { TH: 'ราชบุรี', EN: 'Ratchaburi', CN: '叻丕' }, count: 870000, region: 'central' },
  { name: { TH: 'เพชรบุรี', EN: 'Phetchaburi', CN: '碧武里' }, count: 480000, region: 'central' },
  { name: { TH: 'ประจวบคีรีขันธ์', EN: 'Prachuap Khiri Khan', CN: '巴蜀' }, count: 540000, region: 'central' },
  // ภาคตะวันออก (Eastern)
  { name: { TH: 'ชลบุรี', EN: 'Chonburi', CN: '春武里' }, count: 2900000, region: 'east' },
  { name: { TH: 'ระยอง', EN: 'Rayong', CN: '罗勇' }, count: 1500000, region: 'east' },
  { name: { TH: 'จันทบุรี', EN: 'Chanthaburi', CN: '尖竹汶' }, count: 540000, region: 'east' },
  { name: { TH: 'ตราด', EN: 'Trat', CN: '达叻' }, count: 230000, region: 'east' },
  { name: { TH: 'ฉะเชิงเทรา', EN: 'Chachoengsao', CN: '北柳' }, count: 720000, region: 'east' },
  { name: { TH: 'ปราจีนบุรี', EN: 'Prachin Buri', CN: '巴真' }, count: 490000, region: 'east' },
  { name: { TH: 'สระแก้ว', EN: 'Sa Kaeo', CN: '沙缴' }, count: 560000, region: 'east' },
  // ภาคเหนือ (Northern)
  { name: { TH: 'เชียงใหม่', EN: 'Chiang Mai', CN: '清迈' }, count: 4200000, region: 'north' },
  { name: { TH: 'เชียงราย', EN: 'Chiang Rai', CN: '清莱' }, count: 2500000, region: 'north' },
  { name: { TH: 'ลำปาง', EN: 'Lampang', CN: '南邦' }, count: 1000000, region: 'north' },
  { name: { TH: 'ลำพูน', EN: 'Lamphun', CN: '南奔' }, count: 410000, region: 'north' },
  { name: { TH: 'แม่ฮ่องสอน', EN: 'Mae Hong Son', CN: '夜丰颂' }, count: 280000, region: 'north' },
  { name: { TH: 'น่าน', EN: 'Nan', CN: '难' }, count: 480000, region: 'north' },
  { name: { TH: 'พะเยา', EN: 'Phayao', CN: '帕尧' }, count: 480000, region: 'north' },
  { name: { TH: 'แพร่', EN: 'Phrae', CN: '帕' }, count: 450000, region: 'north' },
  { name: { TH: 'อุตรดิตถ์', EN: 'Uttaradit', CN: '程逸' }, count: 460000, region: 'north' },
  { name: { TH: 'ตาก', EN: 'Tak', CN: '达府' }, count: 670000, region: 'north' },
  { name: { TH: 'สุโขทัย', EN: 'Sukhothai', CN: '素可泰' }, count: 600000, region: 'north' },
  { name: { TH: 'พิษณุโลก', EN: 'Phitsanulok', CN: '彭世洛' }, count: 1700000, region: 'north' },
  { name: { TH: 'พิจิตร', EN: 'Phichit', CN: '披集' }, count: 540000, region: 'north' },
  { name: { TH: 'กำแพงเพชร', EN: 'Kamphaeng Phet', CN: '甘烹碧' }, count: 730000, region: 'north' },
  { name: { TH: 'เพชรบูรณ์', EN: 'Phetchabun', CN: '碧差汶' }, count: 1000000, region: 'north' },
  { name: { TH: 'นครสวรรค์', EN: 'Nakhon Sawan', CN: '北揽坡' }, count: 1060000, region: 'north' },
  { name: { TH: 'อุทัยธานี', EN: 'Uthai Thani', CN: '乌泰他尼' }, count: 330000, region: 'north' },
  // ภาคตะวันออกเฉียงเหนือ (Northeastern / Isan)
  { name: { TH: 'นครราชสีมา', EN: 'Nakhon Ratchasima', CN: '呵叻' }, count: 3200000, region: 'northeast' },
  { name: { TH: 'ขอนแก่น', EN: 'Khon Kaen', CN: '孔敬' }, count: 3500000, region: 'northeast' },
  { name: { TH: 'อุดรธานี', EN: 'Udon Thani', CN: '乌隆他尼' }, count: 2300000, region: 'northeast' },
  { name: { TH: 'อุบลราชธานี', EN: 'Ubon Ratchathani', CN: '乌汶' }, count: 1400000, region: 'northeast' },
  { name: { TH: 'บุรีรัมย์', EN: 'Buriram', CN: '武里南' }, count: 1600000, region: 'northeast' },
  { name: { TH: 'สุรินทร์', EN: 'Surin', CN: '素林' }, count: 1400000, region: 'northeast' },
  { name: { TH: 'ศรีสะเกษ', EN: 'Sisaket', CN: '四色菊' }, count: 1500000, region: 'northeast' },
  { name: { TH: 'ร้อยเอ็ด', EN: 'Roi Et', CN: '黎逸' }, count: 1300000, region: 'northeast' },
  { name: { TH: 'มหาสารคาม', EN: 'Maha Sarakham', CN: '马哈沙拉堪' }, count: 960000, region: 'northeast' },
  { name: { TH: 'กาฬสินธุ์', EN: 'Kalasin', CN: '加拉信' }, count: 990000, region: 'northeast' },
  { name: { TH: 'สกลนคร', EN: 'Sakon Nakhon', CN: '沙功那空' }, count: 1150000, region: 'northeast' },
  { name: { TH: 'นครพนม', EN: 'Nakhon Phanom', CN: '那空帕农' }, count: 720000, region: 'northeast' },
  { name: { TH: 'มุกดาหาร', EN: 'Mukdahan', CN: '穆达汉' }, count: 350000, region: 'northeast' },
  { name: { TH: 'ชัยภูมิ', EN: 'Chaiyaphum', CN: '猜也奔' }, count: 1140000, region: 'northeast' },
  { name: { TH: 'เลย', EN: 'Loei', CN: '黎府' }, count: 640000, region: 'northeast' },
  { name: { TH: 'หนองคาย', EN: 'Nong Khai', CN: '廊开' }, count: 520000, region: 'northeast' },
  { name: { TH: 'หนองบัวลำภู', EN: 'Nong Bua Lamphu', CN: '廊磨喃蒲' }, count: 510000, region: 'northeast' },
  { name: { TH: 'บึงกาฬ', EN: 'Bueng Kan', CN: '汶干' }, count: 420000, region: 'northeast' },
  { name: { TH: 'ยโสธร', EN: 'Yasothon', CN: '益梭通' }, count: 540000, region: 'northeast' },
  { name: { TH: 'อำนาจเจริญ', EN: 'Amnat Charoen', CN: '安纳乍能' }, count: 380000, region: 'northeast' },
  // ภาคใต้ (Southern)
  { name: { TH: 'สุราษฎร์ธานี', EN: 'Surat Thani', CN: '素叻他尼' }, count: 2100000, region: 'south' },
  { name: { TH: 'นครศรีธรรมราช', EN: 'Nakhon Si Thammarat', CN: '洛坤' }, count: 1900000, region: 'south' },
  { name: { TH: 'สงขลา', EN: 'Songkhla', CN: '宋卡' }, count: 2700000, region: 'south' },
  { name: { TH: 'ภูเก็ต', EN: 'Phuket', CN: '普吉' }, count: 3800000, region: 'south' },
  { name: { TH: 'กระบี่', EN: 'Krabi', CN: '甲米' }, count: 1200000, region: 'south' },
  { name: { TH: 'พังงา', EN: 'Phang Nga', CN: '攀牙' }, count: 680000, region: 'south' },
  { name: { TH: 'ตรัง', EN: 'Trang', CN: '董里' }, count: 640000, region: 'south' },
  { name: { TH: 'พัทลุง', EN: 'Phatthalung', CN: '博他仑' }, count: 520000, region: 'south' },
  { name: { TH: 'สตูล', EN: 'Satun', CN: '沙敦' }, count: 320000, region: 'south' },
  { name: { TH: 'ชุมพร', EN: 'Chumphon', CN: '春蓬' }, count: 510000, region: 'south' },
  { name: { TH: 'ระนอง', EN: 'Ranong', CN: '拉廊' }, count: 190000, region: 'south' },
  { name: { TH: 'ปัตตานี', EN: 'Pattani', CN: '北大年' }, count: 710000, region: 'south' },
  { name: { TH: 'ยะลา', EN: 'Yala', CN: '也拉' }, count: 530000, region: 'south' },
  { name: { TH: 'นราธิวาส', EN: 'Narathiwat', CN: '陶公' }, count: 800000, region: 'south' },
];

const regionOrder: Region[] = ['central', 'north', 'northeast', 'east', 'south'];

const ProvinceStatsModal = ({ isOpen, onClose }: ProvinceStatsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<Record<Region, boolean>>({
    international: false,
    central: true,
    north: true,
    northeast: true,
    east: true,
    south: true,
  });

  const { t, language } = useLanguage();

  const showInternational = searchTerm === '' || internationalData.name[language].toLowerCase().includes(searchTerm.toLowerCase());

  const toggleRegion = (region: Region) => {
    setExpandedRegions(prev => ({ ...prev, [region]: !prev[region] }));
  };

  const filteredProvinces = useMemo(() => {
    return provinceData
      .filter(province => province.name[language].toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => b.count - a.count);
  }, [searchTerm, language]);

  const groupedProvinces = useMemo(() => {
    const groups: Record<Region, ProvinceData[]> = {
      international: [],
      central: [],
      north: [],
      northeast: [],
      east: [],
      south: [],
    };

    filteredProvinces.forEach(province => {
      groups[province.region].push(province);
    });

    return groups;
  }, [filteredProvinces]);

  const getRegionTotal = (region: Region) => {
    return groupedProvinces[region].reduce((sum, p) => sum + p.count, 0);
  };

  const totalCount = provinceData.reduce((sum, p) => sum + p.count, 0) + internationalData.count;

  const getRankInRegion = (province: ProvinceData, region: Region) => {
    const sortedInRegion = groupedProvinces[region];
    return sortedInRegion.findIndex(p => p.name.TH === province.name.TH) + 1;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gold">
                  {t.provinceStats.title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Total count */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-1">{t.provinceStats.totalCountry}</p>
                <p className="text-3xl font-bold text-gold">{totalCount.toLocaleString()}</p>
              </div>

              {/* Top 3 Regions */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {language === 'TH' ? 'อันดับภาคยอดโคมลอยสูงสุด' : language === 'EN' ? 'Top Regions by Lanterns' : '孔明灯数量最多的地区'}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {(() => {
                    const regionTotals = [
                      { region: 'international' as Region, name: regionNames.international, count: internationalData.count, topProvince: null },
                      { region: 'central' as Region, name: regionNames.central, count: provinceData.filter(p => p.region === 'central').reduce((s, p) => s + p.count, 0), topProvince: provinceData.filter(p => p.region === 'central').sort((a, b) => b.count - a.count)[0] },
                      { region: 'north' as Region, name: regionNames.north, count: provinceData.filter(p => p.region === 'north').reduce((s, p) => s + p.count, 0), topProvince: provinceData.filter(p => p.region === 'north').sort((a, b) => b.count - a.count)[0] },
                      { region: 'northeast' as Region, name: regionNames.northeast, count: provinceData.filter(p => p.region === 'northeast').reduce((s, p) => s + p.count, 0), topProvince: provinceData.filter(p => p.region === 'northeast').sort((a, b) => b.count - a.count)[0] },
                      { region: 'east' as Region, name: regionNames.east, count: provinceData.filter(p => p.region === 'east').reduce((s, p) => s + p.count, 0), topProvince: provinceData.filter(p => p.region === 'east').sort((a, b) => b.count - a.count)[0] },
                      { region: 'south' as Region, name: regionNames.south, count: provinceData.filter(p => p.region === 'south').reduce((s, p) => s + p.count, 0), topProvince: provinceData.filter(p => p.region === 'south').sort((a, b) => b.count - a.count)[0] },
                    ].sort((a, b) => b.count - a.count).slice(0, 3);

                    const trophyStyles = [
                      { bg: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/50', icon: 'text-yellow-400', order: 'order-2' },
                      { bg: 'bg-gradient-to-br from-gray-300/20 to-gray-400/10', border: 'border-gray-400/50', icon: 'text-gray-300', order: 'order-1' },
                      { bg: 'bg-gradient-to-br from-amber-600/20 to-amber-700/10', border: 'border-amber-600/50', icon: 'text-amber-600', order: 'order-3' },
                    ];

                    return regionTotals.map((item, index) => (
                      <motion.div
                        key={item.region}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: index === 0 ? 1.1 : 1 }}
                        transition={{ 
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }}
                        className={`${trophyStyles[index].bg} ${trophyStyles[index].order} border ${trophyStyles[index].border} rounded-xl p-3 text-center ${index === 0 ? 'z-10' : ''}`}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                          transition={{ 
                            delay: 0.5 + index * 0.15,
                            duration: 0.6,
                            ease: "easeInOut"
                          }}
                        >
                          <Trophy className={`w-6 h-6 mx-auto mb-1 ${trophyStyles[index].icon}`} />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === 'TH' ? `อันดับ ${index + 1}` : language === 'EN' ? `#${index + 1}` : `第${index + 1}名`}
                        </p>
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item.name[language]}
                        </p>
                        <p className="text-gold font-bold text-sm tabular-nums">
                          {(item.count / 1000000).toFixed(1)}M
                        </p>
                        {item.topProvince && (
                          <p className="text-[10px] text-muted-foreground mt-1 truncate">
                            🏆 {item.topProvince.name[language]}
                          </p>
                        )}
                      </motion.div>
                    ));
                  })()}
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.provinceStats.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
                />
              </div>
            </div>

            {/* Province list by region */}
            <div className="overflow-y-auto max-h-[400px] p-6">
              <div className="space-y-4">
                {/* International - not grouped */}
                {showInternational && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gold/10 to-transparent border border-gold/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🌍</span>
                      <span className="text-foreground font-semibold">{internationalData.name[language]}</span>
                    </div>
                    <span className="text-gold font-bold tabular-nums text-lg">
                      {internationalData.count.toLocaleString()}
                    </span>
                  </div>
                )}
                {regionOrder.map(region => {
                  const provinces = groupedProvinces[region];
                  if (provinces.length === 0) return null;

                  const isExpanded = expandedRegions[region];
                  const regionTotal = getRegionTotal(region);

                  return (
                    <div key={region} className="border border-border/50 rounded-xl overflow-hidden">
                      {/* Region Header */}
                      <button
                        onClick={() => toggleRegion(region)}
                        className="w-full flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary/70 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-foreground font-semibold">
                            {regionNames[region][language]}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({provinces.length})
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gold font-semibold tabular-nums">
                            {regionTotal.toLocaleString()}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Province List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 space-y-2">
                              {provinces.map((province) => {
                                const rank = getRankInRegion(province, region);
                                return (
                                  <motion.div
                                    key={province.name.TH}
                                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="w-7 h-7 flex items-center justify-center bg-gold/20 text-gold text-xs font-semibold rounded-full">
                                        {rank}
                                      </span>
                                      <span className="text-foreground text-sm">{province.name[language]}</span>
                                    </div>
                                    <span className="text-gold font-semibold tabular-nums text-sm">
                                      {province.count.toLocaleString()}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {filteredProvinces.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    {t.provinceStats.noResults}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProvinceStatsModal;