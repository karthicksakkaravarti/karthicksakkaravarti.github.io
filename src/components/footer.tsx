import { Github, Linkedin, Mail } from "lucide-react";
import { Profile } from "@/lib/supabase";
import XIcon from "@/components/x-icon";

export default function Footer({ profile }: { profile: Profile | null }) {
  const name = profile?.name || "Karthick Sakkaravarthi";
  const initials = profile?.initials || "KS";

  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <a
              href="https://x.com/karthicksakkara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
