import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LanguageLayoutProps {
  children: React.ReactNode;
  backgroundGradient?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
}

export default function LanguageLayout({
  children,
  backgroundGradient = "bg-gradient-to-br from-red-50 via-pink-50 to-rose-100",
  showBackButton = false,
  backButtonHref = "/study/language",
  backButtonText = "Quay lại",
}: LanguageLayoutProps) {
  return (
    <div className={`min-h-screen ${backgroundGradient}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showBackButton && (
          <div className="mb-6">
            <Link
              href={backButtonHref}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">{backButtonText}</span>
            </Link>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
