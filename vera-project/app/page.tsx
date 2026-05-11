"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Sparkles,
  Snowflake,
  Wallet,
  Package,
  Timer,
  Users,
  Wind,
  Leaf,
  Box,
  ChevronDown,
  Gift,
  Star,
  Zap,
  AlertTriangle,
  BatteryCharging,
} from "lucide-react"

function TrustChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
      <CheckCircle2 className="h-4 w-4 text-brand-green" />
      {children}
    </span>
  )
}

// WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

export default function Landing() {
  // Countdown
  const [time, setTime] = useState({ h: 5, m: 59, s: 59 })
  const [stockLeft, setStockLeft] = useState(17)
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t
        s--
        if (s < 0) {
          s = 59
          m--
        }
        if (m < 0) {
          m = 59
          h--
        }
        if (h < 0) {
          h = 0
          m = 0
          s = 0
        }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Random stock decrease for urgency
  useEffect(() => {
    const stockId = setInterval(() => {
      setStockLeft((s) => (s > 5 ? s - 1 : s))
    }, 45000)
    return () => clearInterval(stockId)
  }, [])

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")

    const form = e.target as HTMLFormElement
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value
    const address = (form.elements.namedItem('address') as HTMLTextAreaElement).value
    const quantity = (form.elements.namedItem('quantity') as HTMLSelectElement).value

    // Submit to Formspree
    try {
      const response = await fetch("https://formspree.io/f/mpqbkqkb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, phone, address, quantity }),
      })

      if (response.ok) {
        setFormStatus("success")
        form.reset()
        // Also open WhatsApp with the order details
        const message = `New Order from Vera Multiventures Website%0A%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AQuantity: ${quantity}`
        window.open(`https://wa.me/2349166994945?text=${message}`, '_blank')
      } else {
        setFormStatus("error")
      }
    } catch {
      setFormStatus("error")
    }
  }

  const benefits = [
    {
      icon: Leaf,
      title: "Keeps Food Fresh Longer",
      text: "Seal your garri, semo, beans and more — they stay fresh for months.",
    },
    {
      icon: Snowflake,
      title: "No More Weevils",
      text: "Airtight seal keeps insects and moisture out completely.",
    },
    {
      icon: Wallet,
      title: "Save Money Every Month",
      text: "Stop wasting food. Stop rebuying what spoiled. Keep your money.",
    },
    {
      icon: Box,
      title: "Compact & Portable",
      text: "Fits in your palm. Store it anywhere. Take it anywhere.",
    },
    {
      icon: Timer,
      title: "Seals In 2 Seconds",
      text: "Just place the bag, press the button, done. Anyone can use it.",
    },
    {
      icon: Users,
      title: "Perfect For Every Home",
      text: "Whether you cook for 2 or 12, this machine saves your food.",
    },
  ]

  const reviews = [
    {
      name: "Mrs. Adaeze, Lagos",
      text: "I used to throw away garri every month because of weevils. Now my garri stays fresh for 3 months! This machine paid for itself.",
      rating: 5,
    },
    {
      name: "Chinedu, Abuja",
      text: "The USB charging is a game changer. I charge it once and seal bags for weeks. No more buying batteries.",
      rating: 5,
    },
    {
      name: "Hauwa, Kano",
      text: "Delivery came the next day! I paid on delivery and it works exactly as shown. My crayfish and pepper stay fresh now.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      q: "Is it easy to use?",
      a: "Yes, anyone can use it within seconds — just place the bag opening in the slot and press the button. It seals instantly.",
    },
    {
      q: "What foods can I seal with it?",
      a: "It works for garri, semo, semovita, beans, crayfish, groundnut oil bags, pepper, rice, sugar, salt, snacks, and any bag or sachet you want to reseal.",
    },
    {
      q: "Can I pay on delivery?",
      a: "Yes! We offer pay on delivery across Nigeria. You inspect before you pay.",
    },
    {
      q: "Does it come with anything extra?",
      a: "Yes — every order includes 10 FREE vacuum bags as a bonus gift worth ₦5,000.",
    },
    {
      q: "How long does delivery take?",
      a: "Same-day to 1-day delivery in Lagos, Abuja, and Port Harcourt. Other major cities within 1-2 days. Remote areas 2-4 days.",
    },
    {
      q: "How do I charge it?",
      a: "It uses USB Type-C — the same cable as most phones. Charge with any phone charger or power bank. One charge lasts for hundreds of seals.",
    },
  ]

  return (
    <main className="bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-brand-mint bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Image
            src="/images/vera-logo.jpg"
            alt="Vera Multiventures Limited"
            width={140}
            height={40}
            style={{ width: 'auto', height: '40px' }}
          />
          <a
            href="#order"
            className="hidden rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-orange-deep sm:inline-flex"
          >
            Order Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white section-pad">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold text-brand-green">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by 12,000+ Nigerian Homes
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-brand-green sm:text-5xl lg:text-[3.5rem]">
              Stop Throwing Your Hard-Earned Money{" "}
              <span className="text-brand-orange">In The Dustbin</span> With Spoiled Food
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">
              Finally — a simple device that reseals your garri, semo, groundnut oil, beans, crayfish, 
              pepper sachets and more in <strong>2 seconds flat</strong>. Keep them fresh, dry and 
              weevil-free for months. Save thousands every month.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <a href="#order" className="btn-cta-deep w-full sm:w-auto">
                YES! I WANT MINE — PAY ON DELIVERY
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <TrustChip>Pay On Delivery</TrustChip>
                <TrustChip>Same-Day Delivery</TrustChip>
                <TrustChip>Easy To Use</TrustChip>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-brand-mint" aria-hidden />
            <Image
              src="/images/sealed-foods-with-product.jpg"
              alt="Nigerian foods sealed with Food Saver - garri, semo, groundnut oil bags freshly sealed with sealer beside them"
              width={600}
              height={600}
              className="relative rounded-[1.75rem] shadow-xl"
              priority
            />
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border-4 border-white bg-white p-3 shadow-2xl sm:block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kCSbzNaW7LAyxqSdvTPei73xld4jH7.png"
                alt="Food Saver Machine dimensions - compact portable size"
                width={160}
                height={140}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-brand-cream section-pad">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-2">
          <Image
            src="/images/wasted-nigerian-foods.jpg"
            alt="Open bags of garri, semo, beans and other Nigerian foods with contents spilling and being wasted"
            width={500}
            height={500}
            className="order-last rounded-2xl shadow-lg lg:order-first"
          />
          <div>
            <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Are You Tired Of Watching Your Food{" "}
              <span className="text-brand-orange-deep">Go To Waste?</span>
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Every Nigerian home faces this problem. You buy garri, semo, beans, crayfish — 
              and within weeks, weevils move in or moisture ruins everything.
            </p>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {[
                "Your garri and semo get weevils before you finish them.",
                "Groundnut oil sachets leak after opening.",
                "Crayfish and pepper lose their flavor and smell.",
                "You keep rebuying the same things — wasting money.",
                "Nylon bags tear and spill everywhere.",
              ].map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-white section-pad">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">
            The Smart Solution For Nigerian Kitchens
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            Three simple steps. Anyone in your house can do it — even your children.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Open and use your food",
                d: "Use your garri, semo, beans or any food as usual. When you're done...",
              },
              {
                n: "02",
                t: "Place the bag in the sealer",
                d: "Put the open end of the nylon bag between the sealing slot.",
              },
              {
                n: "03",
                t: "Press and seal instantly",
                d: "Press the button. The bag seals airtight in 2 seconds. Done!",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-brand-mint bg-white p-6 text-left shadow-sm"
              >
                <div className="text-3xl font-extrabold text-brand-orange">{s.n}</div>
                <h3 className="mt-2 text-xl font-bold text-brand-green">{s.t}</h3>
                <p className="mt-2 text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>

          {/* Product Image */}
          <div className="mt-12 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GxdoezHCtpFLS3v4e1zHJLzBrWP2Fo.png"
              alt="Food Saver Machine product dimensions - compact and portable"
              width={350}
              height={350}
              className="rounded-2xl"
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { i: ShieldCheck, t: "Airtight Seal" },
              { i: Leaf, t: "Stays Fresh" },
              { i: Box, t: "Compact Size" },
              { i: Wind, t: "No Weevils" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex flex-col items-center rounded-xl bg-brand-mint p-5">
                <Icon className="h-8 w-8 text-brand-green" />
                <p className="mt-2 text-sm font-semibold text-ink">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER COMPARISON */}
      <section className="bg-brand-cream section-pad">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">
              See The Difference For Yourself
            </h2>
            <p className="mt-3 text-ink-soft">Your food before and after using the Food Saver Machine.</p>
          </div>
          
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-red-200 bg-white">
              <div className="absolute left-0 top-0 rounded-br-xl bg-red-500 px-4 py-2 font-bold text-white">
                BEFORE
              </div>
              <Image
                src="/images/wasted-nigerian-foods.jpg"
                alt="Open bags of Nigerian foods with contents spilling - the problem"
                width={500}
                height={400}
                className="w-full"
              />
              <div className="p-4 text-center">
                <p className="font-semibold text-red-600">Food spoils, weevils enter, money wasted</p>
              </div>
            </div>
            
            {/* After */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-green-200 bg-white">
              <div className="absolute left-0 top-0 rounded-br-xl bg-brand-green px-4 py-2 font-bold text-white">
                AFTER
              </div>
              <Image
                src="/images/sealed-foods-with-product.jpg"
                alt="Neatly sealed bags of Nigerian foods with the sealer beside them - the solution"
                width={500}
                height={400}
                className="w-full"
              />
              <div className="p-4 text-center">
                <p className="font-semibold text-brand-green">Sealed, fresh, protected for months!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-brand-mint section-pad">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">
              Why Nigerian Families Love This Machine
            </h2>
            <p className="mt-3 text-ink-soft">Six reasons to never waste food again.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(20,83,45,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-mint">
                  <Icon className="h-6 w-6 text-brand-green" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-green">{title}</h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT BANNER */}
      <section className="bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-orange-deep p-6 text-center text-white sm:flex-row sm:text-left">
          <Gift className="h-10 w-10 shrink-0" />
          <div className="flex-1">
            <p className="text-xl font-bold font-display">FREE BONUS: 10 Sealing Bags Included!</p>
            <p className="text-white/90">{"Worth ₦5,000 — yours FREE with every order this week."}</p>
          </div>
          <a
            href="#order"
            className="rounded-full bg-white px-5 py-2.5 font-semibold text-brand-orange-deep transition hover:bg-gray-100"
          >
            Claim Mine
          </a>
        </div>
      </section>

      {/* FEATURES / SPECS */}
      <section className="bg-white section-pad">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">
              Product Specifications
            </h2>
            <p className="mt-3 text-ink-soft">Premium quality. Built to last.</p>
          </div>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dSYaBH1cjXVHlLOeBVjuoeGxd1OZ5Y.png"
              alt="Food Saver Machine parts — sealing button, cutter, power switch, indicator light and Type-C port"
              width={500}
              height={400}
              className="rounded-2xl border border-brand-mint bg-brand-cream p-4 shadow-md"
            />
            <div className="overflow-hidden rounded-2xl border border-brand-mint">
              <table className="w-full text-left">
                <tbody className="divide-y divide-brand-mint text-ink">
                  {[
                    ["Power", "USB Type-C Rechargeable (no batteries needed!)"],
                    ["Size", "9.5 × 4 × 3.5 cm — fits in your palm"],
                    ["Material", "ABS Food-Grade Plastic"],
                    ["Buttons", "Sealing button + Cutter button + Power switch"],
                    ["Indicator", "Blue light = Power On · Red light = Charging"],
                    ["In The Box", "1 Sealer + Type-C cable + 10 FREE bags"],
                  ].map(([k, v]) => (
                    <tr key={k} className="bg-white hover:bg-brand-mint/40">
                      <th className="w-1/3 p-4 font-semibold text-brand-green">{k}</th>
                      <td className="p-4 text-ink-soft">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* RECHARGEABLE SECTION */}
      <section className="bg-brand-mint section-pad">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bf0IjAjCH2u18C9HIhsp3zQ6y1E109.png"
            alt="Our Type-C rechargeable sealer vs old AAA battery sealers comparison"
            width={550}
            height={450}
            className="rounded-2xl shadow-lg"
          />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-green">
              <Zap className="h-3.5 w-3.5" /> Smarter Than The Rest
            </span>
            <h2 className="mt-4 text-3xl font-bold text-brand-green sm:text-4xl">
              Why USB Rechargeable{" "}
              <span className="text-brand-orange">Beats Batteries Every Time</span>
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Other sealers use AAA batteries that die fast and cost money to replace. 
              Our sealer charges with the same Type-C cable you use for your phone!
            </p>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {[
                "USB Type-C port — charge from any phone charger or power bank.",
                "One full charge lasts for hundreds of seals.",
                "No batteries to buy or replace — saves you money.",
                "Blue light = Power On. Red light = Charging. Simple!",
              ].map((p) => (
                <li key={p} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex items-center gap-4 rounded-xl bg-white p-4">
              <BatteryCharging className="h-10 w-10 text-brand-orange" />
              <div>
                <p className="font-semibold text-brand-green">Charge Once, Seal For Weeks</p>
                <p className="text-sm text-ink-soft">No more running around looking for batteries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-brand-gray-bg section-pad">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">
              What Our Customers Are Saying
            </h2>
            <p className="mt-3 text-ink-soft">Real reviews from real Nigerian families.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-brand-orange">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-ink-soft">&quot;{r.text}&quot;</p>
                <p className="mt-4 text-sm font-semibold text-brand-green">— {r.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 items-center gap-6 rounded-2xl bg-white p-6 sm:grid-cols-2">
            <Image
              src="/images/hero-sealer-action.jpg"
              alt="Nigerian customer sealing a bag of garri with the Food Saver Machine"
              width={500}
              height={400}
              className="rounded-xl"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange-deep">
                Trusted by 12,000+ Nigerian homes
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand-green">
                &quot;I wish I found this machine sooner!&quot;
              </h3>
              <p className="mt-3 text-ink-soft">
                I buy garri and beans in bulk now because I know they&apos;ll stay fresh. 
                My kitchen is more organized and I&apos;m saving so much money every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY */}
      <section className="bg-brand-green py-16 text-white">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <Timer className="h-4 w-4" /> Limited Time Offer
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            {"Promo Ends When This Timer Hits Zero"}
          </h2>
          <p className="mt-3 text-white/80">{"Don't miss out on the free bonus bags!"}</p>

          <div className="mt-8 flex justify-center gap-3 sm:gap-4">
            {[
              { l: "Hours", v: time.h },
              { l: "Mins", v: time.m },
              { l: "Secs", v: time.s },
            ].map((t) => (
              <div key={t.l} className="min-w-[80px] rounded-xl bg-white/10 p-4 backdrop-blur">
                <div className="font-display text-3xl font-extrabold sm:text-4xl">
                  {String(t.v).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/70">{t.l}</div>
              </div>
            ))}
          </div>

          <a href="#order" className="btn-cta mt-8">
            CLAIM MY OFFER NOW
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white section-pad">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center text-3xl font-bold text-brand-green sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-brand-mint bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-brand-green">
                  {f.q}
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LIMITED STOCK WARNING */}
      <section className="bg-red-50 py-6">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex items-center justify-center gap-4 rounded-xl bg-white p-4 shadow-md">
            <AlertTriangle className="h-8 w-8 shrink-0 text-red-500 flash-animation" />
            <div className="text-center sm:text-left">
              <p className="font-bold text-red-600">
                LIMITED STOCK WARNING: Only {stockLeft} Units Left!
              </p>
              <p className="text-sm text-ink-soft">
                Due to high demand, we&apos;re running low. Order now before we sell out again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="bg-brand-cream section-pad">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-green sm:text-4xl">Place Your Order Now</h2>
            <p className="mt-3 text-ink-soft">
              Fill the form below. Pay on delivery. Inspect before payment.
            </p>
          </div>

          {formStatus === "success" ? (
            <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-lg">
              <CheckCircle2 className="mx-auto h-16 w-16 text-brand-green" />
              <h3 className="mt-4 text-2xl font-bold text-brand-green">Order Received! 🎉</h3>
              <p className="mt-2 text-ink-soft">
                Thank you! We have received your order and will contact you shortly to confirm delivery.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                A WhatsApp message has also been opened for you to confirm your order directly.
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="mt-6 rounded-full border border-brand-green px-6 py-2 text-sm font-semibold text-brand-green hover:bg-brand-mint"
              >
                Place Another Order
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleOrderSubmit}
              className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-lg sm:p-8"
            >
              {[
                { n: "name", l: "Full Name", t: "text", p: "e.g. Adaeze Okafor" },
                { n: "phone", l: "Phone Number (WhatsApp preferred)", t: "tel", p: "e.g. 0801 234 5678" },
              ].map((f) => (
                <div key={f.n}>
                  <label className="mb-1 block text-sm font-semibold text-ink">{f.l}</label>
                  <input
                    required
                    type={f.t}
                    name={f.n}
                    placeholder={f.p}
                    className="w-full rounded-lg border border-brand-mint bg-white px-4 py-3 text-base outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">Delivery Address</label>
                <textarea
                  required
                  name="address"
                  rows={3}
                  placeholder="House number, street, area, city, state"
                  className="w-full rounded-lg border border-brand-mint bg-white px-4 py-3 text-base outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">Quantity</label>
                <select
                  name="quantity"
                  defaultValue="1"
                  className="w-full rounded-lg border border-brand-mint bg-white px-4 py-3 text-base outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                >
                  <option value="1">{"1 Unit — ₦24,500 (+ 10 Free Bags)"}</option>
                  <option value="2">{"2 Units — ₦46,000 (Save ₦3,000) + 20 Free Bags"}</option>
                  <option value="3">{"3 Units — ₦62,500 (Save ₦11,000) + 30 Free Bags"}</option>
                </select>
              </div>
              
              <div className="rounded-lg bg-brand-mint p-4 text-sm text-ink-soft">
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-brand-green" />
                  <strong className="text-brand-green">Delivery:</strong> Same-day to 1-day in Lagos, Abuja, PH. 1-2 days for other cities.
                </p>
              </div>

              {formStatus === "error" && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  Something went wrong. Please try again or contact us on WhatsApp.
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="btn-cta-deep mt-2 w-full disabled:opacity-70"
              >
                {formStatus === "submitting" ? "PLACING YOUR ORDER..." : "PLACE MY ORDER — PAY ON DELIVERY"}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2">
                <TrustChip>Pay On Delivery</TrustChip>
                <TrustChip>Inspect Before Payment</TrustChip>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-green py-8 text-center text-white">
        <Image
          src="/images/vera-logo.jpg"
          alt="Vera Multiventures Limited"
          width={120}
          height={35}
          className="mx-auto mb-4 rounded bg-white p-1"
          style={{ width: 'auto', height: '32px' }}
        />
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()} Vera Multiventures Limited. All rights reserved.
        </p>
        <p className="mt-1 flex items-center justify-center gap-2 text-sm text-white/60">
          <Truck className="h-4 w-4" /> Nationwide delivery with inspection before payment
        </p>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2349166994945"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="whatsapp-pulse fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105 bottom-20 md:bottom-4"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-mint bg-white p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
        <a href="#order" className="btn-cta-deep w-full text-center">
          ORDER NOW — Pay On Delivery
        </a>
      </div>
    </main>
  )
}
