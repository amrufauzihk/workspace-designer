export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">About</p>
          <h2 id="about-heading" className="mt-2 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            Furniture for people who move.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
          <p>
            monis.rent rents furniture to digital nomads, freelancers and startups in Bali — people who need a proper
            workspace now, without buying furniture they will leave behind.
          </p>
          <p>
            Workspace Studio is a prototype of a more visual way to rent: design the setup first, see it in a room, and
            understand the cost before you reach out.
          </p>
          <div className="rounded-2xl border border-line bg-canvas p-5 text-sm">
            <p className="font-medium text-ink">About this prototype</p>
            <p className="mt-1.5">
              Built for the Desent Solutions developer challenge. Products, illustrations, prices and availability are
              illustrative and do not represent live monis.rent inventory or official rental rates. Inquiries are not
              sent anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
