import React from 'react';
import { Phone, Mail, MapPin, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background with overlay */}
{/*      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent"></div>
      </div>*/}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Main CTA */}
          <div className="text-black">
            <div className="inline-block bg-emerald-700/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold">✨ Tunggu apa lagi?, Pesan Sekarang !</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Siap Memberikan <span className="text-emerald-600">Tempat Terbaik</span> untuk Orang Tercinta Anda
            </h2>
            
            <p className="text-black-100 text-lg mb-8 leading-relaxed">
              Hubungi kami sekarang untuk mendapatkan informasi lengkap tentang kavling pemakaman, 
              harga, dan fasilitas yang tersedia. Tim kami siap membantu Anda 24/7.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {[
                'Konsultasi gratis tanpa biaya',
                'Proses cepat dan mudah',
                'Harga transparan dan kompetitif',
                'Lokasi strategis dan mudah diakses'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-black-300 flex-shrink-0" />
                  <span className="text-black-50">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Primary CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2 group">
                <Phone className="w-5 h-5" />
                Hubungi Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all duration-300 border-2 border-emerald-500 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Jadwalkan Kunjungan
              </button>
            </div>
          </div>

          {/* Right Side - Contact Cards */}
          <div className="space-y-4">
            {/* Phone Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-4 rounded-xl">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">Telepon</h3>
                  <p className="text-stone-600 text-sm mb-2">Layanan 24 Jam</p>
                  <a href="tel:+622112345678" className="text-emerald-600 font-bold text-lg hover:text-emerald-700">
                    +62 21 1234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">WhatsApp</h3>
                  <p className="text-stone-600 text-sm mb-2">Chat Langsung</p>
                  <a href="https://wa.me/6281234567890" className="text-green-600 font-bold text-lg hover:text-green-700">
                    +62 812 3456 7890
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">Email</h3>
                  <p className="text-stone-600 text-sm mb-2">Respon Cepat</p>
                  <a href="mailto:info@alazhar.co.id" className="text-blue-600 font-bold hover:text-blue-700">
                    admin@cemetery.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-800 mb-1">Lokasi</h3>
                  <p className="text-stone-600 text-sm">
                    Jl. UIN Jakarta<br />
                    Fakultas Sains dan Teknologi, Teknik Informatika 2025 D
                    Kelompok 1                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;