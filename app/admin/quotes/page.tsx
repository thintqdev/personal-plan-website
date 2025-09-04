"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Quote as QuoteIcon,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  getQuotes,
  addQuote,
  deleteQuote,
  type Quote as QuoteType,
} from "@/lib/user-service";

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingQuote, setIsAddingQuote] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load quotes from API
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setIsLoading(true);
        const quotesData = await getQuotes();
        setQuotes(quotesData);
      } catch (error) {
        console.error("Failed to load quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      loadQuotes();
    }
  }, [isMounted]);

  const handleAddQuote = async () => {
    if (!newQuoteText.trim()) {
      alert("Vui lòng nhập nội dung quote");
      return;
    }

    try {
      setIsAddingQuote(true);
      const newQuote = await addQuote({ text: newQuoteText });
      setQuotes((prev) => [newQuote, ...prev]);
      setNewQuoteText("");
    } catch (error) {
      console.error("Failed to add quote:", error);
      alert("Không thể thêm quote");
    } finally {
      setIsAddingQuote(false);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa quote này?")) {
      return;
    }

    try {
      await deleteQuote(quoteId);
      setQuotes((prev) => prev.filter((quote) => quote._id !== quoteId));
    } catch (error) {
      console.error("Failed to delete quote:", error);
      alert("Không thể xóa quote");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-block mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <QuoteIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quản lý Quote động lực
                </h1>
                <p className="text-gray-600 mt-1">
                  Thêm và quản lý các câu trích dẫn truyền cảm hứng
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Quote Form */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-1"></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              Thêm quote mới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quoteText" className="text-gray-700">
                  Nội dung quote *
                </Label>
                <Textarea
                  id="quoteText"
                  placeholder="Nhập nội dung quote truyền cảm hứng..."
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-200"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleAddQuote}
                disabled={isAddingQuote}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isAddingQuote ? "Đang thêm..." : "Thêm quote"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-1"></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              Danh sách quotes ({quotes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-100 rounded-lg animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : quotes.length === 0 ? (
              <div className="text-center py-12">
                <QuoteIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Chưa có quote nào</p>
                <p className="text-gray-400">
                  Hãy thêm quote đầu tiên của bạn!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div
                    key={quote._id}
                    className="p-6 bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg">
                            <QuoteIcon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-gray-800 leading-relaxed text-base pt-0.5">
                            "{quote.text}"
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteQuote(quote._id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 flex-shrink-0 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
