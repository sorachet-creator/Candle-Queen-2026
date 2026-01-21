import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

interface RegionalMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Region = 'international' | 'central' | 'north' | 'northeast' | 'east' | 'south' | 'west';

const regionNames: Record<Region, Record<Language, string>> = {
  international: { TH: 'ต่างประเทศ', EN: 'International', CN: '国际' },
  central: { TH: 'ภาคกลาง', EN: 'Central', CN: '中部' },
  north: { TH: 'ภาคเหนือ', EN: 'Northern', CN: '北部' },
  northeast: { TH: 'อีสาน', EN: 'Northeastern', CN: '东北部' },
  east: { TH: 'ภาคตะวันออก', EN: 'Eastern', CN: '东部' },
  south: { TH: 'ภาคใต้', EN: 'Southern', CN: '南部' },
  west: { TH: 'ภาคตะวันตก', EN: 'Western', CN: '西部' },
};

interface ProvinceData {
  name: Record<Language, string>;
  count: number;
}

// Province data by region
const provincesByRegion: Record<Exclude<Region, 'international'>, ProvinceData[]> = {
  central: [
    { name: { TH: 'กรุงเทพมหานคร', EN: 'Bangkok', CN: '曼谷' }, count: 12500000 },
    { name: { TH: 'นนทบุรี', EN: 'Nonthaburi', CN: '暖武里' }, count: 1300000 },
    { name: { TH: 'ปทุมธานี', EN: 'Pathum Thani', CN: '巴吞他尼' }, count: 1100000 },
    { name: { TH: 'สมุทรปราการ', EN: 'Samut Prakan', CN: '北榄' }, count: 1200000 },
    { name: { TH: 'พระนครศรีอยุธยา', EN: 'Ayutthaya', CN: '大城' }, count: 850000 },
    { name: { TH: 'นครปฐม', EN: 'Nakhon Pathom', CN: '佛统' }, count: 920000 },
    { name: { TH: 'สระบุรี', EN: 'Saraburi', CN: '北标' }, count: 640000 },
    { name: { TH: 'ลพบุรี', EN: 'Lopburi', CN: '华富里' }, count: 750000 },
  ],
  north: [
    { name: { TH: 'เชียงใหม่', EN: 'Chiang Mai', CN: '清迈' }, count: 4200000 },
    { name: { TH: 'เชียงราย', EN: 'Chiang Rai', CN: '清莱' }, count: 2500000 },
    { name: { TH: 'พิษณุโลก', EN: 'Phitsanulok', CN: '彭世洛' }, count: 1700000 },
    { name: { TH: 'นครสวรรค์', EN: 'Nakhon Sawan', CN: '北揽坡' }, count: 1060000 },
    { name: { TH: 'ลำปาง', EN: 'Lampang', CN: '南邦' }, count: 1000000 },
    { name: { TH: 'เพชรบูรณ์', EN: 'Phetchabun', CN: '碧差汶' }, count: 1000000 },
    { name: { TH: 'กำแพงเพชร', EN: 'Kamphaeng Phet', CN: '甘烹碧' }, count: 730000 },
    { name: { TH: 'ตาก', EN: 'Tak', CN: '达府' }, count: 670000 },
  ],
  northeast: [
    { name: { TH: 'ขอนแก่น', EN: 'Khon Kaen', CN: '孔敬' }, count: 3500000 },
    { name: { TH: 'นครราชสีมา', EN: 'Nakhon Ratchasima', CN: '呵叻' }, count: 3200000 },
    { name: { TH: 'อุดรธานี', EN: 'Udon Thani', CN: '乌隆他尼' }, count: 2300000 },
    { name: { TH: 'บุรีรัมย์', EN: 'Buriram', CN: '武里南' }, count: 1600000 },
    { name: { TH: 'ศรีสะเกษ', EN: 'Sisaket', CN: '四色菊' }, count: 1500000 },
    { name: { TH: 'อุบลราชธานี', EN: 'Ubon Ratchathani', CN: '乌汶' }, count: 1400000 },
    { name: { TH: 'สุรินทร์', EN: 'Surin', CN: '素林' }, count: 1400000 },
    { name: { TH: 'ร้อยเอ็ด', EN: 'Roi Et', CN: '黎逸' }, count: 1300000 },
  ],
  east: [
    { name: { TH: 'ชลบุรี', EN: 'Chonburi', CN: '春武里' }, count: 2900000 },
    { name: { TH: 'ระยอง', EN: 'Rayong', CN: '罗勇' }, count: 1500000 },
    { name: { TH: 'ฉะเชิงเทรา', EN: 'Chachoengsao', CN: '北柳' }, count: 720000 },
    { name: { TH: 'สระแก้ว', EN: 'Sa Kaeo', CN: '沙缴' }, count: 560000 },
    { name: { TH: 'จันทบุรี', EN: 'Chanthaburi', CN: '尖竹汶' }, count: 540000 },
    { name: { TH: 'ปราจีนบุรี', EN: 'Prachin Buri', CN: '巴真' }, count: 490000 },
    { name: { TH: 'ตราด', EN: 'Trat', CN: '达叻' }, count: 230000 },
  ],
  south: [
    { name: { TH: 'สงขลา', EN: 'Songkhla', CN: '宋卡' }, count: 1400000 },
    { name: { TH: 'สุราษฎร์ธานี', EN: 'Surat Thani', CN: '素叻他尼' }, count: 1100000 },
    { name: { TH: 'นครศรีธรรมราช', EN: 'Nakhon Si Thammarat', CN: '洛坤' }, count: 1600000 },
    { name: { TH: 'ภูเก็ต', EN: 'Phuket', CN: '普吉' }, count: 850000 },
    { name: { TH: 'กระบี่', EN: 'Krabi', CN: '甲米' }, count: 480000 },
    { name: { TH: 'ตรัง', EN: 'Trang', CN: '董里' }, count: 640000 },
    { name: { TH: 'พังงา', EN: 'Phang Nga', CN: '攀牙' }, count: 280000 },
    { name: { TH: 'ชุมพร', EN: 'Chumphon', CN: '春蓬' }, count: 510000 },
  ],
  west: [
    { name: { TH: 'กาญจนบุรี', EN: 'Kanchanaburi', CN: '北碧' }, count: 890000 },
    { name: { TH: 'ราชบุรี', EN: 'Ratchaburi', CN: '叻丕' }, count: 870000 },
    { name: { TH: 'สุพรรณบุรี', EN: 'Suphan Buri', CN: '素攀武里' }, count: 850000 },
    { name: { TH: 'ประจวบคีรีขันธ์', EN: 'Prachuap Khiri Khan', CN: '巴蜀' }, count: 540000 },
    { name: { TH: 'เพชรบุรี', EN: 'Phetchaburi', CN: '碧武里' }, count: 480000 },
    { name: { TH: 'สมุทรสงคราม', EN: 'Samut Songkhram', CN: '夜功' }, count: 190000 },
  ],
};

