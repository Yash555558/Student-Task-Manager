export default function Loading({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
      <p className="text-sm">{label}</p>
    </div>
  );
}