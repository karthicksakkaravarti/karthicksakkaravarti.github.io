import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service — CricScore",
  description: "Terms of service for the CricScore mobile app.",
};

export default function CricScoreTerms() {
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
              <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
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
              <h2 className="text-2xl font-semibold mt-0 mb-4 pb-3 border-b border-border/50">1. Acceptance of Terms</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                By downloading, installing, or using CricScore (&ldquo;the app&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use the app.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                These Terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">2. Use of the App</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                CricScore provides cricket score information and related content for personal, non-commercial use only. You agree to use the app only for lawful purposes and in accordance with these Terms.
              </p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>You must be at least 13 years old to use CricScore.</li>
                <li>You may not reverse-engineer, decompile, or disassemble any part of the app.</li>
                <li>You may not copy, modify, distribute, or create derivative works based on the app without our written permission.</li>
                <li>You may not use the app for any commercial purpose without our prior written consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">3. User Accounts</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                Accounts are created via phone number OTP verification. By creating an account, you agree to:
              </p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>Provide your own valid phone number and not impersonate any other person.</li>
                <li>Keep your phone and account secure.</li>
                <li>Notify us immediately if you suspect unauthorized use of your account.</li>
              </ul>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We reserve the right to suspend or permanently terminate accounts that violate these Terms, at our sole discretion and without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">4. Content and Data</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                Cricket scores, match statistics, and related data displayed in the app are sourced from third-party data providers. We do not guarantee the accuracy, completeness, timeliness, or reliability of any data provided.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                All content is provided for informational and entertainment purposes only. You should not rely on it for any commercial, betting, fantasy sports, or financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">5. Prohibited Conduct</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">You agree not to:</p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>Use the app for any illegal purpose or in violation of any applicable law.</li>
                <li>Attempt to gain unauthorized access to the app&apos;s servers, databases, or infrastructure.</li>
                <li>Scrape, harvest, or programmatically extract data from the app.</li>
                <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
                <li>Transmit any malware, viruses, or other harmful code.</li>
                <li>Interfere with or disrupt the operation of the app or servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">6. Intellectual Property</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                The CricScore name, logo, app design, and all original content within the app are the intellectual property of Karthick Sakkaravarthi. All rights are reserved.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                Cricket-related data, statistics, and imagery may be subject to third-party intellectual property rights. We do not claim ownership of such third-party content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">7. Disclaimer of Warranties</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                CricScore is provided <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong> without warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/90 text-[17px] leading-[1.8]">
                <li>The app will be available, uninterrupted, or error-free at all times.</li>
                <li>Any data or content in the app is accurate or up to date.</li>
                <li>The app will be free of viruses or other harmful components.</li>
              </ul>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                The app is in an early development / beta stage. Features may change, be removed, or be temporarily unavailable without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">8. Limitation of Liability</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                To the maximum extent permitted by applicable law, Karthick Sakkaravarthi shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, CricScore.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                Our total liability to you for any claims arising out of or relating to these Terms or the app shall not exceed INR 0, reflecting the fact that CricScore is a free application with no paid features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">9. Termination</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We may suspend or terminate your access to CricScore at any time, with or without cause or notice, if we believe you have violated these Terms or for any other operational reason.
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                You may stop using the app at any time. To delete your account and data, contact us as described in Section 11.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">10. Changes to These Terms</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                We may update these Terms from time to time. When we do, the &ldquo;Last updated&rdquo; date at the top of this page will be revised. We encourage you to review these Terms periodically. Continued use of CricScore after any changes constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mt-12 mb-4 pb-3 border-b border-border/50">11. Contact</h2>
              <p className="text-foreground/90 leading-[1.8] mb-4 text-[17px]">
                If you have questions about these Terms or need to report a violation, please contact:
              </p>
              <p className="text-foreground/90 leading-[1.8] mb-2 text-[17px]">
                <strong>Karthick Sakkaravarthi</strong><br />
                Email:{" "}
                <a href="mailto:karthicksakkaravarthi@gmail.com" className="text-primary underline underline-offset-4 hover:no-underline">
                  karthicksakkaravarthi@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </article>

      <Footer profile={null} />
    </div>
  );
}
