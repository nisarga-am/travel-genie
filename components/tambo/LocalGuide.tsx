import { motion } from 'framer-motion';
import { Navigation, Coffee, Landmark } from 'lucide-react';

export default function LocalGuide({ nearbySpot, type, distance }: { nearbySpot: string, type: 'Food' | 'Sight', distance: string }) {
  return (
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl my-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-200 text-emerald-800 rounded-full">
           {type === 'Food' ? <Coffee size={24} /> : <Landmark size={24} />}
        </div>
        <div>
           <h4 className="font-bold text-emerald-900">{nearbySpot}</h4>
           <p className="text-emerald-700 text-sm flex items-center gap-1">
             <Navigation size={12}/> {distance} away from you
           </p>
        </div>
      </div>
    </motion.div>
  );
}