"use client";

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TextReveal, StaggeredText, fadeInUp, RippleBackground } from '../../ui/Animations';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const Timeline = () => {
  const events: TimelineEvent[] = [
    {
      date: "2025年2月",
      title: "HTML/CSS学習開始",
      description: "Web開発の基礎となるHTML/CSSから学習をスタート。",
    },
    {
      date: "2025年4月",
      title: "大学入学",
      description: "大学に入学。将来を見据えてプログラミング学習を決意。",
    },
    {
      date: "2025年4月",
      title: "JavaScript学習開始",
      description: "静的から動的なWebサイト制作のためJavaScriptを学習開始。",
    },
    {
      date: "2025年6月",
      title: "React/TypeScript学習開始",
      description: "モダンフロントエンド開発のためReactとTypeScriptの学習を開始。特にReactの学習に集中。",
    },
    {
      date: "2025年7月",
      title: "初作品完成",
      description: "鏡花水月城をReactで制作・公開。初めてのフロントのみの作品として公開。",
    },
    {
      date: "2025年8月",
      title: "Laravel・PHPを学習開始",
      description: "将来を見据えてフルスタック開発のためLaravel（PHP）の学習を計画。",
    },
    {
      date: "2025年8月",
      title: "フルスタック作品完成",
      description: "鏡花水月城をReact + Laravelで制作。デプロイが出来なかったため挫折を味わう。",
    },
    {
      date: "2025年10月",
      title: "Pythonの学習を開始",
      description: "機械学習に興味が出て学習を開始。"
    },
    {
      date: "2025年10月",
      title: "Chromeの拡張機能を開発",
      description: "アルバイトを探していた時に求人サイトが使いずらいと思い条件に合う求人のみを絞って、色をつけて見分けることを可能に。"
    },
    {
      date: "2026年1月",
      title: "新しいポートフォリオを制作する",
      description: "元々作成したポートフォリオがフロントエンドのみで静的なサイトだったため今回Next.jsを使用してフルスタックのポートフォリオサイトを作成。"
    },
    {
      date: "2026年2月",
      title: "AIのAPIを学習",
      description: "面白いことそして便利なことを探し、AIのAPIを学習。"
    },
    {
      date: "2026年X月",
      title: "React Nativeの学習を開始",
      description: "未来"
    },
  ];

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} id="timeline" className="py-20 bg-white relative overflow-hidden scroll-mt-28"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}>
      
      <RippleBackground color="border-slate-300/40" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* 透かし文字 */}
        <div className="relative py-32 md:py-64 flex justify-center items-center">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none whitespace-nowrap">
            <motion.div style={{ y }} className="text-[13vw] md:text-[10rem] font-serif font-bold tracking-widest text-black block">
              <StaggeredText text="JOURNEY" />
            </motion.div>
          </div>
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center pt-10 mb-32"
        >
          <div className="max-w-3xl mx-auto">
            <TextReveal className="text-3xl md:text-4xl text-gray-600 font-serif tracking-widest leading-relaxed" width="100%">
              プログラミング学習から現在まで、<br className="hidden md:block" />
              そして未来への道のり
            </TextReveal>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Line */}
          <div className="absolute left-2.25 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 transform md:-translate-x-1/2">
            <motion.div style={{ scaleY, originY: 0 }} className="w-full h-full bg-black" />
          </div>

          <div className="space-y-12 md:space-y-0">
            {events.map((event, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className={`relative md:flex items-center justify-between md:min-h-50 ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Empty half for desktop layout balance */}
                <div className="hidden md:block md:w-1/2" />

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-5 h-5 bg-white border-4 border-black rounded-full transform md:-translate-x-1/2 md:-translate-y-1/2 z-10 shadow-lg" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                }`}>
                   <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold tracking-widest mb-3 rounded-full group-hover:bg-gray-800 transition-colors">
                        {event.date}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 font-serif mb-3">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed font-serif text-sm">
                        {event.description}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;