import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faLock = faLock;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    confirmPassword: new FormControl('')
  })
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      this.auth.register(this.registerForm.value).subscribe(
        (result) => {
          this.router.navigate(['admin']);
        },
        (err: Error) =>{
          alert(err.message);
        }
      )
    }
  }

}