// Calculate region totals from province data
const regionData: Record<Region, { count: number; color: string }> = {
  international: { count: 8500000, color: '#9333ea' },
  north: { 
    count: provincesByRegion.north.reduce((sum, p) => sum + p.count, 0), 
    color: '#22c55e' 
  },
  northeast: { 
    count: provincesByRegion.northeast.reduce((sum, p) => sum + p.count, 0), 
    color: '#f97316' 
  },
  central: { 
    count: provincesByRegion.central.reduce((sum, p) => sum + p.count, 0), 
    color: '#eab308' 
  },
  east: { 
    count: provincesByRegion.east.reduce((sum, p) => sum + p.count, 0), 
    color: '#3b82f6' 
  },
  west: { 
    count: provincesByRegion.west.reduce((sum, p) => sum + p.count, 0), 
    color: '#ec4899' 
  },
  south: { 
    count: provincesByRegion.south.reduce((sum, p) => sum + p.count, 0), 
    color: '#06b6d4' 
  },
};

const RegionalMapModal = ({ isOpen, onClose }: RegionalMapModalProps) => {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Exclude<Region, 'international'> | null>(null);

  const totalCount = Object.values(regionData).reduce((sum, r) => sum + r.count, 0);

  // Sort regions by count for ranking
  const sortedRegions = Object.entries(regionData)
    .filter(([key]) => key !== 'international')
    .sort(([, a], [, b]) => b.count - a.count) as [Region, { count: number; color: string }][];

  const handleRegionClick = (region: Exclude<Region, 'international'>) => {
    setSelectedRegion(region);
  };

  const handleBackToMap = () => {
    setSelectedRegion(null);
  };

  const texts = {
    title: { TH: 'แผนที่ยอดโคมลอยรายภาค', EN: 'Regional Lantern Map', CN: '地区孔明灯地图' },
    total: { TH: 'ยอดรวมทั่วประเทศ', EN: 'Total Nationwide', CN: '全国总计' },
    ranking: { TH: '🏆 อันดับภาค', EN: '🏆 Regional Ranking', CN: '🏆 地区排名' },
    clickToView: { TH: 'คลิกที่ภาคเพื่อดูจังหวัด', EN: 'Click region to view provinces', CN: '点击地区查看省份' },
    provinces: { TH: 'จังหวัด', EN: 'Provinces', CN: '省份' },
    back: { TH: 'กลับ', EN: 'Back', CN: '返回' },
    totalInRegion: { TH: 'ยอดรวมในภาค', EN: 'Regional Total', CN: '地区总计' },
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
            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedRegion && (
                    <button
                      onClick={handleBackToMap}
                      className="p-2 text-foreground/50 hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h3 className="text-xl font-semibold text-gold">
                    {selectedRegion 
                      ? regionNames[selectedRegion][language] 
                      : texts.title[language]}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Total or Region Total */}
              <div className="mt-4 bg-secondary/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {selectedRegion ? texts.totalInRegion[language] : texts.total[language]}
                </p>
                <p className="text-3xl font-bold text-gold">
                  {selectedRegion 
                    ? regionData[selectedRegion].count.toLocaleString()
                    : totalCount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {selectedRegion ? (
                  /* Province List View */
                  <motion.div
                    key="provinces"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      📍 {texts.provinces[language]} ({provincesByRegion[selectedRegion].length})
                    </h4>
                    
                    {provincesByRegion[selectedRegion]
                      .sort((a, b) => b.count - a.count)
                      .map((province, index) => (
                        <motion.div
                          key={province.name.EN}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 bg-secondary/30 border border-border/50 rounded-xl hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                              index === 1 ? 'bg-gray-400/20 text-gray-300' :
                              index === 2 ? 'bg-amber-600/20 text-amber-600' :
                              'bg-secondary text-muted-foreground'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="text-foreground font-medium">
                              {province.name[language]}
                            </span>
                          </div>
                          <span className="text-gold font-bold tabular-nums">
                            {province.count.toLocaleString()}
                          </span>
                        </motion.div>
                      ))}
                  </motion.div>
                ) : (
                  /* Map View */
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      👆 {texts.clickToView[language]}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Visual Map */}
                      <div className="relative">
                        <svg viewBox="0 0 400 500" className="w-full h-auto">
                          {/* Northern Region */}
                          <motion.path
                            d="M140,30 L200,20 L260,40 L280,80 L260,120 L200,130 L160,110 L130,70 Z"
                            fill={regionData.north.color}
                            fillOpacity={0.3}
                            stroke={regionData.north.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('north')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="200" y="75" textAnchor="middle" className="fill-foreground text-xs font-medium pointer-events-none">
                            {regionNames.north[language]}
                          </text>
                          <text x="200" y="92" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.north.count / 1000000).toFixed(1)}M
                          </text>

                          {/* Northeastern Region */}
                          <motion.path
                            d="M280,80 L340,90 L370,140 L360,200 L320,220 L270,200 L260,150 L260,120 Z"
                            fill={regionData.northeast.color}
                            fillOpacity={0.3}
                            stroke={regionData.northeast.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('northeast')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="310" y="145" textAnchor="middle" className="fill-foreground text-xs font-medium pointer-events-none">
                            {regionNames.northeast[language]}
                          </text>
                          <text x="310" y="162" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.northeast.count / 1000000).toFixed(1)}M
                          </text>

                          {/* Western Region */}
                          <motion.path
                            d="M80,120 L130,100 L160,130 L150,180 L120,220 L80,210 L60,160 Z"
                            fill={regionData.west.color}
                            fillOpacity={0.3}
                            stroke={regionData.west.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('west')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="110" y="160" textAnchor="middle" className="fill-foreground text-[10px] font-medium pointer-events-none">
                            {regionNames.west[language]}
                          </text>
                          <text x="110" y="175" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.west.count / 1000000).toFixed(1)}M
                          </text>

                          {/* Central Region */}
                          <motion.path
                            d="M160,130 L200,130 L260,150 L250,200 L200,230 L150,200 L150,180 Z"
                            fill={regionData.central.color}
                            fillOpacity={0.3}
                            stroke={regionData.central.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('central')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="200" y="175" textAnchor="middle" className="fill-foreground text-xs font-medium pointer-events-none">
                            {regionNames.central[language]}
                          </text>
                          <text x="200" y="192" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.central.count / 1000000).toFixed(1)}M
                          </text>

                          {/* Eastern Region */}
                          <motion.path
                            d="M270,200 L320,220 L340,270 L310,300 L260,280 L250,230 L250,200 Z"
                            fill={regionData.east.color}
                            fillOpacity={0.3}
                            stroke={regionData.east.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('east')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="290" y="250" textAnchor="middle" className="fill-foreground text-xs font-medium pointer-events-none">
                            {regionNames.east[language]}
                          </text>
                          <text x="290" y="267" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.east.count / 1000000).toFixed(1)}M
                          </text>

                          {/* Southern Region */}
                          <motion.path
                            d="M150,250 L200,230 L220,260 L200,320 L180,380 L160,440 L140,480 L120,450 L100,380 L110,320 L130,280 Z"
                            fill={regionData.south.color}
                            fillOpacity={0.3}
                            stroke={regionData.south.color}
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ fillOpacity: 0.6, scale: 1.02 }}
                            onClick={() => handleRegionClick('south')}
                            style={{ cursor: 'pointer', transformOrigin: 'center' }}
                          />
                          <text x="160" y="350" textAnchor="middle" className="fill-foreground text-xs font-medium pointer-events-none">
                            {regionNames.south[language]}
                          </text>
                          <text x="160" y="367" textAnchor="middle" className="fill-gold text-xs font-bold pointer-events-none">
                            {(regionData.south.count / 1000000).toFixed(1)}M
                          </text>
                        </svg>
                      </div>

                      {/* Region List / Leaderboard */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground mb-4">
                          {texts.ranking[language]}
                        </h4>

                        {/* International */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-transparent border border-purple-500/30 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🌍</span>
                            <span className="text-foreground font-semibold">{regionNames.international[language]}</span>
                          </div>
                          <span className="text-gold font-bold tabular-nums">
                            {regionData.international.count.toLocaleString()}
                          </span>
                        </motion.div>

                        {/* Ranked Regions */}
                        {sortedRegions.map(([region, data], index) => (
                          <motion.div
                            key={region}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onClick={() => handleRegionClick(region as Exclude<Region, 'international'>)}
                            className="flex items-center justify-between p-4 bg-secondary/30 border border-border/50 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                                index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                index === 1 ? 'bg-gray-400/20 text-gray-300' :
                                index === 2 ? 'bg-amber-600/20 text-amber-600' :
                                'bg-secondary text-muted-foreground'
                              }`}>
                                {index + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: data.color }}
                                />
                                <span className="text-foreground font-medium group-hover:text-gold transition-colors">
                                  {regionNames[region][language]}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gold font-bold tabular-nums">
                                {data.count.toLocaleString()}
                              </span>
                              <ChevronLeft className="w-4 h-4 rotate-180 text-muted-foreground group-hover:text-gold transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegionalMapModal;
