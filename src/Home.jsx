import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import linkupGroupLogo from "./assets/linkup-group-logo.webp";
import {
  MapPin, StarHalf, Plus, Building2, Clapperboard, Factory, GraduationCap, HeartPulse, Plane, ShoppingCart, Truck, Umbrella, Zap,
  ArrowLeft, ArrowRight, ArrowUp, Bot, BrainCircuit, Check, CheckCheck, CheckCircle2, Headset, HelpCircle, Mail, MessageCircle,
  Network, Phone, Sparkles, Star, UserRound, UserRoundCheck, Workflow,
} from "lucide-react";

const industryIconMap = {
  ecommerce: ShoppingCart,
  travel: Plane,
  healthcare: HeartPulse,
  realEstate: Building2,
  education: GraduationCap,
  logistics: Truck,
  utilities: Zap,
  finance: Umbrella,
  media: Clapperboard,
  manufacturing: Factory,
};

const bannerStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to right, #0B2550, #163A67)",
  backgroundSize: "44px 44px, 44px 44px, 100% 100%",
};

const aiIconMap = {
  network: Network,
  development: CheckCheck,
  agent: UserRound,
  chatbot: Headset,
  automation: Workflow,
  llm: BrainCircuit,
  generative: Sparkles,
  agentic: Bot,
  clientCheck: UserRoundCheck,
};

const initialForm = { name: "", email: "", phone: "", message: "" };

const iconMap = { phone: Phone, mail: Mail, inquiry: HelpCircle };

const toneClass = {
  plain: "text-white",
  orange: "text-[#00A9C5] relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[5px] after:rounded-full after:bg-[#00A9C5]/80",
  blue: "text-[#00A9C5] relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[5px] after:rounded-full after:bg-[#00A9C5]/80",
};

const serif = { fontFamily: "Verdana" };

