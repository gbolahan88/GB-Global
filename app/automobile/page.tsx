"use client";

import Image from "next/image";

const vehicles = [
  {
    name: "Luxury Cars",
    category: "Premium Vehicles",
    description:
      "Premium vehicles selected for comfort, performance, style and an exceptional driving experience.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "SUVs",
    category: "Sport Utility Vehicles",
    description:
      "Spacious and versatile SUVs suitable for family trips, business and everyday driving.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Sedans",
    category: "Passenger Vehicles",
    description:
      "Comfortable and practical sedans for everyday transportation, business and personal use.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Trucks & Utility",
    category: "Commercial Vehicles",
    description:
      "Reliable utility vehicles designed for business operations, transportation and demanding tasks.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Executive Vehicles",
    category: "Executive Collection",
    description:
      "Vehicles that combine refined design, comfort and presence for an elevated driving experience.",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Used Vehicles",
    category: "Quality Pre-Owned",
    description:
      "Explore available pre-owned vehicles and contact us for current options and details.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400&auto=format&fit=crop",
  },
];

const benefits = [
  {
    number: "01",
    title: "Wide Selection",
    text: "Explore different vehicle categories based on your needs and preferences.",
  },
  {
    number: "02",
    title: "Personal Assistance",
    text: "Speak directly with us to discuss your preferred vehicle and requirements.",
  },
  {
    number: "03",
    title: "Flexible Options",
    text: "Ask about available vehicles, specifications, pricing and other details.",
  },
  {
    number: "04",
    title: "Direct Inquiry",
    text: "Contact us through WhatsApp and receive assistance before making a decision.",
  },
];

export default function AutomobilesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* HERO */}
      <section className="hero-section relative overflow-hidden pt-32">
        <div className="absolute left-1/4 top-10 h-125 w-125 rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute right-0 top-1/3 h-112.5 w-112.5 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* HERO CONTENT */}
            <div>

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-cyan-400" />

                <span className="text-xs font-medium tracking-[0.15em] text-blue-200">
                  GB GLOBAL • AUTOMOBILES
                </span>

              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

                Drive something
                <span className="hero-gradient block bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  exceptional.
                </span>

              </h1>

              <p className="hero-copy mt-7 max-w-xl text-lg leading-8 text-white/55">
                Explore automobiles available through GB Global Services.
                Whether you&apos;re looking for a family vehicle, executive car,
                SUV or utility vehicle, we&apos;re here to help you find the right
                option.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#vehicles"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
                >
                  Explore Vehicles →
                </a>

                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20am%20interested%20in%20your%20automobile%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Talk to Us
                </a>

              </div>

              {/* STATS */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-7">

                <div>
                  <p className="text-xl font-bold">Cars</p>
                  <p className="mt-1 text-xs text-white/40">
                    & Vehicles
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">Multiple</p>
                  <p className="mt-1 text-xs text-white/40">
                    Categories
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">Direct</p>
                  <p className="mt-1 text-xs text-white/40">
                    Assistance
                  </p>
                </div>

              </div>

            </div>


            {/* HERO IMAGE */}
            <div className="relative">

              <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

              <div className="hero-media relative mx-auto max-w-[600px] overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-500/10">

                <div className="relative h-[500px] overflow-hidden rounded-[28px]">

                  <Image
                    src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1400&auto=format&fit=crop"
                    alt="Premium automobile"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 600px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">

                    <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                      AUTOMOBILE COLLECTION
                    </p>

                    <h2 className="mt-2 mb-5 text-3xl font-bold">
                      Your next drive starts here.
                    </h2>

                  </div>

                </div>

              </div>


              {/* FLOATING CARD */}
              <div className="hero-panel absolute -bottom-6 -left-4 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-0">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-xl">
                    🚘
                  </div>

                  <div>

                    <p className="text-xs text-white/40">
                      Automobile Services
                    </p>

                    <p className="text-sm font-bold">
                      Sales • Inquiry • Support
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* VEHICLE COLLECTION */}
      <section
        id="vehicles"
        className="border-t border-white/10 px-6 py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              OUR AUTOMOBILES
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Find the right vehicle.
            </h2>

            <p className="mt-5 leading-7 text-white/45">
              Browse our vehicle categories and contact us directly for
              current availability, pricing, specifications and other
              information.
            </p>

          </div>


          {/* VEHICLE GRID */}
          <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

            {vehicles.map((vehicle) => (

              <div
                key={vehicle.name}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.05] sm:rounded-3xl"
              >

                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden sm:h-72">

                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-rose-50 text-[10px] font-bold tracking-widest backdrop-blur">
                    {vehicle.category}
                  </span>

                </div>


                {/* CONTENT */}
                <div className="p-4 sm:p-7">

                  <h3 className="text-base font-bold sm:text-xl">
                    {vehicle.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/45 sm:mt-3 sm:min-h-[72px] sm:text-sm sm:leading-6">
                    {vehicle.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 sm:mt-6">

                    <span className="text-[10px] font-semibold text-cyan-300 sm:text-sm">
                      View Availability
                    </span>

                    <a
                      href={`https://wa.me/2348139498576?text=${encodeURIComponent(
                        `Hello GB Global Services, I am interested in ${vehicle.name}. Please send me the available vehicles, prices and specifications.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold transition hover:bg-white/10 sm:px-4 sm:text-xs"
                    >
                      WhatsApp →
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FEATURE SECTION */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3">

              <div className="relative h-[430px] overflow-hidden rounded-[28px]">

                <Image
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1400&auto=format&fit=crop"
                  alt="Automobile on the road"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 to-transparent" />

                <div className="absolute bottom-7 left-7">

                  <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                    GB GLOBAL AUTOMOBILES
                  </p>

                  <p className="mt-2 text-2xl font-bold text-rose-50">
                    Move with confidence.
                  </p>

                </div>

              </div>

            </div>


            {/* CONTENT */}
            <div>

              <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                THE RIGHT VEHICLE
              </p>

              <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
                Your needs come first.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-white/45">
                Every driver has different needs. Whether you prioritize
                comfort, space, performance, practicality or style, our
                automobile service is designed to help you explore suitable
                options.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Family and personal vehicles",
                  "Business and executive vehicles",
                  "SUVs and utility vehicles",
                  "Quality pre-owned vehicles",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-xs text-cyan-300">
                      ✓
                    </span>

                    <span className="text-sm text-white/65">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

              <a
                href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20would%20like%20help%20finding%20a%20vehicle."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#050816] transition hover:-translate-y-1"
              >
                Help Me Find a Vehicle →
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* BENEFITS */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              WHY CHOOSE US
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              A simpler way to find your vehicle.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/45">
              From your first inquiry to finding a suitable option, we&apos;re
              here to make the process straightforward.
            </p>

          </div>


          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {benefits.map((benefit) => (

              <div
                key={benefit.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-blue-400/30"
              >

                <span className="text-xs font-bold text-cyan-400">
                  {benefit.number}
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {benefit.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-28 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-white/[0.03] to-cyan-500/10 px-6 py-16 text-center sm:px-12">

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-300">
              READY FOR YOUR NEXT VEHICLE?
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Tell us what you&apos;re looking for.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Send us your preferred vehicle type, budget or requirements and
              we&apos;ll help you explore available options.
            </p>

            <a
              href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20am%20looking%20for%20a%20vehicle.%20Please%20help%20me%20find%20available%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
            >
              Find My Vehicle →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}