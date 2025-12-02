import React from 'react';
import { CheckCircle, Shield, Heart, Award } from 'lucide-react';

const FeatureSection = () => {
  const reasons = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: "Berdasarkan Syariat Islam",
      image: "./images/feature1.png",
      points: [
        "Pengurusan jenazah sesuai syariat",
        "Fasilitas mushola untuk pelaksanaan salat jenazah",
        "Lokasi yang tenang dan nyaman untuk berziarah",
        "Tersedia layanan pemakaman lengkap sesuai aturan",
        "Dikelola dengan penuh amanah dan profesional"
      ]
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: "Dikelola Secara Profesional",
      image: "./images/feature2.png",
      points: [
        "Tim berpengalaman dalam pengelolaan pemakaman",
        "Perawatan area secara rutin dan teratur",
        "Sistem administrasi yang rapi dan terpercaya",
        "Keamanan 24 jam untuk kenyamanan keluarga",
        "Sertifikat resmi untuk setiap kavling"
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-emerald-600">Alasan Utama</span> <span className="text-stone-800">Memilih</span>
          </h2>
          <h3 className="text-2xl font-semibold text-stone-700 mb-4">
            Eternity <span className="text-emerald-600">Gardens</span>
          </h3>
        </div>

        {/* First Section - Image Left */}
        <div className="grid md:grid-cols-2 gap-0 mb-8 shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-[400px] md:h-auto">
            <img 
              src={reasons[0].image} 
              alt={reasons[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-sky-500 text-white p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">{reasons[0].title}</h3>
            <ul className="space-y-4">
              {reasons[0].points.map((point, pointIdx) => (
                <li key={pointIdx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second Section - Image Right */}
        <div className="grid md:grid-cols-2 gap-0 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-3xl font-bold text-stone-800 mb-6">{reasons[1].title}</h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              Kami berkomitmen menyediakan layanan pemakaman yang profesional dan terpercaya. 
              Dengan pengalaman puluhan tahun, kami memahami kebutuhan keluarga dalam memberikan 
              tempat peristirahatan terakhir yang layak dan bermartabat.
            </p>
            <ul className="space-y-3 text-stone-700">
              {reasons[1].points.slice(0, 3).map((point, pointIdx) => (
                <li key={pointIdx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] md:h-auto order-1 md:order-2">
            <img 
              src={reasons[1].image} 
              alt={reasons[1].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;