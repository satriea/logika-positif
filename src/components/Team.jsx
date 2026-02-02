import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Quote } from "lucide-react";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const members = [
    { 
      role: "Penulis", 
      handle: "@diazhardika16", 
      initial: "DH",
      bio: "Percaya bahwa nalar jernih adalah fondasi dari setiap tindakan bermakna."
    },
    { 
      role: "Programmer", 
      handle: "@satriea", 
      initial: "ST",
      bio: "Mewujudkan ide melalui baris kode yang presisi dan antarmuka yang intuitif."
    },
    { 
      role: "Designer", 
      handle: "@andy.ak", 
      initial: "AA",
      bio: "Menerjemahkan emosi dan logika menjadi bahasa visual yang bercerita."
    },
  ];

  return (
    <section id="team" className="bg-[#FAFAFA] px-8 py-32 relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute bottom-0 left-0 w-full text-center text-[12vw] font-black text-black/[0.02] whitespace-nowrap leading-none select-none translate-y-1/2 uppercase">
        Collaborators
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-[#F2A69A] mb-4">
              Kolaborasi
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tighter uppercase">
              Tim di Balik <br className="md:hidden" /> Logika Positif
            </h3>
            <div className="w-16 h-1 bg-black mx-auto mt-6 mb-8" />
            <p className="text-black/40 text-base max-w-xl mx-auto leading-relaxed italic">
              “Karya besar lahir dari dialog antar pikiran yang setara.”
            </p>
          </motion.div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="group flex flex-col items-center cursor-pointer"
            >
              {/* Avatar Frame */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full border border-dashed border-black/10 group-hover:rotate-90 transition-transform duration-1000 scale-125" />
                
                <div className="w-32 h-32 bg-white border-2 border-black rounded-full overflow-hidden shadow-[8px_8px_0px_0px_#F2A69A] transition-all group-hover:shadow-[12px_12px_0px_0px_#000] group-hover:-translate-y-2 flex items-center justify-center relative">
                  <span className="text-2xl font-black text-black opacity-30 group-hover:opacity-100 transition-opacity">
                    {member.initial}
                  </span>
                </div>
              </div>

              {/* Role & Handle */}
              <div className="space-y-2 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-black/40">
                  {member.role}
                </p>
                <p className="text-lg font-black text-black tracking-tight group-hover:text-[#F2A69A] transition-colors">
                  {member.handle}
                </p>
                <div className="flex justify-center pt-2">
                   <div className="w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OVERLAY BIODATA TIM */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-black p-10 md:p-16 max-w-lg w-full relative shadow-[30px_30px_0px_0px_#F2A69A]"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-xl font-black shadow-xl">
                  {selectedMember.initial}
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#F2A69A] mb-2">{selectedMember.role}</h4>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{selectedMember.handle}</h3>
                </div>
                
                <div className="py-6 border-y border-black/5 w-full relative">
                  <Quote size={40} className="absolute -top-4 -left-4 text-black/5" />
                  <p className="text-xl font-serif italic text-black/70 leading-relaxed">
                    “{selectedMember.bio}”
                  </p>
                </div>

                <button className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-2 hover:text-[#F2A69A] hover:border-[#F2A69A] transition-all">
                  Koneksi Profil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;