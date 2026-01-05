import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProvinceStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const provinceData = [
  { name: { TH: 'กรุงเทพมหานคร', EN: 'Bangkok', CN: '曼谷' }, count: 12500000 },
  { name: { TH: 'เชียงใหม่', EN: 'Chiang Mai', CN: '清迈' }, count: 4200000 },
  { name: { TH: 'ภูเก็ต', EN: 'Phuket', CN: '普吉' }, count: 3800000 },
  { name: { TH: 'ขอนแก่น', EN: 'Khon Kaen', CN: '孔敬' }, count: 3500000 },
  { name: { TH: 'นครราชสีมา', EN: 'Nakhon Ratchasima', CN: '呵叻' }, count: 3200000 },
  { name: { TH: 'ชลบุรี', EN: 'Chonburi', CN: '春武里' }, count: 2900000 },
  { name: { TH: 'สงขลา', EN: 'Songkhla', CN: '宋卡' }, count: 2700000 },
  { name: { TH: 'เชียงราย', EN: 'Chiang Rai', CN: '清莱' }, count: 2500000 },
  { name: { TH: 'อุดรธานี', EN: 'Udon Thani', CN: '乌隆他尼' }, count: 2300000 },
  { name: { TH: 'สุราษฎร์ธานี', EN: 'Surat Thani', CN: '素叻他尼' }, count: 2100000 },
  { name: { TH: 'นครศรีธรรมราช', EN: 'Nakhon Si Thammarat', CN: '洛坤' }, count: 1900000 },
  { name: { TH: 'พิษณุโลก', EN: 'Phitsanulok', CN: '彭世洛' }, count: 1700000 },
  { name: { TH: 'ระยอง', EN: 'Rayong', CN: '罗勇' }, count: 1500000 },
  { name: { TH: 'อุบลราชธานี', EN: 'Ubon Ratchathani', CN: '乌汶' }, count: 1400000 },
  { name: { TH: 'นนทบุรี', EN: 'Nonthaburi', CN: '暖武里' }, count: 1300000 },
  { name: { TH: 'สมุทรปราการ', EN: 'Samut Prakan', CN: '北榄' }, count: 1200000 },
  { name: { TH: 'ปทุมธานี', EN: 'Pathum Thani', CN: '巴吞他尼' }, count: 1100000 },
  { name: { TH: 'ลำปาง', EN: 'Lampang', CN: '南邦' }, count: 1000000 },
];

const ProvinceStatsModal = ({ isOpen, onClose }: ProvinceStatsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, language } = useLanguage();

  const filteredProvinces = provinceData.filter(province =>
    province.name[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCount = provinceData.reduce((sum, p) => sum + p.count, 0);

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
            <div className="sticky top-0 bg-card border-b border-border p-6">
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

            {/* Province list */}
            <div className="overflow-y-auto max-h-[400px] p-6">
              <div className="space-y-3">
                {filteredProvinces.map((province, index) => (
                  <motion.div
                    key={province.name.TH}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-gold/20 text-gold text-sm font-semibold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{province.name[language]}</span>
                    </div>
                    <span className="text-gold font-semibold tabular-nums">
                      {province.count.toLocaleString()}
                    </span>
                  </motion.div>
                ))}

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