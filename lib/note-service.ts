import { API_URL } from "./types";
import { authService } from "./auth-service";

/**
 * Get authenticated headers for API calls
 */
function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const token = authService.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

// Note Management Types
export interface NoteFolder {
    _id: string;
    label: string;
    color: string;
    icon: string;
    isDefault: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    folderId: string | NoteFolder;
    tags: string[];
    isArchived: boolean;
    isFavorite: boolean;
    lastViewedAt: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface NotesTree {
    id: string;
    label: string;
    color: string;
    icon: string;
    isDefault: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    children: {
        id: string;
        title: string;
        content: string;
        tags: string[];
        isFavorite: boolean;
        lastViewedAt: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

export interface CreateNoteFolderRequest {
    label: string;
    color?: string;
    icon?: string;
}

export interface UpdateNoteFolderRequest {
    label?: string;
    color?: string;
    icon?: string;
    sortOrder?: number;
}

export interface CreateNoteRequest {
    title: string;
    content: string;
    folderId: string;
    tags?: string[];
}

export interface UpdateNoteRequest {
    title?: string;
    content?: string;
    folderId?: string;
    tags?: string[];
    isFavorite?: boolean;
    isArchived?: boolean;
}

export interface NoteStats {
    totalNotes: number;
    archivedNotes: number;
    favoriteNotes: number;
    totalFolders: number;
    recentNotes: number;
    notesByFolder: {
        _id: string;
        folderName: string;
        count: number;
    }[];
}

// ==================== FOLDER OPERATIONS ====================

/**
 * Get all note folders
 */
export async function getNoteFolders(): Promise<NoteFolder[]> {
    try {
        const response = await fetch(`${API_URL}/api/notes/folders`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch note folders: ${response.status} ${response.statusText}`
            );
        }

        const folders = await response.json();
        return Array.isArray(folders) ? folders : [];
    } catch (error) {
        console.error("Error fetching note folders:", error);
        throw error;
    }
}

/**
 * Create a new note folder
 */
export async function createNoteFolder(
    folderData: CreateNoteFolderRequest
): Promise<NoteFolder> {
    try {
        const response = await fetch(`${API_URL}/api/notes/folders`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(folderData),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create note folder: ${response.status} ${response.statusText}`
            );
        }

        const newFolder = await response.json();
        return newFolder;
    } catch (error) {
        console.error("Error creating note folder:", error);
        throw error;
    }
}

/**
 * Update a note folder
 */
export async function updateNoteFolder(
    folderId: string,
    updates: UpdateNoteFolderRequest
): Promise<NoteFolder> {
    try {
        const response = await fetch(`${API_URL}/api/notes/folders/${folderId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update note folder: ${response.status} ${response.statusText}`
            );
        }

        const updatedFolder = await response.json();
        return updatedFolder;
    } catch (error) {
        console.error("Error updating note folder:", error);
        throw error;
    }
}

/**
 * Delete a note folder (and all its notes)
 */
export async function deleteNoteFolder(folderId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/notes/folders/${folderId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete note folder: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error deleting note folder:", error);
        throw error;
    }
}

// ==================== NOTE OPERATIONS ====================

/**
 * Get all notes
 */
export async function getNotes(): Promise<Note[]> {
    try {
        const response = await fetch(`${API_URL}/api/notes`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch notes: ${response.status} ${response.statusText}`
            );
        }

        const notes = await response.json();
        return Array.isArray(notes) ? notes : [];
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}

/**
 * Get notes tree (folders with their notes)
 */
export async function getNotesTree(): Promise<NotesTree[]> {
    try {
        const response = await fetch(`${API_URL}/api/notes/tree`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch notes tree: ${response.status} ${response.statusText}`
            );
        }

        const notesTree = await response.json();
        return Array.isArray(notesTree) ? notesTree : [];
    } catch (error) {
        console.error("Error fetching notes tree:", error);
        throw error;
    }
}

/**
 * Get a single note by ID
 */
export async function getNote(noteId: string): Promise<Note> {
    try {
        const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch note: ${response.status} ${response.statusText}`
            );
        }

        const note = await response.json();
        return note;
    } catch (error) {
        console.error("Error fetching note:", error);
        throw error;
    }
}

/**
 * Get notes by folder ID
 */
export async function getNotesByFolder(folderId: string): Promise<Note[]> {
    try {
        const response = await fetch(`${API_URL}/api/notes/folder/${folderId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch notes by folder: ${response.status} ${response.statusText}`
            );
        }

        const notes = await response.json();
        return Array.isArray(notes) ? notes : [];
    } catch (error) {
        console.error("Error fetching notes by folder:", error);
        throw error;
    }
}

/**
 * Create a new note
 */
export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
    try {
        const response = await fetch(`${API_URL}/api/notes`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(noteData),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create note: ${response.status} ${response.statusText}`
            );
        }

        const newNote = await response.json();
        return newNote;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

/**
 * Update a note
 */
export async function updateNote(
    noteId: string,
    updates: UpdateNoteRequest
): Promise<Note> {
    try {
        const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update note: ${response.status} ${response.statusText}`
            );
        }

        const updatedNote = await response.json();
        return updatedNote;
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
}

/**
 * Delete a note
 */
export async function deleteNote(noteId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete note: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}

/**
 * Search notes
 */
export async function searchNotes(
    query: string,
    folderId?: string,
    tags?: string[]
): Promise<Note[]> {
    try {
        const params = new URLSearchParams({ q: query });
        if (folderId) params.append("folderId", folderId);
        if (tags && tags.length > 0) {
            tags.forEach((tag) => params.append("tags", tag));
        }

        const response = await fetch(
            `${API_URL}/api/notes/search?${params.toString()}`,
            {
                method: "GET",
                headers: getAuthHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to search notes: ${response.status} ${response.statusText}`
            );
        }

        const notes = await response.json();
        return Array.isArray(notes) ? notes : [];
    } catch (error) {
        console.error("Error searching notes:", error);
        throw error;
    }
}

/**
 * Get note statistics
 */
export async function getNoteStats(): Promise<NoteStats> {
    try {
        const response = await fetch(`${API_URL}/api/notes/stats`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch note stats: ${response.status} ${response.statusText}`
            );
        }

        const stats = await response.json();
        return stats;
    } catch (error) {
        console.error("Error fetching note stats:", error);
        throw error;
    }
}