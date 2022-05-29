import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../rest.service';
import { Product } from '../../../../models/Product';
import { SharedService } from '../../../../shared/shared.service';
import { share } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ThisReceiver } from '@angular/compiler';
import { MailMessage } from 'src/app/models/MailMessage';
import { AuthService } from 'src/app/services/auth.service';
import { EmailValidator } from '@angular/forms';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private rs: RestService, private shared: SharedService, private auth: AuthService) { 
  }


  totalValue: number = 0;
  totalValueString: String = '';
  cartProducts:  Product[] = [
  ];
  cartProductsQuantity: number[] = [    
  ];

  ngOnInit(): void 
  {
    if(this.shared.getProductsArray().length) {
      this.cartProducts = this.shared.getProductsArray();
      this.cartProductsQuantity = this.shared.getQuantityArray();
    }
    if(!this.cartProducts || !this.cartProductsQuantity) {
      window.setTimeout(function(){location.replace('http://localhost:4200/admin/home')},500)
    }

    for(let i=0; i < this.cartProducts.length; i++) {
      this.totalValue += this.cartProducts[i].price * this.cartProductsQuantity[i];
      this.totalValueString = this.totalValue.toFixed(2);
    }
  }

  confirmOrder(): void 
  {
    for(let i=0; i < this.cartProducts.length; i++) {
      this.rs.updateProductQuantity(this.cartProducts[i], this.cartProductsQuantity[i]).subscribe(
        (Response) => {
          console.log(Response);
          alert('Order placed!');
        }, (error) => {
          console.log("Eroare!");
        }
      );
    }

    
    this.rs.postEmail(new MailMessage(this.auth.getUsername(), this.auth.getEmail(),
          this.cartProducts, this.cartProductsQuantity)).subscribe(
            (Response) => {
              console.log(new MailMessage(this.auth.getUsername(), this.auth.getEmail(),
              this.cartProducts, this.cartProductsQuantity));
              
              console.log(Response);
              //window.setTimeout(function(){location.replace('http://localhost:4200/admin/home')},3000)
            }, (error) => {
              console.log("Eroare!");
            }
          );
  }
}
