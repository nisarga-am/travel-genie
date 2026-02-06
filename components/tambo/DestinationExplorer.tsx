import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';

export default function DestinationExplorer({ place, highlights, bestSeason }: { place: string, highlights: string[], bestSeason: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white rounded-2xl shadow-lg border-l-4 border-blue-500 my-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold flex items-center gap-2"><MapPin className="text-blue-500" /> {place}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{bestSeason}</span>
      </div>
      <p className="text-sm text-gray-500 mb-2">Top Highlights:</p>
      <div className="flex flex-wrap gap-2">
        {highlights.map((h, i) => (
          <span key={i} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
            <Star size={12} className="text-yellow-500"/> {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}