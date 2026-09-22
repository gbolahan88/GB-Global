"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Pet = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  breed: string | null;
  age: string | null;
  gender: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
};

const petCategoryImages: Record<string, string> = {
  Dogs:
    "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop",
  Cats:
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop",
  "Pet Accessories":
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1200&auto=format&fit=crop",
};

const defaultCategories = [
  {
    number: "01",
    title: "Dogs",
    description:
      "Explore available dogs and find the right companion for your home and lifestyle.",
    image: petCategoryImages.Dogs,
  },
  {
    number: "02",
    title: "Cats",
    description:
      "Discover available cats and connect with us about your preferred breed or companion.",
    image: petCategoryImages.Cats,
  },
  {
    number: "03",
    title: "Pet Accessories",
    description:
      "Find useful accessories and essentials to make caring for your pet easier.",
    image: petCategoryImages["Pet Accessories"],
  },
];

const services = [
  {
    number: "01",
    title: "Pet Sales",
    description:
      "Looking for a new pet? Contact us to ask about currently available pets and options.",
  },
  {
    number: "02",
    title: "Pet Accessories",
    description:
      "We can help you find essential accessories and products for your pet.",
  },
  {
    number: "03",
    title: "Pet Guidance",
    description:
      "Need help choosing the right pet? Talk to us about your preferences and requirements.",
  },
  {
    number: "04",
    title: "Pet Inquiries",
    description:
      "Contact us directly for availability, pricing and other questions about our pets.",
  },
];

