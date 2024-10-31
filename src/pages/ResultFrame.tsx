import React from 'react';
import { MemoryView } from '../components/MemoryView';
import { EndianDropdown } from '../components/EndianDropdown';
import { CodeEditor } from '../components/CodeEditor';
import { MemoryCell } from '../types';
import '../styles/ResultFrame.css';

interface ResultFrameProps {
    userCells: MemoryCell[];
    solutionCells: MemoryCell[];
    isLittleEndian: boolean;
    setIsLittleEndian: (value: boolean) => void;
    onCellValueChange: (address: number, newValue: number) => void;
    code: string;
    onCodeChange?: (newCode: string) => void;
}

export const ResultFrame: React.FC<ResultFrameProps> = ({
    solutionCells,
    isLittleEndian,
    setIsLittleEndian,
    onCellValueChange,
    code,
    onCodeChange
}) => {
    return (
        <div className="result-frame">
            <div className="top-bar">
                <EndianDropdown
                    isLittleEndian={isLittleEndian}
                    onChange={setIsLittleEndian}
                />
            </div>
            <div className="main-content">
                <MemoryView
                    cells={solutionCells}
                    isLittleEndian={isLittleEndian}
                    onCellValueChange={onCellValueChange}
                    isExerciseMode={false}
                />
                <CodeEditor 
                    code={code}
                    onChange={onCodeChange}
                />
            </div>
        </div>
    );
}; 