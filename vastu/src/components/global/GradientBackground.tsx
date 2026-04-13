'use client';
export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-tertiary to-bg-secondary opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--prakash-gold)_0%,transparent_50%)] opacity-20 dark:opacity-30" />
    </div>
  );
}