export default function PetServicesPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  async function fetchPets() {
    try {
      setLoading(true);

      const response = await fetch("/api/pets");

      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }

      const data = await response.json();

      setPets(data);
    } catch (error) {
      console.error("Error loading pets:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPets();
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(
        pets
          .map((pet) => pet.breed)
          .filter(Boolean) as string[]
      )
    ),
  ];

  const filteredPets =
    selectedCategory === "All"
      ? pets
      : pets.filter(
          (pet) => pet.breed === selectedCategory
        );

  function getWhatsAppLink(pet: Pet) {
    const message = `Hello GB Global Services, I am interested in your ${pet.name}. Please send me the available options, price and details.`;

    return `https://wa.me/2348139498576?text=${encodeURIComponent(
      message
    )}`;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-125 w-125 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-0 top-[35%] h-125 w-125 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-125 w-125 rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      {/* HERO */}
      <section className="hero-section relative overflow-hidden pt-32">

        <div className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* LEFT */}

            <div>

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-cyan-400" />

                <span className="text-xs font-medium tracking-[0.15em] text-blue-200">
                  GB GLOBAL • PET SERVICES
                </span>

              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Find a companion

                <span className="hero-gradient block bg-linear-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  you&apos;ll love.
                </span>
              </h1>

              <p className="hero-copy mt-7 max-w-xl text-lg leading-8 text-white/55">
                Discover available pets and pet-related products through
                GB Global Services. Contact us directly for availability,
                pricing and more information.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#available-pets"
                  className="rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
                >
                  Available Pets →
                </a>

                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20am%20interested%20in%20your%20pet%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Contact Us
                </a>

              </div>

              {/* STATS */}

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-7">

                <div>
                  <p className="text-xl font-bold">
                    {pets.length}+
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    Pets
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    {Math.max(categories.length - 1, 0)}+
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    Categories
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    Direct
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    WhatsApp Assistance
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative">

              <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />

              <div className="hero-media relative mx-auto max-w-140 overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-2xl">

                <div className="relative h-120 overflow-hidden rounded-[28px]">

                  <Image
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1400&auto=format&fit=crop"
                    alt="Happy pets"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7">

                    <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                      PETS & COMPANIONS
                    </p>

                    <h2 className="mt-2 mb-5 text-3xl font-bold text-rose-50">
                      Find your perfect companion.
                    </h2>

                  </div>

                </div>

              </div>

              {/* FLOATING CARD */}

              <div className="hero-panel absolute -bottom-6 -left-4 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-0">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
                    🐾
                  </div>

                  <div>

                    <p className="text-xs text-white/40">
                      Pet Services
                    </p>

                    <p className="text-sm font-bold">
                      Care • Sales • Support
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PET CATEGORIES */}
      <section
        id="pets"
        className="border-t border-white/10 px-6 py-15 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              EXPLORE
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Pets & pet products.
            </h2>

            <p className="mt-5 leading-7 text-white/45">
              Browse our categories and contact us directly to ask about
              available pets, products and current pricing.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {defaultCategories.map((pet) => (

              <a
                key={pet.number}
                href={`https://wa.me/2348139498576?text=${encodeURIComponent(
                  `Hello GB Global Services, I am interested in your ${pet.title} category. Please send me the available options and prices.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30"
              >

                {/* IMAGE */}

                <div className="relative h-72 overflow-hidden">

                  <Image
                    src={pet.image}
                    alt={pet.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-rose-50 text-[10px] font-bold tracking-widest backdrop-blur">
                    {pet.number}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="p-7">

                  <h3 className="text-xl font-bold">
                    {pet.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                    {pet.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">

                    <span className="text-sm font-semibold text-cyan-300">
                      Make an Inquiry
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

      {/* AVAILABLE PETS */}
      <section
        id="available-pets"
        className="border-t border-white/10 px-6 py-15 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              AVAILABLE PETS
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Find your next companion.
            </h2>

            <p className="mt-5 leading-7 text-white/45">
              Browse currently available pets and contact us directly for
              pricing, breed information and availability.
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-6 py-3 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-blue-400/40 bg-blue-500/10 text-white"
                    : "border-white/10 bg-white/4 text-white/65 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/3"
                >
                  <div className="h-72 animate-pulse bg-white/5" />

                  <div className="space-y-4 p-7">

                    <div className="h-6 w-2/3 animate-pulse rounded bg-white/5" />

                    <div className="h-16 animate-pulse rounded bg-white/5" />

                    <div className="h-10 animate-pulse rounded bg-white/5" />

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* EMPTY */}
          {!loading && filteredPets.length === 0 && (
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/3 p-12 text-center">

              <div className="text-4xl">
                🐾
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No pets available
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                We currently don&apos;t have pets listed in this category.
                Please check back later or contact us on WhatsApp.
              </p>

              <a
                href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20want%20to%20ask%20about%20your%20available%20pets"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-bold"
              >
                Contact Us →
              </a>

            </div>

          )}

          {/* PET GRID */}
          {!loading && filteredPets.length > 0 && (

            <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredPets.map((pet) => (

                <div
                  key={pet.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.06] sm:rounded-3xl"
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden bg-[#0b1125] sm:h-72">

                    {pet.image_url ? (

                      <Image
                        src={pet.image_url}
                        alt={pet.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <div className="text-center">

                          <div className="text-5xl">
                            🐾
                          </div>

                          <p className="mt-3 text-sm text-white/30">
                            No image available
                          </p>

                        </div>

                      </div>

                    )}

                    {/* IMAGE OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

                    {/* BREED */}

                    {pet.breed && (

                      <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-rose-50 text-[10px] font-semibold tracking-widest backdrop-blur">
                        {pet.breed}
                      </span>

                    )}

                    {/* AVAILABILITY */}

                    <span
                      className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-[10px] font-semibold backdrop-blur ${
                        pet.is_available
                          ? "border-green-400/20 bg-green-500/10 text-green-300"
                          : "border-red-400/20 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {pet.is_available
                        ? "AVAILABLE"
                        : "SOLD OUT"}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="p-4 sm:p-7">

                    <h3 className="text-base font-bold sm:text-xl">
                      {pet.name}
                    </h3>

                    {pet.description && (

                      <p className="mt-2 text-xs leading-5 text-white/45 sm:mt-3 sm:min-h-[72px] sm:text-sm sm:leading-6">
                        {pet.description}
                      </p>

                    )}

                    {/* DETAILS */}

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">

                      {pet.breed && (

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-3">

                          <p className="text-[9px] uppercase tracking-wider text-white/30 sm:text-[10px]">
                            Breed
                          </p>

                          <p className="mt-1 truncate text-[10px] font-semibold text-white/70 sm:text-xs">
                            {pet.breed}
                          </p>

                        </div>

                      )}

                      {pet.age && (

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-3">

                          <p className="text-[9px] uppercase tracking-wider text-white/30 sm:text-[10px]">
                            Age
                          </p>

                          <p className="mt-1 truncate text-[10px] font-semibold text-white/70 sm:text-xs">
                            {pet.age}
                          </p>

                        </div>

                      )}

                      {pet.gender && (

                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-3">

                          <p className="text-[9px] uppercase tracking-wider text-white/30 sm:text-[10px]">
                            Gender
                          </p>

                          <p className="mt-1 truncate text-[10px] font-semibold text-white/70 sm:text-xs">
                            {pet.gender}
                          </p>

                        </div>

                      )}

                    </div>

                    {/* PRICE */}

                    <div className="mt-4 sm:mt-6">

                      {pet.price !== null ? (

                        <p className="text-base font-bold text-cyan-300 sm:text-lg">
                          {pet.currency === "NGN"
                            ? `₦${Number(
                                pet.price
                              ).toLocaleString("en-NG")}`
                            : `${pet.currency} ${Number(
                                pet.price
                              ).toLocaleString()}`}
                        </p>

                      ) : (

                        <p className="text-xs font-semibold text-cyan-300 sm:text-sm">
                          Ask for Price
                        </p>

                      )}

                    </div>

                    {/* ACTION */}

                    <div className="mt-4 flex items-center justify-between gap-2 sm:mt-6 sm:gap-3">

                      <span className="text-[10px] text-white/30 sm:text-xs">
                        {pet.is_available
                          ? "Ready to inquire"
                          : "Currently unavailable"}
                      </span>

                      {pet.is_available && (

                        <a
                          href={getWhatsAppLink(pet)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-2 text-[10px] font-bold transition hover:-translate-y-0.5 sm:px-4 sm:text-xs"
                        >
                          WhatsApp →
                        </a>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-white/10 px-6 py-15 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              OUR PET SERVICES
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              More than just pet sales.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/45">
              Whether you are looking for a new companion or need information
              about pet products, we&apos;re available to assist you.
            </p>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {services.map((service) => (

              <div
                key={service.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-blue-400/30"
              >

                <span className="text-xs font-bold text-cyan-400">
                  {service.number}
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {service.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* RESPONSIBLE PET OWNERSHIP */}
      <section className="border-t border-white/10 px-6 py-15 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03]">

            <div className="grid lg:grid-cols-2">

              {/* IMAGE */}

              <div className="relative min-h-[400px]">

                <Image
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop"
                  alt="Pet owner with dog"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

              </div>

              {/* CONTENT */}

              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

                <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                  PET OWNERSHIP
                </p>

                <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                  The right pet starts with the right choice.
                </h2>

                <p className="mt-5 leading-7 text-white/45">
                  Choosing a pet is an important decision. We encourage
                  responsible ownership and helping customers find an option
                  that fits their home, lifestyle and preferences.
                </p>

                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20need%20help%20choosing%20a%20pet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-bold text-[#050816] transition hover:-translate-y-1"
                >
                  Talk to Us →
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-28 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-white/[0.03] to-cyan-500/10 px-6 py-16 text-center sm:px-12">

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />

          <div className="relative">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-300">
              LOOKING FOR A PET?
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Let&apos;s find the right one for you.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Tell us the type of pet you&apos;re looking for and we&apos;ll
              help you with available options and information.
            </p>

            <a
              href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20am%20looking%20for%20a%20pet"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
            >
              Find a Pet →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}