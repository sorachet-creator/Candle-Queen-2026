import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useState } from 'react';

interface ProvinceStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const provinceData = [
  { name: 'กรุงเทพมหานคร', count: 12500000 },
  { name: 'เชียงใหม่', count: 4200000 },
  { name: 'ภูเก็ต', count: 3800000 },
  { name: 'ขอนแก่น', count: 3500000 },
  { name: 'นครราชสีมา', count: 3200000 },
  { name: 'ชลบุรี', count: 2900000 },
  { name: 'สงขลา', count: 2700000 },
  { name: 'เชียงราย', count: 2500000 },
  { name: 'อุดรธานี', count: 2300000 },
  { name: 'สุราษฎร์ธานี', count: 2100000 },
  { name: 'นครศรีธรรมราช', count: 1900000 },
  { name: 'พิษณุโลก', count: 1700000 },
  { name: 'ระยอง', count: 1500000 },
  { name: 'อุบลราชธานี', count: 1400000 },
  { name: 'นนทบุรี', count: 1300000 },
  { name: 'สมุทรปราการ', count: 1200000 },
  { name: 'ปทุมธานี', count: 1100000 },
  { name: 'ลำปาง', count: 1000000 },
];

const ProvinceStatsModal = ({ isOpen, onClose }: ProvinceStatsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProvinces = provinceData.filter(province =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  ยอดจุดโคมลอยแต่ละจังหวัด
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
                <p className="text-sm text-muted-foreground mb-1">ยอดรวมทั่วประเทศ</p>
                <p className="text-3xl font-bold text-gold">{totalCount.toLocaleString()}</p>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ค้นหาจังหวัด..."
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
                    key={province.name}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-gold/20 text-gold text-sm font-semibold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{province.name}</span>
                    </div>
                    <span className="text-gold font-semibold tabular-nums">
                      {province.count.toLocaleString()}
                    </span>
                  </motion.div>
                ))}

                {filteredProvinces.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    ไม่พบจังหวัดที่ค้นหา
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
