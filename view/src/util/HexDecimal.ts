export const hexMap = '0123456789abcdef'

export function shortToHex(value: number) {
    if (value >= 255) 
        return 'ff';

    if (value <= 0)
        return '00';
        
    return hexMap[Math.trunc(value / 16)] + hexMap[value % 16];
}