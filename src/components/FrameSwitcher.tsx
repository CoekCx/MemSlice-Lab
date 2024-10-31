import React from 'react';
import '../styles/FrameSwitcher.css';

interface FrameSwitcherProps {
    currentFrame: 'exercise' | 'result';
    onFrameChange: (frame: 'exercise' | 'result') => void;
}

export const FrameSwitcher: React.FC<FrameSwitcherProps> = ({
    currentFrame,
    onFrameChange
}) => {
    return (
        <div className="frame-switcher">
            <button
                className={`switcher-button ${currentFrame === 'exercise' ? 'active' : ''}`}
                onClick={() => onFrameChange('exercise')}
            >
                Exercise
            </button>
            <button
                className={`switcher-button ${currentFrame === 'result' ? 'active' : ''}`}
                onClick={() => onFrameChange('result')}
            >
                Result
            </button>
        </div>
    );
}; 