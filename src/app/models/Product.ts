export class Product{
    partitionKey: string;
    rowKey: string;
    quantity: number;
    price: number;
    pictureURL: string;

    constructor(partitionKey: string, rowKey: string, quantity: number, price: number, pictureUrl: string) {
        this.rowKey = rowKey;
        this.partitionKey = partitionKey;
        this.quantity = quantity;
        this.price = price;
        this.pictureURL = pictureUrl;
    }
}