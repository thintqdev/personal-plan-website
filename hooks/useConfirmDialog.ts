import { useState } from "react";

export interface ConfirmDialogConfig {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning";
}

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmDialogConfig | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const showConfirm = (dialogConfig: ConfirmDialogConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfig(dialogConfig);
      setResolvePromise(() => resolve);
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    if (resolvePromise) {
      resolvePromise(true);
    }
    setIsOpen(false);
    setConfig(null);
    setResolvePromise(null);
  };

  const handleCancel = () => {
    if (resolvePromise) {
      resolvePromise(false);
    }
    setIsOpen(false);
    setConfig(null);
    setResolvePromise(null);
  };

  return {
    isOpen,
    config,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};
