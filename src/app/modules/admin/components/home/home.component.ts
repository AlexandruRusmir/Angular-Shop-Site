import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RestService } from '../../../../rest.service';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../models/Product';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private rs: RestService, private shared: SharedService) { 
  }

  faMinusCircle = faMinusCircle;
  Products: Product[] = [
  ];
  cartProducts:  Product[] = [
  ];
  cartProductsQuantity: number[] = [    
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

  addProductToCart(product: Product): void {
    if(this.findProductPositionInArray(product, this.cartProducts) === - 1) {
      this.cartProductsQuantity.push(1);
      this.cartProducts.push(product); 
      return;
    }

    this.cartProductsQuantity[this.findProductPositionInArray(product, this.cartProducts)] += 1;
      
  }

  checkout(): void {
    this.shared.setArrays(this.cartProducts, this.cartProductsQuantity);
    
  }

  findProductPositionInArray(product: Product, productArray: Product[]): number {
    for(let i = 0; i < productArray.length; i++) {
      if(product == productArray[i])
        return i;
    }

    return -1;
  }
}