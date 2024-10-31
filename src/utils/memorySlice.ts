import { MemoryCell } from '../types';

interface MemorySlice {
    id: string;
    name: string;
    cells: MemoryCell[];
    code: string;
    timestamp: Date;
}

const STORAGE_KEY = 'memorySlices';

export const saveMemorySlice = (sliceData: Omit<MemorySlice, 'id' | 'timestamp'> & { id?: string }): string => {
    const savedSlices = loadMemorySlices();
    const timestamp = new Date();
    
    if (sliceData.id) {
        // Update existing slice
        const updatedSlices = savedSlices.map(slice => 
            slice.id === sliceData.id 
                ? { ...sliceData, id: slice.id, timestamp } 
                : slice
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSlices));
        return sliceData.id;
    } else {
        // Create new slice
        const newId = Date.now().toString();
        const newSlice = { 
            ...sliceData, 
            id: newId,
            timestamp
        };
        savedSlices.push(newSlice);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSlices));
        return newId;
    }
};

export const loadMemorySlices = (): MemorySlice[] => {
    const slicesJson = localStorage.getItem(STORAGE_KEY);
    if (!slicesJson) return [];
    
    const slices = JSON.parse(slicesJson);
    // Convert timestamp strings back to Date objects
    return slices.map((slice: any) => ({
        ...slice,
        timestamp: new Date(slice.timestamp)
    }));
};

export const deleteMemorySlice = (id: string): void => {
    const savedSlices = loadMemorySlices();
    const filteredSlices = savedSlices.filter(slice => slice.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSlices));
}; 