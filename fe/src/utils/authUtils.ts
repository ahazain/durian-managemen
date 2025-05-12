/**
 * Utility functions for authentication-related operations
 */

/**
 * Extracts the authentication token from localStorage
 * @returns The authentication token or null if not found
 */
export const getAuthToken = (): string | null => {
  const userString = localStorage.getItem("durianAppUser");
  if (!userString) return null;

  try {
    const userData = JSON.parse(userString);
    return userData.token || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Creates authentication headers with Bearer token
 * @returns Headers object with Content-Type and Authorization (if token exists)
 */
export const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Verifies if the current user has a valid token
 * @returns Boolean indicating if the user has a valid token
 */
export const hasValidToken = (): boolean => {
  return getAuthToken() !== null;
};
