import React from 'react';
import { X, Maximize2, Users } from 'lucide-react';

const PlotMap = ({ plots, handlePlotClick, isLoading }) => {
  const getPlotVisualization = (size) => {
    const visualizations = {
      '2x1': {
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=300&fit=crop',
        description: 'Kavling standar dengan 2 lubang pemakaman. Cocok untuk pasangan suami istri atau keluarga kecil.'
      },
      '3x1.5': {
        image: 'https://images.unsplash.com/photo-1580130732478-a660d235c17a?w=400&h=300&fit=crop',
        description: 'Kavling sedang dengan kapasitas 4 lubang. Ideal untuk keluarga dengan perawatan taman yang baik.'
      },
      '4x2': {
        image: 'https://images.unsplash.com/photo-1583495219746-8f609e1d7a1f?w=400&h=300&fit=crop',
        description: 'Kavling besar dengan 6 lubang pemakaman. Sempurna untuk keluarga besar dengan area luas dan pemandangan indah.'
      }
    };
    return visualizations[size] || visualizations['2x1'];
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="text-emerald-600">Denah</span> <span className="text-stone-800">Kavling</span>
          </h2>
          <p className="text-stone-600">Klik pada kavling untuk melakukan pemesanan</p>
          
          {isLoading && <div className="mt-4 text-emerald-600">Memuat data kavling...</div>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plots.map((plot) => {
            const visualization = getPlotVisualization(plot.size);
            
            return (
              <div
                key={plot.id}
                onClick={() => handlePlotClick(plot)}
                className={`
                  relative rounded-xl overflow-hidden transition-all duration-300 border-2
                  ${plot.status === 'available' 
                    ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-xl cursor-pointer' 
                    : plot.status === 'booked'
                    ? 'border-yellow-200 cursor-default'
                    : 'border-stone-200 opacity-60 cursor-not-allowed'}
                `}
              >
                {/* Image visualization */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={visualization.image} 
                    alt={`Kavling ${plot.number}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Status badge */}
                  {plot.status === 'available' && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Tersedia ✓
                    </div>
                  )}
                  {plot.status === 'booked' && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Booked ⏳
                    </div>
                  )}
                  {plot.status === 'occupied' && (
                    <div className="absolute top-3 right-3 bg-stone-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Terisi ✕
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 min-h-[60px]">
                    {visualization.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Maximize2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs text-stone-500">Ukuran</div>
                        <div className="font-semibold text-stone-700">{plot.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                      </svg>
                      <div>
                        <div className="text-xs text-stone-500">Kode Kavling</div>
                        <div className="font-semibold text-stone-700">{plot.number}</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={plot.status !== 'available'}
                    className={`
                      w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300
                      ${plot.status === 'available'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
                    `}
                  >
                    {plot.status === 'available' ? 'Pesan Sekarang !' : 'Tidak Tersedia'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-12 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
            <span className="text-stone-600">Tersedia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-stone-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-stone-500 rounded"></div>
            <span className="text-stone-600">Terisi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlotMap;