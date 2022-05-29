import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Product } from "./models/Product";
import { User } from "./models/User";
import { MailMessage } from "./models/MailMessage";

@Injectable ({providedIn: 'root'})

export class RestService {
    urlProduct: string = "https://proiectcolectivapi.azurewebsites.net/Products";
    urlUser: string = "https://proiectcolectivapi.azurewebsites.net/Users";
    urlMail: string = "https://proiectcolectivapi.azurewebsites.net/Emails";

    constructor(private http: HttpClient) {
    }

    getProducts() {
        return this.http.get<Product[]>(this.urlProduct);
    }

    postProduct(prod: Product) {
        return this.http.post(this.urlProduct, prod);
    }

    deleteProductf(partitionKey: String, rowKey:String) {
        var query1: String = "?partitionKey=";
        partitionKey = query1.concat(partitionKey.toString());
        var query2: String = "&rowKey=";
        rowKey = query2.concat(rowKey.toString());
        return this.http.delete(this.urlProduct.concat(partitionKey.toString().concat(rowKey.toString())));
    }

    updateProductQuantity(prod: Product, removedQuantity: number) {
        prod.quantity -= removedQuantity;
        return this.http.put<Product>(this.urlProduct, prod);
    }

    getUsers() {
        return this.http.get<User[]>(this.urlUser);
    }

    postUser(user: User) {
        return this.http.post(this.urlUser, user);
    }

    postEmail(mail: MailMessage) {
        return this.http.post(this.urlMail, mail);
    }
}