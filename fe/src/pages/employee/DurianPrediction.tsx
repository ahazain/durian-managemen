import React, { useState } from 'react';
import { ImageIcon, RefreshCw } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ImageUpload } from '../../components/common/ImageUpload';
import { DurianPrediction } from '../../types';
import { format } from 'date-fns';

export const EmployeeDurianPrediction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<DurianPrediction | null>(null);
  const [predictions, setPredictions] = useState<DurianPrediction[]>([]);
  
  // Mock prediction history
  const mockPredictionHistory: DurianPrediction[] = [
    {
      id: '1',
      imageUrl: 'https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800',
      quality: 'A',
      predictedPrice: 85000,
      submittedBy: 'Sample Employee',
      submittedAt: '2025-05-09T14:30:00',
    },
    {
      id: '2',
      imageUrl: 'https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800',
      quality: 'B',
      predictedPrice: 65000,
      submittedBy: 'Sample Employee',
      submittedAt: '2025-05-08T11:20:00',
    },
    {
      id: '3',
      imageUrl: 'https://images.pexels.com/photos/7474297/pexels-photo-7474297.jpeg?auto=compress&cs=tinysrgb&w=800',
      quality: 'C',
      predictedPrice: 45000,
      submittedBy: 'Sample Employee',
      submittedAt: '2025-05-07T09:45:00',
    },
  ];
  
  // Set initial history
  React.useEffect(() => {
    setPredictions(mockPredictionHistory);
  }, []);
  
  const handleUpload = (file: File) => {
    setLoading(true);
    setPrediction(null);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Generate random quality
      const qualities = ['A', 'B', 'C', 'D'];
      const quality = qualities[Math.floor(Math.random() * qualities.length)] as 'A' | 'B' | 'C' | 'D';
      
      // Generate price based on quality
      let price;
      switch (quality) {
        case 'A':
          price = Math.floor(Math.random() * 20000) + 70000;
          break;
        case 'B':
          price = Math.floor(Math.random() * 20000) + 50000;
          break;
        case 'C':
          price = Math.floor(Math.random() * 20000) + 30000;
          break;
        case 'D':
          price = Math.floor(Math.random() * 20000) + 10000;
          break;
      }
      
      // Create prediction
      const newPrediction: DurianPrediction = {
        id: String(Date.now()),
        imageUrl: URL.createObjectURL(file),
        quality,
        predictedPrice: price,
        submittedBy: 'Sample Employee',
        submittedAt: new Date().toISOString(),
      };
      
      setPrediction(newPrediction);
      setPredictions(prev => [newPrediction, ...prev]);
      setLoading(false);
    }, 2000);
  };
  
  const resetPrediction = () => {
    setPrediction(null);
  };
  
  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Durian Quality Prediction</h1>
        <p className="text-gray-600">Upload durian images to predict quality and estimate price.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload and Prediction */}
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
        
        {/* Prediction History */}
        <Card title="Prediction History">
          <div className="space-y-4">
            {predictions.length > 0 ? (
              predictions.map((pred) => (
                <div key={pred.id} className="flex border-b border-gray-200 pb-4 last:border-0 last:pb-0">
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
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            pred.quality === 'A' ? 'bg-green-100 text-green-800' :
                            pred.quality === 'B' ? 'bg-blue-100 text-blue-800' :
                            pred.quality === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Quality {pred.quality}
                          </span>
                          <span className="ml-2 text-sm text-durian-yellow-600 font-medium">
                            Rp {pred.predictedPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateTime(pred.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No predictions yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a durian image to get quality predictions.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};