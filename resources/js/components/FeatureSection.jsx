import React from 'react';
import { CheckCircle, Shield, Heart, Award } from 'lucide-react';

const FeatureSection = () => {
  const reasons = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: "Berdasarkan Syariat Islam",
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
    <section className="py-16 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">
            Alasan Utama Memilih <span className="text-emerald-600">Eternity Gardens</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Tempat peristirahatan terakhir yang memberikan ketenangan bagi keluarga dengan fasilitas terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 rounded-full">
                  {reason.icon}
                </div>
                <h3 className="text-2xl font-bold text-emerald-900">{reason.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {reason.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="flex items-start gap-3 text-stone-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
