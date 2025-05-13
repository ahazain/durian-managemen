/**
 * Utility functions for authentication-related operations
 */

interface DecodedToken {
  exp: number;
}

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

  // Check if token is expired before adding it to headers
  if (token && isTokenExpired(token)) {
    handleTokenExpiration();
    return { "Content-Type": "application/json" };
  }

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
  const token = getAuthToken();
  return token !== null && !isTokenExpired(token);
};

/**
 * Checks if the JWT token is expired
 * @param token The JWT token to check
 * @returns Boolean indicating if the token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    // Get the payload part of the JWT
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload)) as DecodedToken;

    // Check if the token has expired
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Treat invalid tokens as expired
  }
};

/**
 * Handles token expiration by clearing storage and redirecting to login
 */
export const handleTokenExpiration = (): void => {
  // Clear user data from storage
  localStorage.removeItem("durianAppUser");

  // Redirect to login page if not already there
  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/login";
  }
};
