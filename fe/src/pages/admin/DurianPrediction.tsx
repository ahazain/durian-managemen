import React, { useState } from 'react';
import { ImageIcon, RefreshCw, DollarSign } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ImageUpload } from '../../components/common/ImageUpload';
import { DurianPrediction } from '../../types';

export const AdminDurianPrediction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<DurianPrediction | null>(null);
  
  // Mock durian quality price references
  const qualityPrices = [
    { quality: 'A', priceRange: 'Rp 70,000 - Rp 90,000', description: 'Premium quality, perfect ripeness, excellent aroma' },
    { quality: 'B', priceRange: 'Rp 50,000 - Rp 70,000', description: 'Good quality, proper ripeness, good aroma' },
    { quality: 'C', priceRange: 'Rp 30,000 - Rp 50,000', description: 'Average quality, slightly under/over ripe' },
    { quality: 'D', priceRange: 'Rp 10,000 - Rp 30,000', description: 'Low quality, unripe or overripe, weak aroma' },
  ];
  
  const handleUpload = (file: File) => {
    setLoading(true);
    setPrediction(null);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Mock prediction response
      const mockPrediction: DurianPrediction = {
        id: String(Date.now()),
        imageUrl: URL.createObjectURL(file),
        quality: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as 'A' | 'B' | 'C' | 'D',
        predictedPrice: Math.floor(Math.random() * 80000) + 10000,
        submittedBy: 'Admin User',
        submittedAt: new Date().toISOString(),
      };
      
      setPrediction(mockPrediction);
      setLoading(false);
    }, 2000);
  };
  
  const resetPrediction = () => {
    setPrediction(null);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Durian Quality Prediction</h1>
        <p className="text-gray-600">Upload durian images to predict quality and estimate price.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left side: Upload and prediction */}
        <div className="lg:col-span-3">
          <Card title="Upload Durian Image">
            {!prediction ? (
              <ImageUpload onUpload={handleUpload} loading={loading} />
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
                  <div className="w-full rounded-lg overflow-hidden mb-4 max-h-64">
                    <img 
                      src={prediction.imageUrl} 
                      alt="Uploaded durian" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-500">Quality Grade</p>
                        <p className="text-2xl font-bold text-durian-800">{prediction.quality}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm text-gray-500">Estimated Price</p>
                        <p className="text-2xl font-bold text-durian-yellow-600">
                          Rp {prediction.predictedPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  icon={<RefreshCw size={16} />}
                  onClick={resetPrediction}
                >
                  Predict Another Durian
                </Button>
              </div>
            )}
          </Card>
        </div>
        
        {/* Right side: Price reference */}
        <div className="lg:col-span-2">
          <Card title="Quality Price Reference">
            <div className="space-y-4">
              {qualityPrices.map((item) => (
                <div 
                  key={item.quality}
                  className={`p-3 rounded-lg ${
                    prediction && prediction.quality === item.quality
                      ? 'bg-durian-100 border border-durian-300'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`text-xl font-bold mr-3 ${
                      prediction && prediction.quality === item.quality
                        ? 'text-durian-700'
                        : 'text-gray-700'
                    }`}>
                      {item.quality}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Quality Grade</span>
                        <span className="text-durian-yellow-600 font-medium">{item.priceRange}</span>
                      </div>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Price Factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Durian variety (Monthong, D24, Musang King)</li>
                <li>Ripeness level</li>
                <li>Aroma intensity</li>
                <li>Size and weight</li>
                <li>Seasonal availability</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};