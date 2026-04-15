'use client';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function TermsPage() {
  return (
    <>
      <LuxuryCursor /><SoundController /><Header /><SmoothScroll>
        <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-nidra-indigo mb-8">Terms & Conditions</h1>
          <div className="prose prose-lg prose-stone">
            <p>Effective Date: {new Date().toLocaleDateString()}</p>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing VedicUrja, you agree to these terms. If you disagree, please discontinue use.</p>
            <h2>2. Services Provided</h2>
            <p>We offer virtual Vastu consultations, educational courses, and AI‑powered tools. All guidance is based on traditional Vedic principles and should not replace professional legal, medical, or financial advice.</p>
            <h2>3. Payments and Refunds</h2>
            <p>Payments are processed via simulation for demonstration purposes. For paid services, refunds are handled on a case‑by‑case basis within 7 days of purchase.</p>
            <h2>4. User Conduct</h2>
            <p>You agree to use our services respectfully and not to misuse, reverse‑engineer, or exploit any part of the platform.</p>
            <h2>5. Intellectual Property</h2>
            <p>All content, including course materials and Vastu diagrams, is owned by VedicUrja and protected by copyright laws.</p>
            <h2>6. Limitation of Liability</h2>
            <p>VedicUrja is not liable for any indirect damages arising from the use of our services.</p>
            <h2>7. Changes to Terms</h2>
            <p>We may update these terms. Continued use constitutes acceptance.</p>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
