"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type DashboardStats = {
  exchangeRates: number;
  gadgets: number;
  pets: number;
  automobiles: number;
  totalListings: number;
  availableListings: number;
  unavailableListings: number;
};

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  href: string;
};

type ListingRow = {
  id: string;
  name: string;
  description?: string | null;
  is_available: boolean;
  created_at: string;
};

const supabase = createClient();

function formatTime(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    exchangeRates: 0,
    gadgets: 0,
    pets: 0,
    automobiles: 0,
    totalListings: 0,
    availableListings: 0,
    unavailableListings: 0,
  });

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setError(null);

      const [
        exchangeRatesResult,
        gadgetsResult,
        petsResult,
        automobilesResult,
      ] = await Promise.all([
        supabase
          .from("exchange_rates")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("gadgets")
          .select("id, name, description, is_available, created_at")
          .order("created_at", { ascending: false }),

        supabase
          .from("pets")
          .select("id, name, description, is_available, created_at")
          .order("created_at", { ascending: false }),

        supabase
          .from("automobiles")
          .select("id, name, description, is_available, created_at")
          .order("created_at", { ascending: false }),
      ]);

      if (exchangeRatesResult.error) {
        throw new Error(
          `Exchange rates: ${exchangeRatesResult.error.message}`
        );
      }

      if (gadgetsResult.error) {
        throw new Error(
          `Gadgets: ${gadgetsResult.error.message}`
        );
      }

      if (petsResult.error) {
        throw new Error(
          `Pets: ${petsResult.error.message}`
        );
      }

      if (automobilesResult.error) {
        throw new Error(
          `Automobiles: ${automobilesResult.error.message}`
        );
      }

      const gadgets = (gadgetsResult.data || []) as ListingRow[];
      const pets = (petsResult.data || []) as ListingRow[];
      const automobiles = (automobilesResult.data || []) as ListingRow[];

      const allListings = [
        ...gadgets.map((item) => ({
          ...item,
          title: "New gadget listing",
          description:
            item.description ||
            `${item.name} was added to the gadget shop.`,
          icon: "📱",
          href: "/admin/gadgets",
        })),

        ...pets.map((item) => ({
          ...item,
          title: "New pet listing",
          description:
            item.description ||
            `${item.name} was added to the pet listings.`,
          icon: "🐾",
          href: "/admin/pets",
        })),

        ...automobiles.map((item) => ({
          ...item,
          title: "New automobile listing",
          description:
            item.description ||
            `${item.name} was added to the automobile listings.`,
          icon: "🚘",
          href: "/admin/automobiles",
        })),
      ];

      allListings.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      const totalListings =
        gadgets.length + pets.length + automobiles.length;

      const availableListings =
        gadgets.filter((item) => item.is_available).length +
        pets.filter((item) => item.is_available).length +
        automobiles.filter((item) => item.is_available).length;

      setStats({
        exchangeRates: exchangeRatesResult.count ?? 0,
        gadgets: gadgets.length,
        pets: pets.length,
        automobiles: automobiles.length,
        totalListings,
        availableListings,
        unavailableListings:
          totalListings - availableListings,
      });

      setRecentActivity(
        allListings.slice(0, 6).map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          time: formatTime(item.created_at),
          icon: item.icon,
          href: item.href,
        }))
      );
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadDashboard();
  }, [loadDashboard]);

  async function handleRefresh() {
    setRefreshing(true);
    await loadDashboard();
  }

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      setLoggingOut(false);
      return;
    }

    router.replace("/admin/login");
    router.refresh();
  }

  const statCards = [
    {
      title: "Total Listings",
      value: stats.totalListings,
      description: "Across all services",
      icon: "📊",
    },
    {
      title: "Gadgets",
      value: stats.gadgets,
      description: "Gadget products",
      icon: "📱",
      href: "/admin/gadgets",
    },
    {
      title: "Automobiles",
      value: stats.automobiles,
      description: "Vehicle listings",
      icon: "🚘",
      href: "/admin/automobiles",
    },
    {
      title: "Pets",
      value: stats.pets,
      description: "Pet listings",
      icon: "🐾",
      href: "/admin/pets",
    },
    {
      title: "Exchange Rates",
      value: stats.exchangeRates,
      description: "Active rate records",
      icon: "💱",
      href: "/admin/exchange",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* TOP BAR */}
      <header className="border-b border-white/10 bg-[#070b1b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">

          <div>
            <p className="text-lg font-black tracking-tight">
              GB GLOBAL
            </p>

            <p className="text-[10px] tracking-[0.25em] text-cyan-400">
              ADMINISTRATION
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                Administrator
              </p>

              <p className="text-xs text-white/35">
                Management Portal
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-sm font-bold">
              GB
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{loggingOut ? "…" : "⏻"}</span>

              <span className="hidden sm:inline">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

          </div>
        </div>
      </header>


      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_1fr]">

        {/* SIDEBAR */}
        <aside className="hidden min-h-[calc(100vh-80px)] border-r border-white/10 lg:block">

          <nav className="sticky top-0 p-5">

            <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.25em] text-white/25">
              MANAGEMENT
            </p>

            <div className="space-y-1">

              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-semibold text-cyan-300"
              >
                <span>▦</span>
                Dashboard
              </Link>

              <Link
                href="/admin/exchange"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                <span>💱</span>
                Exchange Rates
              </Link>

              <Link
                href="/admin/gadgets"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                <span>📱</span>
                Gadgets
              </Link>

              <Link
                href="/admin/automobiles"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                <span>🚘</span>
                Automobiles
              </Link>

              <Link
                href="/admin/pets"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                <span>🐾</span>
                Pets
              </Link>

              <Link
                href="/admin/inquiries"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
              >
                <span>💬</span>
                Inquiries
              </Link>

            </div>


            <p className="mb-4 mt-10 px-3 text-[10px] font-bold tracking-[0.25em] text-white/25">
              WEBSITE
            </p>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              <span>↗</span>
              View Website
            </Link>

          </nav>

        </aside>


        {/* MAIN */}
        <section className="p-6 sm:p-8 lg:p-10">

          {/* PAGE HEADER */}
          <div className="mb-8">

            <p className="text-xs font-bold tracking-[0.3em] text-cyan-400">
              OVERVIEW
            </p>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <h1 className="text-3xl font-black sm:text-4xl">
                  Dashboard
                </h1>

                <p className="mt-2 text-sm text-white/40">
                  Manage and monitor your GB Global Services website.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-50"
                >
                  {refreshing ? "Refreshing..." : "↻ Refresh"}
                </button>

                <Link
                  href="/"
                  target="_blank"
                  className="w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  View Website →
                </Link>

              </div>

            </div>

          </div>


          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 p-5">

              <p className="font-semibold text-red-300">
                Unable to load dashboard
              </p>

              <p className="mt-2 text-sm text-red-200/60">
                {error}
              </p>

              <button
                type="button"
                onClick={handleRefresh}
                className="mt-4 rounded-lg border border-red-400/20 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-400/10"
              >
                Try Again
              </button>

            </div>
          )}


          {/* STATS */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {statCards.map((stat) => {

              const content = (
                <>
                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                      {stat.icon}
                    </div>

                    {stat.href && (
                      <span className="text-xs text-white/20 transition group-hover:text-cyan-300">
                        →
                      </span>
                    )}

                  </div>

                  {loading ? (
                    <>
                      <div className="mt-6 h-9 w-20 animate-pulse rounded-lg bg-white/5" />

                      <div className="mt-2 h-4 w-28 animate-pulse rounded bg-white/5" />
                    </>
                  ) : (
                    <>
                      <p className="mt-6 text-3xl font-black">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-sm text-white/35">
                        {stat.title}
                      </p>

                      <p className="mt-2 text-xs text-white/20">
                        {stat.description}
                      </p>
                    </>
                  )}
                </>
              );

              if (stat.href) {
                return (
                  <Link
                    key={stat.title}
                    href={stat.href}
                    className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:border-blue-400/20 hover:bg-white/5"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:border-blue-400/20"
                >
                  {content}
                </div>
              );
            })}

          </div>


          {/* AVAILABILITY SUMMARY */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-emerald-300">
                    AVAILABLE
                  </p>

                  <p className="mt-3 text-3xl font-black">
                    {loading ? "—" : stats.availableListings}
                  </p>

                  <p className="mt-1 text-sm text-white/35">
                    Active listings
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-xl">
                  ✓
                </div>

              </div>

            </div>


            <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold tracking-[0.15em] text-red-300">
                    UNAVAILABLE
                  </p>

                  <p className="mt-3 text-3xl font-black">
                    {loading ? "—" : stats.unavailableListings}
                  </p>

                  <p className="mt-1 text-sm text-white/35">
                    Hidden or unavailable listings
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-xl">
                  ×
                </div>

              </div>

            </div>

          </div>


          {/* MANAGEMENT CARDS */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <Link
              href="/admin/exchange"
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
                💱
              </div>

              <h2 className="mt-5 font-bold">
                Exchange Rates
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Manage gift card and cryptocurrency exchange rates.
              </p>

              <p className="mt-5 text-sm font-semibold text-cyan-300">
                Manage Rates →
              </p>
            </Link>


            <Link
              href="/admin/gadgets"
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-blue-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-xl">
                📱
              </div>

              <h2 className="mt-5 font-bold">
                Gadget Shop
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Add, edit and manage gadgets displayed on the website.
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-300">
                Manage Products →
              </p>
            </Link>


            <Link
              href="/admin/automobiles"
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-blue-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-xl">
                🚘
              </div>

              <h2 className="mt-5 font-bold">
                Automobiles
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Manage vehicles, prices, images and availability.
              </p>

              <p className="mt-5 text-sm font-semibold text-purple-300">
                Manage Vehicles →
              </p>
            </Link>


            <Link
              href="/admin/pets"
              className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-400/10 text-xl">
                🐾
              </div>

              <h2 className="mt-5 font-bold">
                Pet Services
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/35">
                Manage pets, listings, images and availability.
              </p>

              <p className="mt-5 text-sm font-semibold text-pink-300">
                Manage Pets →
              </p>
            </Link>

          </div>


          {/* LOWER SECTION */}
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">

            {/* REAL ACTIVITY */}
            <div className="rounded-2xl border border-white/10 bg-white/3">

              <div className="flex items-center justify-between border-b border-white/10 p-6">

                <div>
                  <h2 className="font-bold">
                    Recent Listings
                  </h2>

                  <p className="mt-1 text-xs text-white/30">
                    Latest products and services added
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="text-xs font-semibold text-cyan-300"
                >
                  Refresh →
                </button>

              </div>


              {loading ? (
                <div className="divide-y divide-white/10">

                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 p-5"
                    >
                      <div className="h-11 w-11 animate-pulse rounded-xl bg-white/5" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
                        <div className="h-3 w-64 animate-pulse rounded bg-white/5" />
                      </div>
                    </div>
                  ))}

                </div>
              ) : recentActivity.length === 0 ? (
                <div className="p-10 text-center">

                  <div className="text-4xl">
                    📦
                  </div>

                  <p className="mt-4 font-semibold">
                    No listings yet
                  </p>

                  <p className="mt-2 text-sm text-white/35">
                    Add a gadget, automobile or pet to see activity here.
                  </p>

                </div>
              ) : (
                <div className="divide-y divide-white/10">

                  {recentActivity.map((activity) => (

                    <Link
                      key={`${activity.href}-${activity.id}`}
                      href={activity.href}
                      className="flex items-center gap-4 p-5 transition hover:bg-white/3"
                    >

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                        {activity.icon}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold">
                          {activity.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/35">
                          {activity.description}
                        </p>

                      </div>

                      <p className="hidden text-xs text-white/25 sm:block">
                        {activity.time}
                      </p>

                      <span className="text-white/20">
                        →
                      </span>

                    </Link>

                  ))}

                </div>
              )}

            </div>


            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6">

              <h2 className="font-bold">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Frequently used management tools
              </p>


              <div className="mt-6 space-y-3">

                <Link
                  href="/admin/exchange"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/5"
                >
                  <span className="text-sm font-semibold">
                    Update Exchange Rates
                  </span>

                  <span className="text-cyan-300">
                    →
                  </span>
                </Link>


                <Link
                  href="/admin/gadgets"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/5"
                >
                  <span className="text-sm font-semibold">
                    Add Gadget
                  </span>

                  <span className="text-cyan-300">
                    →
                  </span>
                </Link>


                <Link
                  href="/admin/automobiles"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/5"
                >
                  <span className="text-sm font-semibold">
                    Add Vehicle
                  </span>

                  <span className="text-cyan-300">
                    →
                  </span>
                </Link>


                <Link
                  href="/admin/pets"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4 transition hover:bg-white/5"
                >
                  <span className="text-sm font-semibold">
                    Add Pet
                  </span>

                  <span className="text-cyan-300">
                    →
                  </span>
                </Link>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}