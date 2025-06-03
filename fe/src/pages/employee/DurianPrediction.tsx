import React, { useState, useEffect } from "react";
import { RefreshCw, AlertCircle, Brain, Layers } from "lucide-react";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { ImageUpload } from "../../components/common/ImageUpload";
import { DurianPredictionResult } from "./DurianPredictionResult";
import { DurianPredictionHistory } from "./DurianPredictionHistory";
import { DurianPrediction } from "../../types";
import { api } from "../../utils/api";
import { formatQuality } from "../../utils/formatters";

export const EmployeeDurianPrediction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<DurianPrediction | null>(null);
  const [predictions, setPredictions] = useState<DurianPrediction[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [aiProcessing, setAiProcessing] = useState<boolean>(false);
  const [aiProcessStage, setAiProcessStage] = useState<string>("");

  const handleUpload = async (file: File) => {
    // Reset state
    setLoading(true);
    setError(null);
    setPrediction(null);
    setUploadProgress(0);
    setAiProcessing(true);

    try {
      // Initial upload progress
      setUploadProgress(10);
      setAiProcessStage("Initializing AI analysis...");

      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });

        // Update AI process stage
        if (uploadProgress < 30) {
          setAiProcessStage("Analyzing durian shape and texture...");
        } else if (uploadProgress < 60) {
          setAiProcessStage("Processing quality indicators...");
        } else {
          setAiProcessStage("Finalizing analysis...");
        }
      }, 500);

      // Call the API with the uploaded image
      const response = await api.postDurian(file);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setAiProcessStage("Analysis complete!");

      // Handle API response validation
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

      // Validate result structure
      if (!result || typeof result !== "object") {
        throw new Error("Format hasil prediksi tidak valid");
      }

      // Handle "not durian" case
      if (result.label === "not durian") {
        throw new Error(
          "Gambar yang diunggah bukan durian. Silakan coba gambar durian yang lain."
        );
      }

      // Create URL for preview
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

      setPrediction(newPrediction);
      setPredictions((prev) => [newPrediction, ...prev]);
    } catch (err) {
      console.error("Error during prediction:", err);

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
      setTimeout(() => {
        setAiProcessing(false);
        setAiProcessStage("");
      }, 500);
    }
  };

  const resetPrediction = () => {
    if (prediction?.imageUrl && prediction.imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(prediction.imageUrl);
    }
    setPrediction(null);
    setError(null);
    setUploadProgress(0);
    setAiProcessing(false);
    setAiProcessStage("");
  };

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
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center mb-2 space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg text-white shadow-lg">
            <Brain size={24} className="animate-pulse" />
            <div className="absolute inset-0 bg-white opacity-30 rounded-lg animate-ping-slow"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-700 text-transparent bg-clip-text">
            Prediksi Kualitas Durian
          </h1>
        </div>
        <p className="text-gray-600 ml-[52px]">
          Mesin AI kami menganalisis gambar durian untuk memprediksi kualitas
          dan memperkirakan harga pasar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Durian AI Analysis"
          className={`transform transition-all duration-500 ${
            aiProcessing ? "border-blue-500 shadow-blue-glow" : ""
          }`}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-2 animate-fade-in">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading && uploadProgress > 0 && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="relative">
                  <Brain size={18} className="text-blue-600" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
                </div>
                <span className="font-medium">{aiProcessStage}</span>
              </div>

              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
                <div className="absolute top-0 left-0 h-full w-full opacity-20">
                  <div className="h-full w-20 bg-white animate-shimmer"></div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {["xmin", "xmax", "ymin", "ymax"].map((feature, index) => (
                  <div
                    key={feature}
                    className={`text-xs px-2 py-1 rounded-full border ${
                      uploadProgress > index * 25
                        ? "bg-blue-100 border-blue-300 text-blue-800"
                        : "bg-gray-100 border-gray-200 text-gray-500"
                    } transition-all duration-300`}
                  >
                    {feature}
                  </div>
                ))}
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
                Analyze Another Durian
              </Button>
            </div>
          )}
        </Card>

        <Card title="Analysis History" className="h-fit">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <div className="flex items-center text-green-700 font-medium">
              <Layers size={16} className="mr-1" />
              <span>AI Insights</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">
              {predictions.length} previous analyses
            </span>
          </div>
          <DurianPredictionHistory predictions={predictions} />
        </Card>
      </div>
    </div>
  );
};
