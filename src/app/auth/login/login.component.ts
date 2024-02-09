
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from 'src/app/services/auth-gaurd.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username = ''
  password_encrypted = ''

  role = ''
  message = '';

  invalidLogin = false

  @Input()
  error!: string | null;


  constructor(private router: Router,
    private loginservice: AuthenticationService, private loggedinService: AuthGaurdService,) { }


  ngOnInit(): void {

  }
  checkLogin() {

    (this.loginservice.authenticate(this.username, this.password_encrypted, this.role).subscribe(
      data => {
        this.router.navigate(['/home'])
        // if (data.loggedin == "0") {
        // if (data.role == "MD") {
        //   this.router.navigate(['/dashboardmd'])
        //   this.invalidLogin = false
        // }
        // if (data.role == "Dataentry") {
        //   this.router.navigate(['/home'])
        //   this.invalidLogin = false
        // }
        // if (data.role == "Search") {
        //   this.router.navigate(['/home'])
        //   this.invalidLogin = false
        // }
        // }
        // else {
        //   this.message = "Account already loggedin"
        // }
      },
      error => {
        this.invalidLogin = true
        this.message = "Invalid Login"
      }
    )
    );

  }





}
