"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/layouts/UserLayout";
import {
  Calendar,
  Clock,
  Target,
  Settings,
  Camera,
  Timer,
  Sun,
  Moon,
  Palette,
  Goal,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  Flag,
  TrendingUp,
  Award,
  Star,
  Zap,
  Trophy,
  Heart,
  BookOpen,
  Rocket,
  Sparkles,
  GitBranch,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  getGoals,
  updateGoal,
  type Goal as GoalType,
  type SubGoal,
} from "@/lib/goal-service";
import {
  getUserPreferences,
  updateUserPreferences,
  getQuotes,
  getUser,
  type Quote,
  type User,
  type UserPreferences,
} from "@/lib/user-service";

const colorThemes = [
  {
    name: "Blue",
    value: "blue",
    gradient: "from-gray-50 to-blue-50",
    primary: "blue",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-blue-600 text-white hover:bg-blue-700",
    accent: "text-blue-600",
    progressBg: "bg-blue-600",
  },
  {
    name: "Green",
    value: "green",
    gradient: "from-gray-50 to-green-50",
    primary: "green",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-green-600 text-white hover:bg-green-700",
    accent: "text-green-600",
    progressBg: "bg-green-600",
  },
  {
    name: "Purple",
    value: "purple",
    gradient: "from-gray-50 to-purple-50",
    primary: "purple",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-purple-600 text-white hover:bg-purple-700",
    accent: "text-purple-600",
    progressBg: "bg-purple-600",
  },
];

