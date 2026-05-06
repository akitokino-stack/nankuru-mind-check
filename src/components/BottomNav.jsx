import React from 'react';
import './BottomNav.css';
import { Home, History, Search, User, Sparkles } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'ホーム' },
  { id: 'history', icon: History, label: '履歴' },
  { id: 'guardian', icon: Sparkles, label: '診断' },
  { id: 'insight', icon: Search, label: '洞察' },
  { id: 'profile', icon: User, label: 'プロフィール' },
];

const BottomNav = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div 
              key={item.id} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onChangeTab(item.id)}
            >
              <div className="nav-icon-wrapper">
                <Icon size={24} color={isActive ? '#5ba4cc' : '#a0aec0'} strokeWidth={isActive ? 2 : 1.5} />
              </div>
              <span className="nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
