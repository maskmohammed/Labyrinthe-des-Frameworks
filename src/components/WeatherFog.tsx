export default function WeatherFog() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 70%)",
        mixBlendMode: "soft-light",
        animation: "fogMove 12s ease-in-out infinite",
      }}
    />
  );
}
