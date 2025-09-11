// components/Tag.tsx
export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border px-2 py-1 font-mono text-xs text-muted border-white/20 dark:border-white/10">
      {label}
    </span>
  );
}
