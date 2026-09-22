"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/GBglobal_logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tech Services", href: "/tech-services" },
  { name: "Gadget Shop", href: "/gadget-shop" },
  { name: "Pet Services", href: "/pet-services" },
  { name: "Automobile", href: "/automobile" },
  { name: "Exchange", href: "/exchange" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050816]/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="GB Global logo"
            width={150}
            height={150}
            className="theme-logo h-full w-full object-cover"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="site-nav-link text-sm font-medium text-white/70 transition hover:text-white"
            >
              {link.name}
            </a>
          ))}

          <ThemeToggle />

          <a
            href="https://wa.me/2348139498576"
            target="_blank"
            rel="noopener noreferrer"
            className="site-cta rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#050816] transition hover:scale-105"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
          onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-button flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1.5">
            <span
                className={`mobile-menu-icon block h-0.5 w-5 bg-white transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
                className={`mobile-menu-icon block h-0.5 w-5 bg-white transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
                className={`mobile-menu-icon block h-0.5 w-5 bg-white transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#050816] px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="site-nav-link text-sm font-medium text-white/70 transition hover:text-white"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://wa.me/2348139498576"
              target="_blank"
              rel="noopener noreferrer"
                className="site-cta rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#050816]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}