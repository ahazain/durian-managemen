import React, { useState, useEffect } from "react";
import { DurianPrediction } from "../../types";
import { Activity, Award, DollarSign, Percent } from "lucide-react";
import { formatRupiah } from "../../utils/formatters";

interface DurianPredictionResultProps {
  prediction: DurianPrediction;
}

// Helper function to get quality color class
const getQualityColorClass = (quality: string) => {
  switch (quality) {
    case "A":
      return "bg-green-100 text-green-800 border-green-300";
    case "B":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "C":
      return "bg-amber-100 text-amber-800 border-amber-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

// Helper function to get quality gradient colors
const getQualityGradient = (quality: string) => {
  switch (quality) {
    case "A":
      return "from-green-500 to-green-700";
    case "B":
      return "from-blue-500 to-blue-700";
    case "C":
      return "from-amber-500 to-amber-700";
    default:
      return "from-gray-500 to-gray-700";
  }
};

export const DurianPredictionResult: React.FC<DurianPredictionResultProps> = ({
  prediction,
}) => {
  const [showScanner, setShowScanner] = useState(true);

  // Hide scanner effect after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScanner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Get quality color class for gradients
  const qualityColor = getQualityGradient(prediction.quality);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="relative w-full rounded-xl overflow-hidden shadow-md mb-4 aspect-[4/3]">
          <img
            src={prediction.imageUrl}
            alt="Uploaded durian"
            className="w-full h-full object-cover"
          />

          {/* AI Scanner visual effect */}
          {showScanner && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-scanner"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 animate-scan-line"></div>
            </>
          )}

          {/* Bounding box overlay with animated reveal */}
          {prediction.bbox && (
            <div
              className="absolute border-2 border-blue-500 pointer-events-none animate-pulse-subtle"
              style={{
                left: `${prediction.bbox.xmin}px`,
                top: `${prediction.bbox.ymin}px`,
                width: `${prediction.bbox.xmax - prediction.bbox.xmin}px`,
                height: `${prediction.bbox.ymax - prediction.bbox.ymin}px`,
                boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
              }}
            >
              {/* Corners for visual effect */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-blue-500"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-blue-500"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-blue-500"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Quality and Label badge */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <div
              className={`flex items-center px-3 py-1.5 rounded-full text-white font-bold text-lg shadow-lg bg-gradient-to-r ${qualityColor}`}
            >
              <Award size={18} className="mr-1" />
              Grade {prediction.quality}
            </div>
            {prediction.label && (
              <div className="bg-white/90 px-3 py-1.5 rounded-full text-gray-800 font-medium shadow-lg backdrop-blur-sm">
                {prediction.label}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-5 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Activity size={18} className="mr-2 text-blue-600" />
            AI Analysis Results
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Quality Assessment
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-2xl font-bold rounded-lg ${getQualityColorClass(
                      prediction.quality
                    )}`}
                  >
                    {prediction.quality}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {prediction.label}
                  </span>
                </div>
                {prediction.confidence !== undefined && (
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-sm text-gray-600">
                      <Percent size={14} className="mr-1" />
                      <span>Confidence</span>
                    </div>
                    <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      {Math.round(prediction.confidence * 100)}%
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Market Value
              </div>
              <div className="flex items-center">
                <DollarSign size={20} className="text-green-600 mr-1" />
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-700 bg-clip-text text-transparent">
                  {formatRupiah(prediction.predictedPrice)}
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Based on current market analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
