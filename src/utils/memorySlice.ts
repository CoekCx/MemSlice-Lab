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
    const existingSlices = slicesJson ? JSON.parse(slicesJson).map((slice: any) => ({
        ...slice,
        timestamp: new Date(slice.timestamp)
    })) : [];

    // Get predefined slices and merge with existing ones
    const predefinedSlices = loadPredefinedSlices();
    const mergedSlices = [...existingSlices];
    
    predefinedSlices.forEach(predefinedSlice => {
        if (!mergedSlices.some(slice => slice.id === predefinedSlice.id)) {
            mergedSlices.push(predefinedSlice);
        }
    });

    // Save merged slices back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedSlices));
    return mergedSlices;
};

export const deleteMemorySlice = (id: string): void => {
    const savedSlices = loadMemorySlices();
    const filteredSlices = savedSlices.filter(slice => slice.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSlices));
};

export const loadPredefinedSlices = (): MemorySlice[] => {
    return [
        // Little Endian Examples
        {
            id: "1",
            name: "Example 1: Complex Struct and Pointers - Little Endian",
            code: `struct Data { 
    int a; 
    short b; 
    char c; 
} data = {0x12345678, 0xABCD, 0xEF};
int *p = &data.a;
short *q = &data.b;
char *r = &data.c;`,
            cells: [
                { address: 0x1000, value: 0x78 },
                { address: 0x1001, value: 0x56 },
                { address: 0x1002, value: 0x34 },
                { address: 0x1003, value: 0x12 },
                { address: 0x1004, value: 0xCD },
                { address: 0x1005, value: 0xAB },
                { address: 0x1006, value: 0xEF },
                { address: 0x1007, value: 0x00 },
                { address: 0x1008, value: 0x00 }, // Address for pointer p
                { address: 0x1009, value: 0x10 },
                { address: 0x100A, value: 0x00 },
                { address: 0x100B, value: 0x00 },
                { address: 0x100C, value: 0x04 }, // Address for pointer q
                { address: 0x100D, value: 0x10 },
                { address: 0x100E, value: 0x00 },
                { address: 0x100F, value: 0x00 },
                { address: 0x1010, value: 0x06 }, // Address for pointer r
                { address: 0x1011, value: 0x10 },
                { address: 0x1012, value: 0x00 },
                { address: 0x1013, value: 0x00 },
            ],
            timestamp: new Date()
        },
        {
            id: "2",
            name: "Example 2: Array with Pointers - Little Endian",
            code: `int arr[4] = {0x12345678, 0x90ABCDEF, 0x13579BDF, 0x2468ACE0};
int *p = &arr[2];`,
            cells: [
                { address: 0x1000, value: 0x78 },
                { address: 0x1001, value: 0x56 },
                { address: 0x1002, value: 0x34 },
                { address: 0x1003, value: 0x12 },
                { address: 0x1004, value: 0xEF },
                { address: 0x1005, value: 0xCD },
                { address: 0x1006, value: 0xAB },
                { address: 0x1007, value: 0x90 },
                { address: 0x1008, value: 0xDF },
                { address: 0x1009, value: 0x9B },
                { address: 0x100A, value: 0x57 },
                { address: 0x100B, value: 0x13 },
                { address: 0x100C, value: 0xE0 },
                { address: 0x100D, value: 0xAC },
                { address: 0x100E, value: 0x68 },
                { address: 0x100F, value: 0x24 },
                { address: 0x1010, value: 0x08 }, // Address for pointer p
                { address: 0x1011, value: 0x10 },
                { address: 0x1012, value: 0x00 },
                { address: 0x1013, value: 0x00 },
            ],
            timestamp: new Date()
        },
        {
            id: "3",
            name: "Example 3: Multi-level Pointers - Little Endian",
            code: `int x = 0x12345678;
int *p = &x;
int **pp = &p;`,
            cells: [
                { address: 0x1000, value: 0x78 },
                { address: 0x1001, value: 0x56 },
                { address: 0x1002, value: 0x34 },
                { address: 0x1003, value: 0x12 },
                { address: 0x1004, value: 0x00 }, // Address for pointer p
                { address: 0x1005, value: 0x10 },
                { address: 0x1006, value: 0x00 },
                { address: 0x1007, value: 0x00 },
                { address: 0x1008, value: 0x04 }, // Address for pointer pp
                { address: 0x1009, value: 0x10 },
                { address: 0x100A, value: 0x00 },
                { address: 0x100B, value: 0x00 },
            ],
            timestamp: new Date()
        },
        {
            id: "4",
            name: "Example 4: Nested Structs and Arrays - Little Endian",
            code: `struct Inner { int x; char y; };
struct Outer { struct Inner a[2]; int z; };
struct Outer o = {{{0x12345678, 'A'}, {0x87654321, 'B'}}, 0xABCDEF01};`,
            cells: [
                { address: 0x1000, value: 0x78 },
                { address: 0x1001, value: 0x56 },
                { address: 0x1002, value: 0x34 },
                { address: 0x1003, value: 0x12 },
                { address: 0x1004, value: 0x41 },
                { address: 0x1005, value: 0x00 },
                { address: 0x1006, value: 0x00 },
                { address: 0x1007, value: 0x00 },
                { address: 0x1008, value: 0x21 },
                { address: 0x1009, value: 0x43 },
                { address: 0x100A, value: 0x65 },
                { address: 0x100B, value: 0x87 },
                { address: 0x100C, value: 0x42 },
                { address: 0x100D, value: 0x00 },
                { address: 0x100E, value: 0x00 },
                { address: 0x100F, value: 0x00 },
                { address: 0x1010, value: 0x01 },
                { address: 0x1011, value: 0xEF },
                { address: 0x1012, value: 0xCD },
                { address: 0x1013, value: 0xAB },
            ],
            timestamp: new Date()
        },
        {
            id: "5",
            name: "Example 5: Array of Pointers - Little Endian",
            code: `int a = 0x11111111, b = 0x22222222;
int *arr[2] = {&a, &b};`,
            cells: [
                { address: 0x1000, value: 0x11 },
                { address: 0x1001, value: 0x11 },
                { address: 0x1002, value: 0x11 },
                { address: 0x1003, value: 0x11 },
                { address: 0x1004, value: 0x22 },
                { address: 0x1005, value: 0x22 },
                { address: 0x1006, value: 0x22 },
                { address: 0x1007, value: 0x22 },
                { address: 0x1008, value: 0x00 }, // Address for pointer arr[0]
                { address: 0x1009, value: 0x10 },
                { address: 0x100A, value: 0x00 },
                { address: 0x100B, value: 0x00 },
                { address: 0x100C, value: 0x04 }, // Address for pointer arr[1]
                { address: 0x100D, value: 0x10 },
                { address: 0x100E, value: 0x00 },
                { address: 0x100F, value: 0x00 },
            ],
            timestamp: new Date()
        },
    
        // Big Endian Examples (similar structure with reversed byte order)
        {
            id: "6",
            name: "Example 6: Complex Struct and Pointers - Big Endian",
            code: `struct Data { 
    int a; 
    short b; 
    char c; 
} data = {0x12345678, 0xABCD, 0xEF};
int *p = &data.a;
short *q = &data.b;
char *r = &data.c;`,
            cells: [
                { address: 0x1000, value: 0x12 },
                { address: 0x1001, value: 0x34 },
                { address: 0x1002, value: 0x56 },
                { address: 0x1003, value: 0x78 },
                { address: 0x1004, value: 0xAB },
                { address: 0x1005, value: 0xCD },
                { address: 0x1006, value: 0xEF },
                { address: 0x1007, value: 0x00 },
                { address: 0x1008, value: 0x10 }, // Address for pointer p
                { address: 0x1009, value: 0x00 },
                { address: 0x100A, value: 0x00 },
                { address: 0x100B, value: 0x00 },
                { address: 0x100C, value: 0x10 }, // Address for pointer q
                { address: 0x100D, value: 0x04 },
                { address: 0x100E, value: 0x00 },
                { address: 0x100F, value: 0x00 },
                { address: 0x1010, value: 0x10 }, // Address for pointer r
                { address: 0x1011, value: 0x06 },
                { address: 0x1012, value: 0x00 },
                { address: 0x1013, value: 0x00 },
            ],
            timestamp: new Date()
        },
        // More big endian examples would follow a similar structure
    ];
}; 