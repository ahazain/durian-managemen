import React, { useState } from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import { Button } from './Button';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  loading?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, loading = false }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call onUpload callback
    onUpload(file);
  };
  
  return (
    <div className="w-full">
      <div className="mb-4">
        <div
          className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-64 ${
            error ? 'border-red-400' : 'border-gray-300 hover:border-durian-500'
          } transition-colors duration-200`}
        >
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                type="button"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Click or drag and drop to upload an image
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            accept="image/*"
            disabled={loading}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <Button
        type="button"
        variant="primary"
        fullWidth
        loading={loading}
        icon={<Upload size={16} />}
        onClick={() => document.querySelector('input[type="file"]')?.click()}
      >
        Upload Durian Image
      </Button>
    </div>
  );
};