"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ExchangeType = "giftcard" | "crypto";

type Product = {
  id: string;
  category: ExchangeType;
  product_name: string;
  currency: string;
  rate: number;
  is_active: boolean;
};

export default function ExchangePage() {
  const supabase = useMemo(() => createClient(), []);

  const [type, setType] = useState<ExchangeType>("giftcard");
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD EXCHANGE PRODUCTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("exchange_rates")
        .select(
          "id, category, product_name, currency, rate, is_active"
        )
        .eq("is_active", true)
        .order("product_name", {
          ascending: true,
        });

      if (error) {
        console.error("Failed to load exchange rates:", error);

        setError(
          "Unable to load exchange rates. Please try again later."
        );

        setLoading(false);
        return;
      }

      const formattedProducts = (data ?? []) as Product[];

      setProducts(formattedProducts);

      setLoading(false);
    }

    loadProducts();
  }, [supabase]);

  /*
  |--------------------------------------------------------------------------
  | FILTER PRODUCTS BY CATEGORY
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => product.category === type
    );
  }, [products, type]);

  /*
  |--------------------------------------------------------------------------
  | SELECT FIRST PRODUCT WHEN CATEGORY CHANGES
  |--------------------------------------------------------------------------
  */

  /*
  |--------------------------------------------------------------------------
  | SELECTED PRODUCT
  |--------------------------------------------------------------------------
  */

  const selectedProduct = useMemo(() => {
    return (
      filteredProducts.find(
        (product) => product.id === productId
      ) ?? filteredProducts[0]
    );
  }, [filteredProducts, productId]);

  /*
  |--------------------------------------------------------------------------
  | CALCULATE VALUE
  |--------------------------------------------------------------------------
  */

  const convertedAmount = useMemo(() => {
    if (!selectedProduct) {
      return 0;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return 0;
    }

    return numericAmount * Number(selectedProduct.rate);
  }, [amount, selectedProduct]);

  /*
  |--------------------------------------------------------------------------
  | FORMAT NAIRA
  |--------------------------------------------------------------------------
  */

  const formattedNaira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(convertedAmount);

  /*
  |--------------------------------------------------------------------------
  | WHATSAPP MESSAGE
  |--------------------------------------------------------------------------
  */

  const whatsappMessage = selectedProduct
    ? encodeURIComponent(
        `Hello GB Global Services, I want to exchange ${
          amount || "an amount"
        } ${selectedProduct.currency} of ${
          selectedProduct.product_name
        }. Please confirm the current rate and final payout.`
      )
    : "";

  /*
  |--------------------------------------------------------------------------
  | CATEGORY CHANGE
  |--------------------------------------------------------------------------
  */

  const handleTypeChange = (newType: ExchangeType) => {
    setType(newType);

    const nextProduct = products.find(
      (product) => product.category === newType
    );

    setProductId(nextProduct?.id ?? "");
    setAmount("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-1/4 top-20 h-125 w-125 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute right-0 top-[35%] h-125 w-125 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-purple-600/10 blur-[140px]" />

      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section relative px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-2 sm:mb-7 sm:px-4">

              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-xs font-medium tracking-[0.15em] text-blue-200">
                GB GLOBAL • EXCHANGE SERVICES
              </span>

            </div>

            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">

              Exchange.

              <span className="hero-gradient block bg-linear-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                Simple. Fast. Direct.
              </span>

            </h1>

            <p className="hero-copy mt-5 max-w-2xl text-base leading-7 text-white/55 sm:mt-7 sm:text-lg sm:leading-8">
              Exchange gift cards and supported cryptocurrencies with GB
              Global Services. Use our calculator to get an estimate of your
              Naira value, then contact us directly to confirm your transaction.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CALCULATOR
      ===================================================== */}

      <section className="relative px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">

            {/* =================================================
                LEFT - CALCULATOR
            ================================================= */}

            <div className="rounded-3xl border border-white/10 bg-white/4 p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-10">

              <div className="mb-6 sm:mb-8">

                <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 sm:text-xs">
                  RATE CALCULATOR
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Calculate your exchange
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Select your product and enter the amount to see an estimated
                  Naira value.
                </p>

              </div>

              {/* =================================================
                  TYPE
              ================================================= */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-white/70">
                  What do you want to exchange?
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => handleTypeChange("giftcard")}
                    className={`rounded-2xl border p-3 text-left transition sm:p-4 ${
                      type === "giftcard"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >

                    <div className="text-xl sm:text-2xl">
                      💳
                    </div>

                    <p className="mt-2 font-bold sm:mt-3">
                      Gift Cards
                    </p>

                    <p className="mt-1 text-[11px] text-white/40 sm:text-xs">
                      Apple, Amazon & more
                    </p>

                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeChange("crypto")}
                    className={`rounded-2xl border p-3 text-left transition sm:p-4 ${
                      type === "crypto"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >

                    <div className="text-xl sm:text-2xl">
                      ₿
                    </div>

                    <p className="mt-2 font-bold sm:mt-3">
                      Cryptocurrency
                    </p>

                    <p className="mt-1 text-[11px] text-white/40 sm:text-xs">
                      Crypto exchange
                    </p>

                  </button>

                </div>

              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (

                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300 sm:mt-6 sm:p-4">
                  {error}
                </div>

              )}

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-7 sm:p-5">

                  <div className="h-5 w-40 animate-pulse rounded bg-white/10" />

                  <div className="mt-3 h-12 w-full animate-pulse rounded-2xl bg-white/10" />

                </div>

              ) : (

                <>

                  {/* =================================================
                      PRODUCT
                  ================================================= */}

                  <div className="mt-5 sm:mt-7">

                    <label
                      htmlFor="product"
                      className="mb-3 block text-sm font-semibold text-white/70"
                    >
                      Select product
                    </label>

                    {filteredProducts.length === 0 ? (

                      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5 text-sm text-yellow-300">

                        No active{" "}
                        {type === "giftcard"
                          ? "gift card"
                          : "cryptocurrency"}{" "}
                        products are available right now.

                      </div>

                    ) : (

                      <select
                        id="product"
                        value={selectedProduct?.id ?? ""}
                        onChange={(e) => {
                          setProductId(e.target.value);
                          setAmount("");
                        }}
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 sm:px-5 sm:py-4"
                      >

                        {filteredProducts.map((product) => (

                          <option
                            key={product.id}
                            value={product.id}
                          >
                            {product.product_name}
                          </option>

                        ))}

                      </select>

                    )}

                  </div>

                  {/* =================================================
                      CURRENCY
                  ================================================= */}

                  {selectedProduct && (

                    <div className="mt-5 sm:mt-7">

                      <label
                        htmlFor="currency"
                        className="mb-3 block text-sm font-semibold text-white/70"
                      >
                        Currency
                      </label>

                      <select
                        id="currency"
                        value={selectedProduct.currency}
                        disabled
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm text-white outline-none sm:px-5 sm:py-4"
                      >

                        <option value={selectedProduct.currency}>
                          {selectedProduct.currency}
                        </option>

                      </select>

                    </div>

                  )}

                  {/* =================================================
                      AMOUNT
                  ================================================= */}

                  {selectedProduct && (

                    <div className="mt-5 sm:mt-7">

                      <label
                        htmlFor="amount"
                        className="mb-3 block text-sm font-semibold text-white/70"
                      >
                        Enter amount
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-white/30 sm:left-5">
                          {selectedProduct.currency}
                        </span>

                        <input
                          id="amount"
                          type="number"
                          min="0"
                          step="any"
                          value={amount}
                          onChange={(e) =>
                            setAmount(e.target.value)
                          }
                          placeholder="0.00"
                          className="w-full rounded-2xl border border-white/10 bg-[#0b1125] py-3 pl-14 pr-4 text-base font-semibold text-white outline-none transition placeholder:text-white/20 focus:border-cyan-400/50 sm:py-4 sm:pl-16 sm:pr-5 sm:text-lg"
                        />

                      </div>

                    </div>

                  )}

                  {/* =================================================
                      RATE
                  ================================================= */}

                  {selectedProduct && (

                    <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-7 sm:p-5">

                      <div>

                        <p className="text-xs text-white/35">
                          Current rate
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          1 {selectedProduct.currency}
                        </p>

                      </div>

                      <p className="text-base font-bold text-cyan-300 sm:text-lg">
                        ₦
                        {Number(
                          selectedProduct.rate
                        ).toLocaleString("en-NG")}
                      </p>

                    </div>

                  )}

                  {/* =================================================
                      RESULT
                  ================================================= */}

                  {selectedProduct && (

                    <div className="mt-4 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-4 sm:p-6">

                      <div className="flex items-start justify-between gap-3 sm:gap-5">

                        <div>

                          <p className="text-xs font-medium text-white/40">
                            Estimated payout
                          </p>

                          <p className="mt-2 text-2xl font-black sm:text-4xl">
                            {formattedNaira}
                          </p>

                        </div>

                        <div className="rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-300">
                          NGN
                        </div>

                      </div>

                      <p className="mt-3 text-[11px] leading-5 text-white/35 sm:mt-4 sm:text-xs">
                        This is an estimated value based on the displayed
                        rate. Final rates and payouts are subject to
                        confirmation.
                      </p>

                    </div>

                  )}

                  {/* =================================================
                      WHATSAPP CTA
                  ================================================= */}

                  {selectedProduct && (

                    <a
                      href={`https://wa.me/2348139498576?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 sm:px-6 sm:py-4"
                    >
                      Exchange Now on WhatsApp →
                    </a>

                  )}

                </>

              )}

            </div>

            {/* =================================================
                RIGHT INFORMATION
            ================================================= */}

            <div className="flex flex-col gap-4 sm:gap-6">

              {/* HOW IT WORKS */}

              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-4 sm:p-8">

                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-[70px]" />

                <div className="relative">

                  <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 sm:text-xs">
                    HOW IT WORKS
                  </p>

                  <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Exchange in 3 simple steps.
                  </h2>

                  <div className="mt-6 space-y-5 sm:mt-9 sm:space-y-7">

                    <div className="flex gap-3 sm:gap-4">

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-bold text-blue-300 sm:h-10 sm:w-10 sm:text-sm">
                        01
                      </span>

                      <div>

                        <h3 className="text-sm font-bold sm:text-base">
                          Select your product
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">
                          Choose the gift card or cryptocurrency you want to
                          exchange.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3 sm:gap-4">

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-xs font-bold text-cyan-300 sm:h-10 sm:w-10 sm:text-sm">
                        02
                      </span>

                      <div>

                        <h3 className="text-sm font-bold sm:text-base">
                          Calculate your value
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">
                          Enter your amount and get an estimated Naira value
                          using the displayed rate.
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3 sm:gap-4">

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xs font-bold text-purple-300 sm:h-10 sm:w-10 sm:text-sm">
                        03
                      </span>

                      <div>

                        <h3 className="text-sm font-bold sm:text-base">
                          Contact us
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">
                          Send your exchange request through WhatsApp and
                          confirm the final rate before proceeding.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* TRUST */}

              <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-4 sm:p-8">

                <div className="flex items-start gap-3 sm:gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-lg sm:h-12 sm:w-12 sm:text-xl">
                    🔒
                  </div>

                  <div>

                    <h3 className="text-sm font-bold sm:text-base">
                      Confirm before you trade
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/40 sm:text-sm sm:leading-6">
                      Rates may change based on market conditions and the
                      specific card or asset. Always confirm the final rate
                      with GB Global before sending your asset.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY GB GLOBAL
      ===================================================== */}

      <section className="relative border-t border-white/10 px-6 py-24 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              WHY GB GLOBAL
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              Built around your convenience.
            </h2>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-2xl">
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Simple Process
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Calculate your estimated value and contact us directly
                without unnecessary steps.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-2xl">
                💬
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Direct Communication
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Speak directly with our team through WhatsApp about your
                transaction.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

              <div className="text-2xl">
                🌍
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Multiple Services
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                GB Global Services combines technology, commerce and exchange
                solutions under one business.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-white/10 px-6 py-28 lg:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-white/[0.03] to-cyan-500/10 px-6 py-16 text-center sm:px-12">

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />

          <div className="relative">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-300">
              READY TO EXCHANGE?
            </p>

            <h2 className="mt-5 text-4xl font-black sm:text-5xl">
              Let&apos;s make the exchange simple.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/45">
              Calculate your estimated value above and contact GB Global
              Services to confirm the current rate and complete your inquiry.
            </p>

            <a
              href="https://wa.me/2348139498576?text=Hello%20GB%20Global%20Services%2C%20I%20want%20to%20make%20an%20exchange."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 text-sm font-bold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
            >
              Start an Exchange →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}