export interface MemoryCell {
    address: number;
    value: number;
    label?: string;
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    initialMemory: MemoryCell[];
} 