import React, { useState } from 'react';
import '../styles/SaveSliceModal.css';

interface SaveSliceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string) => void;
    initialName?: string;
}

export const SaveSliceModal: React.FC<SaveSliceModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialName = ''
}) => {
    const [name, setName] = useState(initialName);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="save-slice-modal">
                <h2>Save Memory Slice</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter slice name"
                        autoFocus
                    />
                    <div className="modal-buttons">
                        <button type="button" className="secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 