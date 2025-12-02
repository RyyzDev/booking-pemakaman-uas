import React from 'react';
import { 
  MapPin, Phone, Mail, Facebook, Instagram, Linkedin, 
  Youtube, Twitter, ChevronRight, Award, Shield, Users
} from 'lucide-react';

const PremiumFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-emerald-400">Eternity</span> Gardens
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Penyedia layanan pemakaman terpercaya dengan standar internasional. 
                Memberikan ketenangan dan kehormatan untuk orang-orang terkasih Anda.
              </p>
            </div>
            
            {/* Certifications */}
            <div className="flex gap-4">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-emerald-500 transition-all">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-emerald-500 transition-all">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-emerald-500 transition-all">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Layanan Kami</h4>
            <ul className="space-y-3">
              {['Pemakaman Muslim', 'Pemakaman Non-Muslim', 'Kremasi', 'Perawatan Makam', 'Konsultasi Pemakaman', 'Pemesanan Online'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Perusahaan</h4>
            <ul className="space-y-3">
              {['Tentang Kami', 'Visi & Misi', 'Tim Manajemen', 'Karir', 'Berita & Media', 'Hubungi Kami'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Hubungi Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Jl. UIN Jakarta<br />
                    Fakultas Sains dan Teknologi, Teknik Informatika<br />
                    Kelas D 2025 Kelompok 1
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-emerald-400" />
                <a href="tel:+622112345678" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  +62 12 1234 567
                </a>
              </div>
              
              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a href="mailto:info@tpemakaman.co.id" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  admin@cemetery.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <p className="text-sm text-slate-400 mb-3">Ikuti Kami:</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, link: '#' },
                  { icon: Instagram, link: '#' },
                  { icon: Linkedin, link: '#' },
                  { icon: Youtube, link: '#' },
                  { icon: Twitter, link: '#' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className="bg-slate-800 p-2.5 rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-emerald-500"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © 2025 PT Eternity Gardens. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Kebijakan Privasi
              </a>
              <span className="text-slate-600">|</span>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Syarat & Ketentuan
              </a>
              <span className="text-slate-600">|</span>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;