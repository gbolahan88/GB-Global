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

const emptyForm = {
  name: "",
  description: "",
  price: "",
  currency: "NGN",
  breed: "",
  age: "",
  gender: "",
  image_url: "",
  is_available: true,
};

const IMAGE_BUCKET = "pet-images";
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

export default function AdminPetsPage() {
  const supabase = createClient();

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadPets = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("pets")
      .select(
        "id, name, description, price, currency, breed, age, gender, image_url, is_available, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load pets error:", error);
      alert("Unable to load pets.");
    } else {
      setPets(data || []);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPets();
  }, [loadPets]);

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

  /* ============IMAGE===================== */

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

  /* ===========EDIT============== */

  function startEdit(pet: Pet) {
    setEditingId(pet.id);

    setForm({
      name: pet.name,
      description: pet.description || "",
      price: pet.price !== null ? String(pet.price) : "",
      currency: pet.currency || "NGN",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "",
      image_url: pet.image_url || "",
      is_available: pet.is_available,
    });

    setImageFile(null);
    setImagePreview(pet.image_url || null);

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

  /* =========SUBMIT============ */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Pet name is required.");
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
        breed: form.breed.trim() || null,
        age: form.age.trim() || null,
        gender: form.gender.trim() || null,
        image_url: imageUrl,
        is_available: form.is_available,
    };

    let error;

    if (editingId) {
      const response = await supabase
        .from("pets")
        .update(payload)
        .eq("id", editingId);

      error = response.error;
    } else {
      const response = await supabase.from("pets").insert(payload);

      error = response.error;
    }

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert(editingId ? "Pet updated successfully." : "Pet added successfully.");

      resetForm();
      await loadPets();
    }

    setSaving(false);
  }

  /* ===========AVAILABILITY================ */

  async function toggleAvailability(pet: Pet) {
    const { error } = await supabase
      .from("pets")
      .update({
        is_available: !pet.is_available,
      })
      .eq("id", pet.id);

    if (error) {
      console.error("Availability error:", error);
      alert("Unable to update pet availability.");
      return;
    }

    await loadPets();
  }

  /* ==============DELETE======================== */

  async function deletePet(pet: Pet) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${pet.name}"?`
    );

    if (!confirmed) return;

    try {
      /*
       * Delete database record first.
       */
      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("id", pet.id);

      if (error) {
        throw error;
      }

      /*
       * If image_url belongs to our Supabase bucket,
       * try to remove the image from storage too.
       */
      if (pet.image_url) {
        try {
          const imageUrl = new URL(pet.image_url);

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

      if (editingId === pet.id) {
        resetForm();
      }

      alert("Pet deleted successfully.");

      await loadPets();
    } catch (error) {
      console.error("Delete pet error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete pet."
      );
    }
  }

  /* ==============PRICE====================== */

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
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
            MANAGEMENT
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Pet Shop
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
            Add, edit and manage the pets displayed on your
            public website.
          </p>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <section className="rounded-[28px] border border-white/10 bg-white/3 p-6 sm:p-8">

          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Pet" : "Add New Pet"}
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {editingId
                  ? "Update the pet information below."
                  : "Add a new pet to your pet shop."}
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
                Pet Name *
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
                Breed
              </label>

              <input
                type="text"
                value={form.breed}
                onChange={(e) =>
                  updateField("breed", e.target.value)
                }
                placeholder="e.g. German Shepherd"
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
              />
            </div>

            {/* AGE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Age
              </label>

              <input
                type="text"
                value={form.age}
                onChange={(e) =>
                  updateField("age", e.target.value)
                }
                placeholder="e.g. 2 years"
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-cyan-400/50"
              />
            </div>

            {/* GENDER */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/70">
                Gender
              </label>

              <select
                value={form.gender}
                onChange={(e) =>
                  updateField("gender", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-[#0b1125] px-4 py-3 text-sm outline-none transition focus:border-cyan-400/50"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                Pet Image
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
                placeholder="Describe this pet..."
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
                  Show this pet publicly
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
                  ? "Update Pet"
                  : "Add Pet"}
              </button>

            </div>

          </form>
        </section>

        {/* =====================================================
            PET LIST
        ===================================================== */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Pets
              </h2>

              <p className="mt-1 text-sm text-white/40">
                {pets.length}{" "}
                {pets.length === 1 ? "pet" : "pets"}
              </p>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center text-white/40">
              Loading pets...
            </div>
          ) : pets.length === 0 ? (
            /* EMPTY */

            <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center">

              <div className="text-5xl">
                🐾
              </div>

              <p className="mt-5 text-lg font-semibold">
                No pets yet
              </p>

              <p className="mt-2 text-sm text-white/40">
                Add your first pet using the form above.
              </p>

            </div>
          ) : (
            /* TABLE */

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/3">

              <div className="overflow-x-auto">

                <table className="w-full min-w-225">

                  <thead className="border-b border-white/10 bg-white/3">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Pet
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Breed
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Age
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-white/40">
                        Gender
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

                    {pets.map((pet) => (

                      <tr
                        key={pet.id}
                        className="border-b border-white/5 last:border-0 transition hover:bg-white/2"
                      >

                        {/* PET */}

                        <td className="px-5 py-5">

                          <div className="flex items-center gap-4">

                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/5">

                              {pet.image_url ? (
                                <Image
                                  src={pet.image_url}
                                  alt={pet.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xl">
                                  🐾
                                </div>
                              )}

                            </div>

                            <div className="min-w-0">

                              <p className="font-semibold">
                                {pet.name}
                              </p>

                              <p className="mt-1 max-w-55 truncate text-xs text-white/30">
                                {pet.description ||
                                  "No description"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* BREED */}

                        <td className="px-5 py-5 text-sm text-white/50">
                          {pet.breed || "—"}
                        </td>

                        {/* AGE */}

                        <td className="px-5 py-5 text-sm text-white/50">
                          {pet.age || "—"}
                        </td>

                        {/* GENDER */}

                        <td className="px-5 py-5 text-sm text-white/50">
                          {pet.gender || "—"}
                        </td>

                        {/* PRICE */}

                        <td className="px-5 py-5 text-sm font-semibold text-cyan-300">
                          {formatPrice(
                            pet.price,
                            pet.currency
                          )}
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-5">

                          <button
                            type="button"
                            onClick={() =>
                              toggleAvailability(pet)
                            }
                            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                              pet.is_available
                                ? "bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
                                : "bg-red-400/10 text-red-300 hover:bg-red-400/20"
                            }`}
                          >
                            {pet.is_available
                              ? "Available"
                              : "Hidden"}
                          </button>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-5">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                startEdit(pet)
                              }
                              className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deletePet(pet)
                              }
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