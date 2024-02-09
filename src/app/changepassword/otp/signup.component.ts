import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { AddprojectService } from 'src/app/services/addproject.service';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  otp = ''!;
  username!: string | null;
  ITypeotp = {

    username: '',
  };

  disabledButtons : any[] = [];

  invalidLogin = false
  message = '';
  message1 = '';
  buttons = [1];



  @Input()
  error!: string | null;



  constructor(private addprojectService: AddprojectService, private loginservice: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.message1 = '';
  }

  disableButton(buttons: any[] = []) {

    // this.disabledButtons.push(buttons);

    // setTimeout(() => {
    //   this.disabledButtons.splice(this.disabledButtons.indexOf(buttons), 1);
    // }, 6000);

    this.addprojectService.createotp(this.ITypeotp)
      .subscribe(
        response => {
        },
        error => {
          this.message = 'OTP was sent successfully!';
        });
  }


  checkOtp() {
    let user = sessionStorage.getItem('usernamedata');

    (this.loginservice.verifyotp(this.username = user, this.otp).subscribe(
      data => {
        if (data == "") {
          this.message1 = 'Enter correct OTP !';
        }
        else {
          this.router.navigate(['/newpassword/confirmpassword'])
        }

        this.invalidLogin = false

      },
      error => {
        this.invalidLogin = true
        this.error = error.message;

      }
    )
    );

  }




}
