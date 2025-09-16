"use client";
import { useState, useEffect } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import {
  getNotesTree,
  createNoteFolder,
  deleteNoteFolder,
  createNote,
  updateNote,
  deleteNote as deleteNoteAPI,
  type NotesTree,
  type CreateNoteFolderRequest,
  type CreateNoteRequest,
  type UpdateNoteRequest,
} from "@/lib/note-service";

// Icons as SVG components
const StickyNote = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Folder = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const BookOpen = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const Layers = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="12,2 2,7 12,12 22,7 12,2"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="2,17 12,22 22,17"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="2,12 12,17 22,12"
    />
  </svg>
);

const FileText = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const Plus = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="12"
      y1="5"
      x2="12"
      y2="19"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="5"
      y1="12"
      x2="19"
      y2="12"
    />
  </svg>
);

const Camera = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <circle
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx="12"
      cy="13"
      r="3"
    />
  </svg>
);

const Edit = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Trash2 = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="3,6 5,6 21,6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="10"
      y1="11"
      x2="10"
      y2="17"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="14"
      y1="11"
      x2="14"
      y2="17"
    />
  </svg>
);

const X = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="18"
      y1="6"
      x2="6"
      y2="18"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="6"
      y1="6"
      x2="18"
      y2="18"
    />
  </svg>
);

const Save = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const FolderPlus = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="12"
      y1="10"
      x2="12"
      y2="16"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="9"
      y1="13"
      x2="15"
      y2="13"
    />
  </svg>
);

const Search = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx="11"
      cy="11"
      r="8"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
    />
  </svg>
);

const Calendar = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="16"
      y1="2"
      x2="16"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="8"
      y1="2"
      x2="8"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="3"
      y1="10"
      x2="21"
      y2="10"
    />
  </svg>
);

const Bold = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"
    />
  </svg>
);

const Italic = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="19"
      y1="4"
      x2="10"
      y2="4"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="14"
      y1="20"
      x2="5"
      y2="20"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="15"
      y1="4"
      x2="9"
      y2="20"
    />
  </svg>
);

const List = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="8"
      y1="6"
      x2="21"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="8"
      y1="12"
      x2="21"
      y2="12"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="8"
      y1="18"
      x2="21"
      y2="18"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="3"
      y1="6"
      x2="3.01"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="3"
      y1="12"
      x2="3.01"
      y2="12"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="3"
      y1="18"
      x2="3.01"
      y2="18"
    />
  </svg>
);

const Grid = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="3"
      y="3"
      width="7"
      height="7"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="14"
      y="3"
      width="7"
      height="7"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="14"
      y="14"
      width="7"
      height="7"
    />
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="3"
      y="14"
      width="7"
      height="7"
    />
  </svg>
);

const Eye = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx="12"
      cy="12"
      r="3"
    />
  </svg>
);

const Link = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const Undo = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    />
  </svg>
);

const Redo = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
    />
  </svg>
);

const Heading1 = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </svg>
);

const Heading2 = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 12h.01m4.598 0H12m0 0h.01M12 7h.01M7 17h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"
    />
  </svg>
);

const PlusRow = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const PlusCol = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12h16m-8-8v16"
    />
  </svg>
);

const MinusRow = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12h16"
    />
  </svg>
);

const MinusCol = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16"
    />
  </svg>
);

