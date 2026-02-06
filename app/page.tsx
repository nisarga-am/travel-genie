'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Map, ShieldAlert, Heart, Zap, User, Bot, MapPin, Star, Plane, Clock, Coffee, Landmark, Briefcase, Users, DollarSign, Battery, AlertTriangle, Luggage, Camera, Upload, StickyNote, RefreshCw, ArrowLeft, Scissors, Globe } from 'lucide-react';

// --- IMAGES DATABASE ---
const backgrounds: Record<string, string> = {
  default: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Space/Globe view
  tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
  nyc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop"
};

// --- DATABASE: Demo Photos ---
const demoPhotos = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop"
];

// ------------------------------------------------------------------
// 1. ANIMATION COMPONENT: TROLLEY RUNNER
// ------------------------------------------------------------------
function TrolleyRunner({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ x: '-100vw' }} 
          animate={{ x: '100vw' }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="fixed bottom-10 left-0 z-50 pointer-events-none"
        >
          <div className="flex flex-col items-center">
            <span className="text-[150px] drop-shadow-2xl filter brightness-110">🏃‍♂️🧳</span>
            <div className="bg-black/20 w-32 h-4 rounded-full blur-md mt-[-20px]"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ------------------------------------------------------------------
// 2. NEW FEATURE: INTERACTIVE WORLD MAP
// ------------------------------------------------------------------
function WorldMap({ onSelect }: { onSelect: (id: string, name: string) => void }) {
  const locations = [
    { id: 'nyc', name: 'New York', top: '32%', left: '26%', img: backgrounds.nyc, attraction: "Statue of Liberty" },
    { id: 'paris', name: 'Paris', top: '28%', left: '49%', img: backgrounds.paris, attraction: "Eiffel Tower" },
    { id: 'tokyo', name: 'Tokyo', top: '33%', left: '86%', img: backgrounds.tokyo, attraction: "Tokyo Tower" },
    { id: 'bali', name: 'Bali', top: '65%', left: '78%', img: backgrounds.bali, attraction: "Uluwatu Temple" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative w-[90%] max-w-5xl aspect-[1.8/1] bg-blue-900/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden group"
      >
        {/* World Map Image */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
          alt="World Map" 
          className="absolute inset-0 w-full h-full object-contain opacity-60 invert"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
        />
        
        <div className="absolute top-6 left-0 w-full text-center z-10">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-2">
            <Globe className="text-blue-400" /> Select Your Destination
          </h2>
          <p className="text-blue-200 text-sm">Click a pin to start your journey</p>
        </div>

        {/* PINS */}
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            className="absolute cursor-pointer group/pin"
            style={{ top: loc.top, left: loc.left }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onSelect(loc.id, loc.name)}
          >
            {/* The Pin Icon */}
            <MapPin size={32} className="text-red-500 drop-shadow-lg relative z-20 animate-bounce" fill="currentColor" />
            <div className="w-8 h-2 bg-black/50 rounded-full blur-sm absolute bottom-0 left-0 z-10"></div>

            {/* Hover Tooltip (The "Famous Attraction" Card) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-white p-2 rounded-xl shadow-2xl opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none z-30 scale-0 group-hover/pin:scale-100 origin-bottom">
              <div className="h-24 rounded-lg overflow-hidden mb-2">
                <img src={loc.img} className="w-full h-full object-cover" alt={loc.name} />
              </div>
              <h4 className="font-bold text-gray-800 text-center">{loc.name}</h4>
              <p className="text-[10px] text-gray-500 text-center uppercase font-bold">{loc.attraction}</p>
              {/* Little arrow pointing down */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. FEATURE COMPONENTS
// ------------------------------------------------------------------

function MoodItinerary({ mood, place, activities }: { mood: string, place: string, activities: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-l-4 border-purple-500 my-4 max-w-xl">
      <div className="flex justify-between items-start mb-3">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2 text-gray-800"><MapPin className="text-purple-500" size={20} /> {place}</h3>
           <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">MATCH: {mood}</span>
        </div>
      </div>
      <div className="space-y-2">
        {activities.map((act, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-purple-50 p-2 rounded-lg">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            {act}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ScamAlert({ location, riskLevel, reportCount, type }: { location: string, riskLevel: string, reportCount: number, type: string }) {
  return (
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-5 bg-red-50 border border-red-200 rounded-xl my-4 shadow-sm relative overflow-hidden max-w-xl">
      <div className="absolute right-0 top-0 p-3 opacity-10">
        <ShieldAlert size={80} className="text-red-600" />
      </div>
      <div className="flex items-center gap-2 mb-2 text-red-700 font-bold">
        <AlertTriangle size={18} /> SCAM ALERT SYSTEM
      </div>
      <h4 className="font-bold text-gray-800 text-lg">{location}</h4>
      <p className="text-sm text-gray-700 mt-1"><span className="font-bold text-red-600">{type}:</span> Tourists reporting overpriced menus and fake guides.</p>
      <div className="flex gap-2 mt-3">
         <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded font-bold">Risk: {riskLevel}</span>
         <span className="text-xs bg-white border border-red-200 text-red-600 px-2 py-1 rounded font-medium">{reportCount} Reports (1h)</span>
      </div>
    </motion.div>
  );
}

function BudgetReality({ location, instaPrice, realPrice, hiddenCosts }: { location: string, instaPrice: number, realPrice: number, hiddenCosts: string[] }) {
  const percent = Math.min((instaPrice / realPrice) * 100, 100);
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-5 bg-slate-900 text-white rounded-xl shadow-xl my-4 max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-emerald-400 flex items-center gap-2"><DollarSign size={16}/> Reality Check</h4>
        <span className="text-xs text-slate-400">{location}</span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
           <span className="text-gray-400">Instagram Expectation</span>
           <span className="text-white font-bold">${instaPrice}</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full mb-3">
           <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mb-1">
           <span className="text-red-300">Actual Reality</span>
           <span className="text-red-300 font-bold">${realPrice}</span>
        </div>
        <div className="w-full bg-slate-700 h-2 rounded-full">
           <div className="bg-red-500 h-2 rounded-full w-full"></div>
        </div>
      </div>
      <div className="bg-slate-800 p-3 rounded-lg">
        <p className="text-xs text-gray-400 mb-1">⚠️ Hidden Costs found:</p>
        <div className="flex flex-wrap gap-2">
           {hiddenCosts.map((c, i) => (
             <span key={i} className="text-[10px] border border-red-500/50 text-red-300 px-2 py-0.5 rounded-full">{c}</span>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function LocalLife({ city, timeline }: { city: string, timeline: {time: string, activity: string}[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-orange-50 border border-orange-100 rounded-xl my-4 shadow-sm max-w-xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-100 p-2 rounded-full text-orange-600"><Users size={18}/></div>
        <div>
           <h4 className="font-bold text-gray-800">Live Like a Local</h4>
           <p className="text-xs text-orange-600 font-bold uppercase">No Tourist Traps 🚫</p>
        </div>
      </div>
      <div className="relative border-l-2 border-orange-200 ml-3 space-y-4 pl-6 py-2">
        {timeline.map((item, i) => (
          <div key={i} className="relative">
             <div className="absolute -left-[31px] w-4 h-4 bg-orange-400 rounded-full border-4 border-orange-50"></div>
             <p className="text-xs font-bold text-gray-400">{item.time}</p>
             <p className="text-sm font-medium text-gray-800">{item.activity}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// 4. SCRAPBOOK FEATURE
// ------------------------------------------------------------------

function ScrapbookStudio({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<'upload' | 'view'>('upload');
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPhotos(urls);
      setStep('view');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 relative z-20">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-white font-bold bg-black/40 px-4 py-2 rounded-full hover:bg-black/60 transition">
        <ArrowLeft size={16}/> Back to Genie
      </button>

      {step === 'upload' ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center border border-white/50">
          <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera size={40} className="text-pink-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Scrapbook</h2>
          <p className="text-gray-500 mb-8">Upload photos to auto-generate a beautiful digital journal.</p>
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <button onClick={() => fileInputRef.current?.click()} className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
              <Upload size={20}/> Upload Photos
            </button>
            <button onClick={() => { setPhotos(demoPhotos); setStep('view'); }} className="text-gray-400 text-sm hover:text-gray-600 underline">
              Use demo shots
            </button>
            <input type="file" multiple accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange}/>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <div className="flex justify-between items-center mb-6 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm">
             <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><StickyNote className="text-pink-500" /> My Scrapbook</h2>
             <button onClick={() => setStep('upload')} className="text-xs font-bold text-gray-500 flex items-center gap-1 hover:text-black"><RefreshCw size={12}/> RESET</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {photos.map((src, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 1.5, rotate: Math.random() * 20 - 10, y: 100 }}
                 animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? -2 : 2), y: 0 }}
                 transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.3 }}
                 className="bg-white p-3 pb-10 rounded shadow-xl relative transform hover:z-10 transition-all hover:scale-105 hover:rotate-0"
               >
                 <div className="absolute -top-3 left-[50%] ml-[-20px] w-12 h-6 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-2 z-10"></div>
                 <div className="h-64 overflow-hidden rounded-sm bg-gray-100"><img src={src} alt="Memory" className="w-full h-full object-cover sepia-[.2] hover:sepia-0 transition-all" /></div>
                 <div className="absolute bottom-4 left-4 right-4 text-center font-serif italic text-gray-600 text-lg">Trip Memory #{i + 1}</div>
               </motion.div>
             ))}
           </div>
        </motion.div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
// 5. MAIN APP CONTROLLER
// ------------------------------------------------------------------

export default function Home() {
  const [view, setView] = useState<'map' | 'chat' | 'traveling' | 'scrapbook'>('map');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [karma, setKarma] = useState(120);
  const [bgImage, setBgImage] = useState(backgrounds.default);
  const [step, setStep] = useState(0); 

  // --- ACTIONS ---
  const actions = [
    { id: 'mood', label: "Mood Trip", icon: <Heart size={16}/>, text: "Plan a trip based on my mood" },
    { id: 'local', label: "Local Life", icon: <Users size={16}/>, text: "Show me a 'Live Like a Local' plan" },
    { id: 'scam', label: "Scam Alert", icon: <ShieldAlert size={16}/>, text: "Check for scams in this area" },
    { id: 'budget', label: "Budget Reality", icon: <DollarSign size={16}/>, text: "Reality check my budget" },
    { id: 'scrapbook', label: "Create Scrapbook", icon: <Camera size={16}/>, text: "I want to create a scrapbook" },
  ];

  const handleTravel = (placeId: string, placeName: string) => {
    setView('traveling');
    
    // Switch Background midway
    setTimeout(() => {
        setBgImage(backgrounds[placeId] || backgrounds.default);
    }, 1000);

    // Arrive at Chat
    setTimeout(() => {
        setView('chat');
        const aiResponse = {
            role: 'assistant',
            content: `Welcome to ${placeName}! 🏃‍♂️💨 Based on your vibe, here is the plan:`,
            component: <MoodItinerary mood="Explorer Mode" place={placeName} activities={["Hidden Alley Cafe", "Local Market Run", "Sunset Viewpoint"]} />
        };
        setMessages(prev => [...prev, aiResponse]);
    }, 2500);
  };

  const handleSend = async (text: string) => {
    if (!text) return;
    const userMsg = { role: 'user', content: text, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const lower = text.toLowerCase();

    if (lower.includes('scrapbook') || lower.includes('memory')) {
        setLoading(false);
        setView('traveling');
        setTimeout(() => {
            setView('scrapbook');
            setBgImage(backgrounds.bali);
        }, 2000);
        return;
    }

    // Standard Chat Responses
    setTimeout(() => {
      let aiResponse;
      if (lower.includes('mood')) {
        setStep(1); aiResponse = { role: 'assistant', content: "Forget destinations. How are you feeling? (Burnt Out / Curious / Party)" };
      } else if (lower.includes('burnt out')) {
        aiResponse = { role: 'assistant', content: "I hear you. You need a Digital Detox.", component: <MoodItinerary mood="Healing" place="Kyoto" activities={["Zen Garden", "Forest Cabin"]} /> };
      } else if (lower.includes('scam')) {
        setKarma(prev => prev + 5); aiResponse = { role: 'assistant', content: "⚠️ CAUTION: Alerts found.", component: <ScamAlert location="Shinjuku" type="Bar Trap" riskLevel="High" reportCount={12} /> };
      } else if (lower.includes('budget')) {
        aiResponse = { role: 'assistant', content: "Here is the real cost.", component: <BudgetReality location="Bali" instaPrice={800} realPrice={1350} hiddenCosts={["Tourist Tax", "Water Filter"]} /> };
      } else if (lower.includes('local')) {
        aiResponse = { role: 'assistant', content: "Here is the local schedule.", component: <LocalLife city="Tokyo" timeline={[{ time: "07:00 AM", activity: "Fish Market" }, { time: "08:00 PM", activity: "Jazz Bar" }]} /> };
      } else {
        aiResponse = { role: 'assistant', content: "I am Travel Genie. I can plan by Mood, Check Scams, or Create a Scrapbook." };
      }
      setMessages(prev => [...prev, { ...aiResponse, id: Date.now() + 1 }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="flex flex-col h-screen w-full font-sans relative transition-all duration-1000 ease-in-out"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0 transition-colors duration-1000 ${view === 'scrapbook' ? 'bg-white/30 backdrop-blur-xl' : ''}`}></div>

      <TrolleyRunner active={view === 'traveling'} />

      {/* HEADER */}
      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10 p-6 flex items-center justify-between text-white shadow-lg">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <h1 onClick={() => { setView('map'); setBgImage(backgrounds.default); setMessages([]); }} className="font-bold text-2xl flex items-center gap-3 drop-shadow-md cursor-pointer hover:text-blue-300 transition">
            Travel Genie <span className="text-blue-300">AI</span>
          </h1>
          <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 px-4 py-1.5 rounded-full">
             <Star size={16} className="text-yellow-400 fill-yellow-400" />
             <span className="text-sm font-bold text-yellow-100">{karma} Karma</span>
          </div>
        </div>
      </header>

      {/* MAIN VIEW AREA */}
      <div className="relative z-10 flex-1 overflow-y-auto p-6 scrollbar-hide flex flex-col items-center justify-center">
        
        {/* 1. MAP HOME SCREEN */}
        {view === 'map' && <WorldMap onSelect={handleTravel} />}

        {/* 2. CHAT DASHBOARD */}
        {view === 'chat' && (
          <div className="max-w-4xl w-full space-y-6 pb-20 mt-10">
             {messages.map((msg, i) => (
               <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-black text-white' : 'bg-blue-600 text-white'}`}>
                     {msg.role === 'user' ? <User size={18}/> : <Bot size={18}/>}
                   </div>
                   <div className={`px-6 py-4 rounded-3xl text-base shadow-lg backdrop-blur-md border ${msg.role === 'user' ? 'bg-black/80 border-black/50 text-white rounded-tr-none' : 'bg-white/95 border-white/50 text-gray-800 rounded-tl-none'}`}>
                     {msg.content}
                   </div>
                 </div>
                 {msg.component && <div className="mt-4 w-full pl-14">{msg.component}</div>}
               </div>
             ))}
             {loading && <div className="flex items-center gap-2 ml-14"><div className="w-2 h-2 bg-white rounded-full animate-bounce"></div><div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div></div>}
          </div>
        )}

        {/* 3. SCRAPBOOK STUDIO */}
        {view === 'scrapbook' && <ScrapbookStudio onBack={() => { setView('chat'); setBgImage(backgrounds.default); }} />}

      </div>

      {/* FOOTER INPUT (Only in Chat Mode) */}
      {view === 'chat' && (
        <div className="relative z-10 bg-black/60 backdrop-blur-xl border-t border-white/10">
           <div className="max-w-4xl mx-auto pt-4 px-4 flex gap-3 overflow-x-auto scrollbar-hide">
              {actions.map((act) => (
                <button key={act.id} onClick={() => handleSend(act.text)} className={`flex items-center gap-2 text-xs font-bold px-4 py-3 rounded-xl whitespace-nowrap transition-all active:scale-95 shadow-lg border ${act.id === 'scrapbook' ? 'bg-pink-600 border-pink-500 text-white hover:bg-pink-500' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
                  {act.icon} {act.label}
                </button>
              ))}
           </div>
           <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="max-w-4xl mx-auto flex gap-4 p-4">
             <input className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-full px-8 py-4 focus:outline-none focus:bg-white/20 transition-all text-base shadow-inner backdrop-blur-sm" placeholder="Ask Travel Genie..." value={input} onChange={(e) => setInput(e.target.value)} />
             <button type="submit" className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg"><Send size={24} /></button>
           </form>
        </div>
      )}
    </div>
  );
}