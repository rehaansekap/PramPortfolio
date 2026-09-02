import { getCertifications } from "@/lib/data/queries";
import { CertificationsManager } from "@/components/admin/certifications-manager";

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
          Sertifikasi & Lisensi Resmi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          Kelola lisensi keahlian industri, kejuaraan, tautan verifikasi online, dan file PDF sertifikat.
        </p>
      </div>

      <CertificationsManager initialCertifications={certifications} />
    </div>
  );
}
