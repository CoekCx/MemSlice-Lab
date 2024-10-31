import React, { useState, useEffect } from 'react';
import { FrameSwitcher } from './components/FrameSwitcher';
import { EndianDropdown } from './components/EndianDropdown';
import { MemoryView } from './components/MemoryView';
import { CodeEditor } from './components/CodeEditor';
import { MemorySliceList } from './components/MemorySliceList';
import { MemoryCell } from './types';
import './styles/global.css';
import './App.css';
import { saveMemorySlice } from './utils/memorySlice';
import { FiList, FiPlus, FiSave } from 'react-icons/fi';
import { SaveSliceModal } from './components/SaveSliceModal';

interface AppState {
    code: string;
    memoryState: any;
    currentSliceId?: string;
    currentFrame: 'exercise' | 'result';
}

const App: React.FC = () => {
    // State management
    const [state, setState] = useState<AppState>({
        code: '',
        memoryState: null,
        currentFrame: 'exercise',
    });
    const [isLittleEndian, setIsLittleEndian] = useState(true);
    const [memoryCells, setMemoryCells] = useState<MemoryCell[]>(() => {
        const cells: MemoryCell[] = [];
        for (let i = 0; i < 32; i++) {
            cells.push({
                address: 0x1000 + i,
                value: 0x00
            });
        }
        return cells;
    });
    const [savedSlices, setSavedSlices] = useState<Array<{
        id: string;
        name: string;
        timestamp: Date;
    }>>([]);
    const [isSliceListVisible, setIsSliceListVisible] = useState(false);
    const [solutionCells, setSolutionCells] = useState<MemoryCell[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'new' | 'saveAs'>('new');

    // Add new state for tracking loaded slice
    const [currentSlice, setCurrentSlice] = useState<{
        id?: string;
        name?: string;
        code: string;
        cells: MemoryCell[];
    }>({
        code: '',
        cells: [
            { address: 0x1000, value: 0x12345678 },
            { address: 0x1004, value: 0xABCDEF00 },
            { address: 0x1008, value: 0x87654321 },
        ]
    });

    // Effect to initialize solution cells when frame changes to 'exercise'
    useEffect(() => {
        if (state.currentFrame === 'exercise') {
            setSolutionCells([...memoryCells]);
        }
    }, [state.currentFrame]);

    // Handle frame change
    const handleFrameChange = (frame: 'exercise' | 'result') => {
        setState(prevState => ({ ...prevState, currentFrame: frame }));
        if (frame === 'exercise') {
            // Reset memory cells to initial state when switching to exercise mode
            setMemoryCells([...solutionCells]);
        }
    };

    // Handle memory cell value changes
    const handleCellValueChange = (address: number, newValue: number) => {
        if (state.currentFrame === 'exercise') {
            setMemoryCells(cells =>
                cells.map(cell =>
                    cell.address === address ? { ...cell, value: newValue } : cell
                )
            );
        } else {
            // In result mode, update the solution
            setSolutionCells(cells =>
                cells.map(cell =>
                    cell.address === address ? { ...cell, value: newValue } : cell
                )
            );
        }
    };

    // Handle memory slice actions
    const handleNewSlice = () => {
        const newCells: MemoryCell[] = [];
        for (let i = 0; i < 32; i++) {
            newCells.push({
                address: 0x1000 + i,
                value: 0x00
            });
        }
        setCurrentSlice({
            code: '',
            cells: newCells
        });
        setMemoryCells(newCells);
        setState(prev => ({
            ...prev,
            code: '',
            currentSliceId: undefined
        }));
    };

    const handleSaveSlice = () => {
        if (!currentSlice.id) {
            setIsModalOpen(true);
            setModalMode('new');
            return;
        }
        handleSave();
    };

    // Handle loading a slice
    const handleLoadSlice = (sliceId: string, name: string, cells: MemoryCell[], code: string) => {
        setCurrentSlice({
            id: sliceId,
            name,
            cells: [...cells],
            code
        });
        setMemoryCells([...cells]);
        setState(prev => ({
            ...prev,
            code,
            currentSliceId: sliceId
        }));
        setIsSliceListVisible(false);
    };

    const handleSaveAsSlice = () => {
        setIsModalOpen(true);
        setModalMode('saveAs');
    };

    const handleCodeChange = (newCode: string) => {
        setState(prevState => ({
            ...prevState,
            code: newCode
        }));
    };

    // Updated save handler
    const handleSave = (name?: string) => {
        // If we don't have a name and we're trying to save a new slice, show modal
        if (!currentSlice.id && !name) {
            setIsModalOpen(true);
            setModalMode('new');
            return;
        }

        // Ensure we have a valid name
        const sliceName = name || currentSlice.name;
        if (!sliceName) {
            console.error('Cannot save slice without a name');
            return;
        }

        const sliceData = {
            id: currentSlice.id,
            name: sliceName,
            cells: memoryCells,
            code: state.code,
            timestamp: new Date()
        };

        const newId = saveMemorySlice({
            ...sliceData,
            id: currentSlice.id // This will be undefined for new slices
        });

        setCurrentSlice(prev => ({
            ...prev,
            id: newId,
            name: sliceName
        }));
        
        setState(prev => ({
            ...prev,
            currentSliceId: newId
        }));

        setIsModalOpen(false);
    };

    return (
        <div className="app" data-testid="app">
            <header className="app-header">
                <div className="left-header-group">
                    <button 
                        className="icon-button"
                        onClick={() => setIsSliceListVisible(!isSliceListVisible)}
                        title="Toggle Memory Slices"
                    >
                        <FiList className="icon" />
                        {isSliceListVisible ? 'Hide' : 'Show'} Slices
                    </button>
                    <button 
                        className="icon-button"
                        onClick={handleNewSlice}
                        title="New Memory Slice"
                    >
                        <FiPlus className="icon" />
                        New
                    </button>
                    <button 
                        className="icon-button"
                        onClick={handleSaveSlice}
                        title={currentSlice.id ? `Save ${currentSlice.name}` : 'Save Memory Slice'}
                    >
                        <FiSave className="icon" />
                        Save
                        {currentSlice.name && <span className="current-slice-name">({currentSlice.name})</span>}
                    </button>
                </div>
                
                <FrameSwitcher
                    currentFrame={state.currentFrame}
                    onFrameChange={handleFrameChange}
                    code={state.code}
                    memoryState={state.memoryState}
                    currentSliceId={state.currentSliceId}
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
                            onLoad={handleLoadSlice}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            modalMode={modalMode}
                            setModalMode={setModalMode}
                            onSave={handleSave}
                        />
                    </aside>
                )}
                
                <div className="main-workspace">
                    <div className="memory-view-container">
                        <div className="container-title">Memory View</div>
                        <MemoryView
                            cells={memoryCells}
                            isLittleEndian={isLittleEndian}
                            onCellValueChange={handleCellValueChange}
                            comparisonCells={state.currentFrame === 'result' ? solutionCells : undefined}
                            isExerciseMode={state.currentFrame === 'exercise'}
                        />
                    </div>
                    
                    <div className="code-editor-container">
                        <div className="container-title">Code Editor</div>
                        <CodeEditor
                            code={state.code}
                            readOnly={state.currentFrame === 'exercise'}
                            onChange={handleCodeChange}
                        />
                    </div>
                </div>
            </main>
            {isModalOpen && (
                <SaveSliceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialName={currentSlice.name}
                />
            )}
        </div>
    );
};

export default App;
