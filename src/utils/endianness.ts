export const convertToLittleEndian = (value: number): number => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, value, true); // true for little-endian
    return view.getInt32(0, true);
};

export const convertToBigEndian = (value: number): number => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, value, false); // false for big-endian
    return view.getInt32(0, false);
}; 