import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_PROFILE } from '../../data/projects';
import { Mail, Github, Copy, Check, Terminal, ExternalLink, Send } from 'lucide-react';
import { KoiTarget } from '../../types';

interface ContactSectionProps {
  onHoverTarget: (target: KoiTarget | null) => void;
  entranceTrigger?: boolean;
  staggerDelay?: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onHoverTarget,
  entranceTrigger = true,
  staggerDelay = 0,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [botField, setBotField] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onHoverTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      intensity: 0.9,
      label,
    });
  };

  const handleMouseLeave = () => {
    onHoverTarget(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !email) return;

    setStatus('sending');

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject || 'Systems / Security Opportunity');
      formData.append('message', message);
      if (botField) {
        formData.append('bot-field', botField);
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleMailtoFallback = () => {
    const mailtoUrl = `mailto:${DEVELOPER_PROFILE.email}?subject=${encodeURIComponent(
      subject || 'Systems / Security Opportunity'
    )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 48 }}
      animate={entranceTrigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.75,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => {
        if (entranceTrigger) setAnimationDone(true);
      }}
      style={animationDone ? { transform: 'none' } : undefined}
      className="relative z-20 py-24 px-6 sm:px-12 lg:px-20 border-t border-[#9CFF4A]/10 pb-36"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between border-b border-[#9CFF4A]/20 pb-4 mb-12 font-mono text-xs text-[#D7D9D2]/70"
      >
        <div className="flex items-center space-x-3">
          <span className="text-[#9CFF4A] font-bold text-sm">04 / 06</span>
          <span className="text-[#9CFF4A]/40">/</span>
          <span className="text-[#9CFF4A] tracking-wider uppercase">SECURE DIRECT CHANNEL</span>
          <span className="font-kanji text-[11px] text-[#9CFF4A]/70 hidden md:inline tracking-wider">
            【 通信路 // 暗号化伝送 】
          </span>
        </div>
        <div className="hidden sm:block text-[#D7D9D2]/50 tracking-wider">
          GPG / EMAIL / GITHUB TRANSMISSION
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Terminal Command */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div
            onMouseEnter={(e) => handleMouseEnter(e, 'contact-card')}
            onMouseLeave={handleMouseLeave}
            className="relative p-8 border border-[#9CFF4A]/20 bg-[#050605]/80 font-mono space-y-6 hover:border-[#9CFF4A]/40 transition-colors overflow-hidden"
          >
            {/* Background Kanji Watermark */}
            <div
              className="absolute right-4 bottom-2 font-kanji font-black text-8xl text-[#9CFF4A]/[0.03] select-none pointer-events-none"
              aria-hidden="true"
            >
              通信
            </div>

            <div>
              <div className="text-xs text-[#9CFF4A] font-bold tracking-widest uppercase mb-1 flex items-center space-x-2">
                <span>// DIRECT_COMMUNICATION</span>
                <span className="font-kanji text-[11px] text-[#9CFF4A]/80 font-normal">
                  【 直接通信 】
                </span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#D7D9D2] tracking-tight uppercase">
                INITIATE CONTACT.
              </h2>
              <p className="text-xs text-[#D7D9D2]/70 mt-2 leading-relaxed">
                Open for low-level systems engineering, Rust development, security research, and infrastructure tooling.
              </p>
            </div>

            {/* Email Box with One-Click Copy */}
            <div className="p-4 border border-[#9CFF4A]/20 bg-black/40 space-y-2">
              <div className="text-[10px] text-[#D7D9D2]/40 tracking-wider">PRIMARY_EMAIL</div>
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="font-bold text-sm sm:text-base text-[#9CFF4A] hover:underline"
                >
                  {DEVELOPER_PROFILE.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center space-x-1 px-2.5 py-1 bg-[#9CFF4A]/10 text-[#9CFF4A] hover:bg-[#9CFF4A] hover:text-[#050605] transition-colors text-xs font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Terminal Command to Send Mail */}
            <div className="p-4 border border-[#9CFF4A]/10 bg-black/50 space-y-1.5">
              <div className="flex items-center space-x-2 text-[10px] text-[#9CFF4A]">
                <Terminal className="w-3 h-3" />
                <span>SHELL ONE-LINER</span>
              </div>
              <pre className="text-[11px] text-[#D7D9D2] overflow-x-auto select-all">
                echo &quot;Inquiry from web&quot; | mail -s &quot;Query&quot; {DEVELOPER_PROFILE.email}
              </pre>
            </div>

            {/* GitHub Profile Anchor */}
            <div className="pt-2 flex items-center space-x-4 text-xs">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 border border-[#9CFF4A]/30 text-[#D7D9D2] hover:text-[#9CFF4A] hover:border-[#9CFF4A] transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB / NoE114</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Dispatch Form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            onMouseEnter={(e) => handleMouseEnter(e, 'contact-form')}
            onMouseLeave={handleMouseLeave}
            className="p-8 border border-[#9CFF4A]/20 bg-[#050605]/80 font-mono text-xs space-y-4 hover:border-[#9CFF4A]/40 transition-colors"
          >
            {/* Netlify Form Hidden Inputs */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden" aria-hidden="true">
              <label>
                Bot shield: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
              </label>
            </p>

            <div className="text-xs text-[#9CFF4A] font-bold tracking-widest uppercase mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH_MESSAGE</span>
              </div>
              <span className="font-kanji text-[10px] text-[#9CFF4A]/70 font-normal">
                【 直接通信 // NETLIFY送信 】
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#D7D9D2]/50 tracking-wider">
                  NAME // CALLSIGN
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full p-3 bg-black/40 border border-[#9CFF4A]/20 text-[#D7D9D2] placeholder:text-[#D7D9D2]/30 focus:border-[#9CFF4A] focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[#D7D9D2]/50 tracking-wider">
                  EMAIL // RETURN ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.tld"
                  className="w-full p-3 bg-black/40 border border-[#9CFF4A]/20 text-[#D7D9D2] placeholder:text-[#D7D9D2]/30 focus:border-[#9CFF4A] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#D7D9D2]/50 tracking-wider">
                SUBJECT // TOPIC OR REPO
              </label>
              <input
                type="text"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. git-janitor / systems audit / inquiry"
                className="w-full p-3 bg-black/40 border border-[#9CFF4A]/20 text-[#D7D9D2] placeholder:text-[#D7D9D2]/30 focus:border-[#9CFF4A] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[#D7D9D2]/50 tracking-wider">
                MESSAGE PAYLOAD
              </label>
              <textarea
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe project requirements, security audits, or architectural inquiries..."
                className="w-full p-3 bg-black/40 border border-[#9CFF4A]/20 text-[#D7D9D2] placeholder:text-[#D7D9D2]/30 focus:border-[#9CFF4A] focus:outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#9CFF4A] text-[#050605] font-bold tracking-wider hover:bg-[#D7D9D2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {status === 'sending'
                  ? 'TRANSMITTING_PACKET...'
                  : 'DISPATCH DIRECT TO INBOX'}
              </span>
            </button>

            {status === 'success' && (
              <div className="p-3 bg-[#9CFF4A]/10 border border-[#9CFF4A] text-[#9CFF4A] space-y-1">
                <div className="font-bold flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5" />
                  <span>TRANSMISSION_ACKNOWLEDGED</span>
                </div>
                <p className="text-[11px] text-[#D7D9D2]/80">
                  Message securely stored in Netlify dashboard &amp; dispatched to recipient.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 space-y-2">
                <p className="text-[11px]">
                  Direct transmission unavailable in current preview environment.
                </p>
                <button
                  type="button"
                  onClick={handleMailtoFallback}
                  className="px-3 py-1.5 bg-[#9CFF4A] text-[#050605] font-bold text-[10px] tracking-wider hover:bg-[#D7D9D2] transition-colors"
                >
                  OPEN DEFAULT MAIL CLIENT
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};
