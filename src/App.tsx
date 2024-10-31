import React, { useState, useEffect } from 'react';
import { FrameSwitcher } from './components/FrameSwitcher';
import { EndianDropdown } from './components/EndianDropdown';
import { MemoryView } from './components/MemoryView';
import { CodeEditor } from './components/CodeEditor';
import { MemorySliceList } from './components/MemorySliceList';
import { MemoryCell } from './types';
import './App.css';

const App: React.FC = () => {
    // State management
    const [currentFrame, setCurrentFrame] = useState<'exercise' | 'result'>('exercise');
    const [isLittleEndian, setIsLittleEndian] = useState(true);
    const [memoryCells, setMemoryCells] = useState<MemoryCell[]>([
        { address: 0x1000, value: 0x12345678 },
        { address: 0x1004, value: 0xABCDEF00 },
        { address: 0x1008, value: 0x87654321 },
    ]);
    const [code, setCode] = useState<string>('// Enter your code here');
    const [savedSlices, setSavedSlices] = useState<Array<{
        id: string;
        name: string;
        timestamp: Date;
    }>>([]);
    const [isSliceListVisible, setIsSliceListVisible] = useState(false);

    // Handle memory cell value changes
    const handleCellValueChange = (address: number, newValue: number) => {
        if (currentFrame === 'exercise') {
            setMemoryCells(cells =>
                cells.map(cell =>
                    cell.address === address ? { ...cell, value: newValue } : cell
                )
            );
        }
    };

    // Handle memory slice actions
    const handleNewSlice = () => {
        // Implementation for new slice
    };

    const handleSaveSlice = () => {
        // Implementation for save slice
    };

    const handleLoadSlice = (id: string) => {
        // Implementation for load slice
    };

    const handleSaveAsSlice = () => {
        // Implementation for save as slice
    };

    return (
        <div className="app" data-testid="app">
            <header className="app-header">
                <button 
                    className="toggle-slice-list"
                    onClick={() => setIsSliceListVisible(!isSliceListVisible)}
                >
                    {isSliceListVisible ? '→' : '←'} Memory Slices
                </button>
                <FrameSwitcher
                    currentFrame={currentFrame}
                    onFrameChange={setCurrentFrame}
                />
                <EndianDropdown
                    isLittleEndian={isLittleEndian}
                    onChange={setIsLittleEndian}
                />
            </header>
            
            <main className="app-content">
                {isSliceListVisible && (
                    <aside className="slice-list-sidebar">
                        <MemorySliceList
                            slices={savedSlices}
                            onNew={handleNewSlice}
                            onLoad={handleLoadSlice}
                            onSave={handleSaveSlice}
                            onSaveAs={handleSaveAsSlice}
                        />
                    </aside>
                )}
                
                <div className="main-workspace">
                    <div className="memory-view-container">
                        <MemoryView
                            cells={memoryCells}
                            isLittleEndian={isLittleEndian}
                            onCellValueChange={
                                currentFrame === 'exercise' ? handleCellValueChange : undefined
                            }
                        />
                    </div>
                    
                    <div className="code-editor-container">
                        <CodeEditor
                            code={code}
                            readOnly={currentFrame === 'exercise'}
                            onChange={currentFrame === 'result' ? setCode : undefined}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
