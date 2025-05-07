import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Edit2, Save } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../contexts/AuthContext';

export const EmployeeAccount: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Personal Info Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });
  
  // Password Change Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (formData.phoneNumber && !/^\+?[0-9\s-]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number format is invalid';
    }
    
    return newErrors;
  };
  
  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmitPersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validatePersonalInfo();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // In a real app, this would submit to an API
    console.log('Updated personal info:', formData);
    setIsEditing(false);
  };
  
  const handleSubmitPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validatePasswordChange();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // In a real app, this would submit to an API
    console.log('Password change request:', passwordData);
    setShowPasswordForm(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  if (!user) return null;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
        <p className="text-gray-600">View and update your account information.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-durian-100">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-sm text-durian-600 mt-1 capitalize">{user.role}</p>
            
            <div className="mt-6 w-full">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-500 flex items-center">
                  <Mail size={16} className="mr-2" />
                  Email
                </span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-500 flex items-center">
                  <Phone size={16} className="mr-2" />
                  Phone
                </span>
                <span className="text-gray-800">{user.phoneNumber || '-'}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 flex items-center">
                  <User size={16} className="mr-2" />
                  Member Since
                </span>
                <span className="text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Account Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card title="Personal Information">
            <form onSubmit={handleSubmitPersonalInfo}>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  icon={<User size={18} />}
                  disabled={!isEditing}
                  error={errors.fullName}
                />
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail size={18} />}
                  disabled={!isEditing}
                  error={errors.email}
                />
                
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleChange}
                  icon={<Phone size={18} />}
                  disabled={!isEditing}
                  error={errors.phoneNumber}
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      icon={<Save size={18} />}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    icon={<Edit2 size={18} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Card>
          
          {/* Password Change */}
          <Card title="Password">
            {showPasswordForm ? (
              <form onSubmit={handleSubmitPasswordChange}>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.currentPassword}
                  />
                  
                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.newPassword}
                  />
                  
                  <Input
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    icon={<Lock size={18} />}
                    error={errors.confirmPassword}
                  />
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Change your password to keep your account secure.
                </p>
                <Button
                  variant="outline"
                  icon={<Lock size={18} />}
                  onClick={() => setShowPasswordForm(true)}
                >
                  Change Password
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};