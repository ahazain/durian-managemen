// api.ts - Perbaikan untuk predictDurianQuality function

import { ApiPredictionResponse } from "../types";

export const predictDurianQuality = async (
  file: File
): Promise<ApiPredictionResponse> => {
  try {
    console.log(
      "Sending file:",
      file.name,
      "Size:",
      file.size,
      "Type:",
      file.type
    );

    // Validasi file terlebih dahulu
    if (!file) {
      throw new Error("No file provided");
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPEG and PNG are allowed.");
    }

    // Validasi ukuran file (maksimal 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error("File size too large. Maximum 10MB allowed.");
    }

    // Buat FormData dengan benar
    const formData = new FormData();
    formData.append("image", file, file.name); // Pastikan key 'image' sesuai dengan backend

    // Log FormData untuk debugging
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Kirim request ke API
    const response = await fetch("http://localhost:3000/api/v1/predict", {
      // Sesuaikan dengan endpoint backend
      method: "POST",
      body: formData,
      headers: {
        // JANGAN set Content-Type untuk FormData, biarkan browser yang mengatur
        // 'Content-Type': 'multipart/form-data', // HAPUS INI
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Cek apakah response berhasil
    if (!response.ok) {
      // Coba ambil error message dari response
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        console.error("API Error Response:", errorData);
      } catch (parseError) {
        // Jika tidak bisa parse JSON, ambil text
        try {
          const errorText = await response.text();
          console.error("API Error Text:", errorText);
          errorMessage = errorText || errorMessage;
        } catch (textError) {
          console.error("Cannot parse error response:", textError);
        }
      }
      throw new Error(`API error: ${response.status} - ${errorMessage}`);
    }

    // Parse response JSON
    const result: ApiPredictionResponse = await response.json();
    console.log("API Response:", result);

    // Validasi struktur response
    if (!result || typeof result !== "object") {
      throw new Error("Invalid response format from API");
    }

    return result;
  } catch (error) {
    console.error("Error in predictDurianQuality:", error);

    // Re-throw error dengan informasi yang lebih jelas
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unknown error occurred during prediction");
    }
  }
};

// Alternative implementation dengan timeout menggunakan AbortController
export const predictDurianQualityWithTimeout = async (
  file: File,
  timeoutMs: number = 30000
): Promise<ApiPredictionResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3000/api/v1/predict", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(`API error: ${response.status} - ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error("Request timeout. Server took too long to respond.");
    }
    throw error;
  }
};

// Helper function untuk debugging network requests
export const testConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/health", { method: "GET" });
    return response.ok;
  } catch (error) {
    console.error("Connection test failed:", error);
    return false;
  }
};

// Helper function untuk debug FormData
export const logFormData = (formData: FormData): void => {
  console.log("FormData contents:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: new Date(value.lastModified).toISOString(),
      });
    } else {
      console.log(`${key}:`, value);
    }
  }
};

// Helper function untuk convert File ke base64 (jika diperlukan)
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

// Alternative implementation jika server mengharapkan base64
export const predictDurianQualityBase64 = async (
  file: File
): Promise<ApiPredictionResponse> => {
  try {
    const base64 = await fileToBase64(file);

    const response = await fetch("/api/predict-durian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image: base64,
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(`API error: ${response.status} - ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in predictDurianQualityBase64:", error);
    throw error;
  }
};
