"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#studio", label: "Furniture" },
  { href: "#about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 rounded-md" aria-label="monis.rent Workspace Studio, back to top">
          <Logo />
          <span className="hidden border-l border-line-strong pl-3 text-xs font-medium uppercase tracking-[0.16em] text-muted sm:inline">
            Workspace Studio
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#studio"
            className="hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-forest px-4 text-sm font-medium text-white transition hover:bg-forest-deep sm:inline-flex"
          >
            Design your workspace
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-canvas px-4 pb-5 pt-2 lg:hidden">
          <ul className="divide-y divide-line">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-base text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#studio"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-forest text-sm font-medium text-white"
          >
            Design your workspace
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
