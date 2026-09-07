"use client"
import { createClient } from "@/lib/supabase/client";
import { 
  useState, 
  useEffect, 
  useCallback,
  ChangeEvent,
  FormEvent
} from "react";

type Automobile = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
  year: number | null;
  mileage: number | null;
  brand: string | null;
  model: string | null;
  image_url: string | null;
  is_available: boolean;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  currency: "",
  year: "",
  mileage: "",
  brand: "",
  model: "",
  image_url: "",
  is_available: true
}

const IMAGE_BUCKET = "automobile-images";
const MAX_IMAGE_SIZE_MB = 5;

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

export default function AdminAutomobilePage() {
  const supabase = createClient();

  const [automobiles, setAutomobiles] = useState<Automobile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadAutomobiles = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("automobiles")
      .select(
        "id, name, description, price, currency, year, mileage, brand, model, image_url, is_available, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load automobiles error:", error);
      alert("Unable to load automobiles.");
    } else {
      setAutomobiles(data || []);
    }

    setLoading(false);
  }, [supabase]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAutomobiles();
  }, [loadAutomobiles]);

  useEffect(() => {
      return () => {
        if (imagePreview?.startsWith("blob:")) {
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
  

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
      event.target.value = "";
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeSelectedImage() {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
    updateField("image_url", "");
  }

  function startEdit(automobile: Automobile) {
    setEditingId(automobile.id);

    setForm({
      name: automobile.name,
      description: automobile.description || "",
      price: automobile.price !== null ? String(automobile.price) : "",
      currency: automobile.currency || "NGN",
      year: automobile.year !== null ? String(automobile.year) : "",
      mileage: automobile.mileage !== null ? String(automobile.mileage) : "",
      brand: automobile.brand || "",
      model: automobile.model || "",
      image_url: automobile.image_url || "",
      is_available: automobile.is_available,
    });

    setImageFile(null);
    setImagePreview(automobile.image_url || null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Automobile name is required.");
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
        year: form.year ? Number(form.year) : null,
        mileage: form.mileage ? Number(form.mileage) : null,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        image_url: imageUrl,
        is_available: form.is_available,
    };

    let error;

    if (editingId) {
      const response = await supabase
        .from("automobiles")
        .update(payload)
        .eq("id", editingId);

      error = response.error;
    } else {
      const response = await supabase.from("automobiles").insert(payload);

      error = response.error;
    }

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert(editingId ? "Automobile updated successfully." : "Automobile added successfully.");

      resetForm();
      await loadAutomobiles();
    }

    setSaving(false);
  }

  async function toggleAvailability(automobile: Automobile) {
    const { error } = await supabase
      .from("automobiles")
      .update({
        is_available: !automobile.is_available,
      })
      .eq("id", automobile.id);

    if (error) {
      console.error("Availability error:", error);
      alert("Unable to update automobile availability.");
      return;
    }

    await loadAutomobiles();
  }

  async function deleteAutomobile(automobile: Automobile) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${automobile.name}"?`
    );

    if (!confirmed) return;

    try {
      /*
       * Delete database record first.
       */
      const { error } = await supabase
        .from("automobiles")
        .delete()
        .eq("id", automobile.id);

      if (error) {
        throw error;
      }

      /*
       * If image_url belongs to our Supabase bucket,
       * try to remove the image from storage too.
       */
      if (automobile.image_url) {
        try {
          const imageUrl = new URL(automobile.image_url);

          const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;

          const markerIndex = imageUrl.pathname.indexOf(marker);

          if (markerIndex !== -1) {
            const filePath = decodeURIComponent(
              imageUrl.pathname.substring(
                markerIndex + marker.length
              )
            );

            if (filePath) {
              await supabase.storage
                .from(IMAGE_BUCKET)
                .remove([filePath]);
            }
          }
        } catch (storageError) {
          console.error(
            "Storage image delete error:",
            storageError
          );
        }
      }

      if (editingId === automobile.id) {
        resetForm();
      }

      alert("Automobile deleted successfully.");

      await loadAutomobiles();
    } catch (error) {
      console.error("Delete automobile error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete automobile."
      );
    }
  }

  function formatPrice(
    price: number | null,
    currency: string
  ) {
    if (price === null) {
      return "Price on request";
    }

    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency || "NGN",
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `${currency || "NGN"} ${price.toLocaleString()}`;
    }
  }


  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
          MANAGEMENT
        </p>

        <h1 className="mt-3 text-4xl font-black">
          Automobile Shop
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
          Add, edit and manage the automobiles displayed on your
          public website.
        </p>
      </div>


      <section className="rounded-[28px] border border-white/10 bg-white/3 p-6 sm:p-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Automobile" : "Add New Automobile"}
            </h2>

            <p className="mt-1 text-sm text-white/40">
              {editingId
                ? "Update the Automobile information below."
                : "Add a new Automobile to your shop."}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >

          {/* NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Automobile Name *
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              placeholder="e.g. Max"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
              required
            />
          </div>

          {/* BREED */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Automobile Brand
            </label>

            <input
              type="text"
              value={form.brand}
              onChange={(e) =>
                updateField("brand", e.target.value)
              }
              placeholder="e.g. Toyota"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />
          </div>

          {/* AGE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Year of Manufacture
            </label>

            <input
              type="text"
              value={form.year}
              onChange={(e) =>
                updateField("year", e.target.value)
              }
              placeholder="e.g. 2020"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />
          </div>

          {/* GENDER */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Model
            </label>

            <select
              value={form.model}
              onChange={(e) =>
                updateField("model", e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition focus:border-cyan-400/50"
            >
              <option value="">Select model</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
            </select>
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
              onChange={(e) =>
                updateField("price", e.target.value)
              }
              placeholder="0"
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />
          </div>

          {/* CURRENCY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Currency
            </label>

            <select
              value={form.currency}
              onChange={(e) =>
                updateField(
                  "currency",
                  e.target.value.toUpperCase()
                )
              }
              className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm uppercase outline-none transition focus:border-cyan-400/50"
            >
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* IMAGE UPLOAD */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-white/70">
              Automobile Image
            </label>

            <div className="rounded-2xl border border-white/10 bg-[#0b1125] p-4">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* PREVIEW */}

                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">

                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Pet preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-white/20">
                      <span className="text-4xl">
                        🐾
                      </span>

                      <span className="mt-2 text-[10px]">
                        No image
                      </span>
                    </div>
                  )}

                </div>

                <div className="flex-1">

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-white/60 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-400/10 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-cyan-300 transition hover:file:bg-cyan-400/20"
                  />

                  <p className="mt-3 text-xs text-white/30">
                    JPG, PNG or WebP. Maximum{" "}
                    {MAX_IMAGE_SIZE_MB}MB.
                  </p>

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeSelectedImage}
                      className="mt-3 text-xs font-semibold text-red-300 transition hover:text-red-200 hover:underline"
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
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe this automobile..."
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
            />
          </div>

          {/* AVAILABILITY */}

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/2 p-4 transition hover:bg-white/4">

            <input
              type="checkbox"
              checked={form.is_available}
              onChange={(e) =>
                updateField(
                  "is_available",
                  e.target.checked
                )
              }
              className="h-4 w-4 accent-cyan-400"
            />

            <span>
              <span className="block text-sm font-semibold">
                Available
              </span>

              <span className="mt-1 block text-xs text-white/30">
                Show this Automobile publicly
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
                ? "Update Automobile"
                : "Add Automobile"}
            </button>

          </div>

        </form>
      </section>
    </main>
  );

}