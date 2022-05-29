import { Product } from "./Product";

export class MailMessage {
    partitionKey: string | null;
    rowKey: string | null;
    listaProduse: Product[];
    numarProduse: number[];

    constructor(partitionKey: string, rowKey: string, listaProduse: Product[], numarProd: number[]) {
        this.rowKey = rowKey;
        this.partitionKey = partitionKey;
        this.listaProduse = listaProduse;
        this.numarProduse = numarProd;
    }
}