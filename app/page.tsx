"use client";

import Image from "next/image";

const businessAreas = [
  {
    number: "01",
    title: "Tech Services",
    description:
      "Web development, mobile applications, software solutions, UI/UX, graphic design and digital branding.",
    href: "/tech-services",
  },
  {
    number: "02",
    title: "Gadget Shop",
    description:
      "Quality smartphones, gadgets and accessories for your everyday digital needs.",
    href: "/gadget-shop",
  },
  {
    number: "03",
    title: "Pet Services",
    description:
      "Quality pets and related products with reliable service for pet lovers and owners.",
    href: "/pet-services",
  },
  {
    number: "04",
    title: "Automobiles",
    description:
      "Explore available vehicles and find the right automobile for your needs.",
    href: "/automobiles",
  },
  {
    number: "05",
    title: "Exchange",
    description:
      "Convenient exchange services for supported digital assets and gift cards.",
    href: "/exchange",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen items-center pt-10"
      >
        {/* Background glow */}
        <div className="absolute left-1/2 top-1/3 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-37.5 top-[20%] h-100 w-100 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute left-50 bottom-25 h-100 w-100 rounded-full bg-purple-600/10 blur-[120px]" />

        {/* Hero content */}
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-xs font-medium tracking-wide text-blue-200">
                TECHNOLOGY • TRADE • SOLUTIONS
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Building Ideas.
              <br />

              <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                Creating Possibilities.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              GB Global Services LTD is a diversified company delivering
              technology solutions, automobiles, mobile devices, pet trading,
              exchange services, and more.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#businesses"
                className="rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-7 py-4 text-center text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:scale-105"
              >
                Explore Our Businesses
              </a>

              <a
                href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20would%20like%20to%20make%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Contact Us →
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-bold">3+</p>

                <p className="mt-1 text-xs text-white/40">
                  Years Experience
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">5+</p>

                <p className="mt-1 text-xs text-white/40">
                  Business Areas
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">∞</p>

                <p className="mt-1 text-xs text-white/40">
                  Possibilities
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT HERO VISUAL */}
          <div className="relative hidden min-h-150 lg:block">
            <div className="relative mx-auto h-150 w-150">

              {/* Ambient Glow */}
              <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

              {/* Outer Rings */}
              <div className="absolute inset-10 rounded-full border border-blue-400/10" />

              <div className="absolute inset-20 rounded-full border border-cyan-400/10" />

              <div className="absolute inset-32 rounded-full border border-white/5" />

              {/* CENTER CARD */}
              <div className="absolute left-1/2 top-1/2 z-20 flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[42px] border border-white/15 bg-[#0b1125]/90 shadow-2xl shadow-blue-500/20 backdrop-blur-xl">

                <div className="relative h-32 w-32 overflow-hidden rounded-[28px] border border-white/20 shadow-xl shadow-blue-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Technology"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-4 text-sm font-bold tracking-[0.25em]">
                  GLOBAL
                </p>

                <p className="mt-1 text-[10px] tracking-[0.35em] text-blue-300">
                  SERVICES LTD
                </p>
              </div>

              {/* TECHNOLOGY CARD */}
              <div className="absolute left-0 top-8 z-30 w-36 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-3 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=870&auto=format&fit=crop"
                    alt="Technology services"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-semibold">
                  Technology
                </p>

                <p className="mt-1 text-center text-[9px] tracking-[0.2em] text-blue-300">
                  SERVICES
                </p>
              </div>

              {/* AUTOMOBILE CARD */}
              <div className="absolute right-0 top-12 z-30 w-36 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-3 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1638247311144-54dec39cabc6?q=80&w=1514&auto=format&fit=crop"
                    alt="Automobiles"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-semibold">
                  Automobiles
                </p>

                <p className="mt-1 text-center text-[9px] tracking-[0.2em] text-blue-300">
                  SALES
                </p>
              </div>

              {/* GADGET CARD */}
              <div className="absolute bottom-32 left-0 z-30 w-36 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-3 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1697545806245-9795b6056141?q=80&w=774&auto=format&fit=crop"
                    alt="Gadgets"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-semibold">
                  Gadgets
                </p>

                <p className="mt-1 text-center text-[9px] tracking-[0.2em] text-blue-300">
                  SHOP
                </p>
              </div>

              {/* EXCHANGE CARD */}
              <div className="absolute bottom-[-40] left-1/2 z-30 w-36 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-3 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1651054558996-03455fe2702f?q=80&w=1480&auto=format&fit=crop"
                    alt="Exchange services"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-semibold">
                  Exchange
                </p>

                <p className="mt-1 text-center text-[9px] tracking-[0.2em] text-blue-300">
                  SERVICES
                </p>
              </div>

              {/* PET CARD */}
              <div className="absolute right-0 top-2/3 z-30 w-36 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-3 shadow-2xl shadow-blue-500/10 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/30">

                <div className="relative h-28 w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509205477838-a534e43a849f?q=80&w=578&auto=format&fit=crop"
                    alt="Pet services"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <p className="mt-3 text-center text-xs font-semibold">
                  Pet Services
                </p>

                <p className="mt-1 text-center text-[9px] tracking-[0.2em] text-blue-300">
                  CARE & SALES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / INTRODUCTION */}
      <section
        id="about"
        className="border-t border-white/10 px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                WHO WE ARE
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                More than a business.
                <span className="block text-white/40">
                  We&apos;re building possibilities.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-white/50">
              GB Global Services LTD is a diversified company providing
              technology solutions, automobile sales, mobile devices, pet
              trading, exchange services, and other business solutions. We are
              committed to delivering quality products and reliable services
              while helping individuals and businesses achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* BUSINESS AREAS */}
      <section
        id="businesses"
        className="border-t border-white/10 px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                WHAT WE DO
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Our Business Areas
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/40">
              Explore our different business divisions and discover what GB
              Global Services can offer you.
            </p>
          </div>

          {/* Business Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {businessAreas.map((business) => (
              <a
                key={business.title}
                href={business.href}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/6"
              >
                {/* Glow */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-cyan-400/10" />

                <div className="relative">

                  {/* Number */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                      <span className="text-lg font-bold text-blue-300">
                        {business.number}
                      </span>
                    </div>

                    <span className="text-2xl text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                      →
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    {business.title}
                  </h3>

                  <p className="mt-3 min-h-18 text-sm leading-6 text-white/45">
                    {business.description}
                  </p>

                  <div className="mt-7 text-sm font-semibold text-cyan-300">
                    Explore Service
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl border border-white/10 bg-linear-to-br from-blue-500/10 via-white/2 to-cyan-500/5 p-8 sm:p-12 lg:p-16">

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

              {/* Text */}
              <div>
                <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                  WHY GB GLOBAL
                </p>

                <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                  Quality, reliability and innovation in everything we do.
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-white/50">
                  We believe every customer deserves excellent service,
                  transparent communication and solutions that deliver real
                  value.
                </p>

                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20would%20like%20to%20make%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#050816] transition hover:scale-105"
                >
                  Start a Conversation
                </a>
              </div>

              {/* Features */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    number: "01",
                    title: "Customer Focus",
                    description:
                      "We put our customers and their needs first.",
                  },
                  {
                    number: "02",
                    title: "Quality",
                    description:
                      "We aim to deliver products and services you can trust.",
                  },
                  {
                    number: "03",
                    title: "Innovation",
                    description:
                      "We continuously explore better ways to solve problems.",
                  },
                  {
                    number: "04",
                    title: "Reliability",
                    description:
                      "We value honest communication and dependable service.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.number}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <span className="text-xs font-bold text-cyan-400">
                      {feature.number}
                    </span>

                    <h3 className="mt-4 font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/40">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10 px-6 py-28 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">

          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            LET&apos;S WORK TOGETHER
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            Have a product or service in mind?
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-7 text-white/45">
            Whether you need a digital solution, want to purchase a product,
            or simply have an inquiry, our team is ready to hear from you.
          </p>

          <a
            href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20would%20like%20to%20make%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-8 py-4 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
          >
            Chat With Us on WhatsApp →
          </a>
        </div>
      </section>
    </main>
  );
}