import React from 'react';
import './Header.css';
import { Bird } from 'lucide-react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        {/* Using Bird icon as a placeholder for the dove */}
        <Bird className="logo-icon" size={32} color="#5ba4cc" strokeWidth={1.5} />
      </div>
      <h1 className="app-title">マインドチェック</h1>
    </header>
  );
};

export default Header;
