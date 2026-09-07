"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = "giftcard" | "crypto";

type ExchangeRate = {
  id: string;
  category: Category;
  product_name: string;
  currency: string;
  rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type FormData = {
  category: Category;
  product_name: string;
  currency: string;
  rate: string;
};

const INITIAL_FORM: FormData = {
  category: "giftcard",
  product_name: "",
  currency: "",
  rate: "",
};

export default function ExchangeManagementPage() {
  const supabase = createClient();

  const [products, setProducts] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
    LOAD PRODUCTS
  ========================================================= */
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("exchange_rates")
      .select("*")
      .order("category", { ascending: true })
      .order("product_name", { ascending: true });

    if (error) {
      console.error("Load exchange products error:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setError("");
    setProducts((data ?? []) as ExchangeRate[]);
    setLoading(false);
  }

  

  /* =========================================================
    OPEN ADD MODAL
  ========================================================= */

  function openAddModal(category: Category = "giftcard") {
    setEditingId(null);

    setForm({
      category,
      product_name: "",
      currency: "",
      rate: "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  function openEditModal(product: ExchangeRate) {
    setEditingId(product.id);

    setForm({
      category: product.category,
      product_name: product.product_name,
      currency: product.currency,
      rate: String(product.rate),
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
    setError("");
  }

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const productName = form.product_name.trim();
    const currency = form.currency.trim().toUpperCase();
    const rate = Number(form.rate);

    /* Validation */

    if (!productName) {
      setError("Please enter the product name.");
      return;
    }

    if (!currency) {
      setError("Please enter a currency abbreviation.");
      return;
    }

    if (currency.length > 10) {
      setError("Currency/code cannot be longer than 10 characters.");
      return;
    }

    if (!form.rate || Number.isNaN(rate) || rate <= 0) {
      setError("Please enter a valid rate greater than 0.");
      return;
    }

    setSaving(true);

    /* =====================================================
       EDIT EXISTING PRODUCT
    ===================================================== */

    if (editingId) {
      const { error } = await supabase
        .from("exchange_rates")
        .update({
          category: form.category,
          product_name: productName,
          currency,
          rate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingId);

      if (error) {
        console.error("Update exchange product error:", error);
        setError(error.message);
        setSaving(false);
        return;
      }

      setSuccess(`${productName} updated successfully.`);
    }

    /* =====================================================
       ADD NEW PRODUCT
    ===================================================== */

    else {
      const { error } = await supabase
        .from("exchange_rates")
        .insert({
          category: form.category,
          product_name: productName,
          currency,
          rate,
          is_active: true,
        });

      if (error) {
        console.error("Add exchange product error:", error);
        setError(error.message);
        setSaving(false);
        return;
      }

      setSuccess(`${productName} added successfully.`);
    }

    await loadProducts();

    setSaving(false);
    setShowModal(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
  }

  /* =========================================================
     ENABLE / DISABLE PRODUCT
  ========================================================= */

  async function toggleProduct(product: ExchangeRate) {
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("exchange_rates")
      .update({
        is_active: !product.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id);

    if (error) {
      console.error("Toggle product error:", error);
      setError(error.message);
      return;
    }

    setSuccess(
      `${product.product_name} ${
        product.is_active ? "disabled" : "enabled"
      } successfully.`
    );

    await loadProducts();
  }

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  async function deleteProduct(product: ExchangeRate) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.product_name}"?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("exchange_rates")
      .delete()
      .eq("id", product.id);

    if (error) {
      console.error("Delete product error:", error);
      setError(error.message);
      return;
    }

    setSuccess(`${product.product_name} deleted successfully.`);

    await loadProducts();
  }

  /* =========================================================
     FILTERS
  ========================================================= */

  const giftCards = products.filter(
    (product) => product.category === "giftcard"
  );

  const cryptocurrencies = products.filter(
    (product) => product.category === "crypto"
  );

  const activeProducts = products.filter(
    (product) => product.is_active
  );

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* ====== CONTENT =========== */}

      <section className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* PAGE HEADING */}

        <div className="mb-8">

          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            EXCHANGE
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Exchange Rates
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                Add and manage the gift cards and cryptocurrencies offered
                through GB Global Services LTD.
              </p>

            </div>

            <a
              href="/exchange"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              View Public Calculator →
            </a>

          </div>

        </div>

        {/* =====================================================
            ALERTS
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>
        )}

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Products"
            value={products.length}
          />

          <StatCard
            title="Active Products"
            value={activeProducts.length}
          />

          <StatCard
            title="Gift Cards"
            value={giftCards.length}
          />

          <StatCard
            title="Cryptocurrency"
            value={cryptocurrencies.length}
          />

        </div>

        {/* ========== LOADING =========== */}

        {loading ? (

          <div className="rounded-2xl border border-white/10 bg-white/3 p-14 text-center">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

            <p className="mt-4 text-sm text-white/40">
              Loading exchange products...
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {/* ========== GIFT CARDS =========== */}

            <ProductSection
              title="Gift Cards"
              subtitle="Gift cards and digital vouchers"
              icon="🎁"
              products={giftCards}
              onAdd={() => openAddModal("giftcard")}
              onEdit={openEditModal}
              onToggle={toggleProduct}
              onDelete={deleteProduct}
            />

            {/* ======== CRYPTO =========== */}

            <ProductSection
              title="Cryptocurrency"
              subtitle="Cryptocurrency exchange products"
              icon="₿"
              products={cryptocurrencies}
              onAdd={() => openAddModal("crypto")}
              onEdit={openEditModal}
              onToggle={toggleProduct}
              onDelete={deleteProduct}
            />

          </div>

        )}

      </section>

      {/* ====== ADD / EDIT MODAL ========== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 px-5 py-8 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#090e20] p-6 shadow-2xl sm:p-8">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-[10px] font-bold tracking-[0.3em] text-cyan-400">
                  {editingId ? "EDIT PRODUCT" : "NEW PRODUCT"}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {editingId
                    ? "Edit Exchange Product"
                    : "Add Exchange Product"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-white/70">
                  Product Type
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* GIFT CARD */}

                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        category: "giftcard",
                      }))
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      form.category === "giftcard"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/3 hover:bg-white/6"
                    }`}
                  >

                    <div className="text-2xl">
                      🎁
                    </div>

                    <p className="mt-3 text-sm font-bold">
                      Gift Card
                    </p>

                    <p className="mt-1 text-[11px] text-white/30">
                      Apple, Amazon, Steam...
                    </p>

                  </button>

                  {/* CRYPTO */}

                  <button
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        category: "crypto",
                      }))
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      form.category === "crypto"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/3 hover:bg-white/6"
                    }`}
                  >

                    <div className="text-2xl">
                      ₿
                    </div>

                    <p className="mt-3 text-sm font-bold">
                      Cryptocurrency
                    </p>

                    <p className="mt-1 text-[11px] text-white/30">
                      BTC, USDT, ETH...
                    </p>

                  </button>

                </div>

              </div>

              {/* PRODUCT NAME */}

              <div className="mt-6">

                <label
                  htmlFor="product_name"
                  className="mb-2 block text-sm font-semibold text-white/70"
                >
                  Product Name
                </label>

                <input
                  id="product_name"
                  type="text"
                  required
                  value={form.product_name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      product_name: event.target.value,
                    }))
                  }
                  placeholder={
                    form.category === "giftcard"
                      ? "e.g. Apple Gift Card"
                      : "e.g. Bitcoin"
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3.5 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
                />

              </div>

              {/* CURRENCY */}

              <div className="mt-6">

                <label
                  htmlFor="currency"
                  className="mb-2 block text-sm font-semibold text-white/70"
                >
                  Currency / Code
                </label>

                <input
                  id="currency"
                  type="text"
                  required
                  maxLength={10}
                  value={form.currency}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      currency: event.target.value
                        .toUpperCase()
                        .replace(/\s/g, ""),
                    }))
                  }
                  placeholder={
                    form.category === "giftcard"
                      ? "e.g. USD"
                      : "e.g. BTC"
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3.5 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-white/20 focus:border-cyan-400/50"
                />

                <p className="mt-2 text-xs leading-5 text-white/25">
                  Enter the currency or asset code yourself. Examples:
                  USD, GBP, EUR, CAD, AUD, BTC, ETH, USDT.
                </p>

              </div>

              {/* RATE */}

              <div className="mt-6">

                <label
                  htmlFor="rate"
                  className="mb-2 block text-sm font-semibold text-white/70"
                >
                  Your Rate in Naira
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-white/30">
                    ₦
                  </span>

                  <input
                    id="rate"
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    value={form.rate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        rate: event.target.value,
                      }))
                    }
                    placeholder="1500"
                    className="w-full rounded-xl border border-white/10 bg-[#0b1125] py-3.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
                  />

                </div>

                <p className="mt-2 text-xs leading-5 text-white/25">
                  This is the rate your business uses for the public
                  calculator.
                </p>

              </div>

              {/* PREVIEW */}

              {form.product_name && form.currency && form.rate && (

                <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

                  <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">
                    RATE PREVIEW
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    1 {form.currency.toUpperCase()}
                  </p>

                  <p className="mt-1 text-2xl font-black text-white">
                    ₦{Number(form.rate).toLocaleString("en-NG")}
                  </p>

                </div>

              )}

              {/* ACTIONS */}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

