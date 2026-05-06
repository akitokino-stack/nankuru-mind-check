import React, { useState, useRef, useEffect } from 'react';
import './ProfileEditModal.css';
import { X, Camera } from 'lucide-react';

const ProfileEditModal = ({ isOpen, onClose, initialName, initialEmail, initialImage, onSave }) => {
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [image, setImage] = useState(initialImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialName || '');
      setEmail(initialEmail || '');
      setImage(initialImage || null);
    }
  }, [isOpen, initialName, initialEmail, initialImage]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(name, email, image);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content profile-edit-content">
        <div className="modal-header">
          <h3 className="modal-title">プロフィール編集</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} color="#a0aec0" />
          </button>
        </div>
        
        <div className="edit-avatar-section" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
          <div className="edit-avatar-circle" style={{ overflow: 'hidden' }}>
            {image ? (
              <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera size={28} color="#a0aec0" />
            )}
          </div>
          <span className="edit-avatar-text">写真の変更</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">お名前 (ニックネーム)</label>
          <input 
            type="text" 
            className="form-input" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="なまえを入力..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">メールアドレス</label>
          <input 
            type="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSave}>保存する</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
