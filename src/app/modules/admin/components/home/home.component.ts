import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RestService } from 'src/app/rest.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productForm = new FormGroup({
    category: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    url: new FormControl('')
  })

  constructor(private rs: RestService) { 

  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.productForm.valid){
      console.log(new Product(this.productForm.value.category, this.productForm.value.name, this.productForm.value.stock, 
        this.productForm.value.price, this.productForm.value.url));
          this.rs.postProduct(new Product(this.productForm.value.category, this.productForm.value.name, this.productForm.value.stock, 
            this.productForm.value.price, this.productForm.value.url)).subscribe(
            (Response) => {
              console.log(Response);

            }, (error) => {
              console.log("Eroare la post!");
            }
          );
          //window.location.reload();
    }

  }
}