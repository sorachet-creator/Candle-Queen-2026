import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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

// Mock data for demonstration - replace with actual data
const regionData: Record<Region, { count: number; color: string }> = {
  international: { count: 8500000, color: '#9333ea' },
  north: { count: 15230000, color: '#22c55e' },
  northeast: { count: 21500000, color: '#f97316' },
  central: { count: 24300000, color: '#eab308' },
  east: { count: 6940000, color: '#3b82f6' },
  west: { count: 4630000, color: '#ec4899' },
  south: { count: 8100000, color: '#06b6d4' },
};

const RegionalMapModal = ({ isOpen, onClose }: RegionalMapModalProps) => {
  const { language } = useLanguage();

  const totalCount = Object.values(regionData).reduce((sum, r) => sum + r.count, 0);

  // Sort regions by count for ranking
  const sortedRegions = Object.entries(regionData)
    .filter(([key]) => key !== 'international')
    .sort(([, a], [, b]) => b.count - a.count) as [Region, { count: number; color: string }][];

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
                <h3 className="text-xl font-semibold text-gold">
                  {language === 'TH' ? 'แผนที่ยอดโคมลอยรายภาค' : 
                   language === 'EN' ? 'Regional Lantern Map' : 
                   '地区孔明灯地图'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Total */}
              <div className="mt-4 bg-secondary/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'TH' ? 'ยอดรวมทั่วประเทศ' : 
                   language === 'EN' ? 'Total Nationwide' : 
                   '全国总计'}
                </p>
                <p className="text-3xl font-bold text-gold">{totalCount.toLocaleString()}</p>
              </div>
            </div>

            {/* Map Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="200" y="75" textAnchor="middle" className="fill-foreground text-xs font-medium">
                      {regionNames.north[language]}
                    </text>
                    <text x="200" y="92" textAnchor="middle" className="fill-gold text-xs font-bold">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="310" y="145" textAnchor="middle" className="fill-foreground text-xs font-medium">
                      {regionNames.northeast[language]}
                    </text>
                    <text x="310" y="162" textAnchor="middle" className="fill-gold text-xs font-bold">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="110" y="160" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                      {regionNames.west[language]}
                    </text>
                    <text x="110" y="175" textAnchor="middle" className="fill-gold text-xs font-bold">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="200" y="175" textAnchor="middle" className="fill-foreground text-xs font-medium">
                      {regionNames.central[language]}
                    </text>
                    <text x="200" y="192" textAnchor="middle" className="fill-gold text-xs font-bold">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="290" y="250" textAnchor="middle" className="fill-foreground text-xs font-medium">
                      {regionNames.east[language]}
                    </text>
                    <text x="290" y="267" textAnchor="middle" className="fill-gold text-xs font-bold">
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
                      style={{ cursor: 'pointer', transformOrigin: 'center' }}
                    />
                    <text x="160" y="350" textAnchor="middle" className="fill-foreground text-xs font-medium">
                      {regionNames.south[language]}
                    </text>
                    <text x="160" y="367" textAnchor="middle" className="fill-gold text-xs font-bold">
                      {(regionData.south.count / 1000000).toFixed(1)}M
                    </text>
                  </svg>
                </div>

                {/* Region List / Leaderboard */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    {language === 'TH' ? '🏆 อันดับภาค' : 
                     language === 'EN' ? '🏆 Regional Ranking' : 
                     '🏆 地区排名'}
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
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="text-foreground font-medium">
                            {regionNames[region][language]}
                          </span>
                        </div>
                      </div>
                      <span className="text-gold font-bold tabular-nums">
                        {data.count.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegionalMapModal;
