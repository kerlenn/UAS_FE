// app/components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconInstagram, IconGithub, IconFacebook, IconYoutube, IconWhatsapp,
  IconPhone, IconEnvelope, IconMapPin, IconClock
} from './FooterIcons';

export default function Footer() {
  return (
    <footer className="footer-custom pt-5 pb-4 mt-5">
      <div className="container">
        {/* Gunakan row dan justify-content-between agar layout rapi */}
        <div className="row gy-4 justify-content-between">
          
          {/* Section 1: Logo & About (Lebar 5/12) */}
          {/* col-md-5: Di layar laptop/tablet akan makan 5 kolom, jadi sejajar */}
          <div className="col-12 col-md-5 mb-2">
            <Link href="#hero" className="d-inline-block mb-3">
              <Image
                src="/Logo.png"
                alt="SkillUp! Logo"
                width={120}
                height={40}
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>
            <p className="text-footer-gray pe-md-5" style={{ lineHeight: '1.6' }}>
              Jadi kami adalah sebuah organisasi yang learning yang bergerak di bidang pendidikan, yapping yapping yapping yapping yapping yapping yap
            </p>
          </div>

          {/* Section 2: Kursus (Lebar 2/12) */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold mb-3 text-white">Kursus</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link href="#" className="text-footer-gray">Web dev</Link></li>
              <li><Link href="#" className="text-footer-gray">Game dev</Link></li>
              <li><Link href="#" className="text-footer-gray">Compilation</Link></li>
              <li><Link href="#" className="text-footer-gray">Database</Link></li>
            </ul>
          </div>

          {/* Section 3: Media Sosial (Lebar 2/12) */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold mb-3 text-white">Media Sosial</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-footer-gray d-flex align-items-center gap-2"><IconInstagram className="footer-icon" /> Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-footer-gray d-flex align-items-center gap-2"><IconGithub className="footer-icon" /> Github</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-footer-gray d-flex align-items-center gap-2"><IconFacebook className="footer-icon" /> Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-footer-gray d-flex align-items-center gap-2"><IconYoutube className="footer-icon" /> Youtube</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-footer-gray d-flex align-items-center gap-2"><IconWhatsapp className="footer-icon" /> Whatsapp</a></li>
            </ul>
          </div>

          {/* Section 4: Hubungi Kami (Lebar 3/12) */}
          <div className="col-12 col-md-3">
            <h5 className="fw-bold mb-3 text-white">Hubungi Kami</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li className="text-footer-gray d-flex align-items-center gap-2"><IconPhone className="footer-icon" /> 0812345678</li>
              <li className="text-footer-gray d-flex align-items-center gap-2"><IconEnvelope className="footer-icon" /> SkillUp@gmail.com</li>
              <li className="text-footer-gray d-flex align-items-center gap-2"><IconMapPin className="footer-icon" /> Jln ini aja dulu</li>
              <li className="text-footer-gray d-flex align-items-center gap-2"><IconClock className="footer-icon" /> Senin-Jumat 08:00 - 17:00</li>
            </ul>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="footer-divider mt-5 pt-4 text-center">
          <p className="text-secondary small mb-0">© SkillUp. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}