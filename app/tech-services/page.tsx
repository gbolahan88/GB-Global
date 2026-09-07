"use client";

import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Modern, responsive and high-performance websites for businesses, brands, organizations and personal projects.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Mobile App Development",
    description:
      "User-friendly mobile applications built for Android and iOS using modern technologies and scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Clean, intuitive and modern interfaces designed to give your customers a smooth and memorable experience.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Graphic Design",
    description:
      "Professional graphics for social media, advertisements, business materials, promotional campaigns and more.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "05",
    title: "Logo & Brand Design",
    description:
      "Distinctive logos and visual identities that help businesses establish a professional and memorable brand.",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    number: "06",
    title: "Software Solutions",
    description:
      "Custom software solutions designed around your business processes, goals and specific requirements.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  },
];

const technologies = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "React Native",
  "Node.js",
  "Firebase",
  "Supabase",
];

export default function TechServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32">
        {/* Background glow */}
        <div className="absolute left-1/3 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[130px]" />

        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />

                <span className="text-xs font-medium tracking-[0.15em] text-blue-200">
                  GB GLOBAL • TECH SERVICES
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Technology that
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  moves your ideas forward.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">
                We design and build modern digital experiences, applications
                and software solutions that help individuals and businesses
                turn ideas into reality.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20need%20a%20tech%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
                >
                  Start a Project →
                </a>

                <a
                  href="#services"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative mx-auto max-w-[560px]">
                {/* Glow */}
                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

                {/* Main image */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-500/10">
                  <div className="relative h-[420px] overflow-hidden rounded-[24px]">
                    <Image
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop"
                      alt="Technology development workspace"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 560px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">
                        DIGITAL SOLUTIONS
                      </p>

                      <p className="mt-2 text-2xl font-bold">
                        Build. Launch. Grow.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -bottom-7 -left-4 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                      {"</>"}
                    </div>

                    <div>
                      <p className="text-xs text-white/40">Development</p>
                      <p className="text-sm font-bold">Modern Technology</p>
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute -right-3 -top-5 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-4 shadow-2xl backdrop-blur-xl sm:right-0">
                  <p className="text-xs text-white/40">Our Focus</p>

                  <p className="mt-1 text-sm font-bold">
                    Quality & Innovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="border-t border-white/10 px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              OUR SERVICES
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Digital solutions built around your needs.
            </h2>

            <p className="mt-5 leading-7 text-white/45">
              From the first idea to the final product, we provide the
              technology and creative services needed to bring your vision to
              life.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <a
                key={service.number}
                href={`https://wa.me/2348139498576?text=${encodeURIComponent(
                  `Hello GB Global Services, I am interested in your ${service.title} service.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.06]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-bold tracking-widest backdrop-blur">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold">{service.title}</h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-cyan-300">
                      Request Service
                    </span>

                    <span className="transition group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                HOW WE WORK
              </p>

              <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
                From idea to reality.
              </h2>

              <p className="mt-5 leading-7 text-white/45">
                We keep the process simple, transparent and focused on
                delivering something that works for you.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Tell Us Your Idea",
                  text: "Share your idea, problem or business requirement with us.",
                },
                {
                  number: "02",
                  title: "Plan & Design",
                  text: "We discuss the requirements and create a clear direction for the project.",
                },
                {
                  number: "03",
                  title: "Build",
                  text: "Our development process turns the approved concept into a working product.",
                },
                {
                  number: "04",
                  title: "Launch",
                  text: "We help you prepare your solution for real users and continued growth.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <span className="text-xs font-bold text-cyan-400">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              TECHNOLOGY STACK
            </p>

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Built with modern technology.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40">
              We use modern development tools and technologies to build fast,
              scalable and maintainable digital products.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-blue-400/30 hover:text-white"
              >
                {technology}
              </span>
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
              HAVE A PROJECT IN MIND?
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Let&apos;s build something great.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Tell us what you want to build, design or improve and let&apos;s
              discuss how we can help.
            </p>

            <a
              href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20have%20a%20technology%20project%20I%20would%20like%20to%20discuss."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold text-[#050816] transition hover:-translate-y-1"
            >
              Discuss Your Project →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}