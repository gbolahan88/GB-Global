import Image from "next/image";

import logo from "../assets/GBglobal_logo.png";

const links = [
  { name: "Home", href: "/" },
  { name: "Tech Services", href: "/tech-services" },
  { name: "Gadget Shop", href: "/gadget-shop" },
  { name: "Pet Services", href: "/pet-services" },
  { name: "Automobile", href: "/automobile" },
  { name: "Exchange", href: "/exchange" },
];

export default function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#03050f]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="GB Global logo"
                width={300}
                height={300}
                className="theme-logo h-auto w-auto object-cover"
              />
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Technology, trade and trusted solutions. We connect people and
              businesses with quality products and reliable services.
            </p>
          </div>

          {/* Business */}
          <div>
            <h3 className="text-sm font-semibold">Our Businesses</h3>

            <div className="mt-5 flex flex-col gap-3">
              {links.slice(1).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/50 transition hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#"
                className="text-sm text-white/50 transition hover:text-white"
              >
                Home
              </a>

              <a
                href="#"
                className="text-sm text-white/50 transition hover:text-white"
              >
                About Us
              </a>

              <a
                href="https://wa.me/2348139498576"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 transition hover:text-white"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Get In Touch</h3>

            <div className="mt-5 space-y-3 text-sm text-white/50">
              <p>+234 813 949 8576</p>
              <p>onigbolahan6@gmail.com</p>
              <p>Osun, Nigeria</p>
            </div>

            <a
              href="https://wa.me/2348139498576"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105"
            >
              Chat With Us on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GB Global Services LTD. All rights
            reserved.
          </p>

          <p>Technology • Trade • Solutions</p>
        </div>
      </div>
    </footer>
  );
}