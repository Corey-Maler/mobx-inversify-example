export interface ISymbol {
    address: number;
    size: number;
    memType: 'ram' | 'rom';
    symboltype: string;
    section: string;
    type: 'symbol' | 'scope';
}