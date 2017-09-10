export interface Section {
    name: string;
    address: number;
    size: number;
    memType: 'ram' | 'rom';
}