"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Gadget = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  category: string | null;
  is_available: boolean;
};

export default function GadgetShopPage() {
  const [products, setProducts] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  

  async function fetchGadgets() {
    try {
      setLoading(true);

      const response = await fetch("/api/gadgets");

      if (!response.ok) {
        throw new Error("Failed to fetch gadgets");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Error loading gadgets:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGadgets();
  }, []);

  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(Boolean) as string[]
      )
    ),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  function getWhatsAppLink(product: Gadget) {
    const message = `Hello GB Global Services, I am interested in your ${product.name}. Please send me the available options, price and details.`;

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
                  GB GLOBAL • GADGET SHOP
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Gadgets for
                <span className="hero-gradient block bg-linear-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  everyday life.
                </span>
              </h1>

              <p className="hero-copy mt-7 max-w-xl text-lg leading-8 text-white/55">
                Discover smartphones, laptops, tablets, smart devices,
                accessories and other gadgets selected to make your digital
                life easier.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                <a
                  href="#products"
                  className="rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-7 py-4 text-center text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
                >
                  Explore Gadgets →
                </a>

                <a
                  href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20want%20to%20make%20an%20inquiry%20about%20your%20gadgets."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-center text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  Ask About a Product
                </a>

              </div>

              {/* STATS */}
              <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/10 pt-7">

                <div>
                  <p className="text-xl font-bold">
                    {products.length}+
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    Products
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
                    WhatsApp Order
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">

              <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[110px]" />

              <div className="hero-media relative mx-auto max-w-140 overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-blue-500/10">

                <div className="relative h-117.5 overflow-hidden rounded-[28px]">

                  <Image
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1400&auto=format&fit=crop"
                    alt="Modern gadgets"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-transparent" />

                  <div className="absolute bottom-10 left-7 right-7">

                    <p className="text-xs font-bold tracking-[0.25em] text-cyan-300">
                      GADGETS & DEVICES
                    </p>

                    <h2 className="mt-2 mb-2 text-3xl font-bold">
                      Upgrade your everyday.
                    </h2>

                  </div>

                </div>

              </div>

              <div className="hero-panel absolute -bottom-6 -left-4 rounded-2xl border border-white/10 bg-[#0b1125]/95 p-4 shadow-2xl backdrop-blur-xl sm:left-0">

                <p className="text-xs text-white/40">
                  Shopping made simple
                </p>

                <p className="mt-1 text-sm font-bold">
                  Order directly on WhatsApp
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="border-t border-white/10 px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              SHOP BY CATEGORY
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Find what you need.
            </h2>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

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

        </div>

      </section>

      {/* PRODUCTS FROM DATABASE */}
      <section
        id="products"
        className="border-t border-white/10 px-6 py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              AVAILABLE PRODUCTS
            </p>

            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-5xl">
              Explore our collection.
            </h2>

            <p className="mt-5 leading-7 text-white/45 text-sm sm:text-xl">
              Browse our available gadgets and contact us directly for
              current pricing, specifications and availability.
            </p>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/3"
                >
                  <div className="h-64 animate-pulse bg-white/5" />

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
          {!loading && filteredProducts.length === 0 && (
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/3 p-12 text-center">

              <div className="text-4xl">
                📦
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No products available
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
                We currently don&apos;t have products listed in this category.
                Please check back later or contact us on WhatsApp.
              </p>

              <a
                href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20want%20to%20ask%20about%20your%20available%20gadgets."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-bold"
              >
                Contact Us →
              </a>

            </div>

          )}

          {/* PRODUCT GRID */}
          {!loading && filteredProducts.length > 0 && (
            <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/6 sm:rounded-3xl"
                >

                  {/* IMAGE */}
                  <div className="relative h-52 overflow-hidden bg-[#0b1125] sm:h-72">

                    {product.image_url ? (

                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center">

                        <div className="text-center">

                          <div className="text-5xl">
                            📱
                          </div>

                          <p className="mt-3 text-sm text-white/30">
                            No image available
                          </p>

                        </div>

                      </div>

                    )}

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#050816] via-transparent to-transparent" />

                    {/* CATEGORY */}
                    {product.category && (

                      <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-rose-50 text-[10px] font-semibold tracking-widest backdrop-blur">
                        {product.category}
                      </span>

                    )}

                    {/* AVAILABILITY */}
                    <span
                      className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-[10px] font-semibold backdrop-blur ${
                        product.is_available
                          ? "border-green-400/20 bg-green-500/10 text-green-300"
                          : "border-red-400/20 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {product.is_available
                        ? "AVAILABLE"
                        : "SOLD OUT"}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-4 sm:p-7">

                    <h3 className="text-base font-bold sm:text-xl">
                      {product.name}
                    </h3>

                    {product.description && (

                      <p className="mt-2 text-xs leading-5 text-white/45 sm:mt-3 sm:min-h-18 sm:text-sm sm:leading-6">
                        {product.description}
                      </p>

                    )}

                    {/* PRICE */}
                    <div className="mt-4 sm:mt-6">

                      {product.price !== null ? (

                        <p className="text-base font-bold text-cyan-300 sm:text-lg">
                          {product.currency === "NGN"
                            ? `₦${Number(product.price).toLocaleString(
                                "en-NG"
                              )}`
                            : `${product.currency} ${Number(
                                product.price
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
                        {product.is_available
                          ? "Ready to order"
                          : "Currently unavailable"}
                      </span>

                      {product.is_available && (

                        <a
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-linear-to-r from-blue-500 to-cyan-400 px-3 py-2 text-[10px] font-bold transition hover:-translate-y-0.5 sm:px-4 sm:text-xs"
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

      {/* WHY SHOP WITH US */}
      <section className="border-t border-white/10 px-6 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
                WHY SHOP WITH US
              </p>

              <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
                Simple. Reliable. Convenient.
              </h2>

              <p className="mt-6 max-w-xl leading-7 text-white/45">
                We make it easier to find the right gadget and get the
                information you need before making your purchase.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                {
                  number: "01",
                  title: "Quality Products",
                  text: "We aim to provide quality gadgets and devices for our customers.",
                },
                {
                  number: "02",
                  title: "Direct Contact",
                  text: "Speak directly with us about products, prices and availability.",
                },
                {
                  number: "03",
                  title: "Wide Selection",
                  text: "Explore different categories of devices and accessories.",
                },
                {
                  number: "04",
                  title: "Easy Ordering",
                  text: "Send your request through WhatsApp and we'll assist you.",
                },
              ].map((feature) => (

                <div
                  key={feature.number}
                  className="rounded-3xl border border-white/10 bg-white/3 p-7"
                >

                  <span className="text-xs font-bold text-cyan-400">
                    {feature.number}
                  </span>

                  <h3 className="mt-5 font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {feature.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10 px-6 py-28 lg:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-blue-400/20 bg-linear-to-br from-blue-500/15 via-white/3 to-cyan-500/10 px-6 py-16 text-center sm:px-12">

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-300">
              READY TO SHOP?
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Looking for a specific gadget?
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Tell us what you are looking for and we&apos;ll help you check
              available options and pricing.
            </p>

            <a
              href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20am%20looking%20for%20a%20gadget."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-bold text-[#050816] transition hover:-translate-y-1"
            >
              Find My Gadget →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}