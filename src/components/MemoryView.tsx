import React from 'react';
import { MemoryCell } from '../types';
import '../styles/MemoryView.css';

interface MemoryViewProps {
    cells: MemoryCell[];
    isLittleEndian: boolean;
    onCellValueChange?: (address: number, newValue: number) => void;
    highlightAddresses?: number[];
}

export const MemoryView: React.FC<MemoryViewProps> = ({
    cells,
    isLittleEndian,
    onCellValueChange,
    highlightAddresses = []
}) => {
    const handleValueChange = (address: number, value: string) => {
        const numValue = parseInt(value, 16);
        if (!isNaN(numValue) && onCellValueChange) {
            onCellValueChange(address, numValue);
        }
    };

    return (
        <div className="memory-view">
            {cells.map((cell) => (
                <div 
                    key={cell.address} 
                    className={`memory-cell ${highlightAddresses.includes(cell.address) ? 'highlight' : ''}`}
                >
                    <div className="address">0x{cell.address.toString(16).padStart(8, '0')}</div>
                    <input
                        type="text"
                        className="value"
                        value={cell.value.toString(16).padStart(8, '0')}
                        onChange={(e) => handleValueChange(cell.address, e.target.value)}
                    />
                    {cell.label && <div className="label">{cell.label}</div>}
                </div>
            ))}
        </div>
    );
}; 