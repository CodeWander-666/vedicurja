export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side initialization (minimal for static export)
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime initialization (minimal for static export)
  }
}