/* ============ STAT CARD ============= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5">

      <p className="text-xs text-white/35">
        {title}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}

/* ============= PRODUCT SECTION ================== */

function ProductSection({
  title,
  subtitle,
  icon,
  products,
  onAdd,
  onEdit,
  onToggle,
  onDelete,
}: {
  title: string;
  subtitle: string;
  icon: string;
  products: ExchangeRate[];
  onAdd: () => void;
  onEdit: (product: ExchangeRate) => void;
  onToggle: (product: ExchangeRate) => void;
  onDelete: (product: ExchangeRate) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">

      {/* SECTION HEADER */}

      <div className="flex flex-col gap-5 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
            {icon}
          </div>

          <div>

            <h2 className="font-bold">
              {title}
            </h2>

            <p className="mt-1 text-xs text-white/30">
              {subtitle}
            </p>

          </div>

        </div>

        <button
          onClick={onAdd}
          className="w-full rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/10 sm:w-auto"
        >
          + Add {title === "Gift Cards" ? "Gift Card" : "Crypto"}
        </button>

      </div>

      {/* EMPTY */}

      {products.length === 0 ? (

        <div className="p-12 text-center">

          <div className="text-3xl opacity-50">
            {icon}
          </div>

          <p className="mt-4 text-sm font-semibold text-white/50">
            No {title.toLowerCase()} yet
          </p>

          <p className="mt-1 text-xs text-white/25">
            Add your first product using the button above.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-white/10">

          {products.map((product) => (

            <ProductRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />

          ))}

        </div>

      )}

    </section>
  );
}