// Helper function to extract plain text from HTML content
const getPlainText = (html: string): string => {
  // Create a temporary div element to parse HTML
  if (typeof window !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  // Fallback for server-side rendering - simple regex to remove HTML tags
  return html.replace(/<[^>]*>/g, "");
};

export default function NotesPage() {
  // Theme colors - can be changed based on selected theme
  const themeColors = {
    primary: "blue-500",
    primaryHover: "blue-600",
    primaryLight: "blue-50",
    primaryText: "blue-600",
    primaryTextHover: "blue-700",
    primaryBorder: "blue-100",
    primaryGradient: "from-white to-blue-50",
  };

  // Helper function to generate theme-aware class names
  const getThemeClass = (type: keyof typeof themeColors) => {
    return themeColors[type];
  };

  const coverImages = [
    "/peaceful-pink-sunset-landscape.png",
    "/soft-pink-abstract-pattern-for-personal-planning.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/mountain-peak-sunrise-motivation-success.png",
    "/eagle-soaring-high-mountains-freedom.png",
  ];

  // Use deterministic initial state for SSR
  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [notesTree, setNotesTree] = useState<NotesTree[]>([]);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  type EditingNote = {
    id?: string;
    title: string;
    content: string;
    folderId: string;
  };
  const [editingNote, setEditingNote] = useState<EditingNote>({
    id: undefined,
    title: "",
    content: "",
    folderId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showDeleteFolderModal, setShowDeleteFolderModal] = useState<
    string | null
  >(null);
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");
  const [editorRef, setEditorRef] = useState<any>(null);

  // Simple formatting functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const insertTable = () => {
    const tableHTML = `
      <table style="border-collapse: collapse; width: 100%; margin: 10px 0;" class="editable-table">
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 1</td>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 2</td>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 3</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 4</td>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 5</td>
            <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `;
    document.execCommand("insertHTML", false, tableHTML);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  // Table manipulation functions
  const addTableRow = (position: "above" | "below") => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let cell = range.commonAncestorContainer;

    // Find the table cell
    while (cell && cell.nodeName !== "TD" && cell.nodeName !== "TH") {
      cell = cell.parentNode as Element;
    }

    if (!cell) return;

    const row = cell.parentNode as HTMLTableRowElement;
    const table = row.parentNode as HTMLTableElement;
    const tbody = table.querySelector("tbody") || table;
    const newRow = document.createElement("tr");
    const cellCount = row.cells.length;

    for (let i = 0; i < cellCount; i++) {
      const newCell = document.createElement("td");
      newCell.style.border = "1px solid #ccc";
      newCell.style.padding = "8px";
      newCell.style.minWidth = "100px";
      newCell.textContent = "";
      newRow.appendChild(newCell);
    }

    if (position === "above") {
      tbody.insertBefore(newRow, row);
    } else {
      tbody.insertBefore(newRow, row.nextSibling);
    }
  };

  const addTableColumn = (position: "left" | "right") => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let cell = range.commonAncestorContainer;

    // Find the table cell
    while (cell && cell.nodeName !== "TD" && cell.nodeName !== "TH") {
      cell = cell.parentNode as Element;
    }

    if (!cell) return;

    const row = cell.parentNode as HTMLTableRowElement;
    const table = row.parentNode as HTMLTableElement;
    const tbody = table.querySelector("tbody") || table;
    const rows = tbody.querySelectorAll("tr");
    const cellIndex = Array.from(row.cells).indexOf(
      cell as HTMLTableCellElement
    );

    rows.forEach((row) => {
      const newCell = document.createElement("td");
      newCell.style.border = "1px solid #ccc";
      newCell.style.padding = "8px";
      newCell.style.minWidth = "100px";
      newCell.textContent = "";

      if (position === "left") {
        row.insertBefore(newCell, row.cells[cellIndex]);
      } else {
        row.insertBefore(newCell, row.cells[cellIndex].nextSibling);
      }
    });
  };

  const deleteTableRow = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let cell = range.commonAncestorContainer;

    // Find the table cell
    while (cell && cell.nodeName !== "TD" && cell.nodeName !== "TH") {
      cell = cell.parentNode as Element;
    }

    if (!cell) return;

    const row = cell.parentNode as HTMLTableRowElement;
    const table = row.parentNode as HTMLTableElement;
    const tbody = table.querySelector("tbody") || table;

    if (tbody.rows.length > 1) {
      tbody.removeChild(row);
    }
  };

  const deleteTableColumn = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let cell = range.commonAncestorContainer;

    // Find the table cell
    while (cell && cell.nodeName !== "TD" && cell.nodeName !== "TH") {
      cell = cell.parentNode as Element;
    }

    if (!cell) return;

    const row = cell.parentNode as HTMLTableRowElement;
    const table = row.parentNode as HTMLTableElement;
    const tbody = table.querySelector("tbody") || table;
    const rows = tbody.querySelectorAll("tr");
    const cellIndex = Array.from(row.cells).indexOf(
      cell as HTMLTableCellElement
    );

    // Check if this is the last column
    if (row.cells.length > 1) {
      rows.forEach((row) => {
        row.removeChild(row.cells[cellIndex]);
      });
    }
  };

  // Hydration fix: move all random/date logic to useEffect or event handlers
  useEffect(() => {
    // On mount, pick a random cover image (client only)
    setCoverImage(coverImages[Math.floor(Math.random() * coverImages.length)]);

    // Load notes tree from API
    const loadNotesTree = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNotesTree();
        setNotesTree(data);
      } catch (err) {
        console.error("Failed to load notes tree:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNotesTree();
  }, []);

  // Update editor content when editingNote changes
  useEffect(() => {
    // React Quill handles content updates automatically
  }, [editingNote.content]);

  // Stats
  const totalFolders = notesTree.length;
  const totalNotes = notesTree.reduce((sum, f) => sum + f.children.length, 0);

  // Flat notes with search - handle both API search and local filtering
  const allNotes = notesTree
    .flatMap((folder) =>
      folder.children.map((note) => ({
        ...note,
        folder: folder.label,
        folderId: folder.id,
      }))
    )
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getPlainText(note.content)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        note.folder.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const changeCoverImage = () => {
    // Only runs on client
    const idx = Math.floor(Math.random() * coverImages.length);
    setCoverImage(coverImages[idx]);
  };

  const deleteNote = async (noteId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) {
      try {
        await deleteNoteAPI(noteId);

        // Update local state
        setNotesTree((prev) =>
          prev.map((folder) => ({
            ...folder,
            children: folder.children.filter((note) => note.id !== noteId),
          }))
        );

        if (selectedNote?.id === noteId) {
          setSelectedNote(null);
        }
      } catch (err) {
        console.error("Failed to delete note:", err);
        alert("Failed to delete note. Please try again.");
      }
    }
  };

  const editNote = (note: any) => {
    setEditingNote({
      id: note.id,
      title: note.title,
      content: note.content,
      folderId: note.folderId,
    });
    setIsEditMode(true);
  };

  const saveNote = async () => {
    if (!editingNote.title.trim() || !editingNote.content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    try {
      if (editingNote.id) {
        // Update existing note
        const updateData: UpdateNoteRequest = {
          title: editingNote.title,
          content: editingNote.content,
          folderId: editingNote.folderId,
        };

        const updatedNote = await updateNote(editingNote.id, updateData);

        // Update local state
        setNotesTree((prev) =>
          prev.map((folder) => ({
            ...folder,
            children: folder.children.map((note) =>
              note.id === editingNote.id
                ? {
                    id: updatedNote._id,
                    title: updatedNote.title,
                    content: updatedNote.content,
                    tags: updatedNote.tags,
                    isFavorite: updatedNote.isFavorite,
                    lastViewedAt: updatedNote.lastViewedAt,
                    createdAt: updatedNote.createdAt,
                    updatedAt: updatedNote.updatedAt,
                  }
                : note
            ),
          }))
        );
      } else {
        // Create new note
        const noteData: CreateNoteRequest = {
          title: editingNote.title,
          content: editingNote.content,
          folderId: editingNote.folderId,
        };

        const newNote = await createNote(noteData);

        // Add to local state
        const newNoteForTree = {
          id: newNote._id,
          title: newNote.title,
          content: newNote.content,
          tags: newNote.tags,
          isFavorite: newNote.isFavorite,
          lastViewedAt: newNote.lastViewedAt,
          createdAt: newNote.createdAt,
          updatedAt: newNote.updatedAt,
        };

        setNotesTree((prev) =>
          prev.map((folder) =>
            folder.id === editingNote.folderId
              ? { ...folder, children: [newNoteForTree, ...folder.children] }
              : folder
          )
        );
      }

      setIsEditMode(false);
      setShowAddModal(false);
      setEditingNote({ id: undefined, title: "", content: "", folderId: "" });
    } catch (err) {
      console.error("Failed to save note:", err);
      alert("Failed to save note. Please try again.");
    }
  };

  const addNewNote = (folderId: string) => {
    setEditingNote({ id: undefined, title: "", content: "", folderId });
    setIsEditMode(true);
    setShowAddModal(true);
  };

  const addNewFolder = async () => {
    if (newFolderName.trim()) {
      try {
        const folderData: CreateNoteFolderRequest = {
          label: newFolderName.trim(),
          color: "#6B7280",
          icon: "folder",
        };

        const newFolder = await createNoteFolder(folderData);

        // Add to local state
        const newTreeFolder: NotesTree = {
          id: newFolder._id,
          label: newFolder.label,
          color: newFolder.color,
          icon: newFolder.icon,
          isDefault: newFolder.isDefault,
          sortOrder: newFolder.sortOrder,
          createdAt: newFolder.createdAt,
          updatedAt: newFolder.updatedAt,
          children: [],
        };

        setNotesTree((prev) => [newTreeFolder, ...prev]);
        setNewFolderName("");
        setShowAddFolderModal(false);
      } catch (err) {
        console.error("Failed to create folder:", err);
        alert("Failed to create folder. Please try again.");
      }
    }
  };

  const deleteFolder = async (folderId: string) => {
    try {
      await deleteNoteFolder(folderId);

      // Remove from local state
      setNotesTree((prev) => prev.filter((f) => f.id !== folderId));
      setShowDeleteFolderModal(null);

      // If currently viewing a note from deleted folder, clear selection
      if (selectedNote) {
        const folderToDelete = notesTree.find((f) => f.id === folderId);
        if (folderToDelete?.children.some((n) => n.id === selectedNote.id)) {
          setSelectedNote(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete folder:", err);
      alert("Failed to delete folder. Please try again.");
    }
  };

  const viewNoteDetail = (note: any) => {
    setSelectedNote(note);
  };

  return (
    <UserLayout
      title="Ghi chú cá nhân"
      description="Lưu trữ, tổ chức và quản lý ghi chú thông minh với Rich Text Editor"
      icon={<BookOpen className="w-8 h-8 text-white" />}
      coverImage={coverImage}
      onCoverImageChange={changeCoverImage}
    >
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm ghi chú..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddFolderModal(true)}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Thêm thư mục</span>
          </button>
          <button
            onClick={() => addNewNote(notesTree[0]?.id)}
            disabled={isLoading || notesTree.length === 0}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Thêm ghi chú</span>
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <div className="text-pink-400 font-medium">Loading notes...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="text-red-500 font-medium mb-2">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-lg p-6 text-center">
              <Folder className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {totalFolders}
              </div>
              <div className="text-sm text-gray-600">Thư mục</div>
            </div>
            <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-lg p-6 text-center">
              <StickyNote className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {totalNotes}
              </div>
              <div className="text-sm text-gray-600">Ghi chú</div>
            </div>
            <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {allNotes.filter((note) => note.isFavorite).length}
              </div>
              <div className="text-sm text-gray-600">Yêu thích</div>
            </div>
            <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-lg p-6 text-center">
              <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {
                  allNotes.filter((note) => {
                    const noteDate = new Date(note.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return noteDate >= weekAgo;
                  }).length
                }
              </div>
              <div className="text-sm text-gray-600">Tuần này</div>
            </div>
          </div>

          {/* Folders and Notes */}
          <div className="space-y-8">
            {notesTree.map((folder) => (
              <div key={folder.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Folder className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {folder.label}
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {folder.children.length} ghi chú
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addNewNote(folder.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Thêm ghi chú
                    </button>
                    {!folder.isDefault && (
                      <button
                        onClick={() => setShowDeleteFolderModal(folder.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-all"
                        title="Xóa thư mục"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {folder.children
                    .filter(
                      (note) =>
                        note.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        getPlainText(note.content)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((note) => (
                      <div
                        key={note.id}
                        className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group rounded-lg overflow-hidden"
                      >
                        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <StickyNote className="w-5 h-5 text-blue-400" />
                              <h3 className="text-lg font-bold text-gray-900 truncate">
                                {note.title}
                              </h3>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() =>
                                  editNote({ ...note, folderId: folder.id })
                                }
                                className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-all"
                                title="Chỉnh sửa"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 py-4 flex flex-col">
                          <div className="text-xs text-blue-500 mb-3 font-semibold uppercase tracking-wide flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {folder.label}
                          </div>
                          <div className="text-gray-700 text-sm mb-4 min-h-[80px] line-clamp-4">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  getPlainText(note.content).length > 120
                                    ? `${getPlainText(note.content).substring(
                                        0,
                                        120
                                      )}...`
                                    : note.content,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(note.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                            <button
                              onClick={() =>
                                viewNoteDetail({
                                  ...note,
                                  folder: folder.label,
                                })
                              }
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 hover:bg-blue-50 rounded transition-all"
                            >
                              <FileText className="w-3 h-3" />
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!isLoading && !error && allNotes.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không tìm thấy kết quả
              </h3>
              <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}

          {/* Empty State - No folders */}
          {!isLoading && !error && notesTree.length === 0 && (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chưa có thư mục nào
              </h3>
              <p className="text-gray-500 mb-4">
                Tạo thư mục đầu tiên để bắt đầu ghi chú
              </p>
              <button
                onClick={() => setShowAddFolderModal(true)}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <FolderPlus className="w-5 h-5 inline mr-2" />
                Tạo thư mục
              </button>
            </div>
          )}
        </>
      )}

      {/* Enhanced Rich Text Editor Modal */}
      {(isEditMode || showAddModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingNote.id ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
              </h3>
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setShowAddModal(false);
                  setEditingNote({ title: "", content: "", folderId: "" });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập tiêu đề ghi chú..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thư mục
                </label>
                <select
                  value={editingNote.folderId}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, folderId: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {notesTree.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nội dung
                  </label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setEditorMode("edit")}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${
                        editorMode === "edit"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${
                        editorMode === "preview"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  </div>
                </div>

                {editorMode === "edit" && (
                  <div className="space-y-2">
                    {/* Simple Rich Text Editor */}
                    <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                      {/* Toolbar */}
                      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
                        <button
                          type="button"
                          onClick={() => formatText("undo")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Undo"
                        >
                          <Undo className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("redo")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Redo"
                        >
                          <Redo className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => formatText("bold")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Bold"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("italic")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Italic"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("underline")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Underline"
                        >
                          <span className="font-bold text-sm">U</span>
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => formatText("formatBlock", "h1")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Heading 1"
                        >
                          <Heading1 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("formatBlock", "h2")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Heading 2"
                        >
                          <Heading2 className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => formatText("insertUnorderedList")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("insertOrderedList")}
                          className="px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                          title="Numbered List"
                        >
                          1.
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => insertTable()}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Insert Table"
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableRow("above")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Add Row Above"
                        >
                          <PlusRow className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableRow("below")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Add Row Below"
                        >
                          <PlusRow className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableColumn("left")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Add Column Left"
                        >
                          <PlusCol className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableColumn("right")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Add Column Right"
                        >
                          <PlusCol className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTableRow()}
                          className="p-2 rounded hover:bg-red-200 transition-colors"
                          title="Delete Row"
                        >
                          <MinusRow className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTableColumn()}
                          className="p-2 rounded hover:bg-red-200 transition-colors"
                          title="Delete Column"
                        >
                          <MinusCol className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => insertLink()}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Insert Link"
                        >
                          <Link className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1" />
                        <button
                          type="button"
                          onClick={() => formatText("justifyLeft")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Align Left"
                        >
                          <span className="text-sm">⬅</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("justifyCenter")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Align Center"
                        >
                          <span className="text-sm">⬌</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("justifyRight")}
                          className="p-2 rounded hover:bg-gray-200 transition-colors"
                          title="Align Right"
                        >
                          <span className="text-sm">➡</span>
                        </button>
                      </div>

                      {/* Editor */}
                      <div
                        contentEditable
                        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
                        onInput={(e) => {
                          const content = e.currentTarget.innerHTML;
                          setEditingNote((prev) => ({ ...prev, content }));
                        }}
                        dangerouslySetInnerHTML={{
                          __html: editingNote.content,
                        }}
                      />
                    </div>
                  </div>
                )}

                {editorMode === "preview" && (
                  <div className="border border-gray-300 rounded-lg p-3 h-48 overflow-y-auto bg-gray-50">
                    {editingNote.content ? (
                      <div
                        className="prose prose-sm max-w-none [&_table]:border-collapse [&_table]:table [&_table]:w-full [&_table]:table-fixed [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:font-bold"
                        dangerouslySetInnerHTML={{
                          __html: editingNote.content,
                        }}
                      />
                    ) : (
                      <p className="text-gray-400 italic">
                        Nhập nội dung để xem preview...
                      </p>
                    )}
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-2">
                  <strong>Rich Text Features:</strong> Undo/Redo, Bold, Italic,
                  Underline, Headings, Lists, Tables (insert/add/delete
                  rows/columns), Links, Text alignment
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setShowAddModal(false);
                  setEditingNote({ title: "", content: "", folderId: "" });
                }}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={saveNote}
                disabled={
                  !editingNote.title.trim() ||
                  !editingNote.content.trim() ||
                  !editingNote.folderId ||
                  isLoading
                }
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {editingNote.id ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Folder Modal */}
      {showAddFolderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Thêm thư mục mới
              </h3>
              <button
                onClick={() => {
                  setShowAddFolderModal(false);
                  setNewFolderName("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập tên thư mục..."
                onKeyPress={(e) => e.key === "Enter" && addNewFolder()}
              />
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowAddFolderModal(false);
                  setNewFolderName("");
                }}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={addNewFolder}
                disabled={!newFolderName.trim() || isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FolderPlus className="w-4 h-4" />
                Thêm thư mục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center gap-3">
                <StickyNote className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedNote.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Layers className="w-4 h-4" />
                <span>{selectedNote.folder}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(selectedNote.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div
                className="prose prose-sm max-w-none [&_table]:border-collapse [&_table]:table [&_table]:w-full [&_table]:table-fixed [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_th]:bg-gray-50 [&_th]:font-bold"
                dangerouslySetInnerHTML={{
                  __html: selectedNote.content,
                }}
              />
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  editNote({
                    ...selectedNote,
                    folderId: selectedNote.folderId,
                  });
                  setSelectedNote(null);
                }}
                className="flex items-center gap-2 px-6 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Folder Confirmation Modal */}
      {showDeleteFolderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-red-700">
                Xác nhận xóa thư mục
              </h3>
              <button
                onClick={() => setShowDeleteFolderModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-gray-600 mb-4">
                Bạn có chắc chắn muốn xóa thư mục này? Tất cả ghi chú bên trong
                sẽ bị xóa vĩnh viễn.
              </div>
              <div className="text-sm text-gray-500">
                Hành động này không thể hoàn tác.
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowDeleteFolderModal(null)}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={() => deleteFolder(showDeleteFolderModal)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Xóa thư mục
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
