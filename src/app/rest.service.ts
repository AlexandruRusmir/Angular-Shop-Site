import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Product } from "./models/Product";
//import {User}

@Injectable ({providedIn: 'root'})

export class RestService {
    urlProduct: string = "https://proiectcolectiv.azurewebsites.net/Products";


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
}