export default function GoalsPage() {
  const coverImages = [
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
  ];

  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]); // Default to blue
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());

  // API state
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);

  const motivationalQuotes = [
    "Mỗi ngày là một cơ hội mới để tiến gần hơn đến ước mơ của bạn",
    "Thành công bắt đầu từ việc dám ước mơ và hành động",
    "Không có gì là không thể khi bạn có quyết tâm và kiên trì",
    "Mục tiêu rõ ràng là la bàn dẫn lối cho hành trình thành công",
    "Hôm nay bạn có thể làm những điều mà ngày mai sẽ tự hào",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load user data from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoadingUser(true);
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        setUser({
          _id: "",
          name: "Nguyễn Văn A",
          role: "Lập trình viên & Học viên tiếng Nhật",
          goal: "JLPT N3",
          streak: 45,
          avatar: "/friendly-person-avatar.png",
          __v: 0,
        });
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (isMounted) {
      loadUser();
    }
  }, [isMounted]);

  // Load quotes from API
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setIsLoadingQuotes(true);
        const quotesData = await getQuotes();
        setQuotes(quotesData);
      } catch (error) {
        console.error("Failed to load quotes:", error);
      } finally {
        setIsLoadingQuotes(false);
      }
    };

    if (isMounted) {
      loadQuotes();
    }
  }, [isMounted]);

  // Load goals from API
  useEffect(() => {
    const loadGoals = async () => {
      try {
        setIsLoadingGoals(true);
        const goalsData = await getGoals();
        setGoals(goalsData);
      } catch (error) {
        console.error("Failed to load goals:", error);
      } finally {
        setIsLoadingGoals(false);
      }
    };

    if (isMounted) {
      loadGoals();
    }
  }, [isMounted]);

  // Load user preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefsData = await getUserPreferences();
        setPreferences(prefsData);
        if (prefsData.theme) {
          const themeIndex = colorThemes.findIndex(
            (t) => t.value === prefsData.theme
          );
          if (themeIndex >= 0) {
            setCurrentTheme(colorThemes[themeIndex]);
          }
        }
        if (prefsData.coverImage) {
          setCoverImage(prefsData.coverImage);
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      }
    };

    if (isMounted) {
      loadPreferences();
    }
  }, [isMounted]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIsDaytime(now.getHours() >= 6 && now.getHours() < 18);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const changeCoverImage = async () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length);
    const newImage = coverImages[randomIndex];
    setCoverImage(newImage);

    try {
      await updateUserPreferences({ coverImage: newImage });
    } catch (error) {
      console.error("Failed to save cover image preference:", error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayQuotes =
    quotes.length > 0 ? quotes.map((q) => q.text) : motivationalQuotes;

  const toggleGoalExpansion = (goalId: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedGoals(newExpanded);
  };

  const updateSubGoal = async (
    goalId: string,
    subGoalIndex: number,
    updatedSubGoal: SubGoal
  ) => {
    const goal = goals.find((g) => g._id === goalId);
    if (!goal) return;

    try {
      const updatedSubGoals = [...(goal.subGoals || [])];
      updatedSubGoals[subGoalIndex] = updatedSubGoal;

      const updatedGoal = await updateGoal(goalId, {
        subGoals: updatedSubGoals,
      });

      setGoals((prev) => prev.map((g) => (g._id === goalId ? updatedGoal : g)));
    } catch (error) {
      console.error("Failed to update sub-goal:", error);
    }
  };

  const getGoalProgress = (goal: GoalType) => {
    if (!goal.subGoals || goal.subGoals.length === 0) return 0;
    const completed = goal.subGoals.filter(
      (sg) => sg.status === "Completed"
    ).length;
    return Math.round((completed / goal.subGoals.length) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "On Hold":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Not Started":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const priorityOptions = [
    { value: "Low", label: "Thấp", icon: "●" },
    { value: "Medium", label: "Trung bình", icon: "●" },
    { value: "High", label: "Cao", icon: "●" },
  ];

  const statusOptions = [
    { value: "Not Started", label: "Chưa bắt đầu", icon: "○" },
    { value: "In Progress", label: "Đang thực hiện", icon: "◐" },
    { value: "On Hold", label: "Tạm dừng", icon: "⏸" },
    { value: "Completed", label: "Hoàn thành", icon: "✓" },
  ];

  // Calculate goal statistics
  const goalStats = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "Completed").length,
    inProgress: goals.filter((g) => g.status === "In Progress").length,
    notStarted: goals.filter((g) => g.status === "Not Started").length,
    overallProgress:
      goals.length > 0
        ? Math.round(
            (goals.filter((g) => g.status === "Completed").length /
              goals.length) *
              100
          )
        : 0,
  };

  if (!isMounted) {
    return null;
  }

  return (
    <UserLayout
      title="Mục Tiêu Của Tôi"
      description="Quản lý và theo dõi tiến độ mục tiêu"
      icon={<Target className="w-8 h-8 text-white" />}
      coverImage={coverImage}
      onCoverImageChange={changeCoverImage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className={currentTheme.cardBg}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {goalStats.total}
                </div>
                <div className="text-sm text-gray-600">Tổng mục tiêu</div>
              </CardContent>
            </Card>
            <Card className={currentTheme.cardBg}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {goalStats.completed}
                </div>
                <div className="text-sm text-gray-600">Hoàn thành</div>
              </CardContent>
            </Card>
            <Card className={currentTheme.cardBg}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {goalStats.inProgress}
                </div>
                <div className="text-sm text-gray-600">Đang thực hiện</div>
              </CardContent>
            </Card>
            <Card className={currentTheme.cardBg}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {goalStats.overallProgress}%
                </div>
                <div className="text-sm text-gray-600">Tiến độ tổng</div>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Quote */}
          <Card className={`${currentTheme.cardBg} mb-8`}>
            <CardContent className="p-6 text-center">
              <div className="text-lg text-gray-700 italic">
                "
                {
                  displayQuotes[
                    Math.floor(Math.random() * displayQuotes.length)
                  ]
                }
                "
              </div>
            </CardContent>
          </Card>

          {/* Goals Tree View */}
          {(() => {
            if (isLoadingGoals) {
              return (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={`loading-${i}`} className={currentTheme.cardBg}>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            }

            if (goals.length === 0) {
              return (
                <Card className={currentTheme.cardBg}>
                  <CardContent className="p-12 text-center">
                    <div className="relative">
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                          <Target className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Chưa có mục tiêu nào
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Hãy tạo mục tiêu đầu tiên để bắt đầu xây dựng cây mục
                        tiêu của bạn!
                      </p>
                      <Link href="/admin/goals">
                        <Button className={currentTheme.button}>
                          <Plus className="w-4 h-4 mr-2" />
                          Tạo mục tiêu đầu tiên
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            }

            return (
              <div className="space-y-8">
                {goals.map((goal, goalIndex) => (
                  <div key={goal._id} className="relative">
                    {/* Tree structure */}
                    <div className="relative">
                      {/* Main Goal Card */}
                      <Card
                        className={`${currentTheme.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Tree Icon */}
                            <div className="flex-shrink-0 mt-1">
                              <div className="relative">
                                <div
                                  className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg`}
                                >
                                  <Target className="w-5 h-5 text-white" />
                                </div>
                                {goal.subGoals && goal.subGoals.length > 0 && (
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <GitBranch className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Goal Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 truncate">
                                      {goal.title}
                                    </h3>
                                    {goal.subGoals &&
                                      goal.subGoals.length > 0 && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            toggleGoalExpansion(goal._id)
                                          }
                                          className="p-1 h-auto rounded-full hover:bg-blue-100"
                                        >
                                          {expandedGoals.has(goal._id) ? (
                                            <ChevronDown className="w-4 h-4 text-blue-600" />
                                          ) : (
                                            <ChevronRight className="w-4 h-4 text-blue-600" />
                                          )}
                                        </Button>
                                      )}
                                  </div>
                                  <p className="text-gray-600 mb-4 leading-relaxed">
                                    {goal.description}
                                  </p>

                                  {/* Progress Section */}
                                  {goal.subGoals &&
                                    goal.subGoals.length > 0 && (
                                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-700">
                                            Tiến độ hoàn thành
                                          </span>
                                          <span className="text-sm font-bold text-gray-900">
                                            {getGoalProgress(goal)}%
                                            <span className="text-gray-500 ml-1">
                                              (
                                              {
                                                goal.subGoals.filter(
                                                  (sg) =>
                                                    sg.status === "Completed"
                                                ).length
                                              }
                                              /{goal.subGoals.length})
                                            </span>
                                          </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                          <div
                                            className={`h-3 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-blue-600`}
                                            style={{
                                              width: `${getGoalProgress(
                                                goal
                                              )}%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )}

                                  {/* Badges */}
                                  <div className="flex flex-wrap gap-2">
                                    <Badge
                                      className={getPriorityColor(
                                        goal.priority
                                      )}
                                    >
                                      {
                                        priorityOptions.find(
                                          (p) => p.value === goal.priority
                                        )?.icon
                                      }{" "}
                                      {
                                        priorityOptions.find(
                                          (p) => p.value === goal.priority
                                        )?.label
                                      }
                                    </Badge>
                                    <Badge
                                      className={getStatusColor(goal.status)}
                                    >
                                      {
                                        statusOptions.find(
                                          (s) => s.value === goal.status
                                        )?.icon
                                      }{" "}
                                      {
                                        statusOptions.find(
                                          (s) => s.value === goal.status
                                        )?.label
                                      }
                                    </Badge>
                                    {goal.category && (
                                      <Badge
                                        variant="outline"
                                        className="border-gray-300"
                                      >
                                        <BookOpen className="w-3 h-3 mr-1" />
                                        {goal.category}
                                      </Badge>
                                    )}
                                    {goal.targetDate && (
                                      <Badge
                                        variant="outline"
                                        className="border-blue-300 text-blue-700"
                                      >
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(
                                          goal.targetDate
                                        ).toLocaleDateString("vi-VN")}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Sub-goals Tree */}
                      {expandedGoals.has(goal._id) &&
                        goal.subGoals &&
                        goal.subGoals.length > 0 && (
                          <div className="relative mt-4 ml-8">
                            {/* Vertical Line */}
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-gray-300"></div>

                            <div className="space-y-3">
                              {goal.subGoals.map((subGoal, index) => (
                                <div
                                  key={`${goal._id}-subgoal-${index}`}
                                  className="relative"
                                >
                                  {/* Horizontal Line */}
                                  <div className="absolute left-2 top-6 w-6 h-0.5 bg-gray-300"></div>

                                  {/* Sub-goal Card */}
                                  <div className="ml-8">
                                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                                      <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                          {/* Sub-goal Status Icon */}
                                          <div className="flex-shrink-0 mt-0.5">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                updateSubGoal(goal._id, index, {
                                                  ...subGoal,
                                                  status:
                                                    subGoal.status ===
                                                    "Completed"
                                                      ? "Not Started"
                                                      : "Completed",
                                                })
                                              }
                                              className="p-1 h-auto rounded-full hover:bg-green-100"
                                            >
                                              {subGoal.status ===
                                              "Completed" ? (
                                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                  <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                              ) : (
                                                <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-green-400 transition-colors">
                                                  <Circle className="w-4 h-4 text-gray-400" />
                                                </div>
                                              )}
                                            </Button>
                                          </div>

                                          {/* Sub-goal Content */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <ArrowRight className="w-3 h-3 text-gray-400" />
                                              <span
                                                className={`font-medium ${
                                                  subGoal.status === "Completed"
                                                    ? "line-through text-gray-500"
                                                    : "text-gray-900"
                                                }`}
                                              >
                                                {subGoal.title}
                                              </span>
                                              <Badge
                                                className={getStatusColor(
                                                  subGoal.status
                                                )}
                                                variant="secondary"
                                              >
                                                {
                                                  statusOptions.find(
                                                    (s) =>
                                                      s.value === subGoal.status
                                                  )?.icon
                                                }
                                              </Badge>
                                            </div>

                                            {subGoal.description && (
                                              <p className="text-sm text-gray-600 mb-2 ml-5">
                                                {subGoal.description}
                                              </p>
                                            )}

                                            {subGoal.targetDate && (
                                              <div className="flex items-center gap-1 ml-5">
                                                <Calendar className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                  Hạn:{" "}
                                                  {new Date(
                                                    subGoal.targetDate
                                                  ).toLocaleDateString("vi-VN")}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-6"></div>
        </div>
      </div>
    </UserLayout>
  );
}
