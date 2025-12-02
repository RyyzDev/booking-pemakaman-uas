import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = ({ setView }) => (
    <div className="relative h-[700px] bg-stone-100 flex items-center justify-center overflow-hidden">
      <video 
        autoPlay
        src="https://motionbgs.com/media/43/pixel-koi-pond.960x540.mp4"
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/75">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-emerald-100 to-stone-200"></div>
      </div>

      <div className="relative z-10 text-center pt-0 px-4">
          <h1 className="font-poppins font-bold text-5xl text-white mb-6">
              <strong>
              <div>
              PERISTIRAHATAN TERAKHIR
              </div>
              <div> 
              YANG
              </div> 
              <div>
              TENANG & TERBAIK
              </div>
              </strong>
          </h1>
          <p className="text-white text-lg mb-8">
            Kami menyediakan kavling pemakaman dengan pengelolaan rutin oleh profesional, memberikan ketenangan bagi Anda dan keluarga tercinta.
          </p>
          <button 
            onClick={() => setView('booking')}
            className="bg-emerald-800 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition shadow-lg flex items-center gap-2 mx-auto"
          >
            Lihat Ketersediaan Kavling <ArrowRight className="w-4 h-4" />
          </button>
      </div>
       {/* Area untuk Wave Animation*/}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden z-10">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            {/* Layer 1: Belakang */}
            <use
              href="#gentle-wave"
              x="48"
              y="0"
              className="fill-emerald-100/50"
              style={{ animation: 'move-forever 8s cubic-bezier(.55,.5,.45,.5) infinite' }}
            />
            {/* Layer 2: Depan */}
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              className="fill-white" 
              style={{ animation: 'move-forever 4s cubic-bezier(.55,.5,.45,.5) infinite -2s' }}
            />
          </g>
        </svg>
      </div>

    </div>
  );

export default Hero;