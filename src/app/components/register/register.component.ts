import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { RestService } from 'src/app/rest.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/User';

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
    confirmPassword: new FormControl(''),
    phone: new FormControl('')
  })
  constructor(private auth: AuthService, private router: Router, private rs: RestService) { }

  registeredUsers:  User[] = [
  ];
  userMessage: string = '';

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }

    this.rs.getUsers().subscribe(
      (Response) => {
        console.log(Response);
        this.registeredUsers = Response;
      }, (error) => {
        console.log("Eroare!");
      }
    );
  }

  login(): void {
    
  }

  onSubmit(): void{
    if(this.registerForm.valid){

      this.registeredUsers.forEach(user => {
        if(user.email === this.registerForm.value.email)
          this.userMessage = 'This e-mail is already taken!';
          return;
      });

      if(this.registerForm.value.password != this.registerForm.value.confirmPassword) {
        this.userMessage = 'Password field is not the same as confirm password field!';
        return;
      }

      console.log(new User(this.registerForm.value.username, this.registeredUsers[this.registeredUsers.length-1].rowKey,
        this.registerForm.value.email, atob(this.registerForm.value.password), this.registerForm.value.phone));

      this.rs.postUser(new User(this.registerForm.value.username, this.registeredUsers[this.registeredUsers.length-1].rowKey,
        this.registerForm.value.email, atob(this.registerForm.value.password), this.registerForm.value.phone)).subscribe(
          (Response) => {
            console.log(Response);
            window.location.reload();
          }, (error) => {
            console.log("Eroare la post!");
          }
        );;

      this.auth.login(this.registerForm.value.email, this.registerForm.value.username);
    }
  }

}
