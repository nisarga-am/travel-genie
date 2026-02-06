import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';

export default function TripStats({ totalSpent, topCategory }: { totalSpent: string, topCategory: string }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm my-4">
      <div className="flex items-center gap-2 mb-4 text-gray-500 uppercase text-xs font-bold">
        <PieChart size={16}/> Trip Summary
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
           <p className="text-sm text-gray-500">Total Spent</p>
           <p className="text-2xl font-bold text-gray-800">{totalSpent}</p>
        </div>
        <div>
           <p className="text-sm text-gray-500">Top Spend</p>
           <p className="text-lg font-semibold text-indigo-600">{topCategory}</p>
        </div>
      </div>
      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 w-[70%]"></div>
      </div>
    </motion.div>
  );
}