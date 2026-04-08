import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Button } from './components/ui/button';
import { Globe } from 'lucide-react';
import data from '../v1-vanilla/data.json';

// Custom SVG icons for social platforms
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-neon-blue fill-current drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-neon-blue fill-current drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-neon-blue fill-current drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-neon-blue fill-current drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const IconMap: Record<string, any> = {
  "fa-brands fa-github": GithubIcon,
  "fa-brands fa-linkedin": LinkedinIcon,
  "fa-brands fa-telegram": TelegramIcon,
  "fa-brands fa-instagram": InstagramIcon,
  "fa-solid fa-globe": Globe,
};

export default function App() {
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProfile(data.profile);
    setLinks(data.links);
  }, []);

  if (!profile) return null;

  return (
    <div className="w-full max-w-[880px] z-10 perspective-[1000px] flex mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full"
      >
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={0.1}
          className="bg-card w-full backdrop-blur-xl border border-border rounded-[24px] shadow-[0_0_30px_rgba(111,66,193,0.15),inset_0_0_20px_rgba(0,210,255,0.05)] p-8 md:p-[4rem_3.5rem] flex flex-col md:flex-row md:items-stretch gap-8 md:gap-0 relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left Side: Profile Info */}
          <motion.aside 
            className="flex-1 flex flex-col items-center md:items-start md:pr-12 text-center md:text-left gap-3 md:gap-4 justify-center"
            style={{ transform: 'translateZ(30px)' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="w-[170px] h-[170px] md:w-[260px] md:h-[260px] rounded-full p-[3px] bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_20px_rgba(0,210,255,0.4)] mb-2 md:mb-6 cursor-zoom-in hover:scale-105 transition-transform"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={`/avatar.png`} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-[#080a14]"
              />
            </motion.div>

            <div className="flex flex-col gap-2">
              <motion.h1 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-4xl md:text-[2.8rem] font-bold uppercase tracking-wide bg-gradient-to-r from-white to-neon-blue bg-clip-text text-transparent mb-2"
              >
                {profile.name}
              </motion.h1>
              <motion.p 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-base text-muted-foreground whitespace-pre-line leading-relaxed tracking-wider"
              >
                {profile.bio}
              </motion.p>
            </div>
          </motion.aside>

          {/* Divider line */}
          <motion.div 
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:block w-px bg-gradient-to-b from-transparent via-neon-purple to-transparent mx-12 shadow-[0_0_10px_var(--neon-purple)]"
          />

          {/* Right Side: Links */}
          <motion.section 
            className="flex-[1.2] flex flex-col justify-center w-full"
            style={{ transform: 'translateZ(20px)' }}
          >
            <nav className="flex flex-col gap-4 w-full mb-8">
              {links.map((link, i) => {
                const IconComponent = IconMap[link.icon] || Globe;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="w-full"
                  >
                    <Button 
                      variant="neon" 
                      size="xl" 
                      asChild 
                      className="w-full justify-start px-6 gap-4 border border-white/5 rounded-xl h-[60px]"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 z-0" />
                        <IconComponent className="w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] z-10" />
                        <span className="z-10 uppercase tracking-wider text-base">{link.name}</span>
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </nav>
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-xs tracking-widest uppercase text-muted-foreground mt-auto"
            >
              <p>&copy; {new Date().getFullYear()} Link Hub. React Edition.</p>
            </motion.footer>
          </motion.section>
        </Tilt>
      </motion.div>

      {/* Avatar Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#080a14]/85 backdrop-blur-md z-[99999] flex justify-center items-center cursor-zoom-out"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={`/avatar.png`}
              className="w-[min(92vw,92vh)] h-[min(92vw,92vh)] rounded-full object-cover border-4 border-neon-blue shadow-[0_0_50px_rgba(0,210,255,0.4),0_0_100px_rgba(111,66,193,0.3)] pointer-events-none"
              alt="Zoomed Avatar"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
