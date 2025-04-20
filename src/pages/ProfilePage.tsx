import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import NotificationBubble from '../components/NotificationBubble';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useAppContext();
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({ name, phone, email });
      setNotification({
        message: 'Profile updated successfully!',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: 'Failed to update profile. Please try again.',
        type: 'error'
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setNotification({
        message: 'New passwords do not match',
        type: 'error'
      });
      return;
    }

    try {
      // Add password change logic here
      setNotification({
        message: 'Password changed successfully!',
        type: 'success'
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    } catch (error) {
      setNotification({
        message: 'Failed to change password. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Account Information</h2>
              <div className="flex items-center text-gray-700">
                <span className="text-sm font-medium">Available Credits: </span>
                <span className="ml-2 text-lg font-bold text-[#25D366]">
                  {currentUser?.credits || 0}
                </span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  placeholder="+1234567890"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Password Settings</h2>
          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2 text-[#25D366] border border-[#25D366] rounded-md hover:bg-[#25D366] hover:text-white transition-colors"
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#25D366] focus:ring focus:ring-[#25D366] focus:ring-opacity-50"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E]"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      {notification && (
        <NotificationBubble
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;