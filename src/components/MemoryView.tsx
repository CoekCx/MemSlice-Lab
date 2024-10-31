import React from 'react';
import { MemoryCell } from '../types';
import '../styles/MemoryView.css';

interface MemoryViewProps {
    cells: MemoryCell[];
    isLittleEndian: boolean;
    onCellValueChange?: (address: number, newValue: number) => void;
    comparisonCells?: MemoryCell[];
    isExerciseMode?: boolean;
    highlightAddresses?: number[];
}

export const MemoryView: React.FC<MemoryViewProps> = ({
    cells,
    isLittleEndian,
    onCellValueChange,
    comparisonCells,
    isExerciseMode = true,
    highlightAddresses = []
}) => {
    const handleValueChange = (address: number, value: string) => {
        const numValue = parseInt(value, 16);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 0xFF && onCellValueChange) {
            onCellValueChange(address, numValue);
        }
    };

    const getCellStatus = (cell: MemoryCell): 'correct' | 'incorrect' | 'default' => {
        if (!comparisonCells || isExerciseMode) return 'default';
        
        const comparisonCell = comparisonCells.find(c => c.address === cell.address);
        if (!comparisonCell) return 'default';
        
        return cell.value === comparisonCell.value ? 'correct' : 'incorrect';
    };

    return (
        <div className="memory-view" style={{ marginBottom: '20px', overflowY: 'auto' }}>
            {cells.map((cell) => {
                const status = getCellStatus(cell);
                const isHighlighted = highlightAddresses.includes(cell.address);
                return (
                    <div 
                        key={cell.address} 
                        className={`memory-cell ${status !== 'default' ? status : ''} ${isHighlighted ? 'highlighted' : ''}`}
                        data-group={Math.floor((cell.address - cells[0].address) / 4) % 2}
                    >
                        <div className="address">0x{cell.address.toString(16).padStart(8, '0')}</div>
                        <input
                            type="text"
                            className={`value ${status}`}
                            value={cell.value.toString(16).padStart(2, '0')}
                            onChange={(e) => handleValueChange(cell.address, e.target.value)}
                            readOnly={!onCellValueChange}
                        />
                        {cell.label && <div className="label">{cell.label}</div>}
                        {status === 'incorrect' && comparisonCells && (
                            <div className="expected-value">
                                Expected: 0x{comparisonCells.find(c => c.address === cell.address)?.value.toString(16).padStart(2, '0')}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}; 