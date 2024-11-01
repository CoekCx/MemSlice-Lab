import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import '../styles/SaveSliceModal.css';

interface SaveSliceButtonProps {
    code: string;
    memoryState: any; // Replace with your actual memory state type
    currentFileName?: string;
    onSave: (fileName: string, sliceData: { code: string; memoryState: any }) => void;
}

export const SaveSliceButton: React.FC<SaveSliceButtonProps> = ({
    code,
    memoryState,
    currentFileName,
    onSave
}) => {
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState(currentFileName || '');

    const handleSave = () => {
        if (!currentFileName) {
            setShowModal(true);
        } else {
            onSave(currentFileName, { code, memoryState });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fileName.trim()) {
            onSave(fileName, { code, memoryState });
            setShowModal(false);
        }
    };

    return (
        <>
            <button 
                className="icon-button"
                onClick={handleSave}
                title="Save Memory Slice"
            >
                <FaSave />
                {currentFileName && <span className="current-file-name">{currentFileName}</span>}
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="save-slice-modal">
                        <h2>Save Memory Slice</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                placeholder="Enter slice name"
                                autoFocus
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="primary">Save</button>
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}; 