import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConfirmDialogConfig } from "@/hooks/useConfirmDialog";

interface ConfirmDialogProps {
  open: boolean;
  config: ConfirmDialogConfig | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  config,
  onConfirm,
  onCancel,
}) => {
  if (!config) return null;

  const getActionClassName = () => {
    switch (config.variant) {
      case "destructive":
        return cn(buttonVariants({ variant: "destructive" }));
      case "warning":
        return cn(
          buttonVariants({ variant: "default" }),
          "bg-orange-600 hover:bg-orange-700 text-white"
        );
      default:
        return cn(buttonVariants({ variant: "default" }));
    }
  };

  const getHeaderColor = () => {
    switch (config.variant) {
      case "destructive":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      default:
        return "text-gray-900";
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={getHeaderColor()}>
            {config.title}
          </AlertDialogTitle>
          <AlertDialogDescription>{config.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {config.cancelText || "Hủy"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={getActionClassName()}
          >
            {config.confirmText || "Xác nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
