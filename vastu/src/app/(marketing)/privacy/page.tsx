'use client';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';

export default function PrivacyPage() {
  return (
    <>
      <LuxuryCursor /><SoundController /><Header /><SmoothScroll>
        <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-nidra-indigo mb-8">Privacy Policy</h1>
          <div className="prose prose-lg prose-stone">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2>1. Information We Collect</h2>
            <p>VedicUrja collects only essential information: your name, email, and consultation details. We do not sell or share your data with third parties.</p>
            <h2>2. How We Use Your Information</h2>
            <p>Your data is used solely to provide Vastu consultations, course access, and to improve our services. Payment information is processed securely via simulated flows (no real data stored).</p>
            <h2>3. Data Security</h2>
            <p>All data is stored in Supabase with Row Level Security. Only you and authorized admins can access your information.</p>
            <h2>4. Your Rights</h2>
            <p>You may request deletion of your account and data at any time through the support section in your dashboard.</p>
            <h2>5. Cookies</h2>
            <p>We use essential cookies for authentication and session management. No tracking cookies are employed.</p>
            <h2>6. Contact</h2>
            <p>For privacy concerns, contact acharya@vedicurja.com.</p>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
