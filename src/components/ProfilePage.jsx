import React, { useState } from 'react';
import Header from './Header';
import ProfileEditModal from './ProfileEditModal';
import FaqModal from './FaqModal';
import './ProfilePage.css';
import { User, Settings, ChevronRight, LogOut, HelpCircle } from 'lucide-react';

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  
  // プロフィール情報のステート
  const [profileName, setProfileName] = useState('ゲスト ユーザー');
  const [profileEmail, setProfileEmail] = useState('guest@nankuru-salon.example');
  const [profileImage, setProfileImage] = useState(null);

  const handleSaveProfile = (newName, newEmail, newImage) => {
    setProfileName(newName);
    setProfileEmail(newEmail);
    setProfileImage(newImage);
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <User size={40} color="#2c4a63" />
            )}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profileName}</h2>
            <p className="profile-email">{profileEmail}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-heading">アカウント設定</h3>
          
          <div className="settings-list">
            <div className="settings-item" onClick={() => setIsEditModalOpen(true)}>
              <div className="settings-item-left">
                <div className="settings-icon-bg"><Settings size={18} color="#4a5568" /></div>
                <span>プロフィール編集</span>
              </div>
              <ChevronRight size={20} color="#cbd5e0" />
            </div>

          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-heading">サポート</h3>
          
          <div className="settings-list">
            <div className="settings-item" onClick={() => setIsFaqModalOpen(true)}>
              <div className="settings-item-left">
                <div className="settings-icon-bg"><HelpCircle size={18} color="#4a5568" /></div>
                <span>よくある質問 / お問い合わせ</span>
              </div>
              <ChevronRight size={20} color="#cbd5e0" />
            </div>
          </div>
        </div>

        <button className="logout-button">
          <LogOut size={20} />
          <span>ログアウト</span>
        </button>

      </div>

      <ProfileEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        initialName={profileName}
        initialEmail={profileEmail}
        initialImage={profileImage}
        onSave={handleSaveProfile}
      />

      <FaqModal 
        isOpen={isFaqModalOpen} 
        onClose={() => setIsFaqModalOpen(false)} 
      />
    </>
  );
};

export default ProfilePage;
