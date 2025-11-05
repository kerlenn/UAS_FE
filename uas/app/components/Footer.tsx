// app/components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconInstagram, IconGithub, IconFacebook, IconYoutube, IconWhatsapp,
  IconPhone, IconEnvelope, IconMapPin, IconClock
} from './FooterIcons';

// Kelas helper untuk link agar tidak berulang
const linkClasses = "text-gray-300 hover:text-[#FF6B35] transition-colors duration-300 flex items-center gap-2 font-normal text-sm";
const infoClasses = "text-gray-300 flex items-center gap-2 font-normal text-sm";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white pt-10 pb-5 mt-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 pb-8 grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        
        {/* Section 1: Logo & About */}
        {/* col-span-2 di mobile, col-span-1 di desktop */}
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/Logo.png"
            alt="SkillUp! Logo"
            width={100}
            height={40}
            className="h-10 w-auto mb-4"
          />
          <p className="text-sm leading-relaxed text-gray-300 font-normal">
            Jadi kami adalah sebuah organisasi yang learning yang bergerak di bidang pendidikan, yapping yapping yapping yapping yapping yapping yap
          </p>
        </div>

        {/* Section 2: Kursus */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Kursus</h4>
          <ul className="list-none space-y-3">
            <li><Link href="#" className={linkClasses}>Web dev</Link></li>
            <li><Link href="#" className={linkClasses}>Game dev</Link></li>
            <li><Link href="#" className={linkClasses}>Compilation</Link></li>
            <li><Link href="#" className={linkClasses}>Database</Link></li>
          </ul>
        </div>

        {/* Section 3: Media Sosial */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Media Sosial</h4>
          <ul className="list-none space-y-3">
            <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkClasses}><IconInstagram className="w-4 h-4" /> Instagram</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkClasses}><IconGithub className="w-4 h-4" /> Github</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkClasses}><IconFacebook className="w-4 h-4" /> Facebook</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkClasses}><IconYoutube className="w-4 h-4" /> Youtube</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkClasses}><IconWhatsapp className="w-4 h-4" /> Whatsapp</a></li>
          </ul>
        </div>

        {/* Section 4: Hubungi Kami */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-white">Hubungi Kami</h4>
          <ul className="list-none space-y-3">
            <li className={infoClasses}><IconPhone className="w-4 h-4 flex-shrink-0" /> 0812345678</li>
            <li className={infoClasses}><IconEnvelope className="w-4 h-4 flex-shrink-0" /> SkillUp@gmail.com</li>
            <li className={infoClasses}><IconMapPin className="w-4 h-4 flex-shrink-0" /> Jln ini aja dulu</li>
            <li className={infoClasses}><IconClock className="w-4 h-4 flex-shrink-0" /> Senin-Jumat 08:00 - 17:00</li>
          </ul>
        </div>

      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-gray-700 pt-5 text-center max-w-7xl mx-auto px-5 md:px-10 text-gray-400 text-sm">
        <p>© SkillUp. All rights reserved</p>
      </div>
    </footer>
  );
}