'use client';
export default function StaticGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-sacred-saffron/10 via-prakash-gold/10 to-kumkuma-red/10 dark:from-sacred-saffron/20 dark:via-prakash-gold/20 dark:to-kumkuma-red/20 animate-gradient-x" />
      <div className="absolute inset-0 bg-vastu-parchment/50 dark:bg-dark-bg/50 backdrop-blur-sm" />
    </div>
  );
}
