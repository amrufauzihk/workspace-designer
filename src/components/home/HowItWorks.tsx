const STEPS = [
  {
    number: "01",
    title: "Design your room",
    body: "Choose a desk and chair, then add screens, a lamp, a plant and the small things that help you focus.",
  },
  {
    number: "02",
    title: "Pick your rental period",
    body: "Stay for a month or a year. Your monthly subtotal and estimated total update with every change.",
  },
  {
    number: "03",
    title: "Send one inquiry",
    body: "Share your dates and Bali address. Availability and delivery are confirmed before anything is booked.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">How it works</p>
            <h2 id="how-heading" className="mt-2 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
              From empty room to ready desk.
            </h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {STEPS.map((step) => (
              <li key={step.number} className="border-t border-line-strong pt-5">
                <span className="font-display text-2xl text-sage" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
