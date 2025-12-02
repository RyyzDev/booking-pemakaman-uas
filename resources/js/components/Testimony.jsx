import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimony = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const testimonials = [
    {
      id: 1,
      name: "Ibu Siti Nurhaliza",
      role: "Keluarga Almarhum Bapak Ahmad",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      text: "Alhamdulillah, pelayanan yang diberikan sangat profesional dan penuh empati. Tim sangat membantu kami dalam proses pemakaman almarhum ayah. Lokasi pemakaman sangat tenang dan terawat dengan baik. Terima kasih Al Azhar Memorial Garden.",
      date: "November 2024"
    },
    {
      id: 2,
      name: "Bapak Hendro Wijaya",
      role: "Keluarga Almarhumah Ibu Susanti",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Saya sangat terkesan dengan fasilitas dan pelayanan yang ada. Prosesnya cepat, administrasi jelas, dan yang paling penting semuanya sesuai dengan syariat Islam. Kavling yang kami pilih juga sangat bagus dengan view yang indah.",
      date: "Oktober 2024"
    },
    {
      id: 3,
      name: "Ibu Ratna Sari",
      role: "Keluarga Almarhum Bapak Sutrisno",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      text: "Tempat yang sangat nyaman untuk ziarah. Keamanan 24 jam membuat kami tenang. Petugas sangat ramah dan helpful. Perawatan taman sangat bagus, bersih dan rapi. Highly recommended untuk keluarga yang mencari tempat pemakaman berkualitas.",
      date: "September 2024"
    },
    {
      id: 4,
      name: "Bapak Agus Santoso",
      role: "Keluarga Almarhumah Ibu Mariam",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "Fasilitas mushola yang lengkap dan bersih sangat membantu dalam pelaksanaan salat jenazah. Tim pengelola sangat profesional dan memahami kebutuhan keluarga. Lokasi strategis dan mudah diakses. Terima kasih atas pelayanan terbaiknya.",
      date: "Agustus 2024"
    },
    {
      id: 5,
      name: "Ibu Dewi Lestari",
      role: "Keluarga Almarhum Bapak Rahman",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      rating: 5,
      text: "Proses pemesanan kavling sangat mudah dan transparan. Harga sesuai dengan fasilitas yang diberikan. Area parkir luas dan memadai. Lingkungan sangat asri dan tenang, cocok untuk tempat peristirahatan terakhir yang damai.",
      date: "Juli 2024"
    },
    {
      id: 6,
      name: "Bapak Faisal Ibrahim",
      role: "Keluarga Almarhumah Ibu Fatimah",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Customer service sangat responsif dan membantu menjawab semua pertanyaan kami. Dokumentasi dan sertifikat diberikan dengan lengkap. Sistem pemeliharaan makam sangat baik. Kami merasa sangat terbantu di saat yang sulit ini.",
      date: "Juni 2024"
    }
  ];

  // Efek untuk menangani perubahan ukuran layar (Responsiveness)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset current index jika itemsPerPage berubah agar tidak out of bounds
  useEffect(() => {
    const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, testimonials.length, currentIndex]);

  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-emerald-600">Testimoni</span> <span className="text-stone-800">Keluarga</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto px-4">
            Kepercayaan dan kepuasan keluarga adalah prioritas utama kami
          </p>
        </div>

        <div className="relative px-2 md:px-8"> 
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="flex-shrink-0"
                  // Kalkulasi lebar dinamis berdasarkan itemsPerPage dan gap (1.5rem / 24px)
                  style={{ width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * 1.5 / itemsPerPage}rem)` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-emerald-200" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-stone-600 leading-relaxed mb-6 flex-grow text-sm md:text-base">
                      "{testimonial.text}"
                    </p>

                    {/* Profile */}
                    <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-emerald-200"
                      />
                      <div>
                        <h4 className="font-bold text-stone-800 text-sm md:text-base">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-stone-500">{testimonial.role}</p>
                        <p className="text-xs text-emerald-600 mt-1">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Disembunyikan jika tidak bisa slide */}
          {currentIndex > 0 && (
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-emerald-50 transition-all duration-300 z-10 border border-emerald-200 text-emerald-600"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-emerald-50 transition-all duration-300 z-10 border border-emerald-200 text-emerald-600"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'w-6 md:w-8 bg-emerald-600' 
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimony;