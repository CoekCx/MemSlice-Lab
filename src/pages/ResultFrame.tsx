import React, { useState, useEffect } from 'react';
import { MemoryView } from '../components/MemoryView';
import { CodeEditor } from '../components/CodeEditor';
import { EndianDropdown } from '../components/EndianDropdown';
import { MemoryCell } from '../types';
import '../styles/ResultFrame.css';

interface ResultFrameProps {
    userCells: MemoryCell[];
    solutionCells: MemoryCell[];
}

export const ResultFrame: React.FC<ResultFrameProps> = ({
    userCells,
    solutionCells
}) => {
    const [isLittleEndian, setIsLittleEndian] = useState(true);

    return (
        <div className="result-frame">
            <div className="top-bar">
                <EndianDropdown
                    isLittleEndian={isLittleEndian}
                    onChange={setIsLittleEndian}
                />
            </div>
            <div className="main-content">
                <div className="memory-views">
                    <div className="user-view">
                        <h3>Your Solution</h3>
                        <MemoryView
                            cells={userCells}
                            isLittleEndian={isLittleEndian}
                            comparisonCells={solutionCells}
                            isExerciseMode={false}
                        />
                    </div>
                    <div className="solution-view">
                        <h3>Correct Solution</h3>
                        <MemoryView
                            cells={solutionCells}
                            isLittleEndian={isLittleEndian}
                            isExerciseMode={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 