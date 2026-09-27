export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-0.5 ${className}`}>
      <span className="font-display text-[1.65rem] leading-none tracking-tight text-ink">monis</span>
      <span className="text-sm font-medium text-sage">.rent</span>
    </span>
  );
}
