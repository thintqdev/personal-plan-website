"use client";

import Link from "next/link";
import { useState, use } from "react";
import {
  ArrowLeft,
  Book,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  HelpCircle,
  FileText,
  Languages,
  CheckSquare,
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import LanguageLayout from "../../../layout";

type TabType =
  | "exercise"
  | "translation"
  | "answers"
  | "vocabulary"
  | "grammar";

export default function JapaneseReadingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("exercise");
  const [showAddVocabularyModal, setShowAddVocabularyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingWord, setEditingWord] = useState<number | null>(null);
  const [vocabularyList, setVocabularyList] = useState([
    {
      id: 1,
      japanese: "こんにちは",
      furigana: "こんにちは",
      meanings: [
        {
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
          exampleMeaning: "Xin chào, anh Tanaka.",
        },
      ],
      category: "greetings",
      level: "N5",
      dateAdded: "2024-01-15",
      mastered: true,
    },
    {
      id: 2,
      japanese: "東京",
      furigana: "とうきょう",
      meanings: [
        {
          meaning: "Tokyo (thủ đô Nhật Bản)",
          example: "東京に住んでいます。",
          exampleMeaning: "Tôi sống ở Tokyo.",
        },
      ],
      category: "general",
      level: "N5",
      dateAdded: "2024-01-14",
      mastered: false,
    },
  ]);

  const [newWord, setNewWord] = useState({
    japanese: "",
    furigana: "",
    meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
    category: "general",
    level: "N5",
  });

  // Mock data - trong thực tế sẽ fetch từ API dựa trên params.id
  const readingData = {
    1: {
      title: "Bài đọc 1",
      level: "N5",
      type: "Bài viết",
      difficulty: "Dễ",
      content: {
        japanese: `こんにちは。私の名前は田中です。東京に住んでいます。

毎日、朝7時に起きます。そして、朝ごはんを食べます。パンとコーヒーが好きです。

会社まで電車で30分かかります。仕事は9時から5時までです。

仕事が終わったら、ジムに行って運動します。健康が大切です。

夜は本を読んだり、テレビを見たりします。楽しい毎日です。`,
        vietnamese: `Xin chào. Tên tôi là Tanaka. Tôi sống ở Tokyo.

Mỗi ngày, tôi thức dậy lúc 7 giờ sáng. Sau đó ăn sáng. Tôi thích bánh mì và cà phê.

Đến công ty mất 30 phút bằng tàu điện. Công việc từ 9 giờ đến 5 giờ.

Sau khi tan làm, tôi đi phòng gym tập thể dục. Sức khỏe rất quan trọng.

Buổi tối tôi đọc sách hoặc xem ti vi. Cuộc sống hàng ngày rất vui vẻ.`,
      },
      vocabulary: [
        {
          japanese: "こんにちは",
          furigana: "こんにちは",
          meanings: [
            {
              meaning: "Xin chào (ban ngày)",
              example: "こんにちは、田中さん。",
              exampleMeaning: "Xin chào, anh Tanaka.",
            },
          ],
          category: "greetings",
          level: "N5",
        },
        {
          japanese: "東京",
          furigana: "とうきょう",
          meanings: [
            {
              meaning: "Tokyo (thủ đô Nhật Bản)",
              example: "東京に住んでいます。",
              exampleMeaning: "Tôi sống ở Tokyo.",
            },
          ],
          category: "general",
          level: "N5",
        },
        {
          japanese: "住んでいます",
          furigana: "すんでいます",
          meanings: [
            {
              meaning: "Sống ở (hiện tại tiếp diễn)",
              example: "東京に住んでいます。",
              exampleMeaning: "Tôi sống ở Tokyo.",
            },
          ],
          category: "general",
          level: "N5",
        },
        {
          japanese: "好きです",
          furigana: "すきです",
          meanings: [
            {
              meaning: "Thích",
              example: "パンとコーヒーが好きです。",
              exampleMeaning: "Tôi thích bánh mì và cà phê.",
            },
          ],
          category: "general",
          level: "N5",
        },
        {
          japanese: "電車",
          furigana: "でんしゃ",
          meanings: [
            {
              meaning: "Tàu điện",
              example: "電車で30分かかります。",
              exampleMeaning: "Mất 30 phút bằng tàu điện.",
            },
          ],
          category: "general",
          level: "N5",
        },
        {
          japanese: "ジム",
          furigana: "じむ",
          meanings: [
            {
              meaning: "Phòng gym",
              example: "ジムに行って運動します。",
              exampleMeaning: "Tôi đi phòng gym tập thể dục.",
            },
          ],
          category: "general",
          level: "N5",
        },
        {
          japanese: "大切です",
          furigana: "たいせつです",
          meanings: [
            {
              meaning: "Quan trọng",
              example: "健康が大切です。",
              exampleMeaning: "Sức khỏe rất quan trọng.",
            },
          ],
          category: "general",
          level: "N5",
        },
      ],
      grammar: [
        {
          pattern: "〜に住んでいます",
          meaning: "Sống ở...",
          example: "東京に住んでいます",
        },
        {
          pattern: "〜が好きです",
          meaning: "Thích...",
          example: "パンとコーヒーが好きです",
        },
        {
          pattern: "〜まで",
          meaning: "Trong khoảng thời gian từ...đến...",
          example: "9時から5時まで",
        },
        {
          pattern: "〜たら",
          meaning: "Sau khi...thì",
          example: "仕事が終わったら",
        },
        {
          pattern: "〜たり〜たりします",
          meaning: "Làm việc này hoặc việc kia",
          example: "本を読んだり、テレビを見たりします",
        },
      ],
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "話者はどこに住んでいますか？",
          options: ["大阪", "東京", "京都", "北海道"],
          correctAnswer: "東京",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "話者は何時に起きますか？",
          options: ["6時", "7時", "8時", "9時"],
          correctAnswer: "7時",
        },
      ],
    },
    2: {
      title: "Bài đọc 2",
      level: "N5",
      type: "Bài viết",
      difficulty: "Dễ",
      content: {
        japanese: `私の家族は4人です。父と母と私と妹です。

父は会社員です。毎日忙しく働いています。母は主婦です。料理と掃除が好きです。

妹は大学生です。毎日学校に行っています。私は高校生です。勉強が大変ですが、頑張っています。

家族みんなで夕食を食べます。とても楽しい時間です。`,
        vietnamese: `Gia đình tôi có 4 người. Bố, mẹ, tôi và em gái.

Bố là nhân viên công ty. Mỗi ngày làm việc vất vả. Mẹ là nội trợ. Thích nấu ăn và dọn dẹp.

Em gái là sinh viên đại học. Mỗi ngày đi học. Tôi là học sinh trung học. Việc học vất vả nhưng tôi cố gắng.

Cả gia đình cùng ăn tối. Là thời gian rất vui vẻ.`,
      },
      vocabulary: [
        {
          japanese: "家族",
          furigana: "かぞく",
          meanings: [
            {
              meaning: "Gia đình",
              example: "私の家族は4人です。",
              exampleMeaning: "Gia đình tôi có 4 người.",
            },
          ],
          category: "family",
          level: "N5",
        },
        {
          japanese: "会社員",
          furigana: "かいしゃいん",
          meanings: [
            {
              meaning: "Nhân viên công ty",
              example: "父は会社員です。",
              exampleMeaning: "Bố là nhân viên công ty.",
            },
          ],
          category: "work",
          level: "N5",
        },
        {
          japanese: "主婦",
          furigana: "しゅふ",
          meanings: [
            {
              meaning: "Nội trợ",
              example: "母は主婦です。",
              exampleMeaning: "Mẹ là nội trợ.",
            },
          ],
          category: "work",
          level: "N5",
        },
        {
          japanese: "大学生",
          furigana: "だいがくせい",
          meanings: [
            {
              meaning: "Sinh viên đại học",
              example: "妹は大学生です。",
              exampleMeaning: "Em gái là sinh viên đại học.",
            },
          ],
          category: "education",
          level: "N5",
        },
        {
          japanese: "高校生",
          furigana: "こうこうせい",
          meanings: [
            {
              meaning: "Học sinh trung học",
              example: "私は高校生です。",
              exampleMeaning: "Tôi là học sinh trung học.",
            },
          ],
          category: "education",
          level: "N5",
        },
        {
          japanese: "勉強",
          furigana: "べんきょう",
          meanings: [
            {
              meaning: "Học tập",
              example: "勉強が大変ですが、頑張っています。",
              exampleMeaning: "Việc học vất vả nhưng tôi cố gắng.",
            },
          ],
          category: "education",
          level: "N5",
        },
        {
          japanese: "頑張っています",
          furigana: "がんばっています",
          meanings: [
            {
              meaning: "Cố gắng (hiện tại tiếp diễn)",
              example: "勉強が大変ですが、頑張っています。",
              exampleMeaning: "Việc học vất vả nhưng tôi cố gắng.",
            },
          ],
          category: "general",
          level: "N5",
        },
      ],
      grammar: [
        { pattern: "〜は〜です", meaning: "Là...", example: "父は会社員です" },
        {
          pattern: "〜が好きです",
          meaning: "Thích...",
          example: "料理と掃除が好きです",
        },
        {
          pattern: "〜に〜ています",
          meaning: "Đang... (tiếp diễn)",
          example: "働いています",
        },
        {
          pattern: "〜が大変です",
          meaning: "Khó khăn, vất vả",
          example: "勉強が大変ですが",
        },
        {
          pattern: "〜ですが",
          meaning: "Mặc dù...nhưng",
          example: "大変ですが、頑張っています",
        },
      ],
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "話者の家族は何人ですか？",
          options: ["3人", "4人", "5人", "6人"],
          correctAnswer: "4人",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "父の職業は何ですか？",
          options: ["教師", "医者", "会社員", "農家"],
          correctAnswer: "会社員",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "話者はどの学校に通っていますか？",
          options: ["小学校", "中学校", "高校", "大学"],
          correctAnswer: "高校",
        },
      ],
    },
    3: {
      title: "Kế hoạch cuối tuần",
      level: "N4",
      type: "Bài viết",
      difficulty: "Trung bình",
      content: {
        japanese: `週末の計画について書きます。

土曜日は友達と映画を見に行きます。「君の名は。」というアニメ映画です。とても人気のある作品です。映画館でポップコーンを食べながら楽しみます。

日曜日には買い物に行きたいです。駅前のデパートで新しい服を買います。そして、新しいレストランにも行ってみたいです。イタリアンのパスタが食べたいです。

週末はリラックスして、楽しい時間を過ごしたいです。平日忙しいので、週末は大切な休養時間です。`,
        vietnamese: `Tôi sẽ viết về kế hoạch cuối tuần.

Thứ 7 tôi sẽ đi xem phim với bạn bè. Là phim hoạt hình "Your Name". Là một tác phẩm rất nổi tiếng. Sẽ ăn bỏng ngô và thưởng thức phim tại rạp chiếu phim.

Chủ nhật muốn đi mua sắm. Sẽ mua quần áo mới tại cửa hàng bách hóa trước ga. Và cũng muốn đến nhà hàng mới mở. Muốn ăn mì Ý.

Cuối tuần muốn thư giãn và có thời gian vui vẻ. Vì ngày thường bận rộn nên cuối tuần là thời gian nghỉ ngơi quan trọng.`,
      },
      vocabulary: [
        {
          japanese: "週末",
          furigana: "しゅうまつ",
          meanings: [
            {
              meaning: "Cuối tuần",
              example: "週末の計画について書きます。",
              exampleMeaning: "Tôi sẽ viết về kế hoạch cuối tuần.",
            },
          ],
          category: "general",
          level: "N4",
        },
        {
          japanese: "計画",
          furigana: "けいかく",
          meanings: [
            {
              meaning: "Kế hoạch",
              example: "週末の計画について書きます。",
              exampleMeaning: "Tôi sẽ viết về kế hoạch cuối tuần.",
            },
          ],
          category: "general",
          level: "N4",
        },
        {
          japanese: "映画",
          furigana: "えいが",
          meanings: [
            {
              meaning: "Phim ảnh",
              example: "友達と映画を見に行きます。",
              exampleMeaning: "Tôi sẽ đi xem phim với bạn bè.",
            },
          ],
          category: "general",
          level: "N4",
        },
        {
          japanese: "人気",
          furigana: "にんき",
          meanings: [
            {
              meaning: "Nổi tiếng, phổ biến",
              example: "とても人気のある作品です。",
              exampleMeaning: "Là một tác phẩm rất nổi tiếng.",
            },
          ],
          category: "general",
          level: "N4",
        },
        {
          japanese: "ポップコーン",
          furigana: "ぽっぷこーん",
          meanings: [
            {
              meaning: "Bỏng ngô",
              example: "映画館でポップコーンを食べながら楽しみます。",
              exampleMeaning:
                "Sẽ ăn bỏng ngô và thưởng thức phim tại rạp chiếu phim.",
            },
          ],
          category: "food",
          level: "N4",
        },
        {
          japanese: "行きたいです",
          furigana: "いきたいです",
          meanings: [
            {
              meaning: "Muốn đi",
              example: "買い物に行きたいです。",
              exampleMeaning: "Muốn đi mua sắm.",
            },
          ],
          category: "general",
          level: "N4",
        },
        {
          japanese: "パスタ",
          furigana: "ぱすた",
          meanings: [
            {
              meaning: "Mì Ý",
              example: "イタリアンのパスタが食べたいです。",
              exampleMeaning: "Muốn ăn mì Ý.",
            },
          ],
          category: "food",
          level: "N4",
        },
      ],
      grammar: [
        {
          pattern: "〜について",
          meaning: "Về việc...",
          example: "週末の計画について",
        },
        {
          pattern: "〜に行きます",
          meaning: "Đi... (địa điểm)",
          example: "映画を見に行きます",
        },
        { pattern: "〜たいです", meaning: "Muốn...", example: "行きたいです" },
        {
          pattern: "〜てみたいです",
          meaning: "Muốn thử...",
          example: "行ってみたいです",
        },
        { pattern: "〜ので", meaning: "Vì...nên", example: "忙しいので" },
      ],
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "話者は土曜日に何をしますか？",
          options: ["仕事", "映画を見ます", "買い物", "家にいます"],
          correctAnswer: "映画を見ます",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "話者が観る映画の名前は何ですか？",
          options: [
            "トイ・ストーリー",
            "君の名は。",
            "千と千尋の神隠し",
            "となりのトトロ",
          ],
          correctAnswer: "君の名は。",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "話者はどこで買い物をしますか？",
          options: [
            "ショッピングセンター",
            "駅前のデパート",
            "スーパー",
            "市場",
          ],
          correctAnswer: "駅前のデパート",
        },
      ],
    },
    4: {
      title: "Bài đọc 4",
      level: "N4",
      type: "Bài viết",
      difficulty: "Trung bình",
      content: {
        japanese: `将来の夢について話します。私は小さい頃から医者になりたいと思っていました。病気の人を助ける仕事は素晴らしいと思います。

しかし、大学に入ってから、先生になる夢を持つようになりました。子供たちに勉強を教えるのは、とてもやりがいのある仕事です。子供たちの成長を見るのは楽しいです。

今は教育大学の3年生です。来年は小学校で実習します。先生になるために、毎日一生懸命勉強しています。

将来は田舎の小学校で教員になりたいです。子供たちと一緒に遊んだり、勉強を教えたりするのが夢です。`,
        vietnamese: `Tôi sẽ nói về ước mơ tương lai. Từ nhỏ tôi đã nghĩ muốn trở thành bác sĩ. Tôi nghĩ công việc giúp đỡ người bệnh là tuyệt vời.

Tuy nhiên, sau khi vào đại học, tôi bắt đầu có ước mơ trở thành giáo viên. Việc dạy học cho trẻ em là công việc có ý nghĩa. Việc nhìn thấy sự trưởng thành của trẻ em là vui vẻ.

Bây giờ tôi là sinh viên năm 3 trường sư phạm. Năm sau sẽ thực tập tại trường tiểu học. Để trở thành giáo viên, mỗi ngày tôi học tập chăm chỉ.

Tương lai tôi muốn trở thành giáo viên tại trường tiểu học vùng nông thôn. Ước mơ được chơi cùng trẻ em, dạy chúng học là của tôi.`,
      },
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "Ước mơ ban đầu của người kể chuyện là gì?",
          options: [
            "Trở thành giáo viên",
            "Trở thành bác sĩ",
            "Trở thành kỹ sư",
            "Trở thành doanh nhân",
          ],
          correctAnswer: "Trở thành bác sĩ",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "Người kể chuyện đang học trường gì?",
          options: [
            "Trường y",
            "Trường sư phạm",
            "Trường kinh tế",
            "Trường kỹ thuật",
          ],
          correctAnswer: "Trường sư phạm",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Người kể chuyện muốn làm giáo viên ở đâu?",
          options: [
            "Thành phố lớn",
            "Trường tiểu học vùng nông thôn",
            "Trường trung học",
            "Trường đại học",
          ],
          correctAnswer: "Trường tiểu học vùng nông thôn",
        },
      ],
    },
    5: {
      title: "Bài đọc 5",
      level: "N3",
      type: "Bài viết",
      difficulty: "Khó",
      content: {
        japanese: `日本は美しい国です。四季がはっきりしていて、それぞれの季節に特色があります。
春は桜が満開になります。東京の上野公園や京都の哲学の道は、桜の名所として有名です。桜の下で花見をするのは、日本人の楽しみです。
夏は暑くて湿気が多いですが、海や山で楽しめます。沖縄の美しい海や北海道の湖は、夏の人気スポットです。
秋は紅葉が素晴らしいです。京都や日光の紅葉は息をのむほど美しいです。秋の味覚も楽しめます。
冬は雪景色が幻想的です。北海道や長野のスキーリゾートは、世界中から観光客が訪れます。
日本には他にもたくさんの観光地があります。古い寺院、現代的な都市、美味しい食べ物など、見どころがいっぱいです。`,
        vietnamese: `Nhật Bản là một đất nước xinh đẹp. Bốn mùa rõ rệt, mỗi mùa có đặc trưng riêng.
Mùa xuân hoa anh đào nở rộ. Công viên Ueno ở Tokyo hay con đường Triết học ở Kyoto là danh lam nổi tiếng về hoa anh đào. Việc ngắm hoa dưới tán anh đào là niềm vui của người Nhật.
Mùa hè nóng và ẩm nhưng có thể vui chơi ở biển hay núi. Biển đẹp ở Okinawa hay hồ ở Hokkaido là điểm nóng mùa hè.
Mùa thu lá đỏ tuyệt đẹp. Lá đỏ ở Kyoto hay Nikko đẹp đến nghẹt thở. Cũng có thể thưởng thức ẩm thực mùa thu.
Mùa đông cảnh tuyết huyền ảo. Khu nghỉ dưỡng trượt tuyết ở Hokkaido hay Nagano có du khách từ khắp thế giới đến thăm.
Nhật Bản còn có nhiều điểm du lịch khác. Chùa chiền cổ, thành phố hiện đại, đồ ăn ngon... có rất nhiều điểm đáng xem.`,
      },
      grammar: [
        {
          pattern: "〜として有名です",
          meaning: "Nổi tiếng với tư cách...",
          example: "桜の名所として有名です",
        },
        {
          pattern: "〜のは〜です",
          meaning: "Việc...là...",
          example: "花見をするのは楽しみです",
        },
        {
          pattern: "〜が〜です",
          meaning: "Mặc dù...nhưng",
          example: "暑くて湿気が多いですが",
        },
        {
          pattern: "〜ほど〜です",
          meaning: "Đến mức...",
          example: "息をのむほど美しいです",
        },
        {
          pattern: "〜がいっぱいです",
          meaning: "Đầy ắp...",
          example: "見どころがいっぱいです",
        },
      ],
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "日本の季節の特徴は何ですか？",
          options: [
            "冬が長い",
            "四季がはっきりしている",
            "夏が短い",
            "春が長い",
          ],
          correctAnswer: "四季がはっきりしている",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "桜はどの季節に咲きますか？",
          options: ["冬", "春", "夏", "秋"],
          correctAnswer: "春",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "秋の紅葉で有名な場所はどこですか？",
          options: ["東京", "京都と日光", "沖縄", "北海道"],
          correctAnswer: "京都と日光",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "冬の日本の特徴的な景色は何ですか？",
          options: ["青い海", "雪景色", "桜", "紅葉"],
          correctAnswer: "雪景色",
        },
      ],
    },
    6: {
      title: "Bài đọc 6",
      level: "N3",
      type: "Bài báo",
      difficulty: "Khó",
      content: {
        japanese: `未来のテクノロジーは、私たちの生活を大きく変えるでしょう。AI（人工知能）の進化は目覚ましいです。

AIはすでに私たちの生活に浸透しています。スマートフォンの音声アシスタント、自動翻訳、自動運転車などです。これからもAIは進化を続けます。

5Gと6Gの普及により、インターネットの速度が飛躍的に向上します。これにより、遠隔医療やオンライン教育がより身近になります。

ロボット技術も進歩しています。介護ロボットや産業ロボットが、私たちの生活をサポートします。

しかし、テクノロジーの進歩には課題もあります。プライバシーの問題や雇用の変化です。これらの課題を解決しながら、テクノロジーを活用することが大切です。

未来は明るいですが、私たち人間の知恵が重要です。`,
        vietnamese: `Công nghệ tương lai sẽ thay đổi lớn cuộc sống của chúng ta. Sự tiến hóa của AI (trí tuệ nhân tạo) là đáng kinh ngạc.

AI đã thấm sâu vào cuộc sống của chúng ta. Trợ lý giọng nói trên smartphone, dịch tự động, xe tự lái... AI sẽ tiếp tục tiến hóa.

Với sự phổ biến của 5G và 6G, tốc độ internet sẽ tăng vọt. Nhờ đó, y tế từ xa và giáo dục trực tuyến sẽ trở nên gần gũi hơn.

Công nghệ robot cũng tiến bộ. Robot chăm sóc và robot công nghiệp sẽ hỗ trợ cuộc sống của chúng ta.

Tuy nhiên, sự tiến bộ của công nghệ có những thách thức. Vấn đề về quyền riêng tư và thay đổi việc làm. Việc giải quyết những thách thức này đồng thời tận dụng công nghệ là quan trọng.

Tương lai tươi sáng nhưng trí tuệ của con người rất quan trọng.`,
      },
      grammar: [
        {
          pattern: "〜でしょう",
          meaning: "Sẽ... (suy đoán)",
          example: "変えるでしょう",
        },
        { pattern: "〜により", meaning: "Nhờ vào...", example: "普及により" },
        {
          pattern: "〜が〜です",
          meaning: "Mặc dù...nhưng",
          example: "課題もありますが",
        },
        {
          pattern: "〜ながら",
          meaning: "Trong khi...thì",
          example: "解決しながら",
        },
        {
          pattern: "〜が重要です",
          meaning: "Quan trọng là...",
          example: "知恵が重要です",
        },
      ],
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "どんなテクノロジーが生活を変えますか？",
          options: [
            "電話",
            "AI（人工知能）",
            "コンピューター",
            "インターネット",
          ],
          correctAnswer: "AI（人工知能）",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "5Gと6Gは何を向上させますか？",
          options: [
            "画像の質",
            "インターネットの速度",
            "スマホのバッテリー",
            "デバイスの価格",
          ],
          correctAnswer: "インターネットの速度",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "テクノロジーの進歩の課題は何ですか？",
          options: [
            "高いコスト",
            "プライバシーと雇用の変化",
            "人材不足",
            "環境汚染",
          ],
          correctAnswer: "プライバシーと雇用の変化",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "未来で何が重要ですか？",
          options: ["テクノロジー", "人間の知恵", "お金", "権力"],
          correctAnswer: "人間の知恵",
        },
      ],
    },
  };

  const currentReading = readingData[parseInt(id) as keyof typeof readingData];

  const categories = [
    { value: "general", label: "Tổng quát", color: "gray" },
    { value: "greetings", label: "Chào hỏi", color: "blue" },
    { value: "food", label: "Đồ ăn", color: "green" },
    { value: "education", label: "Giáo dục", color: "purple" },
    { value: "family", label: "Gia đình", color: "pink" },
    { value: "work", label: "Công việc", color: "indigo" },
    { value: "travel", label: "Du lịch", color: "yellow" },
  ];

  const filteredVocabulary = vocabularyList.filter(
    (word) =>
      word.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meanings.some((m) =>
        m.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleAddWord = () => {
    if (
      newWord.japanese &&
      newWord.meanings[0].meaning &&
      validateLevel(newWord.level)
    ) {
      const word = {
        id: Date.now(),
        ...newWord,
        dateAdded: new Date().toISOString().split("T")[0],
        mastered: false,
      };
      setVocabularyList([word, ...vocabularyList]);
      setNewWord({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "general",
        level: "N5",
      });
      setShowAddVocabularyModal(false);
    }
  };

  const handleDeleteWord = (id: number) => {
    setVocabularyList(vocabularyList.filter((word) => word.id !== id));
  };

  const handleEditWord = (word: any) => {
    setEditingWord(word.id);
    setNewWord({
      japanese: word.japanese,
      furigana: word.furigana,
      meanings: word.meanings,
      category: word.category,
      level: word.level,
    });
  };

  const handleAddToPersonalVocabulary = (word: any) => {
    const newWord = {
      id: Date.now(),
      japanese: word.japanese,
      furigana: word.furigana,
      meanings: word.meanings,
      category: word.category,
      level: word.level,
      dateAdded: new Date().toISOString().split("T")[0],
      mastered: false,
    };
    setVocabularyList([newWord, ...vocabularyList]);
  };

  const handleSaveEdit = () => {
    if (
      newWord.japanese &&
      newWord.meanings[0].meaning &&
      validateLevel(newWord.level)
    ) {
      setVocabularyList(
        vocabularyList.map((word) =>
          word.id === editingWord ? { ...word, ...newWord } : word
        )
      );
      setEditingWord(null);
      setNewWord({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "general",
        level: "N5",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat
      ? `bg-${cat.color}-100 text-${cat.color}-700`
      : "bg-gray-100 text-gray-700";
  };

  const addMeaning = () => {
    setNewWord({
      ...newWord,
      meanings: [
        ...newWord.meanings,
        { meaning: "", example: "", exampleMeaning: "" },
      ],
    });
  };

  const updateMeaning = (index: number, field: string, value: string) => {
    const updatedMeanings = newWord.meanings.map((meaning, i) =>
      i === index ? { ...meaning, [field]: value } : meaning
    );
    setNewWord({ ...newWord, meanings: updatedMeanings });
  };

  const removeMeaning = (index: number) => {
    if (newWord.meanings.length > 1) {
      setNewWord({
        ...newWord,
        meanings: newWord.meanings.filter((_, i) => i !== index),
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N5":
        return "text-green-600 bg-green-100";
      case "N4":
        return "text-blue-600 bg-blue-100";
      case "N3":
        return "text-yellow-600 bg-yellow-100";
      case "N2":
        return "text-orange-600 bg-orange-100";
      case "N1":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const validateLevel = (level: string) => {
    const validLevels = ["N5", "N4", "N3", "N2", "N1"];
    return validLevels.includes(level);
  };

  const formatLevelDisplay = (level: string) => {
    return `${level}`;
  };

  if (!currentReading) {
    return (
      <LanguageLayout
        showBackButton={true}
        backButtonHref="/study/language/japanese/reading"
      >
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-12 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Không tìm thấy bài đọc
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                Bài đọc bạn tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <Link
                href="/study/language/japanese/reading"
                className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Link>
            </div>
          </div>
        </div>
      </LanguageLayout>
    );
  }

  const tabs = [
    { id: "exercise" as TabType, label: "Đề bài tập", icon: FileText },
    { id: "translation" as TabType, label: "Dịch", icon: Languages },
    { id: "answers" as TabType, label: "Đáp án", icon: CheckSquare },
    { id: "vocabulary" as TabType, label: "Từ vựng", icon: BookOpen },
    { id: "grammar" as TabType, label: "Ngữ pháp", icon: BookOpen },
  ];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    setActiveTab("answers");
  };

  const getScore = () => {
    let correct = 0;
    currentReading.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 text-green-800";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800";
      case "Khó":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bài viết":
        return "bg-red-100 text-red-800";
      case "Bài báo":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <LanguageLayout
      showBackButton={true}
      backButtonHref="/study/language/japanese/reading"
    >
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Book className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentReading.title}
                  </h1>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {currentReading.level}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${getTypeColor(
                        currentReading.type
                      )}`}
                    >
                      {currentReading.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-sm ${getDifficultyColor(
                        currentReading.difficulty
                      )}`}
                    >
                      {currentReading.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-red-500 text-red-600 bg-red-50"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Exercise Tab */}
              {activeTab === "exercise" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Bài đọc tiếng Nhật
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6 border">
                      <p className="text-gray-900 leading-relaxed whitespace-pre-line text-lg">
                        {currentReading.content.japanese}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Câu hỏi đọc hiểu ({currentReading.questions.length} câu)
                      </h3>
                      {!showResults && (
                        <button
                          onClick={handleSubmit}
                          disabled={
                            Object.keys(answers).length !==
                            currentReading.questions.length
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Nộp bài
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {currentReading.questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <h4 className="font-medium text-gray-900 mb-3">
                            {index + 1}. {question.question}
                          </h4>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => {
                              const isSelected =
                                answers[question.id] === option;
                              return (
                                <label
                                  key={optionIndex}
                                  className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                                    isSelected
                                      ? "bg-red-50 border border-red-200"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={option}
                                    checked={isSelected}
                                    onChange={() =>
                                      handleAnswerChange(question.id, option)
                                    }
                                    disabled={showResults}
                                    className="text-red-600 focus:ring-red-500"
                                  />
                                  <span className="text-gray-700">
                                    {option}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Translation Tab */}
              {activeTab === "translation" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Bản dịch tiếng Việt
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {currentReading.content.vietnamese}
                    </p>
                  </div>
                </div>
              )}

              {/* Answers Tab */}
              {activeTab === "answers" && showResults && (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Kết quả: {getScore()}/{currentReading.questions.length}
                    </h3>
                    <p className="text-gray-600">
                      Điểm số:{" "}
                      {Math.round(
                        (getScore() / currentReading.questions.length) * 100
                      )}
                      %
                    </p>
                  </div>

                  <div className="space-y-4">
                    {currentReading.questions.map((question, index) => {
                      const isCorrect =
                        answers[question.id] === question.correctAnswer;
                      return (
                        <div
                          key={question.id}
                          className={`border rounded-lg p-4 ${
                            isCorrect
                              ? "border-green-200 bg-green-50"
                              : "border-red-200 bg-red-50"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-2">
                                {index + 1}. {question.question}
                              </h4>
                              <div className="text-sm text-gray-600 mb-2">
                                Đáp án của bạn:{" "}
                                <span className="font-medium">
                                  {answers[question.id] || "Chưa trả lời"}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                Đáp án đúng:{" "}
                                <span className="font-medium text-green-700">
                                  {question.correctAnswer}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center space-x-4 pt-4">
                    <button
                      onClick={() => {
                        setAnswers({});
                        setShowResults(false);
                        setActiveTab("exercise");
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                    >
                      Làm lại
                    </button>
                    <Link
                      href="/study/language/japanese/reading"
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
                    >
                      Quay lại danh sách
                    </Link>
                  </div>
                </div>
              )}

              {/* Vocabulary Tab */}
              {activeTab === "vocabulary" && showResults && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Từ vựng trong bài
                    </h3>
                    <button
                      onClick={() => setShowAddVocabularyModal(true)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm từ vựng</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm từ vựng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {((currentReading as any).vocabulary || [])
                      .filter(
                        (word: any) =>
                          word.japanese
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          word.furigana
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          word.meanings.some((m: any) =>
                            m.meaning
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                      )
                      .map((word: any, index: number) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-medium text-gray-900">
                                  {word.japanese}
                                  {word.furigana && (
                                    <span className="text-sm text-gray-500 ml-2">
                                      ({word.furigana})
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() =>
                                    handleAddToPersonalVocabulary(word)
                                  }
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                  title="Thêm vào từ vựng cá nhân"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-gray-600 text-sm mb-2">
                                {word.meanings[0].meaning}
                                {word.meanings.length > 1 && (
                                  <span className="text-red-600 ml-2">
                                    (+{word.meanings.length - 1} nghĩa khác)
                                  </span>
                                )}
                              </div>
                              {word.meanings[0].example && (
                                <div className="text-gray-800 text-sm bg-white px-3 py-2 rounded border font-mono">
                                  {word.meanings[0].example}
                                </div>
                              )}
                              <div className="flex items-center space-x-2 mt-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                    word.category
                                  )}`}
                                >
                                  {
                                    categories.find(
                                      (c) => c.value === word.category
                                    )?.label
                                  }
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                                    word.level
                                  )}`}
                                >
                                  {word.level}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Grammar Tab */}
              {activeTab === "grammar" &&
                showResults &&
                (currentReading as any).grammar && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Ngữ pháp trong bài
                    </h3>
                    <div className="space-y-3">
                      {(currentReading as any).grammar.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 mb-1">
                                  {item.pattern}
                                </div>
                                <div className="text-gray-600 text-sm mb-2">
                                  {item.meaning}
                                </div>
                                <div className="text-gray-800 text-sm bg-white px-3 py-2 rounded border font-mono">
                                  {item.example}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Show message if answers tab is accessed before submitting */}
              {activeTab === "answers" && !showResults && (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có kết quả
                  </h3>
                  <p className="text-gray-600">
                    Hãy trả lời các câu hỏi trong tab "Đề bài tập" trước.
                  </p>
                </div>
              )}

              {/* Show message if vocabulary tab is accessed before submitting */}
              {activeTab === "vocabulary" && !showResults && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có dữ liệu
                  </h3>
                  <p className="text-gray-600">
                    Hãy trả lời các câu hỏi trong tab "Đề bài tập" để xem từ
                    vựng.
                  </p>
                </div>
              )}

              {/* Show message if grammar tab is accessed before submitting */}
              {activeTab === "grammar" && !showResults && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có dữ liệu
                  </h3>
                  <p className="text-gray-600">
                    Hãy trả lời các câu hỏi trong tab "Đề bài tập" để xem ngữ
                    pháp.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add Vocabulary Modal */}
          {showAddVocabularyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingWord ? "Chỉnh sửa từ vựng" : "Thêm từ vựng mới"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddVocabularyModal(false);
                        setEditingWord(null);
                        setNewWord({
                          japanese: "",
                          furigana: "",
                          meanings: [
                            { meaning: "", example: "", exampleMeaning: "" },
                          ],
                          category: "general",
                          level: "N5",
                        });
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Từ tiếng Nhật *
                      </label>
                      <input
                        type="text"
                        value={newWord.japanese}
                        onChange={(e) =>
                          setNewWord({ ...newWord, japanese: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="例: こんにちは"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Furigana
                      </label>
                      <input
                        type="text"
                        value={newWord.furigana}
                        onChange={(e) =>
                          setNewWord({ ...newWord, furigana: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="konnichiwa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Danh mục
                      </label>
                      <select
                        value={newWord.category}
                        onChange={(e) =>
                          setNewWord({ ...newWord, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Level
                      </label>
                      <select
                        value={newWord.level}
                        onChange={(e) =>
                          setNewWord({ ...newWord, level: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="N5">{formatLevelDisplay("N5")}</option>
                        <option value="N4">{formatLevelDisplay("N4")}</option>
                        <option value="N3">{formatLevelDisplay("N3")}</option>
                        <option value="N2">{formatLevelDisplay("N2")}</option>
                        <option value="N1">{formatLevelDisplay("N1")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Meanings Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Nghĩa và ví dụ
                      </h4>
                      <button
                        type="button"
                        onClick={addMeaning}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center space-x-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm nghĩa</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {newWord.meanings.map((meaning, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div className="flex-1 space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nghĩa tiếng Việt {index === 0 && "*"}
                                </label>
                                <input
                                  type="text"
                                  value={meaning.meaning}
                                  onChange={(e) =>
                                    updateMeaning(
                                      index,
                                      "meaning",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                  placeholder="Xin chào"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ví dụ sử dụng
                                  </label>
                                  <input
                                    type="text"
                                    value={meaning.example}
                                    onChange={(e) =>
                                      updateMeaning(
                                        index,
                                        "example",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="こんにちは、田中さん。"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nghĩa của ví dụ
                                  </label>
                                  <input
                                    type="text"
                                    value={meaning.exampleMeaning}
                                    onChange={(e) =>
                                      updateMeaning(
                                        index,
                                        "exampleMeaning",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="Xin chào, anh Tanaka."
                                  />
                                </div>
                              </div>
                            </div>
                            {newWord.meanings.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeMeaning(index)}
                                className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 transition-colors"
                                title="Xóa nghĩa này"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowAddVocabularyModal(false);
                        setEditingWord(null);
                        setNewWord({
                          japanese: "",
                          furigana: "",
                          meanings: [
                            { meaning: "", example: "", exampleMeaning: "" },
                          ],
                          category: "general",
                          level: "N5",
                        });
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Hủy</span>
                    </button>
                    <button
                      onClick={editingWord ? handleSaveEdit : handleAddWord}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingWord ? "Lưu thay đổi" : "Thêm từ"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LanguageLayout>
  );
}
