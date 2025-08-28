// Re-export all types and functions from modular services
// This maintains backward compatibility while organizing code better

// Export all types
export * from "./types";

// Export user-related services
export * from "./user-service";

// Export task-related services  
export * from "./task-service";

// Export goal-related services
export * from "./goal-service";

// Export finance-related services
export * from "./finance-service";

// Export note-related services
export * from "./note-service";

// Keep API_URL accessible at root level for convenience
export { API_URL } from "./types";