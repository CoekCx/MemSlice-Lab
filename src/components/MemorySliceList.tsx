import React from 'react';
import '../styles/MemorySliceList.css';

interface MemorySlice {
    id: string;
    name: string;
    timestamp: Date;
}

interface MemorySliceListProps {
    slices: MemorySlice[];
    onNew: () => void;
    onLoad: (id: string) => void;
    onSave: () => void;
    onSaveAs: () => void;
}

export const MemorySliceList: React.FC<MemorySliceListProps> = ({
    slices,
    onNew,
    onLoad,
    onSave,
    onSaveAs
}) => {
    return (
        <div className="memory-slice-list">
            <div className="slice-actions">
                <button onClick={onNew}>New</button>
                <button onClick={onSave}>Save</button>
                <button onClick={onSaveAs}>Save As</button>
            </div>
            <div className="slice-list">
                {slices.map((slice) => (
                    <div
                        key={slice.id}
                        className="slice-item"
                        onClick={() => onLoad(slice.id)}
                    >
                        <span className="slice-name">{slice.name}</span>
                        <span className="slice-date">
                            {slice.timestamp.toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}; 