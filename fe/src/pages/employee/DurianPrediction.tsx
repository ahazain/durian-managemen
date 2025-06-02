import React, { useState, useEffect } from "react";
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { ImageUpload } from "../../components/common/ImageUpload";
import { DurianPredictionResult } from "./DurianPredictionResult";
import { DurianPredictionHistory } from "./DurianPredictionHistory";
import { api } from "../../utils/api";
import { formatQuality } from "../../utils/formatters";
import { DurianPrediction, ApiPredictionResponse } from "../../types";

export const EmployeeDurianPrediction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<DurianPrediction | null>(null);
  const [predictions, setPredictions] = useState<DurianPrediction[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Mock prediction history
  const mockPredictionHistory: DurianPrediction[] = [
    {
      id: "1",
      imageUrl:
        "https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800",
      quality: "A",
      predictedPrice: 85000,
      submittedBy: "Sample Employee",
      submittedAt: "2025-05-09T14:30:00",
    },
    {
      id: "2",
      imageUrl:
        "https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800",
      quality: "B",
      predictedPrice: 65000,
      submittedBy: "Sample Employee",
      submittedAt: "2025-05-08T11:20:00",
    },
    {
      id: "3",
      imageUrl:
        "https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800",
      quality: "C",
      predictedPrice: 45000,
      submittedBy: "Sample Employee",
      submittedAt: "2025-05-07T09:45:00",
    },
  ];

  // Set initial history
  useEffect(() => {
    setPredictions(mockPredictionHistory);
  }, []);

  // Fungsi validasi file sebelum upload

  const handleUpload = async (file: File) => {
    // Reset state
    setLoading(true);
    setError(null);
    setPrediction(null);
    setUploadProgress(0);

    try {
      setUploadProgress(25);

      // Call the API with the uploaded image
      const response = await api.postDurian(file);

      setUploadProgress(75);

      console.log("API Response received:", response);

      // Handle API response dengan validasi yang lebih ketat
      if (!response) {
        throw new Error("Response kosong dari server");
      }

      if (!response.success) {
        throw new Error(response.message || "Prediksi gagal tanpa pesan error");
      }

      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        throw new Error("Tidak ada hasil prediksi yang ditemukan");
      }

      const result = response.data[0];

      // Validasi struktur result
      if (!result || typeof result !== "object") {
        throw new Error("Format hasil prediksi tidak valid");
      }

      // Create URL for preview dengan cleanup
      const imageUrl = URL.createObjectURL(file);

      // Create a prediction from the API result
      const newPrediction: DurianPrediction = {
        id: String(Date.now()),
        imageUrl,
        quality: formatQuality(result.grade, result.label),
        predictedPrice: result.harga || 0,
        submittedBy: "Current User",
        submittedAt: new Date().toISOString(),
        confidence: result.confidence,
        label: result.label,
        bbox:
          result.xmin !== undefined
            ? {
                xmin: result.xmin,
                ymin: result.ymin,
                xmax: result.xmax,
                ymax: result.ymax,
              }
            : undefined,
      };

      setUploadProgress(100);
      setPrediction(newPrediction);
      setPredictions((prev) => [newPrediction, ...prev]);

      console.log("Prediction successful:", newPrediction);
    } catch (err) {
      console.error("Error during prediction:", err);

      // Handle different types of errors
      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
          );
        } else if (err.message.includes("500")) {
          setError(
            "Server sedang bermasalah. Silakan coba lagi dalam beberapa menit."
          );
        } else if (err.message.includes("415")) {
          setError("Format file tidak didukung oleh server.");
        } else if (err.message.includes("timeout")) {
          setError(
            "Proses prediksi memakan waktu terlalu lama. Silakan coba lagi."
          );
        } else {
          setError(err.message || "Terjadi kesalahan tidak dikenal.");
        }
      } else {
        setError("Terjadi kesalahan tidak dikenal saat melakukan prediksi.");
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const resetPrediction = () => {
    // Cleanup object URL untuk mencegah memory leak
    if (prediction?.imageUrl && prediction.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(prediction.imageUrl);
    }

    setPrediction(null);
    setError(null);
    setUploadProgress(0);
  };

  // Cleanup URLs saat komponen unmount
  useEffect(() => {
    return () => {
      predictions.forEach((pred) => {
        if (pred.imageUrl && pred.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(pred.imageUrl);
        }
      });
    };
  }, [predictions]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Durian Quality Prediction
        </h1>
        <p className="text-gray-600">
          Upload durian images to predict quality and estimate price.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload and Prediction */}
        <Card title="Upload Durian Image">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading && uploadProgress > 0 && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} />
                <span>Processing... {uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {!prediction ? (
            <ImageUpload onUpload={handleUpload} loading={loading} />
          ) : (
            <div>
              <DurianPredictionResult prediction={prediction} />

              <Button
                variant="primary"
                fullWidth
                className="mt-4"
                icon={<RefreshCw size={16} />}
                onClick={resetPrediction}
              >
                Predict Another Durian
              </Button>
            </div>
          )}
        </Card>

        {/* Prediction History */}
        <Card title="Prediction History">
          <DurianPredictionHistory predictions={predictions} />
        </Card>
      </div>
    </div>
  );
};
