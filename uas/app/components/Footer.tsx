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
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          
          {/* Section 1: Logo & About */}
          {/* col-12 di mobile, col-lg-4 di desktop */}
          <div className="col-12 col-lg-4 mb-4">
            <Image
              src="/Logo.png"
              alt="SkillUp! Logo"
              width={100}
              height={40}
              className="mb-3"
              style={{ height: '40px', width: 'auto' }}
            />
            <p className="small text-secondary">
              Jadi kami adalah sebuah organisasi yang learning yang bergerak di bidang pendidikan, yapping yapping yapping yapping yapping yapping yap
            </p>
          </div>

          {/* Section 2: Kursus */}
          <div className="col-6 col-md-4 col-lg-2">
            <h5 className="fw-bold mb-3 text-white">Kursus</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link href="#" className="footer-link small">Web dev</Link></li>
              <li><Link href="#" className="footer-link small">Game dev</Link></li>
              <li><Link href="#" className="footer-link small">Compilation</Link></li>
              <li><Link href="#" className="footer-link small">Database</Link></li>
            </ul>
          </div>

          {/* Section 3: Media Sosial */}
          <div className="col-6 col-md-4 col-lg-2">
            <h5 className="fw-bold mb-3 text-white">Media Sosial</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" className="footer-link small d-flex align-items-center gap-2"><IconInstagram /> Instagram</a></li>
              <li><a href="#" className="footer-link small d-flex align-items-center gap-2"><IconGithub /> Github</a></li>
              <li><a href="#" className="footer-link small d-flex align-items-center gap-2"><IconFacebook /> Facebook</a></li>
              <li><a href="#" className="footer-link small d-flex align-items-center gap-2"><IconYoutube /> Youtube</a></li>
              <li><a href="#" className="footer-link small d-flex align-items-center gap-2"><IconWhatsapp /> Whatsapp</a></li>
            </ul>
          </div>

          {/* Section 4: Hubungi Kami */}
          <div className="col-12 col-md-4 col-lg-4">
            <h5 className="fw-bold mb-3 text-white">Hubungi Kami</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li className="text-secondary small d-flex align-items-center gap-2"><IconPhone /> 0812345678</li>
              <li className="text-secondary small d-flex align-items-center gap-2"><IconEnvelope /> SkillUp@gmail.com</li>
              <li className="text-secondary small d-flex align-items-center gap-2"><IconMapPin /> Jln ini aja dulu</li>
              <li className="text-secondary small d-flex align-items-center gap-2"><IconClock /> Senin-Jumat 08:00 - 17:00</li>
            </ul>
          </div>

        </div>
        
        {/* Footer Bottom */}
        <div className="border-top border-secondary mt-4 pt-3 text-center">
          <p className="text-secondary small mb-0">© SkillUp. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}