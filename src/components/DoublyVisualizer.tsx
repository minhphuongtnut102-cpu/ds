
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  FileText, 
  FastForward, 
  Info,
  Loader2,
  Trash2,
  Settings2,
  ChevronLeft,
  ChevronRight,
  Home,
  Code as CodeIcon
} from 'lucide-react';
import { NodeData, Step } from '../types';

const INITIAL_DATA = [10, 20, 30];
const LIGHT_PINK = 'bg-white border-slate-800 text-slate-800';
const HOT_PINK = 'bg-emerald-500 border-slate-800 text-white';

const PSEUDOCODE_INSERT_HEAD = [
  'INSERT_HEAD_DOUBLY(x):',
  '  newNode = create Node(x)',
  '  newNode.next = head',
  '  if head is not NULL:',
  '    head.prev = newNode',
  '  head = newNode',
  '  newNode.prev = NULL'
];

const JS_CODE_INSERT_HEAD = [
  'function addHead(val) {',
  '  let node = new Node(val);',
  '  node.next = this.head;',
  '  if (this.head) this.head.prev = node;',
  '  this.head = node;',
  '  node.prev = null;',
  '}'
];

const PSEUDOCODE_INSERT_TAIL = [
  'INSERT_TAIL_DOUBLY(x):',
  '  newNode = create Node(x)',
  '  if head is NULL:',
  '    head = newNode',
  '  else:',
  '    curr = head',
  '    while curr.next: curr = curr.next',
  '    curr.next = newNode',
  '    newNode.prev = curr',
  '  newNode.next = NULL'
];

const JS_CODE_INSERT_TAIL = [
  'function addTail(val) {',
  '  let node = new Node(val);',
  '  if (!this.head) { this.head = node; return; }',
  '  let curr = this.head;',
  '  while(curr.next) curr = curr.next;',
  '  curr.next = node;',
  '  node.prev = curr;',
  '}'
];

const PSEUDOCODE_INSERT_AT = [
  'INSERT_AT_DOUBLY(pos, x):',
  '  if pos == 0: return INSERT_HEAD(x)',
  '  newNode = create Node(x)',
  '  curr = head',
  '  for i from 0 to pos - 1:',
  '    curr = curr.next',
  '  newNode.next = curr.next',
  '  newNode.prev = curr',
  '  if curr.next is not NULL:',
  '    curr.next.prev = newNode',
  '  curr.next = newNode'
];

const JS_CODE_INSERT_AT = [
  'function insertAt(pos, val) {',
  '  if (pos === 0) return addHead(val);',
  '  let node = new Node(val);',
  '  let curr = this.head;',
  '  for(let i=0; i<pos-1; i++) curr = curr.next;',
  '  node.next = curr.next;',
  '  node.prev = curr;',
  '  if(curr.next) curr.next.prev = node;',
  '  curr.next = node;',
  '}'
];

const Node = ({ data, isProcessing, isHighlight, index, total }: { data: NodeData, isProcessing?: boolean, isHighlight?: boolean, index: number, total: number, key?: React.Key }) => {
  return (
    <motion.div
      layout
      initial={{ y: -100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="relative flex items-center group -ml-2 first:ml-0"
    >
      {index === 0 && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-800 uppercase tracking-widest bg-white border-2 border-slate-800 px-3 py-1 rounded-full shadow-md z-40">Head</div>
      )}
      {index === total - 1 && index !== 0 && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-200 border-2 border-slate-300 px-3 py-1 rounded-full z-40">Tail</div>
      )}

      {/* Doubly Node Body - 3 Distinct Colored Sections */}
      <div className={`flex w-[140px] h-[70px] rounded-2xl border-[3px] border-slate-900 transition-all duration-300 relative items-stretch overflow-hidden shadow-[5px_5px_0_rgb(30,41,59)] ${isHighlight || isProcessing ? 'scale-110 z-20 ring-4 ring-yellow-400' : 'z-10'}`}>
        {/* Prev Pointer Section - RED */}
        <div className={`w-[30px] border-r-2 border-slate-900 flex items-center justify-center relative transition-colors duration-300 bg-red-600`}>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm border border-slate-900/10" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-black text-white uppercase tracking-tighter shadow-sm">Trước</div>
        </div>

        {/* Data Section - GREEN */}
        <div className={`flex-1 flex flex-col items-center justify-center font-black transition-colors duration-300 bg-emerald-500 text-white border-x-0`}>
          <div className="text-[7px] uppercase opacity-70 mb-1">Dữ liệu</div>
          <div className="font-mono text-2xl leading-none tracking-tighter">{data.value}</div>
        </div>

        {/* Next Pointer Section - ORANGE */}
        <div className={`w-[30px] border-l-2 border-slate-900 flex items-center justify-center relative transition-colors duration-300 bg-orange-500`}>
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm border border-slate-900/10" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-black text-white uppercase tracking-tighter shadow-sm">Tiếp</div>
        </div>

        {(isHighlight || isProcessing) && <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />}
        
        {data.isRecentlyAdded && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -top-12 left-0 right-0 text-center px-1 py-0.5 bg-blue-600 text-white text-[9px] font-black uppercase rounded shadow-lg z-30 ring-2 ring-white">Mới Added</motion.div>
        )}
      </div>

      {/* Bi-directional Arrow Area */}
      <div className="w-24 h-16 flex flex-col justify-center gap-1 relative px-2">
        <motion.div animate={{ opacity: index < total - 1 ? 1 : 0.3 }} className={`flex items-center w-full ${isHighlight || isProcessing ? 'text-red-500' : 'text-slate-400'}`}>
          <div className="h-1 flex-1 bg-current rounded-full" /><ChevronRight size={16} className="-ml-3" strokeWidth={4} />
        </motion.div>
        <motion.div animate={{ opacity: index < total - 1 ? 1 : 0.3 }} className={`flex items-center w-full flex-row-reverse ${isHighlight || isProcessing ? 'text-red-500' : 'text-slate-300'}`}>
          <div className="h-1 flex-1 bg-current rounded-full" /><ChevronLeft size={16} className="-mr-3" strokeWidth={4} />
        </motion.div>
        {index === total - 1 && <div className="absolute left-16 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 uppercase font-mono tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">Null</div>}
      </div>
    </motion.div>
  );
};

