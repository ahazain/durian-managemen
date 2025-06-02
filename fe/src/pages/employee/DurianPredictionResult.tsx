import React from "react";
import { DurianPrediction } from "../../types";
import { formatRupiah, getQualityColorClass } from "../../utils/formatters";

interface DurianPredictionResultProps {
  prediction: DurianPrediction;
}

export const DurianPredictionResult: React.FC<DurianPredictionResultProps> = ({
  prediction,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
        <div className="w-full rounded-lg overflow-hidden mb-4 max-h-64 relative">
          <img
            src={prediction.imageUrl}
            alt="Uploaded durian"
            className="w-full h-full object-contain"
          />

          {/* Bounding box overlay if available */}
          {prediction.bbox && (
            <div
              className="absolute border-2 border-blue-500 pointer-events-none"
              style={{
                left: `${prediction.bbox.xmin}px`,
                top: `${prediction.bbox.ymin}px`,
                width: `${prediction.bbox.xmax - prediction.bbox.xmin}px`,
                height: `${prediction.bbox.ymax - prediction.bbox.ymin}px`,
              }}
            ></div>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <p className="text-sm text-gray-500">Quality Grade</p>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full ${getQualityColorClass(
                    prediction.quality
                  )}`}
                >
                  {prediction.quality}
                </span>
                {prediction.confidence !== undefined && (
                  <span className="ml-2 text-xs text-gray-500">
                    {(prediction.confidence * 100).toFixed(1)}% confidence
                  </span>
                )}
              </div>
              {prediction.label && (
                <p className="text-sm text-gray-600 mt-1">{prediction.label}</p>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Estimated Price</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatRupiah(prediction.predictedPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
