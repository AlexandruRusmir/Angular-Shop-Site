import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private rs: RestService) { 
  }


  Products: Product[] = [
  ];

  ngOnInit(): void {
    this.rs.getProducts().subscribe(
      (Response) => {
        console.log(Response);
        this.Products = Response;
      }, (error) => {
        console.log("Eroare!");
      }
    );
  }

  deleteProduct(partitionKey: String, rowKey: String): void {
    this.rs.deleteProductf(partitionKey, rowKey).subscribe(
      (Response) => {
        console.log(Response);
      }, (error) => {
        console.log("Eroare!");
      }
    );
    
    window.location.reload();
  }
}