/* ============================================================
   PRODUCT ROW
============================================================ */

function ProductRow({
  product,
  onEdit,
  onToggle,
  onDelete,
}: {
  product: ExchangeRate;
  onEdit: (product: ExchangeRate) => void;
  onToggle: (product: ExchangeRate) => void;
  onDelete: (product: ExchangeRate) => void;
}) {
  return (
    <div className="p-5 transition hover:bg-white/2">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* PRODUCT INFO */}

        <div className="flex min-w-0 items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-bold">

            {product.category === "crypto"
              ? "₿"
              : "🎁"}

          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              <p className="truncate font-semibold">
                {product.product_name}
              </p>

              <span
                className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                  product.is_active
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-red-400/10 text-red-300"
                }`}
              >
                {product.is_active
                  ? "ACTIVE"
                  : "INACTIVE"}
              </span>

            </div>

            <p className="mt-1 text-xs text-white/30">
              {product.currency}
            </p>

          </div>

        </div>

        {/* RATE */}

        <div className="lg:min-w-45 lg:text-right">

          <p className="text-xl font-black text-cyan-300">
            ₦{Number(product.rate).toLocaleString("en-NG")}
          </p>

          <p className="mt-1 text-[10px] text-white/25">
            1 {product.currency}
          </p>

        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap gap-2">

          <button
            onClick={() => onEdit(product)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold transition hover:bg-white/10"
          >
            Edit
          </button>

          <button
            onClick={() => onToggle(product)}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              product.is_active
                ? "border-yellow-400/10 bg-yellow-400/5 text-yellow-300 hover:bg-yellow-400/10"
                : "border-emerald-400/10 bg-emerald-400/5 text-emerald-300 hover:bg-emerald-400/10"
            }`}
          >
            {product.is_active
              ? "Disable"
              : "Enable"}
          </button>

          <button
            onClick={() => onDelete(product)}
            className="rounded-lg border border-red-400/10 bg-red-400/5 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}