"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  X,
  Lightbulb,
  Wand2,
} from "lucide-react";
import {
  parseExpenseWithAI,
  getExpenseSuggestions,
  AIExpenseParseResult,
  AIExpenseSuggestions,
} from "@/lib/ai-expense-service";

interface AIExpenseChatProps {
  isOpen: boolean;
  onClose: () => void;
  onExpenseParsed: (result: AIExpenseParseResult) => void;
  jars: Array<{ _id: string; name: string; percentage: number; icon: string }>;
}

export default function AIExpenseChat({
  isOpen,
  onClose,
  onExpenseParsed,
  jars,
}: AIExpenseChatProps) {
  const [chatText, setChatText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIExpenseSuggestions | null>(
    null
  );
  const [lastResult, setLastResult] = useState<AIExpenseParseResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSuggestions();
      setChatText("");
      setLastResult(null);
      setError(null);
    }
  }, [isOpen]);

  const loadSuggestions = async () => {
    try {
      const data = await getExpenseSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  };

  const handleSubmit = async (text?: string) => {
    const textToProcess = text || chatText;
    if (!textToProcess.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await parseExpenseWithAI(textToProcess);
      setLastResult(result);

      // Hiển thị thông báo nếu sử dụng fallback mode
      if (result.confidence <= 70 && result.suggestions?.length > 0) {
        console.log("Using AI fallback mode - OpenAI API not available");
      }

      // Không tự động fill form nữa, để user xem kết quả và quyết định
      // if (result.confidence > 70 && result.amount && result.jarId) {
      //   onExpenseParsed(result);
      // }
    } catch (error: any) {
      console.error("Error parsing expense:", error);
      setError(error.message || "Có lỗi khi phân tích chi tiêu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatText(suggestion);
    handleSubmit(suggestion);
  };

  const handleUseResult = () => {
    if (lastResult) {
      onExpenseParsed(lastResult);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">🤖 AI Trợ lý Chi tiêu</CardTitle>
                <p className="text-purple-100 text-sm mt-1">
                  Nói về chi tiêu của bạn, AI sẽ tự động điền thông tin
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Suggestions */}
          {suggestions && suggestions.suggestions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Gợi ý nhanh:
                </span>
                {suggestions.fallback && (
                  <Badge variant="outline" className="text-xs">
                    AI không khả dụng
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs hover:bg-purple-50 hover:border-purple-300"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💬 Mô tả chi tiêu của bạn:
              </label>
              <div className="flex space-x-2">
                <Textarea
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder="Ví dụ: Tôi vừa mua cà phê 50k, Đổ xăng xe máy 100k, Ăn trưa với bạn 120k..."
                  rows={3}
                  className="flex-1 resize-none"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !chatText.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* AI Result */}
            {lastResult && (
              <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        🤖 Kết quả phân tích AI
                      </h3>
                      <p className="text-sm text-gray-600">
                        AI đã phân tích và tóm tắt chi tiêu của bạn
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-sm font-semibold px-3 py-1 ${
                      lastResult.confidence > 80
                        ? "text-green-700 border-green-400 bg-green-50"
                        : lastResult.confidence > 60
                        ? "text-yellow-700 border-yellow-400 bg-yellow-50"
                        : "text-red-700 border-red-400 bg-red-50"
                    }`}
                  >
                    {lastResult.confidence}% độ tin cậy
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm mb-6">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">
                      💰 Số tiền:
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        lastResult.amount ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {lastResult.amount
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(lastResult.amount)
                        : "❌ Chưa xác định"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">
                      🏺 Hũ chi tiêu:
                    </span>
                    <span
                      className={`font-bold ${
                        lastResult.jarName ? "text-blue-600" : "text-red-500"
                      }`}
                    >
                      {lastResult.jarName || "❌ Chưa xác định"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">📝 Mô tả:</span>
                    <span
                      className={`font-bold ${
                        lastResult.description
                          ? "text-gray-800"
                          : "text-red-500"
                      }`}
                    >
                      {lastResult.description || "❌ Chưa có"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-gray-600 font-medium">
                      🏷️ Danh mục:
                    </span>
                    <span
                      className={`font-bold ${
                        lastResult.category ? "text-purple-600" : "text-red-500"
                      }`}
                    >
                      {lastResult.category || "❌ Chưa xác định"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={handleUseResult}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3"
                    disabled={!lastResult.amount || !lastResult.jarId}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {lastResult.amount && lastResult.jarId
                      ? "✅ Sử dụng kết quả này"
                      : "❌ Thiếu thông tin"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setLastResult(null);
                      setChatText("");
                    }}
                    className="px-6 py-3 border-gray-300 hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Thử lại
                  </Button>
                </div>

                {/* Suggestions if available */}
                {lastResult.suggestions &&
                  lastResult.suggestions.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Gợi ý cải thiện:
                        </span>
                      </div>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {lastResult.suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span>•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        </CardContent>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>💡 Gõ Enter để gửi</span>
              <span>🎯 {jars.length} hũ có sẵn</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wand2 className="w-3 h-3" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