function DiscussForm({ cfg }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((v) => ({ ...v, [name]: "" }));
    setStatus("idle");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    cfg.fields.forEach((f) => {
      const v = (values[f.name] || "").trim();
      if (f.required && !v) next[f.name] = cfg.errors.required;
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = cfg.errors.email;
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("loading");
    // TODO: replace with your real API call
    await new Promise((r) => setTimeout(r, 650));
    setValues({});
    setStatus("success");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-x-3 gap-y-3 sm:grid-cols-2">
      {cfg.fields.map((f) => {
        const props = {
          name: f.name,
          value: values[f.name] ?? "",
          onChange,
          placeholder: f.placeholder,
          "aria-label": f.placeholder,
          className: `w-full border-0 border-b bg-transparent px-2 py-3 text-xs text-slate-300 outline-none placeholder:text-slate-300 focus:border-[#00A9C5] ${errors[f.name] ? "border-red-400" : "border-white/30"}`,
        };
        return (
          <div className={f.width === "full" ? "sm:col-span-2" : ""} key={f.name}>
            {f.type === "textarea" ? <textarea {...props} rows={3} className={`${props.className} resize-y`} /> : <input {...props} type={f.type} />}
            {errors[f.name] && <p className="px-2 pt-1 text-[11px] text-red-400">{errors[f.name]}</p>}
          </div>
        );
      })}
      <div className="mt-4 flex items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="rounded-md border border-[#00A9C5] px-6 py-2.5 text-xs text-[#00A9C5] transition hover:bg-[#00A9C5] hover:text-[#0B2550] disabled:opacity-60">
          {status === "loading" ? cfg.submitting : cfg.submit}
        </button>
        {status === "success" && <span className="text-xs text-green-400">{cfg.success}</span>}
      </div>
    </form>
  );
}

function ProjectImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={`${className} bg-slate-200`} aria-label={alt} />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

function LogoItem({ logo }) {
  const [failed, setFailed] = useState(false);
  return failed || !logo.image ? (
    <span className="whitespace-nowrap text-xl font-bold text-[#0B2550]">{logo.name}</span>
  ) : (
    <img src={logo.image} alt={logo.name} loading="lazy" onError={() => setFailed(true)} className="h-14 w-auto max-w-none object-contain md:h-20" />
  );
}

function BrandLogo() {
  return (
    <span className="flex items-center gap-3">
      <img src={linkupGroupLogo} alt="" className="h-12 w-12 object-contain" />
      <span className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-white">Linkup </span>
          <span className="text-[#00A9C5]">Group</span>
        </span>
        <span className="mt-1.5 text-[10px] font-bold tracking-[0.4em] text-slate-400">PVT LTD</span>
      </span>
    </span>
  );
}

function Home() {
  const [content, setContent] = useState(null);
  const [contentError, setContentError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [swiper, setSwiper] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [reviewSnap, setReviewSnap] = useState({ active: 0, total: 1 });

  useEffect(() => {
    let active = true;
    fetch("/consultation-content.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Content request failed (${res.status})`);
        return res.json();
      })
      .then((data) => active && setContent(data))
      .catch((err) => {
        console.error("Unable to load content:", err);
        active && setContentError("We couldn't load the page content. Please refresh to try again.");
      });
    return () => {
      active = false;
    };
  }, []);

  const changeField = (e) => {
    const { name, value } = e.target;
    setForm((c) => ({ ...c, [name]: value }));
    setErrors((c) => ({ ...c, [name]: "" }));
    setStatus("idle");
  };

  const validateForm = () => {
    const err = content.form.errors;
    const next = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const digits = form.phone.replace(/\D/g, "");

    content.form.fields.forEach((f) => {
      const value = (form[f.name] || "").trim();
      if (f.required && !value) next[f.name] = err.required;
      else if (f.name === "email" && value && !emailPattern.test(value)) next.email = err.email;
      else if (f.name === "phone" && value && (digits.length < 7 || digits.length > 15)) next.phone = err.phone;
    });

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return setStatus("invalid");

    setStatus("loading");
    try {
      // TODO: replace with your real API call
      await new Promise((resolve) => setTimeout(resolve, 650));
      setForm(initialForm);
      setStatus("success");
    } catch (error) {
      console.error("Submit failed:", error);
      setStatus("error");
    }
  };

  if (contentError) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0B2550] px-6 text-center text-white">
        <div>
          <p className="text-lg">{contentError}</p>
          <button className="mt-5 rounded-full bg-[#00A9C5] px-6 py-3 font-semibold text-[#0B2550]" onClick={() => window.location.reload()} type="button">
            Refresh
          </button>
        </div>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0B2550]" aria-label="Loading">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#00A9C5]" />
      </main>
    );
  }

  const { brand, header, hero, form: f, trustedBy, whatWeDo, services, aiSection, projects, reviews, ctaBanner, customSolutions, techStack, whyChooseUs, locationBanner, industries, readyBanner, faq, globe, discuss, footer, floatingActions, whatsapp } = content;
  const syncReviewSnap = (sw) =>
    setReviewSnap({ active: sw.snapIndex, total: Math.max(1, sw.snapGrid.length) });
  const messageMap = { success: f.messages.success, invalid: f.messages.invalid, error: f.messages.error };
  const messageStyle = {
    success: "border-green-500/40 bg-green-500/10 text-green-300",
    invalid: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    error: "border-red-500/40 bg-red-500/10 text-red-300",
  };

  const inputBase =
    "w-full border-0 border-b bg-transparent px-4 py-4 text-base text-slate-200 outline-none transition placeholder:text-slate-300 focus:border-[#00A9C5]";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0B2550] pb-16 text-white antialiased sm:pb-0" style={{ fontFamily: "Verdana" }}>
      <div className="pointer-events-none absolute left-[35%] top-0 h-[520px] w-[620px] -translate-x-1/2 rounded-full bg-[#00A9C5]/15 blur-[140px]" />

      {/* Header */}
      <header className="relative z-20 mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-0 px-5 py-3 sm:gap-4 sm:py-5 lg:px-10">
        <a href="#home" aria-label={brand.logoText} className="flex items-center">
          <BrandLogo />
        </a>
        <div className="flex items-center gap-4 text-sm sm:gap-8 sm:text-base">
          <a href={`tel:${header.phone.replace(/\s/g, "")}`} className="hidden items-center gap-2 sm:flex">
            <Phone size={18} />{header.phone}
          </a>
          <a href={`mailto:${header.email}`} className="hidden items-center gap-2 md:flex">
            <Mail size={18} />{header.email}
          </a>
          <a href={header.cta.href} className="hidden rounded-full bg-[#00A9C5] px-6 py-3 font-medium text-[#0B2550] transition hover:bg-white sm:inline-flex">
            {header.cta.label}
          </a>
        </div>
      </header>

      {/* Hero */}
      <main id="home" className="relative z-10 mx-auto grid max-w-[1320px] items-start gap-12 px-5 pb-24 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-10 lg:pt-16">
        <section>
          <p className="text-xs uppercase tracking-wide text-slate-200 sm:text-sm">{hero.eyebrow}</p>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.15]" style={serif}>
            {hero.headingLines.map((line, i) => (
              <span className="block" key={i}>
                {line.map((part, j) => (
                  <span className={toneClass[part.tone] || toneClass.plain} key={j} style={part.tone !== "plain" ? { whiteSpace: "pre" } : undefined}>
                    {part.text}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[600px] text-base leading-8 text-slate-400 sm:text-lg">{hero.description}</p>
          <div className="mt-10 grid max-w-[620px] gap-4 sm:grid-cols-2">
            {hero.highlights.map((item) => (
              <span key={item} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-slate-100">
                <Check size={16} className="shrink-0 text-[#00A9C5]" />{item}
              </span>
            ))}
          </div>
        </section>

        {/* Form card */}
        <form
          id="consultation"
          onSubmit={submitForm}
          noValidate
          className="scroll-mt-6 rounded-[36px] border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-10"
        >
          <h2 className="text-2xl font-semibold text-[#00A9C5] sm:text-3xl" style={serif}>{f.title}</h2>
          <p className="mt-3 text-lg text-slate-300">{f.description}</p>

          {messageMap[status] && (
            <div className={`mt-5 rounded-xl border p-3 text-sm ${messageStyle[status]}`} role={status === "success" ? "status" : "alert"}>
              {messageMap[status]}
            </div>
          )}

          <div className="mt-6 grid gap-x-4 gap-y-3 sm:grid-cols-2">
            {f.fields.map((field) => {
              const props = {
                id: field.name,
                name: field.name,
                value: form[field.name] ?? "",
                onChange: changeField,
                placeholder: field.placeholder,
                "aria-label": field.label,
                "aria-invalid": Boolean(errors[field.name]),
                className: `${inputBase} ${errors[field.name] ? "border-red-400" : "border-white/25"}`,
              };
              return (
                <div className={field.width === "full" ? "sm:col-span-2" : ""} key={field.name}>
                  {field.type === "textarea" ? (
                    <textarea {...props} rows={5} className={`${props.className} resize-y`} />
                  ) : (
                    <input {...props} type={field.type} autoComplete={field.autoComplete} />
                  )}
                  {errors[field.name] && <p className="mt-1 px-4 text-xs text-red-400">{errors[field.name]}</p>}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 w-full rounded-xl border border-[#00A9C5] bg-transparent py-4 text-lg font-medium text-[#00A9C5] transition hover:bg-[#00A9C5] hover:text-[#0B2550] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? f.submitting : f.submit}
          </button>
        </form>
      </main>

      {/* Trusted By Brands */}
      <section className="relative z-10 mx-auto max-w-[1320px] px-5 lg:px-10">
        <style>{`@keyframes brandScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        <div className="flex flex-col items-center gap-6 overflow-hidden rounded-[36px] bg-white px-6 py-8 md:flex-row md:gap-0 md:px-14 md:py-12">
          <h2 className="shrink-0 border-slate-200 text-center text-3xl font-bold text-[#0B2550] md:border-r md:pr-12 md:text-left lg:text-5xl" style={serif}>
            {trustedBy.title}
          </h2>
          <div className="group w-full overflow-hidden md:pl-8">
            <div className="flex w-max items-center gap-14 group-hover:[animation-play-state:paused]" style={{ animation: "brandScroll 30s linear infinite" }}>
              {[...trustedBy.logos, ...trustedBy.logos].map((logo, i) => (
                <LogoItem logo={logo} key={`${logo.name}-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative z-10 mx-auto max-w-[1100px] px-5 py-20 text-center lg:py-28">
        <p className="text-sm uppercase tracking-wide text-[#00A9C5] sm:text-base">{whatWeDo.eyebrow}</p>
        <h2 className="mt-3 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl" style={serif}>{whatWeDo.title}</h2>
        <p className="mx-auto mt-8 max-w-[1000px] text-base leading-8 text-slate-400 sm:text-lg">{whatWeDo.description}</p>
      </section>

      {/* Services */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.cards.map((card) => (
            <article key={card.title} className="flex flex-col rounded-[28px] border border-white/20 bg-[#0B2550] p-8">
              <h3 className="text-2xl text-white">{card.title}</h3>
              <p className="mt-5 text-base leading-6 text-white">{card.description}</p>
              <ul className="mt-5 space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <Star size={12} className="shrink-0 fill-[#00A9C5] text-[#00A9C5]" />{item}
                  </li>
                ))}
              </ul>
              <a href={card.cta.href} className="mt-auto inline-block self-start rounded-full bg-[#00A9C5] px-5 py-2.5 text-sm text-[#0B2550] transition hover:bg-white" style={{ marginTop: "1.75rem" }}>
                {card.cta.label}
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={services.bottomCta.href} className="inline-block rounded-full bg-[#00A9C5] px-8 py-3 text-lg font-bold text-[#0B2550] transition hover:bg-white">
            {services.bottomCta.label}
          </a>
        </div>
      </section>

      {/* AI section */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
        <p className="text-sm uppercase text-[#00A9C5]">{aiSection.eyebrow}</p>
        <h2 className="mt-2 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl" style={serif}>{aiSection.title}</h2>
        <p className="mt-6 max-w-[1150px] text-base leading-8 text-slate-400 sm:text-lg">{aiSection.description}</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiSection.cards.map((card) => {
            const Icon = aiIconMap[card.icon] || Sparkles;
            return (
              <article key={card.title} className="rounded-[28px] bg-gradient-to-br from-[#163A67] to-[#0B2550] px-6 py-9 text-center">
                <Icon size={40} strokeWidth={1.5} className="mx-auto text-[#00A9C5]" />
                <h3 className="mt-5 text-xl font-semibold text-[#00A9C5]">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-300">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Projects: sticky stacking cards */}
      <section className="relative z-10 mx-auto max-w-[1100px] px-5 pb-32 lg:px-8">
        {(projects.eyebrow || projects.title) && (
          <div className="mb-12 text-center">
            {projects.eyebrow && <p className="text-sm uppercase text-[#00A9C5]">{projects.eyebrow}</p>}
            {projects.title && <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl" style={serif}>{projects.title}</h2>}
          </div>
        )}
        {projects.items.map((p, i) => (
          <div
            key={p.title}
            className="sticky mb-10 last:mb-0"
            style={{ top: "96px", zIndex: i + 1 }}
          >
            <article className="grid gap-6 rounded-2xl bg-white p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] md:grid-cols-[1fr_1.05fr] md:p-8">
              <div className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  {p.logo && <ProjectImage src={p.logo} alt={`${p.title} logo`} className="h-14 w-auto object-contain" />}
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs text-[#0B2550]">{p.badge}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-snug text-[#1c1c28] md:text-[28px]" style={serif}>{p.title}</h3>
                <p className="mt-3 text-xs text-slate-500">{p.tags}</p>
                {p.description && <p className="mt-4 text-xs leading-5 text-slate-500">{p.description}</p>}
                {p.stats?.length > 0 && (
                  <div className="mt-4 flex gap-8">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <p className="flex items-center gap-1 text-2xl font-semibold text-black">
                          <ArrowUp size={14} className="text-green-500" />{s.value}
                        </p>
                        <p className="text-[11px] text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ProjectImage src={p.image} alt={p.title} className="h-full max-h-[300px] min-h-[200px] w-full rounded-xl object-cover" />
            </article>
          </div>
        ))}
      </section>

      {/* Client reviews */}
      <section className="relative z-10 bg-gradient-to-b from-[#2a1a05]/60 to-transparent px-5 pb-28 pt-24 lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div className="max-w-[820px]">
              <p className="text-sm uppercase text-[#00A9C5]">{reviews.eyebrow}</p>
              <h2 className="mt-2 text-4xl font-bold text-[#fff4e6] sm:text-5xl lg:text-6xl" style={serif}>{reviews.title}</h2>
              <p className="mt-6 text-base leading-8 text-slate-500 sm:text-lg">{reviews.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-5 self-start rounded-2xl bg-white px-8 py-5">
              <span className="text-6xl font-bold text-[#1c1c1c]">{reviews.rating.score}</span>
              <div className="border-l border-slate-200 pl-5">
                <div className="flex gap-1.5">
                  {Array.from({ length: reviews.rating.stars }).map((_, i) => (
                    <Star key={i} size={20} className="fill-[#fbbf24] text-[#fbbf24]" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">{reviews.rating.countLabel}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {reviews.rating.poweredByPrefix} <span className="text-black">{reviews.rating.poweredByName}</span>
                </p>
              </div>
            </div>
          </div>

          <Swiper
            className="mt-14"
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            rewind
            speed={600}
            breakpoints={{ 768: { slidesPerView: 2, slidesPerGroup: 2 } }}
            onSwiper={(sw) => { setSwiper(sw); syncReviewSnap(sw); }}
            onSlideChange={syncReviewSnap}
            onResize={syncReviewSnap}
            onBreakpoint={syncReviewSnap}
          >
            {reviews.items.map((r) => (
              <SwiperSlide key={r.title} className="!h-auto">
              <article className="h-full min-h-[260px] rounded-[28px] bg-white p-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} size={18} className="fill-[#fbbf24] text-[#fbbf24]" />
                    ))}
                  </div>
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="fill-green-600 text-white" />{reviews.verifiedLabel}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold text-black">{r.title}</h3>
                <p className="mt-10 text-lg leading-8 text-slate-600">{r.text}</p>
              </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {reviewSnap.total > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button type="button" aria-label={reviews.prevLabel} onClick={() => swiper?.slidePrev()} className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#0B2550] transition hover:bg-[#00A9C5]">
                <ArrowLeft size={22} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: reviewSnap.total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Page ${i + 1}`}
                    onClick={() => swiper?.slideTo(i * swiper.params.slidesPerGroup)}
                    className={`h-2.5 rounded-full transition-all ${i === reviewSnap.active ? "w-8 bg-[#00A9C5]" : "w-2.5 bg-slate-400"}`}
                  />
                ))}
              </div>
              <button type="button" aria-label={reviews.nextLabel} onClick={() => swiper?.slideNext()} className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#0B2550] transition hover:bg-[#00A9C5]">
                <ArrowRight size={22} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0B2550] to-[#163A67] px-6 py-12 sm:px-10 lg:px-14"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to right, #0B2550, #163A67)",
            backgroundSize: "44px 44px, 44px 44px, 100% 100%",
          }}
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-[860px]">
              <p className="text-xs uppercase text-white sm:text-sm">{ctaBanner.eyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{ctaBanner.title}</h2>
              <p className="mt-4 max-w-[860px] text-base leading-7 text-white sm:text-lg">{ctaBanner.description}</p>
              <div className="mt-6 inline-flex flex-wrap items-center gap-x-12 gap-y-3 bg-white/25 px-6 py-4 font-semibold text-white">
                <a href={`tel:${ctaBanner.phone.replace(/\s/g, "")}`} className="flex items-center gap-2"><Phone size={18} />{ctaBanner.phone}</a>
                <a href={`mailto:${ctaBanner.email}`} className="flex items-center gap-2"><Mail size={18} />{ctaBanner.email}</a>
              </div>
            </div>
            <a href={ctaBanner.button.href} className="shrink-0 self-start rounded-md bg-white px-8 py-3.5 font-semibold text-[#0B2550] transition hover:bg-[#00A9C5] hover:text-[#0B2550] lg:mb-1 lg:self-end">
              {ctaBanner.button.label}
            </a>
          </div>
        </div>
      </section>

      {/* Custom solutions */}
      <section className="relative z-10 mx-auto max-w-[1100px] px-5 py-20 text-center lg:py-24">
        <p className="text-sm uppercase text-[#00A9C5]">{customSolutions.eyebrow}</p>
        <h2 className="mt-2 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl" style={serif}>{customSolutions.title}</h2>
        <p className="mx-auto mt-6 max-w-[1050px] text-base leading-8 text-slate-400 sm:text-lg">{customSolutions.description}</p>

        <div className="mt-16 grid gap-x-10 gap-y-12 text-center sm:grid-cols-2 lg:grid-cols-3">
          {customSolutions.items.map((item, i) => (
            <article key={item.title} className="px-2">
              <span
                className="block select-none text-8xl font-bold leading-none text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(0,169,197,0.18)" }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative -mt-5 text-2xl font-bold text-[#00A9C5]">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-[360px] text-base leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>

        <a href={customSolutions.cta.href} className="mt-14 inline-block rounded-full bg-[#00A9C5] px-6 py-3 font-bold text-[#0B2550] transition hover:bg-white">
          {customSolutions.cta.label}
        </a>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(0,169,197,0.14),transparent_65%)]" />
      </section>

      {/* Tech stack */}
      <section className="relative z-10 overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(0,169,197,0.14),transparent_55%)] pb-28 pt-16">
        <style>{`
          @keyframes techLeft{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          @keyframes techRight{from{transform:translateX(-50%)}to{transform:translateX(0)}}
          @keyframes techFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        `}</style>

        {techStack.floatingIcons?.map((icon) => (
          <img
            key={icon.name}
            src={icon.image}
            alt=""
            aria-hidden="true"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            className="pointer-events-none absolute opacity-20"
            style={{ top: icon.top, left: icon.left, width: icon.size, animation: `techFloat 7s ease-in-out ${icon.delay}s infinite` }}
          />
        ))}

        <div className="relative mx-auto max-w-[1000px] px-5 text-center">
          <p className="text-sm uppercase text-[#00A9C5]">{techStack.eyebrow}</p>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={serif}>{techStack.title}</h2>
          <p className="mt-6 text-base leading-8 text-slate-400">{techStack.description}</p>
        </div>

        <div className="relative mt-20 space-y-5">
          {techStack.rows.map((row, r) => (
            <div className="overflow-hidden" key={r}>
              <div
                className="flex w-max"
                style={{ animation: `${row.direction === "right" ? "techRight" : "techLeft"} ${row.duration || 40}s linear infinite` }}
              >
                {[...row.items, ...row.items].map((tech, i) => (
                  <span
                    key={`${tech.name}-${i}`}
                    className={`whitespace-nowrap px-10 text-2xl font-bold sm:px-14 ${
                      tech.tone === "orange" ? "text-[#00A9C5]" : tech.tone === "blue" ? "text-[#00A9C5]" : "text-slate-400"
                    }`}
                    style={serif}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 lg:px-8">
        <p className="text-sm uppercase text-[#00A9C5]">{whyChooseUs.eyebrow}</p>
        <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={serif}>{whyChooseUs.title}</h2>
        <p className="mt-6 max-w-[1100px] text-base leading-8 text-slate-400 sm:text-lg">{whyChooseUs.description}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.cards.map((card) => {
            const Icon = aiIconMap[card.icon] || Sparkles;
            return (
              <article key={card.title} className="rounded-[24px] bg-gradient-to-br from-[#163A67] to-[#0B2550] px-6 py-8 text-center">
                <Icon size={34} strokeWidth={1.5} className="mx-auto text-[#00A9C5]" />
                <h3 className="mt-4 text-lg font-semibold text-[#00A9C5]">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <a href={whyChooseUs.cta.href} className="inline-block rounded-full bg-[#00A9C5] px-6 py-2.5 text-sm font-bold text-[#0B2550] transition hover:bg-white">
            {whyChooseUs.cta.label}
          </a>
        </div>
      </section>

      {/* Location banner */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 pt-16 lg:px-8">
        <div
          className="rounded-[28px] px-6 py-10 sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to right, #0B2550, #163A67)",
            backgroundSize: "44px 44px, 44px 44px, 100% 100%",
          }}
        >
          <p className="text-xs uppercase text-white">{locationBanner.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{locationBanner.title}</h2>
          <p className="mt-4 max-w-[1100px] text-base leading-7 text-white">{locationBanner.description}</p>
          <p className="mt-5 pb-8 font-semibold text-white">{locationBanner.locations}</p>
        </div>
      </section>

      {/* Industries */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-16 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase text-[#00A9C5] sm:text-sm">{industries.eyebrow}</p>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={serif}>{industries.title}</h2>
          <p className="mx-auto mt-5 max-w-[1100px] text-base text-slate-400">{industries.description}</p>
        </div>
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {industries.items.map((item) => {
            const Icon = industryIconMap[item.icon] || Factory;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center gap-6 border-b border-r border-white/10 px-3 py-10 text-center lg:[&:nth-child(5n)]:border-r-0 lg:[&:nth-last-child(-n+5)]:border-b-0"
              >
                <Icon size={60} strokeWidth={1} className="text-slate-500" />
                <span className="text-base text-slate-400">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ready to build banner */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-28 lg:px-8">
        <div className="rounded-[28px] px-6 py-10 sm:px-10" style={bannerStyle}>
          <p className="text-xs uppercase text-white">{readyBanner.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{readyBanner.title}</h2>
          <p className="mt-4 max-w-[1100px] text-base leading-7 text-white">{readyBanner.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {readyBanner.buttons.map((b) => (
              <a key={b.label} href={b.href} className="rounded-md bg-[#00A9C5] px-8 py-3 text-sm font-semibold text-[#0B2550] transition hover:bg-white">
                {b.label}
              </a>
            ))}
          </div>
          <p className="mt-5 pb-4 font-semibold text-white">{readyBanner.services}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-28 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase text-[#00A9C5]">{faq.eyebrow}</p>
          <h2 className="mt-1 text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={serif}>{faq.title}</h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1220px] items-start gap-x-6 gap-y-3 lg:grid-cols-2">
          {[faq.items.slice(0, Math.ceil(faq.items.length / 2)), faq.items.slice(Math.ceil(faq.items.length / 2))].map((column, c) => (
            <div className="flex flex-col gap-3" key={c}>
              {column.map((item, k) => {
                const id = `${c}-${k}`;
                const open = openFaq === id;
                return (
                  <div key={id} className="rounded-xl bg-[#102D59]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : id)}
                      className="flex w-full items-center justify-between gap-4 px-4 py-[18px] text-left text-[15px] text-slate-300"
                    >
                      <span>{item.question}</span>
                      <Plus size={20} className={`shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <p className="px-4 pb-5 text-sm leading-7 text-slate-400">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Globe */}
      <section className="relative z-10 mx-auto max-w-[1240px] px-5 pb-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl" style={serif}>{globe.title}</h2>
            <p className="mt-6 max-w-[400px] text-sm leading-6 text-slate-400">{globe.description}</p>
            <a href={globe.cta.href} className="mt-8 inline-block rounded-full bg-[#00A9C5] px-6 py-3 text-xs font-bold text-[#0B2550] transition hover:bg-white">
              {globe.cta.label}
            </a>
          </div>
          <ProjectImage src={globe.mapImage} alt="" className="mx-auto w-full max-w-[640px] opacity-80" />
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-x-6 gap-y-3 text-3xl font-extrabold text-[#315179] sm:text-4xl" aria-hidden="true">
          {globe.countries.map((c) => <span key={c}>{c}</span>)}
        </div>
      </section>

      {/* Discuss a project */}
      <section className="relative z-10 mx-auto max-w-[1100px] px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#163A67] to-[#0B2550] px-6 py-10 sm:px-10">
          <p className="text-[10px] uppercase text-[#00A9C5]">{discuss.eyebrow}</p>
          <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={serif}>{discuss.title}</h2>
          <div className="lg:w-[52%]">
            <DiscussForm cfg={discuss} />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 rounded-3xl bg-white/[0.05] p-8 lg:absolute lg:bottom-0 lg:right-0 lg:top-[26%] lg:mt-0 lg:w-[46%] lg:content-center lg:rounded-none lg:rounded-tl-[90px] lg:pl-12">
            {discuss.stats.map((st) => (
              <div key={st.label}>
                <p className="text-3xl font-bold text-[#00A9C5]">{st.value}</p>
                <p className="mt-1 text-xs text-slate-300">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-[1100px] px-5 pb-12 lg:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div>
            <BrandLogo />
            <p className="mt-3 max-w-[200px] text-[11px] font-semibold uppercase leading-5 tracking-[0.15em] text-slate-300">{footer.tagline}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            {[footer.india, footer.usa].map((a) => (
              <div key={a.title} className="space-y-3 text-[11px] text-slate-400">
                <p className="text-xs font-semibold text-white">{a.title}</p>
                {a.phone && <p className="flex items-center gap-2"><Phone size={12} />{a.phone}</p>}
                {a.address && <p className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0" />{a.address}</p>}
                {a.email && <p className="flex items-center gap-2"><Mail size={12} />{a.email}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {footer.ratings.map((r) => (
            <div key={r.name} className="flex h-[50px] flex-col items-center justify-center rounded-lg bg-[#102D59]">
              {r.image ? (
                <img src={r.image} alt={r.name} className="h-5 w-auto" />
              ) : (
                <span className="text-sm font-semibold text-white">{r.name}</span>
              )}
              <div className="mt-1 flex">
                {Array.from({ length: 5 }).map((_, i) => {
                  const full = i + 1 <= Math.floor(r.stars);
                  const half = !full && i < r.stars;
                  return half ? (
                    <StarHalf key={i} size={11} className="fill-[#fbbf24] text-[#fbbf24]" />
                  ) : (
                    <Star key={i} size={11} className={full ? "fill-[#fbbf24] text-[#fbbf24]" : "text-slate-600"} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[800px] text-center text-[11px] leading-5 text-slate-500">{footer.about}</p>
        {footer.copyright && (
          <p className="mt-6 border-t border-white/10 pt-5 text-center text-[11px] text-slate-500">{footer.copyright}</p>
        )}
      </footer>

      {/* Floating side actions */}
      <aside className="fixed right-0 top-1/2 z-30 hidden w-[100px] -translate-y-1/2 flex-col overflow-hidden bg-[#00A9C5] sm:flex">
        {floatingActions.map((a) => {
          const Icon = iconMap[a.icon] || HelpCircle;
          return (
            <a key={a.label} href={a.href} className="flex flex-col items-center gap-2 border-b border-[#0B2550]/20 px-2 py-6 text-center text-sm font-medium text-[#0B2550] last:border-0 hover:bg-white">
              <Icon size={30} />{a.label}
            </a>
          );
        })}
      </aside>

      <nav aria-label="Quick contact actions" className="fixed inset-x-0 bottom-0 z-30 flex bg-[#00A9C5] pb-[env(safe-area-inset-bottom)] text-[#0B2550] sm:hidden">
        <a href={floatingActions.find((action) => action.icon === "phone")?.href} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border-r border-white/70 py-2 text-xs font-medium">
          <Phone size={20} />
          <span>Call Us Now</span>
        </a>
        <a href={whatsapp.href} target="_blank" rel="noreferrer" className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 border-r border-white/70 py-2 text-xs font-medium">
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
        <a href={floatingActions.find((action) => action.icon === "inquiry")?.href} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium">
          <HelpCircle size={20} />
          <span>Quick Inquiry</span>
        </a>
      </nav>

      <a
        href={whatsapp.href}
        target="_blank"
        rel="noreferrer"
        aria-label={whatsapp.label}
        className="fixed bottom-5 right-5 z-30 hidden h-14 w-14 place-items-center rounded-full bg-[#00A9C5] text-[#0B2550] shadow-lg shadow-black/40 transition hover:scale-105 sm:grid"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

export default Home;