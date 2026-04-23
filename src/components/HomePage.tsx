
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, List, ArrowRight } from 'lucide-react';

interface HomeProps {
  onSelect: (choice: 'singly' | 'doubly') => void;
}

export const HomePage = ({ onSelect }: HomeProps) => {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-8 font-sans selection:bg-indigo-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-16">
          <div className="inline-flex p-4 bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50 mb-8 items-center justify-center">
            <Layers className="text-indigo-600 w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase">
            Data Structure <span className="text-indigo-600">Visualizer</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Khám phá và làm chủ các cấu trúc dữ liệu cơ bản thông qua các mô phỏng hình học sống động và trực quan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('singly')}
            className="group relative bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start gap-6 text-left transition-all hover:border-emerald-500 hover:shadow-emerald-200/50 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl relative z-10">
              <List size={32} strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Singly Linked List</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Danh sách liên kết đơn với các nút dữ liệu chỉ trỏ về phía trước. Cơ bản, tối ưu nhưng mạnh mẽ.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                Khám phá ngay <ArrowRight size={14} />
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('doubly')}
            className="group relative bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start gap-6 text-left transition-all hover:border-indigo-500 hover:shadow-indigo-200/50 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl relative z-10">
              <Layers size={32} strokeWidth={2.5} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Doubly Linked List</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Danh sách liên kết kép hỗ trợ duyệt hai chiều linh hoạt với các con trỏ Trước và Sau.
              </p>
              <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                Khám phá ngay <ArrowRight size={14} />
              </div>
            </div>
          </motion.button>
        </div>

        <div className="mt-20 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Minh họa thuật toán • 2026</p>
        </div>
      </motion.div>
    </div>
  );
};
