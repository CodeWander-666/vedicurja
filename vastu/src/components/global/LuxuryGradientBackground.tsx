'use client';

export function LuxuryGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF9] via-[#F5EDE3] to-[#E8D5C0] animate-gradient-shift" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%205L55%2030L30%2055L5%2030L30%205Z%22%20fill%3D%22none%22%20stroke%3D%22%23C88A5D%22%20stroke-width%3D%220.5%22%2F%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%2215%22%20fill%3D%22none%22%20stroke%3D%22%23E8B960%22%20stroke-width%3D%220.3%22%2F%3E%3C%2Fsvg%3E')] bg-repeat opacity-20" />
    </div>
  );
}

export default LuxuryGradientBackground;
