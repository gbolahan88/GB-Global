"use client";

import Image from "next/image";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";

type Gadget = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  image_url: string | null;
  category: string | null;
  is_available: boolean;
  created_at: string;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  currency: "NGN",
  image_url: "",
  category: "",
  is_available: true,
};

const IMAGE_BUCKET = "gadget-images";
const MAX_IMAGE_SIZE_MB = 5;

/* ============================================================
  UPLOAD IMAGE (module-level, not inside the component, so
  Date.now()/Math.random() are never treated as render calls)
============================================================ */

async function uploadImage(
  supabase: ReturnType<typeof createClient>,
  file: File
) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export default function AdminGadgetsPage() {
  const supabase = createClient();

  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadGadgets = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("gadgets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Unable to load gadgets.");
    } else {
      setGadgets(data || []);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadGadgets();
  }, [loadGadgets]);

  /* Clean up local preview URLs so we don't leak memory */
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function updateField(
    field: keyof typeof emptyForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =========================================================
    IMAGE SELECTION
  ========================================================= */

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeSelectedImage() {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
    updateField("image_url", "");
  }

  /* =========================================================
     EDIT / RESET
  ========================================================= */

  function startEdit(gadget: Gadget) {
    setEditingId(gadget.id);

    setForm({
      name: gadget.name,
      description: gadget.description || "",
      price: gadget.price?.toString() || "",
      currency: gadget.currency,
      image_url: gadget.image_url || "",
      category: gadget.category || "",
      is_available: gadget.is_available,
    });

    setImageFile(null);
    setImagePreview(gadget.image_url || null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);

    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Product name is required.");
      return;
    }

    setSaving(true);

    let imageUrl = form.image_url || null;

    if (imageFile) {
      setUploading(true);

      try {
        imageUrl = await uploadImage(supabase, imageFile);
      } catch (err) {
        console.error("Image upload error:", err);
        alert("Unable to upload image. Please try again.");
        setUploading(false);
        setSaving(false);
        return;
      }

      setUploading(false);
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: form.price ? Number(form.price) : null,
      currency: form.currency.trim().toUpperCase() || "NGN",
      image_url: imageUrl,
      category: form.category.trim() || null,
      is_available: form.is_available,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (editingId) {
      const response = await supabase
        .from("gadgets")
        .update(payload)
        .eq("id", editingId);

      error = response.error;
    } else {
      const response = await supabase.from("gadgets").insert(payload);

      error = response.error;
    }

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert(editingId ? "Gadget updated successfully." : "Gadget added successfully.");

      resetForm();
      await loadGadgets();
    }

    setSaving(false);
  }

  async function toggleAvailability(gadget: Gadget) {
    const { error } = await supabase
      .from("gadgets")
      .update({
        is_available: !gadget.is_available,
        updated_at: new Date().toISOString(),
      })
      .eq("id", gadget.id);

    if (error) {
      console.error(error);
      alert("Unable to update product.");
      return;
    }

    await loadGadgets();
  }

  async function deleteGadget(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this gadget?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("gadgets")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Unable to delete product.");
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await loadGadgets();
  }

  function formatPrice(price: number | null, currency: string) {
    if (price === null) return "Price on request";

    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `${currency} ${price.toLocaleString()}`;
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            MANAGEMENT
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Gadget Shop
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Add, edit and manage the gadgets displayed on your public website.
          </p>
        </div>

        {/* FORM */}
        <section className="rounded-[28px] border border-white/10 bg-white/3 p-6 sm:p-8">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Gadget" : "Add New Gadget"}
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {editingId
                  ? "Update the product information below."
                  : "Add a new product to your gadget shop."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Product Name *
              </label>

              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. iPhone 15 Pro Max"
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none focus:border-cyan-400/50"
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Category
              </label>

              <input
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="e.g. Phones"
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Price
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* CURRENCY */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Currency
              </label>

              <input
                value={form.currency}
                onChange={(e) =>
                  updateField("currency", e.target.value.toUpperCase())
                }
                placeholder="NGN"
                maxLength={10}
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm uppercase outline-none focus:border-cyan-400/50"
              />

              <p className="mt-2 text-xs text-white/30">
                Example: NGN, USD, GBP, EUR
              </p>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Product Image
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl">
                      📱
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-white/60 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-400/10 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-cyan-300 hover:file:bg-cyan-400/20"
                  />

                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-xs text-white/30">
                      JPG, PNG or WebP. Max {MAX_IMAGE_SIZE_MB}MB.
                    </p>

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={removeSelectedImage}
                        className="text-xs font-semibold text-red-300 hover:underline"
                      >
                        Remove image
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                placeholder="Describe this product..."
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* AVAILABLE */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/2 p-4">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) =>
                  updateField("is_available", e.target.checked)
                }
                className="h-4 w-4"
              />

              <span>
                <span className="block text-sm font-semibold">
                  Available
                </span>

                <span className="mt-1 block text-xs text-white/30">
                  Show this product publicly
                </span>
              </span>
            </label>

            {/* SUBMIT */}
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading
                  ? "Uploading image..."
                  : saving
                  ? "Saving..."
                  : editingId
                  ? "Update Gadget"
                  : "Add Gadget"}
              </button>
            </div>
          </form>
        </section>

        {/* PRODUCT LIST */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Products
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {gadgets.length} product{gadgets.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-white/40">
              Loading gadgets...
            </div>
          ) : gadgets.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center">
              <p className="text-lg font-semibold">
                No gadgets yet
              </p>

              <p className="mt-2 text-sm text-white/40">
                Add your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3">
              <div className="overflow-x-auto">
                <table className="w-full min-w-212.5">
                  <thead className="border-b border-white/10 bg-white/3">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Product
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Category
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Price
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-white/40">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {gadgets.map((gadget) => (
                      <tr
                        key={gadget.id}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/5">
                              {gadget.image_url ? (
                                <Image
                                  src={gadget.image_url}
                                  alt={gadget.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xl">
                                  📱
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-semibold">
                                {gadget.name}
                              </p>

                              <p className="mt-1 max-w-xs truncate text-xs text-white/30">
                                {gadget.description || "No description"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm text-white/50">
                          {gadget.category || "—"}
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold text-cyan-300">
                          {formatPrice(gadget.price, gadget.currency)}
                        </td>

                        <td className="px-5 py-5">
                          <button
                            type="button"
                            onClick={() => toggleAvailability(gadget)}
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              gadget.is_available
                                ? "bg-emerald-400/10 text-emerald-300"
                                : "bg-red-400/10 text-red-300"
                            }`}
                          >
                            {gadget.is_available
                              ? "Available"
                              : "Hidden"}
                          </button>
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(gadget)}
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/5"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteGadget(gadget.id)}
                              className="rounded-lg border border-red-400/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}