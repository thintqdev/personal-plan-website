"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  PenTool,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  FileText,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  BookOpen,
  FileText as FileTextIcon,
} from "lucide-react";

type GrammarPoint = {
  structure: string;
  combinations: string[];
  usages: Array<{
    meaning: string;
    examples: Array<{
      jp: string;
      vi: string;
    }>;
  }>;
};

type GrammarTopic = {
  title: string;
  grammarPoints: GrammarPoint[];
};

type GrammarPart = {
  name: string;
  topics: GrammarTopic[];
};

type GrammarItem = {
  id: number;
  title: string;
  level: string;
  type: string;
  questions: number;
  lastUpdated: string;
  part?: GrammarPart;
  topic?: GrammarTopic;
  grammarPoint?: GrammarPoint;
};

type ModalType =
  | "add"
  | "view"
  | "edit"
  | "delete"
  | "addPart"
  | "editPart"
  | "deletePart"
  | "addTopic"
  | "editTopic"
  | "deleteTopic"
  | "addGrammar"
  | "editGrammar"
  | "deleteGrammar"
  | "viewGrammar"
  | null;

export default function GrammarAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType>(null);
  const [expandedParts, setExpandedParts] = useState<Set<string>>(
    new Set(["0"])
  );
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(
    new Set(["0-0", "0-1"])
  );
  const [selectedItem, setSelectedItem] = useState<GrammarItem | null>(null);
  const [selectedType, setSelectedType] = useState<GrammarPart | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [selectedGrammarPoint, setSelectedGrammarPoint] =
    useState<GrammarPoint | null>(null);
  const [formData, setFormData] = useState<Partial<GrammarItem>>({
    title: "",
    level: "N5",
    type: "",
    questions: 0,
  });
  const [typeFormData, setTypeFormData] = useState<Partial<GrammarPart>>({
    name: "",
    topics: [],
  });
  const [topicFormData, setTopicFormData] = useState<Partial<GrammarTopic>>({
    title: "",
    grammarPoints: [],
  });
  const [grammarFormData, setGrammarFormData] = useState<Partial<GrammarPoint>>(
    {
      structure: "",
      combinations: [],
      usages: [],
    }
  );

  const grammarParts = [
    {
      name: "Phần I: Ngữ pháp trong câu",
      topics: [
        {
          title: "Liên kết câu",
          grammarPoints: [
            {
              structure: "～うちに",
              combinations: [
                "Nの + うちに",
                "Vる + うちに",
                "Vている + うちに",
                "Aい + うちに",
                "Aな + うちに",
              ],
              usages: [
                {
                  meaning:
                    "Trong khi còn (trạng thái/khoảng thời gian) thì làm ~ trước khi thay đổi.",
                  examples: [
                    {
                      jp: "日本にいるうちに、一度富士山に登りたい。",
                      vi: "Trong khi còn ở Nhật, tôi muốn leo núi Phú Sĩ một lần.",
                    },
                    {
                      jp: "若いうちに勉強しておいたほうがいい。",
                      vi: "Trong khi còn trẻ nên học trước thì tốt hơn.",
                    },
                  ],
                },
                {
                  meaning:
                    "Trong khi đang ~ thì (tự nhiên) xảy ra sự thay đổi.",
                  examples: [
                    {
                      jp: "話しているうちに、時間があっという間に過ぎた。",
                      vi: "Trong lúc đang nói chuyện thì thời gian trôi qua lúc nào không hay.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～間に",
              combinations: ["Nの + 間に", "Vている + 間に"],
              usages: [
                {
                  meaning: "Trong khoảng (kéo dài), một hành động ngắn xảy ra.",
                  examples: [
                    {
                      jp: "お母さんが昼寝している間に、子どもたちは外で遊んだ。",
                      vi: "Trong lúc mẹ ngủ trưa, bọn trẻ chơi ở ngoài.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～ながら",
              combinations: ["Vている + ながら"],
              usages: [
                {
                  meaning: "Trong khi ~ (đồng thời)",
                  examples: [
                    {
                      jp: "音楽を聞きながら、勉強する。",
                      vi: "Học trong khi nghe nhạc.",
                    },
                    {
                      jp: "歩きながら、電話をする。",
                      vi: "Đi bộ trong khi nói điện thoại.",
                    },
                    {
                      jp: "コーヒーを飲みながら、話す。",
                      vi: "Nói chuyện trong khi uống cà phê.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Nguyên nhân và kết quả",
          grammarPoints: [
            {
              structure: "～ので",
              combinations: [
                "Vる/ない + ので",
                "Aい/くない + ので",
                "Aな/ではない + ので",
                "N/ではない + ので",
              ],
              usages: [
                {
                  meaning: "Vì ~ nên... (lý do khách quan)",
                  examples: [
                    {
                      jp: "雨が降っているので、傘を持って行きます。",
                      vi: "Vì trời mưa nên tôi sẽ mang ô.",
                    },
                    {
                      jp: "時間がなかったので、行きませんでした。",
                      vi: "Vì không có thời gian nên tôi không đi.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～から",
              combinations: [
                "Vる/ない + から",
                "Aい/くない + から",
                "Aな/ではない + から",
                "N/ではない + から",
              ],
              usages: [
                {
                  meaning: "Vì ~ nên... (lý do trực tiếp)",
                  examples: [
                    {
                      jp: "明日テストがあるから、勉強します。",
                      vi: "Vì ngày mai có bài kiểm tra nên tôi học bài.",
                    },
                    {
                      jp: "お腹が空いたから、食べます。",
                      vi: "Vì đói bụng nên tôi ăn.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～ために",
              combinations: ["Vる + ために", "Nの + ために"],
              usages: [
                {
                  meaning: "Để làm ~ (mục đích)",
                  examples: [
                    {
                      jp: "日本へ行くために、お金を貯めています。",
                      vi: "Để đi Nhật, tôi đang tích tiền.",
                    },
                    {
                      jp: "健康のために、毎日運動します。",
                      vi: "Để có sức khỏe, tôi tập thể dục mỗi ngày.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "So sánh và tương phản",
          grammarPoints: [
            {
              structure: "～より",
              combinations: ["N + より"],
              usages: [
                {
                  meaning: "~ hơn ...",
                  examples: [
                    {
                      jp: "東京より、大阪のほうが好きです。",
                      vi: "Tôi thích Osaka hơn Tokyo.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～ほど～ない",
              combinations: ["～ほど + N + が + Vない"],
              usages: [
                {
                  meaning: "Không ~ đến mức ...",
                  examples: [
                    {
                      jp: "日本語が上手なほど、話せません。",
                      vi: "Tôi không nói tiếng Nhật giỏi đến mức đó.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Phần II: Cách tổ chức câu",
      topics: [
        {
          title: "Câu phức",
          grammarPoints: [
            {
              structure: "～ても",
              combinations: ["Vて + も"],
              usages: [
                {
                  meaning: "Mặc dù ~ nhưng vẫn ...",
                  examples: [
                    {
                      jp: "雨が降っても、行きます。",
                      vi: "Mặc dù mưa nhưng tôi vẫn đi.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～ば～ほど",
              combinations: ["Vば + Vば + ほど"],
              usages: [
                {
                  meaning: "Càng ~ thì càng ...",
                  examples: [
                    {
                      jp: "勉強すればするほど、わからなくなる。",
                      vi: "Càng học thì càng không hiểu.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Câu điều kiện",
          grammarPoints: [
            {
              structure: "～たら",
              combinations: ["Vたら", "Aかったら", "Aなら"],
              usages: [
                {
                  meaning: "Nếu ~ thì ...",
                  examples: [
                    {
                      jp: "雨が降ったら、家にいます。",
                      vi: "Nếu mưa thì tôi ở nhà.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～と",
              combinations: ["Vると"],
              usages: [
                {
                  meaning: "Khi ~ thì (tự nhiên) ...",
                  examples: [
                    {
                      jp: "ボタンを押すと、ドアが開く。",
                      vi: "Khi nhấn nút thì cửa mở.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Câu phủ định",
          grammarPoints: [
            {
              structure: "～ないで",
              combinations: ["Vない + で"],
              usages: [
                {
                  meaning: "Không ~ mà ...",
                  examples: [
                    {
                      jp: "傘を持たないで、出かけました。",
                      vi: "Không mang ô mà đi ra ngoài.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Phần III: Ứng dụng thực tế",
      topics: [
        {
          title: "Thời gian và tần suất",
          grammarPoints: [
            {
              structure: "～ごとに",
              combinations: ["N + ごとに"],
              usages: [
                {
                  meaning: "Mỗi ~ một lần",
                  examples: [
                    {
                      jp: "一時間ごとに、休憩します。",
                      vi: "Mỗi giờ nghỉ ngơi một lần.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～つもり",
              combinations: ["Vる + つもり", "Vない + つもり"],
              usages: [
                {
                  meaning: "Có ý định ~",
                  examples: [
                    {
                      jp: "明日、買い物に行くつもりです。",
                      vi: "Ngày mai tôi có ý định đi mua sắm.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Ý kiến và suy nghĩ",
          grammarPoints: [
            {
              structure: "～と思う",
              combinations: ["～と + 思う"],
              usages: [
                {
                  meaning: "Nghĩ rằng ~",
                  examples: [
                    {
                      jp: "この映画は面白いと思います。",
                      vi: "Tôi nghĩ bộ phim này thú vị.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～みたい",
              combinations: [
                "Vる + みたい",
                "Aい + みたい",
                "Aな + みたい",
                "N + みたい",
              ],
              usages: [
                {
                  meaning: "Có vẻ như ~",
                  examples: [
                    {
                      jp: "雨が降りそうなみたいです。",
                      vi: "Có vẻ như sắp mưa.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Lời khuyên và đề nghị",
          grammarPoints: [
            {
              structure: "～たらどうですか",
              combinations: ["Vたら + どうですか"],
              usages: [
                {
                  meaning: "Thử ~ xem sao?",
                  examples: [
                    {
                      jp: "薬を飲んだらどうですか。",
                      vi: "Thử uống thuốc xem sao?",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～ほうがいい",
              combinations: ["Vる + ほうがいい"],
              usages: [
                {
                  meaning: "~ thì tốt hơn",
                  examples: [
                    {
                      jp: "早く寝るほうがいいですよ。",
                      vi: "Ngủ sớm thì tốt hơn đấy.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Phần IV: Ngữ pháp nâng cao",
      topics: [
        {
          title: "Biểu đạt lịch sự",
          grammarPoints: [
            {
              structure: "～ております",
              combinations: ["Vて + おります"],
              usages: [
                {
                  meaning: "Đang ~ (lịch sự)",
                  examples: [
                    {
                      jp: "ただいま、お待ちしております。",
                      vi: "Bây giờ đang đợi quý khách.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～てまいりました",
              combinations: ["Vて + まいりました"],
              usages: [
                {
                  meaning: "Đã ~ (lịch sự)",
                  examples: [
                    {
                      jp: "お世話になってまいりました。",
                      vi: "Đã được quý công ty chiếu cố nhiều.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Biểu đạt gián tiếp",
          grammarPoints: [
            {
              structure: "～ということ",
              combinations: ["～と + いうこと"],
              usages: [
                {
                  meaning: "Việc ~",
                  examples: [
                    {
                      jp: "彼が来ないということです。",
                      vi: "Là việc anh ấy không đến.",
                    },
                  ],
                },
              ],
            },
            {
              structure: "～そうです",
              combinations: ["～そう + です"],
              usages: [
                {
                  meaning: "Nghe nói ~",
                  examples: [
                    {
                      jp: "明日は雨が降るそうです。",
                      vi: "Nghe nói ngày mai mưa.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const openModal = (
    type: ModalType,
    item?: GrammarItem,
    grammarPart?: GrammarPart,
    grammarTopic?: GrammarTopic,
    grammarPoint?: GrammarPoint
  ) => {
    setModalType(type);
    if (item) {
      setSelectedItem(item);
      if (type === "edit") {
        setFormData(item);
      }
    } else if (grammarPart) {
      setSelectedType(grammarPart);
      if (type === "editPart") {
        setTypeFormData(grammarPart);
      }
    } else if (grammarTopic) {
      setSelectedTopic(grammarTopic);
      if (type === "editTopic") {
        setTopicFormData(grammarTopic);
      }
    } else if (grammarPoint) {
      setSelectedGrammarPoint(grammarPoint);
      if (type === "editGrammar") {
        setGrammarFormData(grammarPoint);
      }
    } else {
      setSelectedItem(null);
      setSelectedType(null);
      setSelectedTopic(null);
      setSelectedGrammarPoint(null);
      setFormData({
        title: "",
        level: "N5",
        type: "",
        questions: 0,
      });
      setTypeFormData({
        name: "",
        topics: [],
      });
      setTopicFormData({
        title: "",
        grammarPoints: [],
      });
      setGrammarFormData({
        structure: "",
        combinations: [],
        usages: [],
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    setSelectedType(null);
    setSelectedTopic(null);
    setSelectedGrammarPoint(null);
    setFormData({
      title: "",
      level: "N5",
      type: "",
      questions: 0,
    });
    setTypeFormData({
      name: "",
      topics: [],
    });
    setTopicFormData({
      title: "",
      grammarPoints: [],
    });
    setGrammarFormData({
      structure: "",
      combinations: [],
      usages: [],
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Submitting:", formData);
    closeModal();
  };

  const handleDelete = () => {
    // Handle delete here
    console.log("Deleting:", selectedItem);
    closeModal();
  };

  const handleTypeInputChange = (field: string, value: any) => {
    setTypeFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTypeSubmit = () => {
    // Handle part form submission here
    console.log("Submitting part:", typeFormData);
    closeModal();
  };

  const handleTypeDelete = () => {
    // Handle part delete here
    console.log("Deleting part:", selectedType);
    closeModal();
  };

  const handleTopicInputChange = (field: string, value: any) => {
    setTopicFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTopicSubmit = () => {
    // Handle topic form submission here
    console.log("Submitting topic:", topicFormData);
    closeModal();
  };

  const handleTopicDelete = () => {
    // Handle topic delete here
    console.log("Deleting topic:", selectedTopic);
    closeModal();
  };

  const handleGrammarInputChange = (field: string, value: any) => {
    setGrammarFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGrammarSubmit = () => {
    // Handle grammar form submission here
    console.log("Submitting grammar:", grammarFormData);
    closeModal();
  };

  const togglePartExpansion = (partIndex: number) => {
    const key = partIndex.toString();
    const newExpanded = new Set(expandedParts);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedParts(newExpanded);
  };

  const toggleTopicExpansion = (partIndex: number, topicIndex: number) => {
    const key = `${partIndex}-${topicIndex}`;
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedTopics(newExpanded);
  };

  const handleGrammarDelete = () => {
    // Handle grammar delete here
    console.log("Deleting grammar:", selectedGrammarPoint);
    closeModal();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/study/admin/language"
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Ngữ pháp
          </h1>
          <p className="text-gray-600">Tạo và quản lý cấu trúc ngữ pháp</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng phần ngữ pháp</p>
              <p className="text-2xl font-bold text-gray-900">
                {grammarParts.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng chủ đề</p>
              <p className="text-2xl font-bold text-gray-900">
                {grammarParts.reduce(
                  (total, part) => total + part.topics.length,
                  0
                )}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <PenTool className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng điểm ngữ pháp</p>
              <p className="text-2xl font-bold text-gray-900">
                {grammarParts.reduce(
                  (total, part) =>
                    total +
                    part.topics.reduce(
                      (topicTotal, topic) =>
                        topicTotal + topic.grammarPoints.length,
                      0
                    ),
                  0
                )}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <PenTool className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ví dụ ngữ pháp</p>
              <p className="text-2xl font-bold text-gray-900">
                {grammarParts.reduce(
                  (total, part) =>
                    total +
                    part.topics.reduce(
                      (topicTotal, topic) =>
                        topicTotal +
                        topic.grammarPoints.reduce(
                          (pointTotal, point) =>
                            pointTotal +
                            point.usages.reduce(
                              (usageTotal, usage) =>
                                usageTotal + usage.examples.length,
                              0
                            ),
                          0
                        ),
                      0
                    ),
                  0
                )}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Grammar Structure */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Cấu trúc ngữ pháp
            </h3>
            <button
              onClick={() => openModal("addPart")}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              {grammarParts.map((part, partIndex) => {
                const partKey = partIndex.toString();
                const isPartExpanded = expandedParts.has(partKey);

                return (
                  <div key={partIndex} className="select-none">
                    {/* Part Node */}
                    <div
                      className="flex items-center gap-2 p-2 hover:bg-white/50 rounded cursor-pointer transition-colors group"
                      onClick={() => togglePartExpansion(partIndex)}
                    >
                      <div className="flex items-center justify-center w-5 h-5">
                        {isPartExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          {part.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {part.topics.length} chủ đề
                        </span>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal("addTopic", undefined, part);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          title="Thêm chủ đề"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal("editPart", undefined, part);
                          }}
                          className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal("deletePart", undefined, part);
                          }}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Xóa"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Part Children */}
                    {isPartExpanded && (
                      <div className="ml-6 border-l border-gray-300 pl-4 space-y-1">
                        {part.topics.length > 0 ? (
                          part.topics.map((topic, topicIndex) => {
                            const topicKey = `${partIndex}-${topicIndex}`;
                            const isTopicExpanded =
                              expandedTopics.has(topicKey);

                            return (
                              <div key={topicIndex}>
                                {/* Topic Node */}
                                <div
                                  className="flex items-center gap-2 p-2 hover:bg-white/50 rounded cursor-pointer transition-colors group"
                                  onClick={() =>
                                    toggleTopicExpansion(partIndex, topicIndex)
                                  }
                                >
                                  <div className="flex items-center justify-center w-4 h-4">
                                    {isTopicExpanded ? (
                                      <ChevronDown className="w-3 h-3 text-gray-500" />
                                    ) : (
                                      <ChevronRight className="w-3 h-3 text-gray-500" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-800">
                                      {topic.title}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                      {topic.grammarPoints.length} điểm
                                    </span>
                                  </div>
                                  <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(
                                          "addGrammar",
                                          undefined,
                                          part,
                                          topic
                                        );
                                      }}
                                      className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                      title="Thêm điểm ngữ pháp"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(
                                          "editTopic",
                                          undefined,
                                          part,
                                          topic
                                        );
                                      }}
                                      className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                                      title="Chỉnh sửa"
                                    >
                                      <Edit className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(
                                          "deleteTopic",
                                          undefined,
                                          part,
                                          topic
                                        );
                                      }}
                                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                      title="Xóa"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>

                                {/* Topic Children */}
                                {isTopicExpanded && (
                                  <div className="ml-6 border-l border-gray-200 pl-4 space-y-1">
                                    {topic.grammarPoints.map(
                                      (point, pointIndex) => (
                                        <div
                                          key={pointIndex}
                                          className="flex items-center gap-2 p-2 hover:bg-white/50 rounded cursor-pointer transition-colors group"
                                        >
                                          <div className="flex items-center gap-2 flex-1">
                                            <FileTextIcon className="w-4 h-4 text-green-600" />
                                            <span className="text-gray-700 font-medium">
                                              {point.structure}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              {point.usages.length} cách dùng
                                            </span>
                                          </div>
                                          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(
                                                  "viewGrammar",
                                                  undefined,
                                                  part,
                                                  topic,
                                                  point
                                                );
                                              }}
                                              className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                              title="Xem chi tiết"
                                            >
                                              <Eye className="w-3 h-3" />
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(
                                                  "editGrammar",
                                                  undefined,
                                                  part,
                                                  topic,
                                                  point
                                                );
                                              }}
                                              className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                                              title="Chỉnh sửa"
                                            >
                                              <Edit className="w-3 h-3" />
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(
                                                  "deleteGrammar",
                                                  undefined,
                                                  part,
                                                  topic,
                                                  point
                                                );
                                              }}
                                              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                              title="Xóa"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="ml-6 pl-4 py-4 text-center text-gray-500">
                            <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Chưa có chủ đề nào</p>
                            <button
                              onClick={() =>
                                openModal("addTopic", undefined, part)
                              }
                              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Thêm chủ đề đầu tiên
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm bài tập ngữ pháp mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề bài tập
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ví dụ: Hiện tại đơn với động từ to be"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phần ngữ pháp
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Chọn phần ngữ pháp</option>
                    {grammarParts.map((part) => (
                      <option key={part.name} value={part.name}>
                        {part.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cấp độ JLPT
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số câu hỏi
                </label>
                <input
                  type="number"
                  value={formData.questions}
                  onChange={(e) =>
                    handleInputChange(
                      "questions",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ví dụ: 15"
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Tạo bài tập
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "view" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chi tiết bài tập ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedItem.title}
                </div>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {selectedItem.level}
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {selectedItem.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Số câu hỏi</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedItem.questions}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    Cập nhật lần cuối
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedItem.lastUpdated}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "edit" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa bài tập ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề bài tập
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phần ngữ pháp
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Chọn phần ngữ pháp</option>
                    {grammarParts.map((part) => (
                      <option key={part.name} value={part.name}>
                        {part.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cấp độ JLPT
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số câu hỏi
                </label>
                <input
                  type="number"
                  value={formData.questions}
                  onChange={(e) =>
                    handleInputChange(
                      "questions",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "delete" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa bài tập ngữ pháp
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa bài tập "{selectedItem.title}" không?
                Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Part Modals */}
      {modalType === "addPart" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm phần ngữ pháp mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên phần
                </label>
                <input
                  type="text"
                  value={typeFormData.name}
                  onChange={(e) =>
                    handleTypeInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ví dụ: Phần I: Ngữ pháp trong câu"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleTypeSubmit}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "view" && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chi tiết phần ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên phần
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {selectedType.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số chủ đề
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                  {selectedType.topics.length}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <div className="space-y-2">
                  {selectedType.topics.length > 0 ? (
                    selectedType.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900"
                      >
                        {topic.title} ({topic.grammarPoints.length} điểm ngữ
                        pháp)
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-500 italic">
                      Chưa có chủ đề nào
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "editPart" && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa phần ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên phần
                </label>
                <input
                  type="text"
                  value={typeFormData.name}
                  onChange={(e) =>
                    handleTypeInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleTypeSubmit}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "deletePart" && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa phần ngữ pháp
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa phần "{selectedType.name}" không? Tất
                cả chủ đề và điểm ngữ pháp trong phần này sẽ bị ảnh hưởng.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleTypeDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topic Modals */}
      {modalType === "addTopic" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm chủ đề ngữ pháp mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ đề
                </label>
                <input
                  type="text"
                  value={topicFormData.title}
                  onChange={(e) =>
                    handleTopicInputChange("title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Liên kết câu"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleTopicSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Thêm chủ đề
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "editTopic" && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa chủ đề ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ đề
                </label>
                <input
                  type="text"
                  value={topicFormData.title}
                  onChange={(e) =>
                    handleTopicInputChange("title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleTopicSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "deleteTopic" && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa chủ đề ngữ pháp
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa chủ đề "{selectedTopic.title}" không?
                Tất cả điểm ngữ pháp trong chủ đề này sẽ bị ảnh hưởng.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleTopicDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grammar Point Modals */}
      {modalType === "addGrammar" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm điểm ngữ pháp mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấu trúc ngữ pháp
                </label>
                <input
                  type="text"
                  value={grammarFormData.structure}
                  onChange={(e) =>
                    handleGrammarInputChange("structure", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ví dụ: ～うちに"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cách kết hợp
                </label>
                <textarea
                  value={grammarFormData.combinations?.join("\n")}
                  onChange={(e) =>
                    handleGrammarInputChange(
                      "combinations",
                      e.target.value.split("\n").filter((line) => line.trim())
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ví dụ: Nの + うちに&#10;Vる + うちに"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cách sử dụng
                </label>
                <div className="space-y-4">
                  {grammarFormData.usages?.map((usage, usageIndex) => (
                    <div
                      key={usageIndex}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Cách dùng {usageIndex + 1}
                        </span>
                        <button
                          onClick={() => {
                            const newUsages = grammarFormData.usages?.filter(
                              (_, i) => i !== usageIndex
                            );
                            handleGrammarInputChange("usages", newUsages);
                          }}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Xóa cách dùng này"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Nghĩa
                          </label>
                          <input
                            type="text"
                            value={usage.meaning}
                            onChange={(e) => {
                              const newUsages = [
                                ...(grammarFormData.usages || []),
                              ];
                              newUsages[usageIndex] = {
                                ...usage,
                                meaning: e.target.value,
                              };
                              handleGrammarInputChange("usages", newUsages);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            placeholder="Ví dụ: Trong khi còn (trạng thái/khoảng thời gian) thì làm ~ trước khi thay đổi."
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-2">
                            Ví dụ
                          </label>
                          <div className="space-y-2">
                            {usage.examples.map((example, exampleIndex) => (
                              <div key={exampleIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  value={example.jp}
                                  onChange={(e) => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples[
                                      exampleIndex
                                    ] = {
                                      ...example,
                                      jp: e.target.value,
                                    };
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                  placeholder="Câu tiếng Nhật"
                                />
                                <input
                                  type="text"
                                  value={example.vi}
                                  onChange={(e) => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples[
                                      exampleIndex
                                    ] = {
                                      ...example,
                                      vi: e.target.value,
                                    };
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                  placeholder="Dịch tiếng Việt"
                                />
                                <button
                                  onClick={() => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples =
                                      usage.examples.filter(
                                        (_, i) => i !== exampleIndex
                                      );
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                  title="Xóa ví dụ này"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newUsages = [
                                  ...(grammarFormData.usages || []),
                                ];
                                newUsages[usageIndex].examples.push({
                                  jp: "",
                                  vi: "",
                                });
                                handleGrammarInputChange("usages", newUsages);
                              }}
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Thêm ví dụ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newUsages = [
                        ...(grammarFormData.usages || []),
                        {
                          meaning: "",
                          examples: [{ jp: "", vi: "" }],
                        },
                      ];
                      handleGrammarInputChange("usages", newUsages);
                    }}
                    className="w-full py-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:text-green-800 hover:border-green-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm cách dùng mới
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGrammarSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Thêm ngữ pháp
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "viewGrammar" && selectedGrammarPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chi tiết điểm ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  {selectedGrammarPoint.structure}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cách kết hợp
                </h3>
                <div className="space-y-2">
                  {selectedGrammarPoint.combinations.map(
                    (combination, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900"
                      >
                        {combination}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cách sử dụng
                </h3>
                <div className="space-y-4">
                  {selectedGrammarPoint.usages.map((usage, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="font-medium text-gray-900 mb-3">
                        {usage.meaning}
                      </div>
                      <div className="space-y-2">
                        {usage.examples.map((example, exIndex) => (
                          <div
                            key={exIndex}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <div className="text-green-700 font-medium mb-1">
                              {example.jp}
                            </div>
                            <div className="text-gray-600">{example.vi}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "editGrammar" && selectedGrammarPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa điểm ngữ pháp
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấu trúc ngữ pháp
                </label>
                <input
                  type="text"
                  value={grammarFormData.structure}
                  onChange={(e) =>
                    handleGrammarInputChange("structure", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cách kết hợp
                </label>
                <textarea
                  value={grammarFormData.combinations?.join("\n")}
                  onChange={(e) =>
                    handleGrammarInputChange(
                      "combinations",
                      e.target.value.split("\n").filter((line) => line.trim())
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cách sử dụng
                </label>
                <div className="space-y-4">
                  {grammarFormData.usages?.map((usage, usageIndex) => (
                    <div
                      key={usageIndex}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Cách dùng {usageIndex + 1}
                        </span>
                        <button
                          onClick={() => {
                            const newUsages = grammarFormData.usages?.filter(
                              (_, i) => i !== usageIndex
                            );
                            handleGrammarInputChange("usages", newUsages);
                          }}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Xóa cách dùng này"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">
                            Nghĩa
                          </label>
                          <input
                            type="text"
                            value={usage.meaning}
                            onChange={(e) => {
                              const newUsages = [
                                ...(grammarFormData.usages || []),
                              ];
                              newUsages[usageIndex] = {
                                ...usage,
                                meaning: e.target.value,
                              };
                              handleGrammarInputChange("usages", newUsages);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-600 mb-2">
                            Ví dụ
                          </label>
                          <div className="space-y-2">
                            {usage.examples.map((example, exampleIndex) => (
                              <div key={exampleIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  value={example.jp}
                                  onChange={(e) => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples[
                                      exampleIndex
                                    ] = {
                                      ...example,
                                      jp: e.target.value,
                                    };
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                  placeholder="Câu tiếng Nhật"
                                />
                                <input
                                  type="text"
                                  value={example.vi}
                                  onChange={(e) => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples[
                                      exampleIndex
                                    ] = {
                                      ...example,
                                      vi: e.target.value,
                                    };
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                  placeholder="Dịch tiếng Việt"
                                />
                                <button
                                  onClick={() => {
                                    const newUsages = [
                                      ...(grammarFormData.usages || []),
                                    ];
                                    newUsages[usageIndex].examples =
                                      usage.examples.filter(
                                        (_, i) => i !== exampleIndex
                                      );
                                    handleGrammarInputChange(
                                      "usages",
                                      newUsages
                                    );
                                  }}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                  title="Xóa ví dụ này"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newUsages = [
                                  ...(grammarFormData.usages || []),
                                ];
                                newUsages[usageIndex].examples.push({
                                  jp: "",
                                  vi: "",
                                });
                                handleGrammarInputChange("usages", newUsages);
                              }}
                              className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Thêm ví dụ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newUsages = [
                        ...(grammarFormData.usages || []),
                        {
                          meaning: "",
                          examples: [{ jp: "", vi: "" }],
                        },
                      ];
                      handleGrammarInputChange("usages", newUsages);
                    }}
                    className="w-full py-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:text-green-800 hover:border-green-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm cách dùng mới
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGrammarSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "deleteGrammar" && selectedGrammarPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa điểm ngữ pháp
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa điểm ngữ pháp "
                {selectedGrammarPoint.structure}" không?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleGrammarDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
