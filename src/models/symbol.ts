export interface ISymbol {
    name: string;
    address: number;
    size: number;
    memType: 'ram' | 'rom';
    symboltype: string;
}