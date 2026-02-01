"use client";

import React, { useState } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { TextReveal, StaggeredText, RippleBackground } from '../../ui/Animations';

interface Project {
  title: string;
  tech: string[];
  images: string[];
  status: string;
  description: string;
  github: string;
  demo: string;
}

// 3D Tilt Card Component
const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="md:w-3/5 group relative perspective-1000"
      >
        <div className="relative overflow-hidden rounded-sm shadow-2xl border-4 border-white transform transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] aspect-video bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={project.images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-black z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-black z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {project.images.map((_: string, i: number) => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
      <div className="md:w-2/5 space-y-8 font-serif">
        <div className="flex items-center gap-4">
          <span className="w-12 h-px bg-gray-400"></span>
          <TextReveal className="text-sm tracking-widest text-gray-500">{project.status}</TextReveal>
        </div>
        <TextReveal className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{project.title}</TextReveal>
        
        <TextReveal className="text-gray-600 leading-loose text-sm md:text-base" width="100%">
          {project.description}
        </TextReveal>

        <div className="flex gap-6 pt-2">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-gray-500 transition-colors group/link">
            <Github className="w-5 h-5" />
            <span className="text-sm tracking-widest border-b border-gray-900 group-hover/link:border-gray-500 transition-colors pb-0.5">GITHUB</span>
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-gray-500 transition-colors group/link">
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm tracking-widest border-b border-gray-900 group-hover/link:border-gray-500 transition-colors pb-0.5">LIVE DEMO</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          {project.tech.map((t, ti) => (
            <span key={ti} className="text-xs border border-gray-400 px-4 py-2 text-gray-600 tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    { 
      title: "ポートフォリオサイト", 
      tech: ["React", "TypeScript", "Tailwind CSS"], 
      images: ["/images/newportfolio.png", "/images/nekoportfolio.png"],
      status: "完成",
      description: "Next.jsとTailwind CSSを用いて構築した、個人のポートフォリオサイトです。以前制作したポートフォリオはアニメーションだったりがなく静的でしたが、今回は和の美意識とモダンなWebデザインの融合を目指し、動的なWebサイトにすることを目標として余白とタイポグラフィにこだわりました。",
      github: "https://github.com/neotyaso",
      demo: "#"
    },
    { 
      title: "鏡花水月城（フルスタック）", 
      tech: ["Laravel", "React", "Inertia.js", "Tailwind CSS"], 
      images: ["/images/sirokansei.png", "/images/juno-202508011149.jpg"],
      status: "完成",
      description: "LaravelとReactを組み合わせたフルスタックWebアプリケーション。Inertia.jsを採用し、SPAのような快適な操作性と、堅牢なバックエンドを両立させました。今回初めてフロントとバックエンドの両方を実装することにしたので使えるものは使っていこうという思いがいっぱいです。",
      github: "https://github.com/neotyaso/kyokasui-castle",
      demo: "#"
    },
  ];

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 bg-white relative overflow-hidden scroll-mt-28"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}
    >
      <RippleBackground color="border-indigo-200/40" />
      {/* 透かし文字 */}
      <div className="relative py-32 md:py-64 flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none whitespace-nowrap">
          <motion.div style={{ y }} className="text-[13vw] md:text-[9rem] font-serif font-bold tracking-widest text-black block">
            <StaggeredText text="PROJECTS" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="space-y-32">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;