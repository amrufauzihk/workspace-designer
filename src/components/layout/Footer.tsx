import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Design your space. Rent your setup. Work from anywhere.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-8 text-sm">
          <a href="#how-it-works" className="text-muted transition hover:text-ink">
            How it works
          </a>
          <a href="#studio" className="text-muted transition hover:text-ink">
            Workspace Studio
          </a>
          <a href="#about" className="text-muted transition hover:text-ink">
            About
          </a>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-muted sm:px-6 lg:px-8">
          Monis Workspace Studio is a prototype built for the Desent Solutions developer challenge. Catalog, prices
          (illustrative IDR) and availability are examples only — not live inventory, official rates, or an offer to rent.
        </p>
      </div>
    </footer>
  );
}
