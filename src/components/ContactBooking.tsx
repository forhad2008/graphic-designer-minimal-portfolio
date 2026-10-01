import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, Copy } from 'lucide-react';

interface ContactBookingProps {
  initialService?: string;
  initialBudget?: string;
  initialTimeline?: string;
  initialDeliverables?: string[];
  initialNotes?: string;
}

export const ContactBooking: React.FC<ContactBookingProps> = ({
  initialService = '',
  initialBudget = '$120 USD (Standard Pro)',
  initialTimeline = '3 Business Days',
  initialDeliverables = [],
  initialNotes = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: initialService || 'Logo & Brand Identity',
    budget: initialBudget || '$120 USD (Standard Pro)',
    timeline: initialTimeline || '3 Business Days',
    projectDescription: initialNotes || '',
    referenceLink: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        serviceType: initialService,
        budget: initialBudget || prev.budget,
        timeline: initialTimeline || prev.timeline,
        projectDescription: initialNotes || prev.projectDescription,
      }));
    }
  }, [initialService, initialBudget, initialTimeline, initialNotes]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getFormattedMessage = () => {
    return encodeURIComponent(
      `Hello Abdullah Forhad,\n\nI want to book a graphic design project!\n\n` +
      `👤 Name: ${formData.name || 'Not specified'}\n` +
      `📧 Email: ${formData.email || 'Not specified'}\n` +
      `🎨 Service: ${formData.serviceType}\n` +
      `💰 Budget: ${formData.budget}\n` +
      `⏱ Timeline: ${formData.timeline}\n` +
      `🔗 Moodboard: ${formData.referenceLink || 'None'}\n\n` +
      `📝 Brief:\n${formData.projectDescription || 'Details attached.'}`
    );
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/5 relative bg-[#05080E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-[#00E6BB] text-xs font-mono mb-2.5 border border-white/10">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Let&apos;s Build Your Brand
          </h2>
          <p className="text-slate-400 text-sm mt-1.5">
            Submit a brief or message directly on WhatsApp for an immediate consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#080C14] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E6BB] to-[#00B8FF] flex items-center justify-center text-slate-950 font-black text-lg font-display">
                  AF
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Abdullah Forhad</h3>
                  <p className="text-xs text-[#00E6BB] font-mono">Brand &amp; Graphic Designer</p>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                {/* Phone */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">WhatsApp &amp; Phone</span>
                      <a href="https://wa.me/8801342900364" target="_blank" rel="noopener noreferrer" className="font-mono text-white font-bold hover:text-[#00E6BB]">
                        +880 1342 900364
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('+8801342900364', 'phone')}
                    className="p-1.5 text-slate-400 hover:text-white bg-white/5 rounded-lg"
                    title="Copy"
                  >
                    {copiedContact === 'phone' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6BB]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Email */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#00B8FF]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Email</span>
                      <a href="mailto:forhadalpha08@gmail.com" className="font-mono text-white font-bold hover:text-[#00B8FF]">
                        forhadalpha08@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('forhadalpha08@gmail.com', 'email')}
                    className="p-1.5 text-slate-400 hover:text-white bg-white/5 rounded-lg"
                    title="Copy"
                  >
                    {copiedContact === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6BB]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={`https://wa.me/8801342900364?text=${getFormattedMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
                100% Commercial Copyright · Fast 1h Response
              </div>
            </div>

          </div>

          {/* Right Column: Brief Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#080C14] border border-white/10 rounded-2xl p-5 sm:p-6">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#00E6BB] border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Brief Submitted</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Abdullah will reply to <span className="text-[#00E6BB] font-mono">{formData.email}</span> in under 1 hour.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <a
                    href={`https://wa.me/8801342900364?text=${getFormattedMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-bold text-slate-950 btn-gradient-cyan rounded-xl flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-3 py-2 text-xs text-slate-400 hover:text-white bg-white/5 rounded-xl border border-white/10 cursor-pointer"
                  >
                    New Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex / Brand Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E6BB]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-slate-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E6BB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-slate-300 block mb-1">Service Discipline</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#101420] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E6BB]"
                    >
                      <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                      <option value="Social Media Ads Kit">Social Media Ads Kit</option>
                      <option value="Product Packaging & Labels">Packaging & Dielines</option>
                      <option value="Viral YouTube Thumbnails">YouTube Graphics</option>
                      <option value="Corporate Stationery & Print">Corporate Print</option>
                      <option value="Custom Graphic Design">Custom Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-slate-300 block mb-1">Budget Tier</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#101420] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E6BB]"
                    >
                      <option value="$45 USD (Starter)">$45 USD (Starter)</option>
                      <option value="$120 USD (Standard Pro)">$120 USD (Standard Pro)</option>
                      <option value="$280 USD (Premium Suite)">$280 USD (Premium Suite)</option>
                      <option value="$500+ USD (Custom)">$500+ USD (Custom)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-slate-300 block mb-1">Project Details &amp; Notes *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your brand vision, colors, deliverables, and text requirements..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E6BB] resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl btn-gradient-cyan hover:opacity-95 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Send Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/8801342900364?text=${getFormattedMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
