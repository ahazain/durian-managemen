import React from "react";
import { ImageIcon } from "lucide-react";
import { DurianPrediction } from "../../types";
import {
  formatDateTime,
  formatRupiah,
  getQualityColorClass,
} from "../../utils/formatters";

interface DurianPredictionHistoryProps {
  predictions: DurianPrediction[];
}

export const DurianPredictionHistory: React.FC<
  DurianPredictionHistoryProps
> = ({ predictions }) => {
  return (
    <div className="space-y-4">
      {predictions.length > 0 ? (
        predictions.map((pred) => (
          <div
            key={pred.id}
            className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0"
          >
            <div className="mr-3 w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
              <img
                src={pred.imageUrl}
                alt="Durian"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getQualityColorClass(
                        pred.quality
                      )}`}
                    >
                      {pred.quality}
                    </span>
                    <span className="ml-2 text-sm text-blue-600 font-medium">
                      {formatRupiah(pred.predictedPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(pred.submittedAt)}
                  </p>
                  {pred.confidence !== undefined && (
                    <p className="text-xs text-gray-500">
                      Confidence: {(pred.confidence * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No predictions yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload a durian image to get quality predictions.
          </p>
        </div>
      )}
    </div>
  );
};
