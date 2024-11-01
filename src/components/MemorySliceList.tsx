import React, { useEffect, useState } from 'react';
import { MemoryCell } from '../types';
import { loadMemorySlices, deleteMemorySlice } from '../utils/memorySlice';
import { FiTrash2 } from 'react-icons/fi';
import '../styles/MemorySliceList.css';

interface MemorySliceListProps {
    onLoad: (sliceId: string, name: string, cells: MemoryCell[], code: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    modalMode: 'new' | 'saveAs';
    setModalMode: (mode: 'new' | 'saveAs') => void;
    onSave: (name?: string) => void;
}

export const MemorySliceList: React.FC<MemorySliceListProps> = ({
    onLoad,
    isModalOpen,
    setIsModalOpen,
    onSave
}) => {
    const [slices, setSlices] = useState<Array<{
        id: string;
        name: string;
        cells: MemoryCell[];
        code: string;
        timestamp: Date;
    }>>([]);

    const loadSlices = () => {
        const savedSlices = loadMemorySlices();
        setSlices(savedSlices.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    };

    useEffect(() => {
        loadSlices();
    }, []);

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this memory slice?')) {
            deleteMemorySlice(id);
            loadSlices();
        }
    };

    return (
        <div className="memory-slice-list">
            <h3>Saved Memory Slices</h3>
            <div className="slice-list">
                {slices.length === 0 ? (
                    <div className="no-slices">No saved memory slices</div>
                ) : (
                    slices.map(slice => (
                        <div 
                            key={slice.id}
                            className="slice-item"
                            onClick={() => onLoad(slice.id, slice.name, slice.cells, slice.code)}
                        >
                            <div className="slice-info">
                                <div className="slice-name">{slice.name}</div>
                                <div className="slice-timestamp">
                                    {slice.timestamp.toLocaleDateString()} {slice.timestamp.toLocaleTimeString()}
                                </div>
                            </div>
                            <button
                                className="delete-button"
                                onClick={(e) => handleDelete(e, slice.id)}
                                title="Delete slice"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}; 