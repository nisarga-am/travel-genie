import { motion } from 'framer-motion';
import { Plane, Clock } from 'lucide-react';

export default function FlightFinder({ from, to, price, duration }: { from: string, to: string, price: string, duration: string }) {
  return (
    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 bg-slate-800 text-white rounded-xl shadow-xl my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">{from}</div>
        <Plane className="text-blue-400 rotate-90" />
        <div className="text-2xl font-bold">{to}</div>
      </div>
      <div className="flex justify-between items-center bg-slate-700 p-3 rounded-lg">
        <div className="flex items-center gap-2 text-gray-300">
            <Clock size={16}/> {duration}
        </div>
        <div className="text-xl font-bold text-green-400">{price}</div>
      </div>
      <button className="w-full mt-3 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-medium transition">
        Book This Deal
      </button>
    </motion.div>
  );
}