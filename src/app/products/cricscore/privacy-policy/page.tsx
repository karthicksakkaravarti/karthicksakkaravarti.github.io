import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — CricScore",
  description: "Privacy policy for the CricScore mobile app.",
};

export default function CricScorePrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar initials="KS" />

      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 pt-12 pb-10">
          <a
            href="/products/cricscore/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to CricScore
          </a>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A7EA4]/10 border border-[#0A7EA4]/20 flex items-center justify-center text-2xl shrink-0">
              🏏
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">CricScore</p>
              <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: March 27, 2026</p>
        </div>
      </header>

      {/* Content */}
      <article className="flex-1">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
          <div className="prose-article">

            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4 pb-3 border-b border-border/50">1. Introduction</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                CricScore (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the app&rdquo;) is operated by Karthick Sakkaravarthi. This Privacy Policy explains what personal data we collect when you use CricScore, how we use it, and your rights regarding that data.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                By downloading or using CricScore, you agree to the practices described in this policy. If you do not agree, please do not use the app.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">2. Information We Collect</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">We collect only what is necessary to provide the app&apos;s functionality:</p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li><strong>Phone number</strong> — collected when you register or log in, used solely for OTP-based authentication via Firebase Authentication.</li>
                <li><strong>Device information</strong> — automatically collected by Firebase, including device type, operating system version, and crash logs.</li>
                <li><strong>Usage analytics</strong> — anonymous app usage data (e.g. screen views) collected via Firebase Analytics if enabled. This data cannot be used to identify you personally.</li>
              </ul>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We do <strong>not</strong> collect your name, email address, physical address, payment information, or any other personally identifiable information beyond your phone number.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">3. How We Use Your Information</h2>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>To verify your identity through phone OTP authentication.</li>
                <li>To maintain your login session, which is stored locally on your device via AsyncStorage.</li>
                <li>To diagnose and fix crashes using Firebase Crashlytics data.</li>
                <li>To understand how the app is used in aggregate and improve features.</li>
              </ul>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">4. Third-Party Services</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">CricScore uses the following third-party services, each governed by their own privacy policies:</p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>
                  <strong>Firebase (Google LLC)</strong> — used for phone authentication and analytics. Your phone number and usage data may be processed on Google&apos;s servers, which may be located outside India. See the{" "}
                  <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline">Firebase Privacy Policy</a>{" "}
                  and{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline">Google Privacy Policy</a>.
                </li>
                <li>
                  <strong>Expo (Expo Inc.)</strong> — used as the mobile framework and for app updates. See the{" "}
                  <a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:no-underline">Expo Privacy Policy</a>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">5. Data Storage and Retention</h2>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>Your phone number is stored in Firebase Authentication and retained until you delete your account or submit a data deletion request.</li>
                <li>Session tokens are stored locally on your device using AsyncStorage and are cleared when you log out.</li>
                <li>Firebase may retain usage and crash logs for up to 63 days in accordance with their standard data retention policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">6. Your Rights</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li><strong>Right to access</strong> — you may request a copy of the data we hold about you.</li>
                <li><strong>Right to deletion</strong> — you may request that your account and associated data be permanently deleted.</li>
                <li><strong>Right to correction</strong> — you may contact us to correct inaccurate data.</li>
              </ul>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                For users in India, your rights under the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA) apply. To exercise any of these rights, contact us at the email address in Section 9, using the subject line <em>&ldquo;Data Request – CricScore&rdquo;</em>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">7. Children&apos;s Privacy</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                CricScore is not intended for users under the age of 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">8. Changes to This Policy</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We may update this Privacy Policy from time to time. When we do, the &ldquo;Last updated&rdquo; date at the top of this page will be revised. We encourage you to review this policy periodically. Continued use of CricScore after changes are posted constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">9. Contact Us</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact:
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-2 text-[17px]">
                <strong>Karthick Sakkaravarthi</strong><br />
                Email:{" "}
                <a href="mailto:karthicksakkaravarthi@gmail.com" className="text-primary underline underline-offset-4 hover:no-underline">
                  karthicksakkaravarthi@gmail.com
                </a>
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                For data deletion requests, please use the subject line <em>&ldquo;Data Deletion Request – CricScore&rdquo;</em>.
              </p>
            </section>

          </div>
        </div>
      </article>

      <Footer profile={null} />
    </div>
  );
}
