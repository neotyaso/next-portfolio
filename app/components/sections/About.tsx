"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, StaggeredText, AnimatedText, TextReveal, RippleBackground } from '../../ui/Animations';

const About = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
    ref={ref}
    id="about" 
    className="py-20 bg-white relative overflow-hidden scroll-mt-28"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
    }}
  >
    <RippleBackground color="border-stone-300/40" />
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="text-center pt-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-10">
            <StaggeredText 
              text="人の行く裏に道あり花の山。" 
              className="text-2xl md:text-4xl text-gray-600 font-serif tracking-widest leading-relaxed"
            />
          </div>
          <div className="text-gray-500 text-lg leading-loose tracking-wide space-y-8 font-serif flex flex-col items-center">
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: { transition: { staggerChildren: 0.03 } },
                hidden: {},
              }}
            >
              <AnimatedText text="誰もが正解を模索し、効率という名の「表通り」を急ぐ時代。" />
              <br className="hidden md:block" />
              <AnimatedText text="しかし、真に価値ある景色は、常にその裏側に隠されています。" />
            </motion.div>
            <motion.div 
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: { transition: { staggerChildren: 0.03 } },
                hidden: {},
              }}
            >
              <AnimatedText text="2026年。私は、スタンダードに対する「問い」を止めない。" />
              <br className="hidden md:block" />
              <AnimatedText text="既存のコードをなぞるのではなく、領域を超えた思考と、静かなる挑戦。" />
              <br className="hidden md:block" />
              <AnimatedText text="テクノロジーの深淵に潜む、まだ誰も触れていない「花の山」を、" />
              <br className="hidden md:block" />
              <AnimatedText text="独りのエンジニアとして、ともに描き出す。" />
            </motion.div>
            <motion.div 
              className="text-center pt-4 text-gray-800 font-medium"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
                hidden: {},
              }}
            >
              <AnimatedText text="この混迷を、本質で勝ち抜くために。" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 間隔と透かし文字 */}
      <div className="relative py-32 md:py-64 flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none whitespace-nowrap">
          <motion.div style={{ y }} className="text-[15vw] md:text-[10rem] font-serif font-bold tracking-widest text-black block">
            <StaggeredText text="ABOUT" />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-16 items-start font-serif"
      >
        <div className="space-y-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/images/juno-202508011149.jpg"
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover shadow-xl border-4 border-gray-50 grayscale hover:grayscale-0 transition-all duration-700 mb-6"
              />
            </motion.div>
            <TextReveal className="text-3xl font-bold text-gray-900 mb-2">KOKI</TextReveal>
            <TextReveal className="text-sm text-gray-800 tracking-widest">神奈川生まれ / 2007年生まれ / 大学一年生</TextReveal>
          </div>

          <div className="space-y-4">
            <TextReveal className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 inline-block">Beyond Code</TextReveal>
            <TextReveal className="text-gray-700 leading-relaxed text-sm" width="100%">
              画面の向こう側に、静寂と遊び心を。<br />
              伝統的な和の美意識と、愛してやまない猫たちの自由な振る舞いを、デジタルなプロダクトの中に共存させることが私のクリエイションの源泉です。
            </TextReveal>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <span className="w-8 h-1px bg-gray-300"></span>
              <TextReveal>Philosophy</TextReveal>
            </h4>
            <TextReveal className="text-gray-700 leading-loose" width="100%">
              「人の行く裏に道あり花の山」<br />
              この言葉を指針に、私は技術の表層だけをなぞることを拒みます。誰もが効率を求める時代だからこそ、あえて裏側に潜む複雑な構造や、古き良き美学を重んじ、独自の解を導き出すことを信条としています。
            </TextReveal>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-300"></span>
              <TextReveal>Core Values</TextReveal>
            </h4>
            <TextReveal className="text-gray-700 leading-loose" width="100%">
              2025年2月、独学にてプログラミングの世界へ。<br />
              Next.jsやpythonを用いたモダンな開発を軸としながらも、常に「なぜ動くのか」という問いを立て、本質的な価値を提供することを目指しています。
            </TextReveal>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default About;