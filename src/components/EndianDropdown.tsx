import React from 'react';
import '../styles/EndianDropdown.css';

interface EndianDropdownProps {
    isLittleEndian: boolean;
    onChange: (isLittleEndian: boolean) => void;
}

export const EndianDropdown: React.FC<EndianDropdownProps> = ({
    isLittleEndian,
    onChange
}) => {
    return (
        <div className="endian-dropdown">
            <select
                value={isLittleEndian ? 'little' : 'big'}
                onChange={(e) => onChange(e.target.value === 'little')}
            >
                <option value="little">Little Endian</option>
                <option value="big">Big Endian</option>
            </select>
        </div>
    );
}; 