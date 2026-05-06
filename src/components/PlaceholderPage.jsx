import React from 'react';
import Header from './Header';
import './PlaceholderPage.css';

const PlaceholderPage = ({ title, icon: Icon, description }) => {
  return (
    <>
      <Header />
      <div className="placeholder-page">
        <div className="placeholder-content">
          <div className="icon-wrapper">
            <Icon size={48} color="#95cbe1" strokeWidth={1.5} />
          </div>
          <h2 className="placeholder-title">{title}</h2>
          <p className="placeholder-desc">{description}</p>
        </div>
      </div>
    </>
  );
};

export default PlaceholderPage;
