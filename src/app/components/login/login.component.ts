import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/User';
import { RestService } from 'src/app/rest.service';
import { Observable, of, throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faLock = faLock;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth: AuthService, private router: Router, private rs: RestService) { }

  users:  User[] = [
  ];

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
    this.rs.getUsers().subscribe(
      (Response) => {
        console.log(Response);
        this.users = Response;
      }, (error) => {
        console.log("Eroare!");
      }
    );
  }

  onSubmit(): void{
    if(this.loginForm.invalid)
      return;

    this.users.forEach(user => {
      if(user.email === this.loginForm.value.email)
        if( user.password === atob(this.loginForm.value.password)) {
          this.auth.login(user.email, user.partitionKey).subscribe(
            (result) => {
              this.router.navigate(['admin']);
            },
            (err: Error) =>{
              alert(err.message);
            }
          );
        }
        return throwError(new Error('Wrong password'));
    });
  }
}