"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/layouts/UserLayout";
import {
  Calendar,
  Target,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GitBranch,
  Plus,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-blue-800 mb-1">
                        {goalStats.total}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        Tổng mục tiêu
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-green-800 mb-1">
                        {goalStats.completed}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Hoàn thành
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <GitBranch className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-purple-800 mb-1">
                        {goalStats.inProgress}
                      </div>
                      <div className="text-sm text-purple-600 font-medium">
                        Đang thực hiện
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-4 lg:p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-orange-800 mb-1">
                        {goalStats.overallProgress}%
                      </div>
                      <div className="text-sm text-orange-600 font-medium">
                        Tiến độ tổng
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals Tree View */}
              {(() => {
                if (isLoadingGoals) {
                  return (
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <Card
                          key={`loading-${i}`}
                          className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border-blue-200/50 shadow-xl"
                        >
                          <CardContent className="p-6 lg:p-8">
                            <div className="flex items-start gap-6">
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                              </div>
                              <div className="flex-1 space-y-4">
                                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse"></div>
                                <div className="flex gap-3 mt-4">
                                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 animate-pulse"></div>
                                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20 animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  );
                }

                if (goals.length === 0) {
                  return (
                    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-12 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
                        <div className="relative z-10">
                          <div className="relative mb-8">
                            <div className="w-32 h-32 mx-auto relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl">
                                <Target className="w-16 h-16 text-blue-600" />
                              </div>
                              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                <Plus className="w-6 h-6 text-white" />
                              </div>
                              <div className="absolute top-2 right-8 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                              <div className="absolute bottom-4 left-6 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-1000"></div>
                            </div>
                          </div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                            Chưa có mục tiêu nào
                          </h3>
                          <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                            Hãy tạo mục tiêu đầu tiên để bắt đầu xây dựng cây
                            mục tiêu của bạn và theo dõi tiến độ!
                          </p>
                          <Link href="/admin/goals">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                              <Plus className="w-5 h-5 mr-2" />
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
                          <Card className="bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 backdrop-blur-sm border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 border-l-4 border-l-blue-500 group overflow-hidden">
                            <CardContent className="p-6 lg:p-8 relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              <div className="relative z-10">
                                <div className="flex items-start gap-4 lg:gap-6">
                                  {/* Tree Icon */}
                                  <div className="flex-shrink-0 mt-1">
                                    <div className="relative">
                                      <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                                      </div>
                                      {goal.subGoals &&
                                        goal.subGoals.length > 0 && (
                                          <div className="absolute -bottom-2 -right-2 w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                                            <GitBranch className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                                          </div>
                                        )}
                                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
                                    </div>
                                  </div>

                                  {/* Goal Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
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
                                                className="p-2 h-auto rounded-full hover:bg-blue-100 transition-all duration-300 hover:scale-110"
                                              >
                                                {expandedGoals.has(goal._id) ? (
                                                  <ChevronDown className="w-5 h-5 text-blue-600" />
                                                ) : (
                                                  <ChevronRight className="w-5 h-5 text-blue-600" />
                                                )}
                                              </Button>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed text-base">
                                          {goal.description}
                                        </p>

                                        {/* Progress Section */}
                                        {goal.subGoals &&
                                          goal.subGoals.length > 0 && (
                                            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border border-blue-100/50">
                                              <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-semibold text-gray-700">
                                                  Tiến độ hoàn thành
                                                </span>
                                                <span className="text-sm font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                                                  {getGoalProgress(goal)}%
                                                  <span className="text-gray-600 ml-1">
                                                    (
                                                    {
                                                      goal.subGoals.filter(
                                                        (sg) =>
                                                          sg.status ===
                                                          "Completed"
                                                      ).length
                                                    }
                                                    /{goal.subGoals.length})
                                                  </span>
                                                </span>
                                              </div>
                                              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                                                <div
                                                  className="h-4 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 shadow-lg"
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
                                        <div className="flex flex-wrap gap-3">
                                          <Badge
                                            className={`${getPriorityColor(
                                              goal.priority
                                            )} shadow-sm`}
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
                                            className={`${getStatusColor(
                                              goal.status
                                            )} shadow-sm`}
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
                                              className="border-blue-300 text-blue-700 bg-blue-50 shadow-sm"
                                            >
                                              <BookOpen className="w-3 h-3 mr-1" />
                                              {goal.category}
                                            </Badge>
                                          )}
                                          {goal.targetDate && (
                                            <Badge
                                              variant="outline"
                                              className="border-purple-300 text-purple-700 bg-purple-50 shadow-sm"
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
                              </div>
                            </CardContent>
                          </Card>

                          {/* Sub-goals Tree */}
                          {expandedGoals.has(goal._id) &&
                            goal.subGoals &&
                            goal.subGoals.length > 0 && (
                              <div className="relative mt-6 ml-8">
                                {/* Vertical Line */}
                                <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-gray-300 rounded-full shadow-sm"></div>

                                <div className="space-y-4">
                                  {goal.subGoals.map((subGoal, index) => (
                                    <div
                                      key={`${goal._id}-subgoal-${index}`}
                                      className="relative"
                                    >
                                      {/* Horizontal Line */}
                                      <div className="absolute left-3 top-8 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-sm"></div>

                                      {/* Sub-goal Card */}
                                      <div className="ml-8">
                                        <Card className="bg-gradient-to-r from-white to-gray-50/50 backdrop-blur-sm border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                                          <CardContent className="p-4 lg:p-5">
                                            <div className="flex items-start gap-4">
                                              {/* Sub-goal Status Icon */}
                                              <div className="flex-shrink-0 mt-1">
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() =>
                                                    updateSubGoal(
                                                      goal._id,
                                                      index,
                                                      {
                                                        ...subGoal,
                                                        status:
                                                          subGoal.status ===
                                                          "Completed"
                                                            ? "Not Started"
                                                            : "Completed",
                                                      }
                                                    )
                                                  }
                                                  className="p-2 h-auto rounded-full hover:bg-green-100 transition-all duration-300 hover:scale-110"
                                                >
                                                  {subGoal.status ===
                                                  "Completed" ? (
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                      <CheckCircle className="w-5 h-5 text-white" />
                                                    </div>
                                                  ) : (
                                                    <div className="w-8 h-8 border-3 border-gray-300 rounded-full flex items-center justify-center hover:border-green-400 transition-all duration-300 bg-white shadow-md">
                                                      <Circle className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                  )}
                                                </Button>
                                              </div>

                                              {/* Sub-goal Content */}
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                  <ArrowRight className="w-4 h-4 text-blue-500" />
                                                  <span
                                                    className={`font-semibold text-base ${
                                                      subGoal.status ===
                                                      "Completed"
                                                        ? "line-through text-gray-500"
                                                        : "text-gray-900 group-hover:text-blue-800 transition-colors duration-300"
                                                    }`}
                                                  >
                                                    {subGoal.title}
                                                  </span>
                                                  <Badge
                                                    className={`${getStatusColor(
                                                      subGoal.status
                                                    )} shadow-sm text-xs`}
                                                  >
                                                    {
                                                      statusOptions.find(
                                                        (s) =>
                                                          s.value ===
                                                          subGoal.status
                                                      )?.icon
                                                    }{" "}
                                                    {
                                                      statusOptions.find(
                                                        (s) =>
                                                          s.value ===
                                                          subGoal.status
                                                      )?.label
                                                    }
                                                  </Badge>
                                                </div>

                                                {subGoal.description && (
                                                  <p className="text-sm text-gray-600 mb-3 ml-7 leading-relaxed">
                                                    {subGoal.description}
                                                  </p>
                                                )}

                                                {subGoal.targetDate && (
                                                  <div className="flex items-center gap-2 ml-7">
                                                    <Calendar className="w-4 h-4 text-purple-500" />
                                                    <span className="text-sm text-purple-600 font-medium">
                                                      Hạn:{" "}
                                                      {new Date(
                                                        subGoal.targetDate
                                                      ).toLocaleDateString(
                                                        "vi-VN"
                                                      )}
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
            <div className="xl:col-span-1">
              <div className="lg:sticky lg:top-8 space-y-6"></div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
