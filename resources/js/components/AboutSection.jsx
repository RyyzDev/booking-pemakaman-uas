import React from 'react';
import { MapPin, Clock, Users, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-black-600" />,
      title: "Lokasi Strategis",
      description: "Terletak di area 999 hektar dengan konsep landscape indah, hanya 10 menit dari Exit Tol"
    },
    {
      icon: <Clock className="w-8 h-8 text-black-600" />,
      title: "Fasilitas 24 Jam",
      description: "Mushola, lounge, toilet, dan area parkir luas tersedia untuk kenyamanan keluarga berziarah"
    },
    {
      icon: <Users className="w-8 h-8 text-black-600" />,
      title: "Perawatan Rutin",
      description: "Area makam dirawat secara profesional mengikuti standar manajemen ISO 9001"
    },
    {
      icon: <Award className="w-8 h-8 text-black-600" />,
      title: "Sertifikasi Resmi",
      description: "Setiap kavling dilengkapi Sertifikat Arah Kiblat dari Kemenag Konoha"
    }
  ];

  return (
    <section className="py-4 px-4 bg-white text-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
             <span className="text-emerald-600">Eternity</span> <span className="text-stone-800">Gardens</span>
            </h2>
            <div className="space-y-4 text-black-50">
              <p className="leading-relaxed">
                Eternity Gardens merupakan taman pemakaman no 1 di Indonesia yang terletak di Konoha. Taman pemakaman ini merupakan kolaborasi antara Mahasiswa TI 25 D Kelompok 1.
              </p>
              <p className="leading-relaxed">
                Sejak tahun 1945 kami telah membantu dalam menyediakan lahan makam hingga pelaksanaan prosesi pemakaman. Semua pelayanan dilakukan secara profesional mengikuti standar manajemen ISO 9001.
              </p>
              <p className="leading-relaxed">
                Eternity Gardens ini dibangun diatas area 999 hektar dengan penataan konsep landscape yang indah sehingga tidak terkesan menyeramkan. Area pemakaman Eternity Gardens juga dilengkapi dengan walkway atau jalan setapak, sehingga antar makam tidak akan terinjak, terlangkah atau terduduki oleh peziarah.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-cyan/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-lg flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-black-100 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
