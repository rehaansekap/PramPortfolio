import { getEducations } from "@/lib/data/queries";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export default async function AdminEducationsPage() {
  const educations = await getEducations();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase mb-1">
          <span>ADMIN</span>
          <span>•</span>
          <span>EDUCATIONS</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Pendidikan & Sertifikasi Pelatihan
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Daftar riwayat akademik perguruan tinggi, bootcamp, dan sertifikasi vokasi.
        </p>
      </div>

      <div className="space-y-4">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded border border-border-subtle bg-bg-base hover:border-border-hover transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h3 className="font-heading font-bold text-lg text-text-primary">
                  {edu.institution}
                </h3>
                <p className="font-mono text-sm text-text-secondary">
                  {edu.degree} — {edu.field}
                </p>
                <p className="font-mono text-xs text-text-muted flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{edu.location}</span>
                </p>
              </div>

              <div className="font-mono text-xs text-text-muted">
                {edu.start_date || "N/A"} — {edu.end_date || "Present"}
                {edu.gpa && (
                  <span className="block mt-1 font-bold text-text-primary">
                    IPK: {edu.gpa}
                  </span>
                )}
              </div>
            </div>

            {edu.description_id.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border-subtle/50 text-xs text-text-secondary">
                <ul className="space-y-1">
                  {edu.description_id.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-text-muted select-none font-bold text-sm leading-none mt-0.5 shrink-0">•</span>
                      <span className="flex-1">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {edu.attachments && edu.attachments.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-border-subtle/40 flex flex-wrap gap-2">
                {edu.attachments.map((att, idx) => (
                  <a
                    key={idx}
                    href={att.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-elevated font-mono text-[11px] text-text-primary hover:text-accent border border-border-subtle"
                  >
                    <span>📄 {att.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
