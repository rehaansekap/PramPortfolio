import Swal, { SweetAlertOptions } from "sweetalert2";

/**
 * Custom Monochrome SweetAlert2 Configuration
 * Styled to perfectly match PramPortfolio's tech blueprint & monochromatic theme.
 */
const customSwal = Swal.mixin({
  customClass: {
    popup: "pram-swal-popup",
    title: "pram-swal-title",
    htmlContainer: "pram-swal-html",
    confirmButton: "pram-swal-confirm",
    cancelButton: "pram-swal-cancel",
    actions: "pram-swal-actions",
  },
  buttonsStyling: false,
  backdrop: "rgba(0, 0, 0, 0.7)",
  showClass: {
    popup: "animate-in fade-in zoom-in-95 duration-150",
  },
  hideClass: {
    popup: "animate-out fade-out zoom-out-95 duration-150",
  },
});

interface ConfirmOptions {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Shows a monochromatic delete confirmation dialog
 * Returns true if user clicked confirm, false otherwise.
 */
export async function confirmDelete({
  title = "Hapus Data Ini?",
  text = "Tindakan ini tidak dapat dibatalkan dan file terkait akan dihapus secara permanen.",
  confirmText = "YA, HAPUS",
  cancelText = "BATAL",
}: ConfirmOptions = {}): Promise<boolean> {
  const result = await customSwal.fire({
    title,
    text,
    icon: "warning",
    iconColor: "#ef4444",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
}

/**
 * Shows a general action confirmation dialog (e.g. before saving or editing)
 * Returns true if confirmed.
 */
export async function confirmAction({
  title = "Simpan Perubahan?",
  text = "Pastikan seluruh data yang Anda masukkan telah sesuai.",
  confirmText = "SIMPAN",
  cancelText = "BATAL",
}: ConfirmOptions = {}): Promise<boolean> {
  const result = await customSwal.fire({
    title,
    text,
    icon: "question",
    iconColor: "#a1a1aa",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });

  return result.isConfirmed;
}

/**
 * Shows a sleek monochromatic success notification
 */
export async function showSuccess(title: string, text?: string): Promise<void> {
  await customSwal.fire({
    title,
    text,
    icon: "success",
    iconColor: "#10b981",
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

/**
 * Shows a monochromatic error notification
 */
export async function showError(title: string, text?: string): Promise<void> {
  await customSwal.fire({
    title,
    text,
    icon: "error",
    iconColor: "#ef4444",
    confirmButtonText: "TUTUP",
  });
}

export default customSwal;
