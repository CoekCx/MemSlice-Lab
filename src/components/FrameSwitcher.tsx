import React from 'react';
import { FiEdit3, FiCheckSquare } from 'react-icons/fi';
import '../styles/FrameSwitcher.css';

interface FrameSwitcherProps {
    currentFrame: 'exercise' | 'result';
    onFrameChange: (frame: 'exercise' | 'result') => void;
    code: string;
    memoryState: any;
    currentSliceId?: string;
}

export const FrameSwitcher: React.FC<FrameSwitcherProps> = ({
    currentFrame,
    onFrameChange,
    code,
    memoryState,
    currentSliceId,
}) => {
    return (
        <div className="frame-switcher">
            <button
                className={`switcher-button ${currentFrame === 'exercise' ? 'active' : ''}`}
                onClick={() => onFrameChange('exercise')}
            >
                <FiEdit3 className="icon" /> Exercise
            </button>
            <button
                className={`switcher-button ${currentFrame === 'result' ? 'active' : ''}`}
                onClick={() => onFrameChange('result')}
            >
                <FiCheckSquare className="icon" /> Result
            </button>
        </div>
    );
}; 