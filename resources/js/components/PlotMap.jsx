import React from 'react';
import { X } from 'lucide-react';

const PlotMap = ({ plots, handlePlotClick, isLoading }) => (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-emerald-900 mb-2">Denah Kavling</h2>
        <p className="text-stone-500">Klik pada kavling yang berwarna hijau untuk melakukan pemesanan.</p>
        
        {isLoading && <div className="mt-4 text-emerald-600">Memuat data kavling...</div>}
        
        <div className="flex justify-center gap-6 mt-6 text-sm flex-wrap">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded"></div> Tersedia</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-stone-200 border border-stone-300 rounded"></div> Terisi (Occupied)</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div> Menunggu Proses (Booked)</div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 bg-white p-8 rounded-xl shadow-sm border border-stone-200">
        {plots.map((plot) => (
          <div
            key={plot.id}
            onClick={() => handlePlotClick(plot)}
            className={`
              relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
              ${plot.status === 'available' 
                ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400 hover:-translate-y-1 hover:shadow-md' 
                : plot.status === 'booked'
                ? 'bg-yellow-50 border-yellow-200 cursor-default'
                : 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed grayscale'}
            `}
          >
            <span className="font-serif font-bold text-xl text-stone-700">{plot.number}</span>
            <span className="text-xs text-stone-500 mt-1">{plot.size}</span>
            
            {plot.status === 'available' && (
              <span className="absolute bottom-2 text-[10px] font-bold text-emerald-700 bg-emerald-200 px-2 py-0.5 rounded-full">
                PILIH
              </span>
            )}
            {plot.status === 'booked' && (
              <span className="absolute bottom-2 text-[10px] font-bold text-yellow-700 bg-yellow-200 px-2 py-0.5 rounded-full">
                BOOKED
              </span>
            )}
            {plot.status === 'occupied' && (
              <X className="absolute bottom-2 w-4 h-4 text-stone-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

export default PlotMap;
