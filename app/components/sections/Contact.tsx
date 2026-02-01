"use client";

import React, { useState } from 'react';
import { Github, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sendContactEmail } from '../../actions';
import { TextReveal, StaggeredText, fadeInUp, staggerContainer, RippleBackground } from '../../ui/Animations';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendContactEmail(formData);

    setIsSubmitting(false);
    setStatus(result);

    if (result.success) {
      (event.target as HTMLFormElement).reset();
    }
  };

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-20 bg-white relative overflow-hidden scroll-mt-28"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}
    >
      <RippleBackground color="border-sky-200/40" />
      {/* 透かし文字 */}
      <div className="relative py-32 md:py-64 flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none whitespace-nowrap">
          <motion.div style={{ y }} className="text-[13vw] md:text-[10rem] font-serif font-bold tracking-widest text-black block">
            <StaggeredText text="CONTACT" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <TextReveal className="text-3xl md:text-4xl text-gray-600 font-serif tracking-widest leading-relaxed mb-6" width="100%">
              お問い合わせ
            </TextReveal>
            <TextReveal className="text-gray-500 font-serif leading-loose" width="100%">
              お気軽にお問い合わせください。<br className="hidden md:block" />
              通常3日以内に返信いたします。
            </TextReveal>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-12 font-serif">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-8 h-px bg-gray-300"></span>
                <TextReveal>Socials</TextReveal>
              </h3>
              <div className="flex flex-col gap-6 pt-2">
                <a href="https://github.com/neotyaso" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-600 hover:text-black transition-colors group">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <span className="text-sm tracking-widest border-b border-transparent group-hover:border-black transition-all">GITHUB</span>
                </a>
                <a href="mailto:neotyaso.dev@gmail.com" className="flex items-center gap-4 text-gray-600 hover:text-black transition-colors group">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-sm tracking-widest border-b border-transparent group-hover:border-black transition-all">neotyaso.dev@gmail.com</span>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-8 h-px bg-gray-300"></span>
                <TextReveal>Message</TextReveal>
              </h3>
              <TextReveal className="text-gray-600 leading-loose" width="100%">
                技術的なご相談から、雑談まで。<br/>
                フォームから送信できない場合は、直接メールにてご連絡ください。
              </TextReveal>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-8 bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-sm shadow-xl border border-gray-100">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-serif tracking-widest text-gray-500">NAME</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                className="w-full bg-gray-50 border-b border-gray-300 px-4 py-3 focus:outline-none focus:border-black focus:bg-white transition-colors font-serif text-gray-800"
                placeholder="お名前"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-serif tracking-widest text-gray-500">EMAIL</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                required
                className="w-full bg-gray-50 border-b border-gray-300 px-4 py-3 focus:outline-none focus:border-black focus:bg-white transition-colors font-serif text-gray-800"
                placeholder="メールアドレス"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-serif tracking-widest text-gray-500">MESSAGE</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={5}
                className="w-full bg-gray-50 border-b border-gray-300 px-4 py-3 focus:outline-none focus:border-black focus:bg-white transition-colors font-serif resize-none text-gray-800"
                placeholder="お問い合わせ内容"
              ></textarea>
            </div>

            {status && (
              <div className={`p-4 text-sm font-serif tracking-wide ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 font-serif tracking-widest hover:bg-gray-800 transition-colors text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;