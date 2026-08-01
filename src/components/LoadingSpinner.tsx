// src/components/LoadingSpinner/index.tsx
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#1890ff',
  text = '加载中...',
  fullScreen = false,
}) => {
  const spinner = (
    <div className={`spinner-container spinner-${size}`}>
      <div className="spinner" style={{ borderColor: color }}>
        <div className="spinner-inner" style={{ borderTopColor: color }} />
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="spinner-fullscreen">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;