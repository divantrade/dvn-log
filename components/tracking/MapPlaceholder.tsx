export function MapPlaceholder({ note }: { note?: string }) {
  return (
    <div className="w-full h-64 rounded-lg border border-dashed grid place-items-center">
      <div className="text-sm text-muted-foreground">{note || "Map coming soon"}</div>
    </div>
  );
}
