import React, { useState } from 'react';
import { MemoryView } from '../components/MemoryView';
import { CodeEditor } from '../components/CodeEditor';
import { EndianDropdown } from '../components/EndianDropdown';
import { MemorySliceList } from '../components/MemorySliceList';
import { MemoryCell } from '../types';
import '../styles/ExerciseFrame.css';

interface ExerciseFrameProps {
    memoryCells: MemoryCell[];
    solutionCells: MemoryCell[];
    isLittleEndian: boolean;
    setIsLittleEndian: (value: boolean) => void;
    onCellValueChange: (address: number, newValue: number) => void;
    code: string;
}

export const ExerciseFrame: React.FC<ExerciseFrameProps> = ({
    memoryCells,
    solutionCells,
    isLittleEndian,
    setIsLittleEndian,
    onCellValueChange,
    code,
}) => {
    const [isComparing, setIsComparing] = useState(false);

    return (
        <div className="exercise-frame">
            <div className="top-bar">
                <EndianDropdown
                    isLittleEndian={isLittleEndian}
                    onChange={setIsLittleEndian}
                />
                <button 
                    className="compare-button"
                    onClick={() => setIsComparing(!isComparing)}
                >
                    {isComparing ? 'Hide Comparison' : 'Compare with Solution'}
                </button>
            </div>
            <div className="main-content">
                <MemoryView
                    cells={memoryCells}
                    isLittleEndian={isLittleEndian}
                    onCellValueChange={onCellValueChange}
                    comparisonMode={isComparing}
                    solution={solutionCells}
                    isExerciseMode={true}
                />
                <CodeEditor code={code} readOnly={true} />
            </div>
        </div>
    );
}; 