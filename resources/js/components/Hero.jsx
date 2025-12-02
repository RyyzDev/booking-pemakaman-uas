import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

const Hero = ({ setView }) => (
    <div className="relative h-[750px] flex items-center justify-center overflow-hidden bg-stone-900">
        
        {/* Background Layer with Zoom Effect */}
        <div className="absolute inset-0 z-0">
            <img 
                src="./images/hero.png"
                alt="Background Eternity Gardens" 
                className="w-full h-full object-cover opacity-60 animate-in fade-in zoom-in duration-[20s]"
            />
            {/* Gradient Overlay*/}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-900/40 to-emerald-950/90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 text-center mt-[-50px]">
            
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/30 border border-emerald-400/20 backdrop-blur-md mb-8 animate-in slide-in-from-bottom-4 fade-in duration-1000">
                <Leaf className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-100 text-xs font-medium tracking-[0.2em] uppercase">
                    Eternity Gardens
                </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
                <span className="block text-2xl md:text-3xl font-sans font-light text-emerald-100/80 mb-2 tracking-wide">
                    Peristirahatan Terakhir
                </span>
                <span className="bg-gradient-to-r from-white via-emerald-50 to-emerald-200 bg-clip-text text-transparent font-medium">
                    Yang Tenang & Terbaik
                </span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-200 mb-10 leading-relaxed font-light animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
                Kami menyediakan kavling pemakaman dengan pengelolaan rutin oleh profesional, memberikan ketenangan abadi bagi Anda dan keluarga tercinta.
            </p>

            {/* CTA Button */}
            <button 
                onClick={() => setView('booking')}
                className="group relative bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-3 mx-auto animate-in zoom-in fade-in duration-700 delay-500"
            >
                <span className="font-medium tracking-wide">Lihat Ketersediaan Kavling</span>
                <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
            </button>
        </div>

        {/* Wave Animation Area */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 w-full overflow-hidden z-20">
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
                    {/* Layer 1: Belakang*/}
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="0"
                        className="fill-emerald-800/30"
                        style={{ animation: 'move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite' }}
                    />
                    {/* Layer 2: Tengah */}
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="3"
                        className="fill-emerald-100/20"
                        style={{ animation: 'move-forever 15s cubic-bezier(.55,.5,.45,.5) infinite' }}
                    />
                    {/* Layer 3: Depan (Warna solid background section berikutnya) */}
                    <use
                        href="#gentle-wave"
                        x="48"
                        y="5"
                        className="fill-white" 
                        style={{ animation: 'move-forever 8s cubic-bezier(.55,.5,.45,.5) infinite' }}
                    />
                </g>
            </svg>
        </div>

        {/* Inline Style untuk Keyframes Animasi Wave */}
        <style jsx>{`
            @keyframes move-forever {
                0% { transform: translate3d(-90px,0,0); }
                100% { transform: translate3d(85px,0,0); }
            }
        `}</style>

    </div>
);

export default Hero;