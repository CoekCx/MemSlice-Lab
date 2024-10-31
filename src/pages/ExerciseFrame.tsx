import React, { useState } from 'react';
import { MemoryView } from '../components/MemoryView';
import { CodeEditor } from '../components/CodeEditor';
import { EndianDropdown } from '../components/EndianDropdown';
import { MemorySliceList } from '../components/MemorySliceList';
import { MemoryCell } from '../types';
import '../styles/ExerciseFrame.css';

export const ExerciseFrame: React.FC = () => {
    const [isLittleEndian, setIsLittleEndian] = useState(true);
    const [memoryCells, setMemoryCells] = useState<MemoryCell[]>([]);
    const [code, setCode] = useState('');

    const handleCellValueChange = (address: number, newValue: number) => {
        setMemoryCells(cells =>
            cells.map(cell =>
                cell.address === address ? { ...cell, value: newValue } : cell
            )
        );
    };

    return (
        <div className="exercise-frame">
            <div className="top-bar">
                <EndianDropdown
                    isLittleEndian={isLittleEndian}
                    onChange={setIsLittleEndian}
                />
            </div>
            <div className="main-content">
                <MemoryView
                    cells={memoryCells}
                    isLittleEndian={isLittleEndian}
                    onCellValueChange={handleCellValueChange}
                />
                <CodeEditor code={code} readOnly={true} />
            </div>
        </div>
    );
}; 