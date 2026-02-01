"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';

// アニメーション設定
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// マウスストーカーコンポーネント
export const MouseStalker = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-black rounded-full pointer-events-none z-100 hidden md:block mix-blend-difference bg-white/20 backdrop-blur-[1px]"
      style={{
        x: useTransform(x, (latest) => latest - 16),
        y: useTransform(y, (latest) => latest - 16),
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

// ノイズオーバーレイコンポーネント
export const NoiseOverlay = () => (
  <div className="fixed inset-0 z-90 pointer-events-none opacity-[0.04] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

// テキストリビールコンポーネント（下から湧き上がる演出）
export const TextReveal = ({ children, className = "", delay = 0, width = "fit-content" }: { children: React.ReactNode, className?: string, delay?: number, width?: "fit-content" | "100%" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={isInView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// 一文字ずつ表示するコンポーネント
export const StaggeredText = ({ text, className = "", staggerDelay = 0.1 }: { text: string, className?: string, staggerDelay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)", y: 5 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 親要素のstaggerChildrenを受け継いで一文字ずつ表示するコンポーネント
export const AnimatedText = ({ text }: { text: string }) => (
  <>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={{
          hidden: { opacity: 0, filter: "blur(10px)", y: 5 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </>
);

// ローディング画面コンポーネント
export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => (
  <motion.div
    className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center"
    initial={{ y: 0 }}
    exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 800);
      }}
      className="relative"
    >
      <img
        src="/images/juno-202508011149.jpg"
        alt="Loading"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl grayscale"
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-8 text-gray-500 font-serif tracking-[0.3em] text-sm"
    >
      KOKI PORTFOLIO
    </motion.p>
  </motion.div>
);

// 背景用の波紋エフェクトコンポーネント
export const RippleBackground = ({ color = "border-gray-400/20" }: { color?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${color}`}
          style={{ width: '60vmax', height: '60vmax' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 2.5,
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 18 + ((i * 7) % 13),
            repeat: Infinity,
            delay: i * 3.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};