export const DoublyVisualizer = ({ onBack }: { onBack: () => void }) => {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_DATA.map(v => ({ id: Math.random().toString(36).substr(2, 9), value: v, color: LIGHT_PINK })));
  const [initialInput, setInitialInput] = useState<string>(INITIAL_DATA.join(', '));
  const [inputValue, setInputValue] = useState<string>('40');
  const [inputPos, setInputPos] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(800);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [codeType, setCodeType] = useState<'pseudo' | 'js'>('pseudo');
  const [message, setMessage] = useState('Sẵn sàng để bắt đầu');
  const [activeCode, setActiveCode] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    const data = initialInput.split(',').map(s => s.trim()).filter(s => s !== '' && !isNaN(Number(s))).map(Number);
    setNodes(data.map(v => ({ id: Math.random().toString(36).substr(2, 9), value: v, color: LIGHT_PINK })));
    setIsAnimating(false);
    setCurrentStep(null);
    setMessage('Danh sách đã được đặt lại');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const sleep = (ms: number) => new Promise(resolve => { timerRef.current = setTimeout(resolve, ms); });

  const runSteps = async (steps: Step[]) => {
    setIsAnimating(true);
    for (const step of steps) {
      setCurrentStep(step);
      setMessage(step.description);
      if (step.nodes) setNodes(step.nodes);
      await sleep(animSpeed);
    }
    setIsAnimating(false);
    const lastStep = steps[steps.length - 1];
    const newNodeId = lastStep.nodes.find(n => n.isNew || n.isProcessing)?.id;
    setNodes(prev => prev.map(n => ({ ...n, isHighlight: false, isProcessing: false, isNew: false, isRecentlyAdded: n.id === newNodeId })));
  };

  const insertHead = async () => {
    const val = parseInt(inputValue);
    const newId = 'new-' + Math.random().toString(36).substr(2, 9);
    setActiveCode(codeType === 'pseudo' ? PSEUDOCODE_INSERT_HEAD : JS_CODE_INSERT_HEAD);
    const steps: Step[] = [
      { description: `Bắt đầu chèn vào đầu danh sách kép.`, lineIndex: 0, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
      { description: `Khởi tạo nút mới ${val}.`, lineIndex: 2, nodes: [{ id: newId, value: val, color: HOT_PINK, isNew: true, isProcessing: true }, ...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
      { description: `Thiết lập NEXT của nút mới trỏ tới Head cũ.`, lineIndex: 3, nodes: [{ id: newId, value: val, color: HOT_PINK, isProcessing: true }, ...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
      { description: `Cập nhật PREV của Head cũ trỏ ngược lại nút mới.`, lineIndex: 5, nodes: [{ id: newId, value: val, color: HOT_PINK, isProcessing: true }, ...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
      { description: `Hoàn tất cập nhật cấu trúc Head.`, lineIndex: 6, nodes: [{ id: newId, value: val, color: HOT_PINK }, ...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] }
    ];
    await runSteps(steps);
  };

  const insertTail = async () => {
    const val = parseInt(inputValue);
    const newId = 'new-' + Math.random().toString(36).substr(2, 9);
    setActiveCode(codeType === 'pseudo' ? PSEUDOCODE_INSERT_TAIL : JS_CODE_INSERT_TAIL);
    const steps: Step[] = [
      { description: `Bắt đầu chèn vào cuối danh sách kép.`, lineIndex: 0, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
      { description: `Tạo nút mới giá trị ${val}.`, lineIndex: 2, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false })), { id: newId, value: val, color: HOT_PINK, isNew: true, isProcessing: true }] }
    ];
    if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i++) {
            steps.push({
                description: i === nodes.length - 1 ? `Tìm thấy Tail: ${nodes[i].value}` : `Duyệt tìm Tail... đang ở ${nodes[i].value}`,
                lineIndex: 7,
                nodes: nodes.map((n, idx) => idx === i ? { ...n, isHighlight: true } : n).map(n => ({ ...n, isRecentlyAdded: false })).concat([{ id: newId, value: val, color: HOT_PINK, isProcessing: true }])
            });
        }
        steps.push({ description: `Kết nối NEXT của Tail hiện tại tới nút mới.`, lineIndex: 9, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false })), { id: newId, value: val, color: HOT_PINK, isProcessing: true }] });
        steps.push({ description: `Kết nối PREV của nút mới về Tail cũ.`, lineIndex: 10, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false })), { id: newId, value: val, color: HOT_PINK, isProcessing: false }] });
    }
    steps.push({ description: `Hoàn tất chèn cuối thành công.`, lineIndex: -1, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false })), { id: newId, value: val, color: HOT_PINK }] });
    await runSteps(steps);
  };

  const insertAt = async () => {
    const val = parseInt(inputValue);
    const pos = inputPos;
    const newId = 'new-' + Math.random().toString(36).substr(2, 9);
    setActiveCode(codeType === 'pseudo' ? PSEUDOCODE_INSERT_AT : JS_CODE_INSERT_AT);
    
    if (pos <= 0) return insertHead();
    if (pos >= nodes.length) return insertTail();

    const steps: Step[] = [
        { description: `Bắt đầu chèn vào vị trí ${pos}.`, lineIndex: 0, nodes: [...nodes.map(n => ({ ...n, isRecentlyAdded: false }))] },
        { description: `Tạo nút mới giá trị ${val}.`, lineIndex: 2, nodes: nodes.map(n => ({ ...n, isRecentlyAdded: false })).slice(0, pos).concat([{ id: newId, value: val, color: HOT_PINK, isNew: true, isProcessing: true }]).concat(nodes.map(n => ({ ...n, isRecentlyAdded: false })).slice(pos)) }
    ];

    for (let i = 0; i < pos; i++) {
        steps.push({
            description: i === pos - 1 ? `Đã tới vị trí ngay trước điểm chèn: ${nodes[i].value}` : `Duyệt tìm vị trí: đang ở ${nodes[i].value}`,
            lineIndex: 4,
            nodes: nodes.map((n, idx) => idx === i ? { ...n, isHighlight: true } : n).slice(0, pos).concat([{ id: newId, value: val, color: HOT_PINK, isProcessing: true }]).concat(nodes.slice(pos)).map(n => ({ ...n, isRecentlyAdded: false }))
        });
    }

    steps.push({ description: `Thiết lập NEXT của nút mới tới nút ${nodes[pos]?.value} và PREV tới ${nodes[pos-1]?.value}.`, lineIndex: 6, nodes: nodes.slice(0, pos).concat([{ id: newId, value: val, color: HOT_PINK, isProcessing: true }]).concat(nodes.slice(pos)).map(n => ({ ...n, isRecentlyAdded: false })) });
    steps.push({ description: `Cập nhật liên kết từ các nút lân cận tới nút mới.`, lineIndex: 10, nodes: nodes.slice(0, pos).concat([{ id: newId, value: val, color: HOT_PINK, isProcessing: false }]).concat(nodes.slice(pos)).map(n => ({ ...n, isRecentlyAdded: false })) });
    steps.push({ description: `Hoàn tất chèn vào vị trí ${pos}.`, lineIndex: -1, nodes: nodes.slice(0, pos).concat([{ id: newId, value: val, color: HOT_PINK }]).concat(nodes.slice(pos)).map(n => ({ ...n, isRecentlyAdded: false })) });
    await runSteps(steps);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 rounded-2xl transition-all group active:scale-95 border border-slate-100 shadow-sm"
          >
            <Home size={18} className="text-slate-500 group-hover:text-indigo-600 transition-colors" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 group-hover:text-slate-900">Trang chủ</span>
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
              <span className="text-indigo-600 uppercase">Doubly</span> Linked List
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">DS LIÊN KẾT KÉP VISUALIZER</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto w-full">
        {/* Simulation Area */}
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-inner min-h-[500px] flex flex-col relative overflow-hidden group/stage">
            <div className="absolute inset-0 grid-pattern opacity-5" />
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                  <Info size={18} />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">Thông tin</span>
              </div>
              <div className="flex items-center gap-3 bg-indigo-50 px-6 py-3 rounded-2xl border-2 border-indigo-100 shadow-sm">
                {isAnimating && <Loader2 size={18} className="animate-spin text-indigo-600" />}
                <span className="text-sm font-black text-indigo-700 tracking-tight uppercase">{message}</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-start overflow-x-auto pb-12 px-4 scroll-smooth simulation-scroll">
              <div className="flex items-center min-w-max py-10 h-full">
                <AnimatePresence mode="popLayout">
                  {nodes.map((node, i) => (
                    <Node key={node.id} data={node} index={i} total={nodes.length} isProcessing={node.isProcessing} isHighlight={node.isHighlight} />
                  ))}
                  {nodes.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-300 font-mono italic text-xl">Danh sách trống...</motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
            <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 flex items-center gap-2">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                        Thiết lập dãy số ban đầu
                    </label>
                    <div className="relative">
                        <Settings2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" value={initialInput} onChange={e => setInitialInput(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all font-black text-lg" placeholder="10, 20, 30..." />
                    </div>
                </div>
                <button onClick={reset} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all shadow-[0_6px_0_rgb(67,56,202)] active:translate-y-1 active:shadow-none">Áp dụng dãy số</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 font-black">Giá trị</label>
                <div className="relative">
                  <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-black text-lg shadow-inner" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 font-black">Vị trí (Index)</label>
                <input type="number" min="0" max={nodes.length} value={inputPos} onChange={e => setInputPos(parseInt(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-3.5 px-6 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-black text-lg shadow-inner" />
              </div>
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tốc độ mô phỏng</label>
                  <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{animSpeed}ms</span>
                </div>
                <div className="flex items-center h-14 px-6 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner group">
                   <FastForward size={18} className="text-slate-400 mr-4" />
                   <input type="range" min="100" max="3000" step="100" value={animSpeed} onChange={e => setAnimSpeed(parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button disabled={isAnimating} onClick={insertHead} className="flex-1 min-w-[150px] flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-[0_6px_0_rgb(67,56,202)] active:translate-y-1 active:shadow-none transition-all">
                <ArrowRight size={16} className="-rotate-45" /> Thêm Đầu
              </button>
              <button disabled={isAnimating} onClick={insertTail} className="flex-1 min-w-[150px] flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-[0_6px_0_rgb(5,150,105)] active:translate-y-1 active:shadow-none transition-all">
                <ArrowRight size={16} className="rotate-45" /> Thêm Cuối
              </button>
              <button disabled={isAnimating} onClick={insertAt} className="flex-1 min-w-[150px] flex items-center justify-center gap-3 px-6 py-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-[0_6px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none transition-all">
                <Play size={16} /> Chèn Vị Trí
              </button>
              <button onClick={() => setNodes([])} className="px-8 py-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-2xl font-black uppercase text-[11px] border border-slate-200 hover:border-rose-200 transition-all">
                 Xóa Sạch
              </button>
            </div>
          </div>
        </section>

        {/* Algorithm Area */}
        <section className="flex flex-col gap-6">
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[650px]">
            <div className="bg-slate-800 px-8 py-5 flex items-center justify-between border-b border-slate-700">
               <div className="flex items-center gap-2">
                 <CodeIcon size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Algorithm Editor</span>
               </div>
               <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800 shadow-inner">
                  <button onClick={() => setCodeType('pseudo')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${codeType === 'pseudo' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>Pseudo</button>
                  <button onClick={() => setCodeType('js')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${codeType === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>JS ES6</button>
               </div>
            </div>
            
            <div className="flex-1 overflow-auto p-8 font-mono text-xs leading-relaxed bg-[#0f172a]">
               {activeCode.map((line, i) => (
                 <div key={i} className={`flex gap-4 py-1.5 transition-all ${currentStep?.lineIndex === i ? 'bg-indigo-500/20 -mx-4 px-4 border-l-4 border-amber-500' : ''}`}>
                    <span className="w-6 text-slate-700 text-right select-none">{i+1}</span>
                    <pre className={`whitespace-pre ${currentStep?.lineIndex === i ? 'text-white font-bold' : 'text-emerald-500/80'}`}>{line}</pre>
                 </div>
               ))}
            </div>

            <div className="bg-slate-900 p-8 border-t border-slate-800">
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-blue-500 animate-pulse" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Narrative</span>
               </div>
               <div className="bg-slate-950/50 rounded-2xl p-6 border-l-4 border-blue-500">
                  <p className="text-xl text-blue-400 font-black leading-tight italic">
                    {currentStep?.description || "Hệ thống đang sẵn sàng..."}
                  </p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
