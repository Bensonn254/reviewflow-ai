import { Link } from "react-router-dom";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ChatWidget from "@/components/ChatWidget";
import { Mail, Phone, MapPin, Clock, Shield, Lock, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-bg-page text-foreground font-sans">
      <PublicNav />

      {/* ─── HERO ─── */}
      <section className="max-w-screen-xl mx-auto px-6 sm:px-8 pt-36 sm:pt-40 pb-16">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-brand/20 bg-brand/5 px-5 py-2 text-sm font-black uppercase tracking-[0.15em] text-brand shadow-sm">
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.08]">
            We're here to help you{" "}
            <span className="text-brand underline decoration-accent-yellow decoration-[6px] underline-offset-[6px] sm:decoration-8 sm:underline-offset-[10px]">scale your reputation.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
            Have questions about ReviewFlow AI? Our team is ready to help your business automate growth and protect its online image.
          </p>
        </div>
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="bg-white border-y border-border py-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT: Direct Outreach */}
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-10">Direct Outreach</h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="group flex items-start gap-5 rounded-2xl border border-border bg-bg-page p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Email</p>
                    <p className="text-lg font-black text-foreground">hello@reviewflow.ai</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Support responses within 4 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-5 rounded-2xl border border-border bg-bg-page p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Phone</p>
                    <p className="text-lg font-black text-foreground">+254 743 000 000</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Mon–Fri, 9am – 6pm EAT</p>
                  </div>
                </div>

                {/* Office */}
                <div className="group flex items-start gap-5 rounded-2xl border border-border bg-bg-page p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">Office</p>
                    <p className="text-lg font-black text-foreground">Nairobi, Kenya</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">Global Headquarters</p>
                  </div>
                </div>
              </div>

              {/* Response Guarantee */}
              <div className="mt-10 rounded-2xl bg-brand/5 border border-brand/15 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center text-white">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black text-brand">Response Guarantee</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  We know your time is valuable. Our dedicated support team guarantees a response to all sales and support inquiries within one business day.
                </p>
              </div>


            </div>

            {/* RIGHT: Contact Form */}
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-3">Send a Message</h2>
              <p className="text-muted-foreground font-medium mb-10">
                Fill out the form below and we'll reach out shortly.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Cooper"
                      className="w-full rounded-xl border border-border bg-bg-page px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Work Email</label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-border bg-bg-page px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">Company Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Reputation Masters Inc."
                    className="w-full rounded-xl border border-border bg-bg-page px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">How Can We Help?</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us a bit about your business and goals..."
                    className="w-full rounded-xl border border-border bg-bg-page px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand/30 transition-all font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-brand text-white py-5 text-lg font-black hover:bg-brand/90 transition-all hover:-translate-y-1 shadow-lg shadow-brand/20"
                >
                  Send Message
                </button>
              </form>

              {/* Trust badges */}
              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Lock className="h-4 w-4 text-brand" /> SSL Encrypted
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <Shield className="h-4 w-4 text-brand" /> GDPR Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 sm:py-24 px-6 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand px-8 py-16 sm:py-20 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
              Ready to see it in action?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 font-medium">
              Don't wait for inquiries. Start automating your review management today and watch your business grow through better customer trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/demo"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-white px-8 text-lg font-black text-brand transition-all hover:bg-surface-2 hover:-translate-y-1"
              >
                Watch Live Demo
              </Link>
              <Link
                to="/auth"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-xl bg-accent-yellow px-8 text-lg font-black text-[#0F1724] transition-all hover:bg-accent-yellow-700 hover:-translate-y-1 shadow-lg"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default Contact;
