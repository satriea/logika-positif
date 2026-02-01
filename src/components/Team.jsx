import React from "react";
import { motion } from "framer-motion";

const Team = () => {
  const members = [
    { role: "Penulis", handle: "@diazhardika16", initial: "DH" },
    { role: "Programmer", handle: "@satriea", initial: "ST" },
    { role: "Designer", handle: "@andy.ak", initial: "AA" },
  ];

  return (
    <section
      id="team"
      className="bg-[#FAFAFA] px-8 py-32 relative overflow-hidden"
    >
      {/* Subtle Background Text */}
      <div className="absolute bottom-0 center-0 w-full text-center text-[10vw] font-black text-black/[0.02] whitespace-nowrap leading-none select-none translate-y-1/2">
        THE CREATIVE MINDS
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
            <p className="text-black/50 text-base max-w-xl mx-auto leading-relaxed italic">
              “Sebuah kolaborasi kecil yang bekerja dengan niat, proses, 
              dan ketulusan dalam setiap detail pemikiran.”
            </p>
          </motion.div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group flex flex-col items-center"
            >
              {/* Avatar Frame */}
              <div className="relative mb-8">
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-black/10 group-hover:rotate-45 transition-transform duration-1000 scale-125" />
                
                {/* Main Avatar Box */}
                <div className="w-32 h-32 bg-white border-2 border-black rounded-full overflow-hidden shadow-[8px_8px_0px_0px_rgba(242,166,154,1)] transition-transform group-hover:-translate-y-2 group-hover:-translate-x-1 duration-300 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#F2A69A]/0 group-hover:bg-[#F2A69A]/10 transition-colors" />
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
                <p className="text-lg font-black text-black tracking-tight group-hover:text-[#F2A69A] transition-colors cursor-pointer">
                  {member.handle}
                </p>
                
                {/* Social Connect Line */}
                <div className="flex justify-center pt-2">
                   <div className="w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;