import { getCertifications } from "@/lib/data/queries";
import { Award, ExternalLink } from "lucide-react";

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>CERTIFICATIONS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Sertifikasi & Penghargaan
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Daftar lisensi industri, kejuaraan lomba UI/UX, dan beasiswa.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded border border-border-subtle bg-bg-base hover:border-border-hover transition-colors flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-bg-elevated border border-border-subtle text-text-primary shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-text-primary">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs text-text-secondary mt-0.5">
                  {cert.issuer} • {cert.issue_date}
                </p>
              </div>
            </div>

            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded border border-border-subtle text-text-muted hover:text-text-primary transition-colors shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
