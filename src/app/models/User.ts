export class User{
    partitionKey: string;
    rowKey: string;
    email: string;
    password: string;
    phone: string;

    constructor(partitionKey: string, rowKey: string, email: string, password: string, phone: string) {
        this.rowKey = rowKey;
        this.partitionKey = partitionKey;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
}