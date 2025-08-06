import React, { useState, useEffect, useRef } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Heart, 
  User, 
  Globe,
  Mail,
  MapPin,
  Phone,
  X
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

function App() {
  const [showNameCard, setShowNameCard] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles near mouse
      if (Math.random() < 0.3) {
        particlesRef.current.push({
          x: mousePos.x + (Math.random() - 0.5) * 100,
          y: mousePos.y + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          maxLife: 60
        });
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        const alpha = particle.life / particle.maxLife;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 10
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, ${alpha * 0.2})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        return particle.life > 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePos]);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/bardiansst?igsh=cHliZDVpZWVxbXV0',
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:shadow-pink-500/25'
    },
    {
      name: 'TikTok',
      icon: Globe,
      url: 'https://www.tiktok.com/@its.baas?_t=ZS-8ye6rUCqFLL&_r=1',
      color: 'from-gray-900 to-gray-700',
      hoverColor: 'hover:shadow-gray-500/25'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/628511705115',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:shadow-green-500/25'
    }
  ];

  const supportLinks = [
    {
      name: 'Support Me',
      icon: Heart,
      url: 'https://sociabuzz.com/bardianlink_/donate',
      color: 'from-red-500 to-pink-500',
      hoverColor: 'hover:shadow-red-500/25'
    }
  ];

  const portfolioLinks = [
    {
      name: 'My Portfolio',
      icon: Globe,
      url: '#',
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:shadow-blue-500/25'
    }
  ];

  const LinkButton = ({ name, icon: Icon, url, color, hoverColor }: any) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
        hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${hoverColor}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
          {name}
        </span>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
    </a>
  );

  const NameCard = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
        <button
          onClick={() => setShowNameCard(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 p-1 mx-auto animate-pulse">
              <div className="w-full h-full rounded-2xl bg-gray-300 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Bagus Ardianto Adi Saputro</h2>
          <p className="text-cyan-300 mb-6">Name Card Digital</p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-white">+62 851-1705-115</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-white">bagusardian.spto@gmail.com</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-white">Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12">
          {/* Profile Section */}
          <div className="text-center mb-12">
            <div className="relative mx-auto mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1 mx-auto animate-pulse">
                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-20 blur-lg animate-pulse" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2 animate-fadeInUp">
              Bagus Ardianto Adi Saputro
            </h1>
            <p className="text-xl text-cyan-300 mb-4 animate-fadeInUp animation-delay-200">
              My Link
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full animate-fadeInUp animation-delay-400" />
          </div>

          {/* Digital Name Card Button */}
          <div className="max-w-md mx-auto mb-8">
            <button
              onClick={() => setShowNameCard(true)}
              className="group relative block w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30 
                hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  Digital Name Card
                </span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
            </button>
          </div>

          {/* Links Container */}
          <div className="max-w-md mx-auto space-y-8">
            {/* Social Media Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Social Media
                </span>
              </h2>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={link.name} className={`animate-fadeInUp animation-delay-${index * 100 + 600}`}>
                    <LinkButton {...link} />
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Support Me
                </span>
              </h2>
              <div className="space-y-4">
                {supportLinks.map((link, index) => (
                  <div key={link.name} className={`animate-fadeInUp animation-delay-${index * 100 + 900}`}>
                    <LinkButton {...link} />
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  My Portfolio
                </span>
              </h2>
              <div className="space-y-4">
                {portfolioLinks.map((link, index) => (
                  <div key={link.name} className={`animate-fadeInUp animation-delay-${index * 100 + 1200}`}>
                    <LinkButton {...link} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 animate-fadeInUp animation-delay-1500">
            <p className="text-white/60 text-sm">
              © 2025 BardianLink. Made with ❤️ using Web3 technology.
            </p>
          </div>
        </div>
      </div>

      {showNameCard && <NameCard />}
    </>
  );
}

export default App;