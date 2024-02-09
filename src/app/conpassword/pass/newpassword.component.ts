import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { identity } from 'lodash';
import { AddprojectService } from 'src/app/services/addproject.service';


@Component({
  selector: 'll-signup',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {


    ITypenewpassword = {

    username:'',
    password_encrypted: ''};
    message = '';

    updatepassword: any[] = [];

  constructor( private addprojectService: AddprojectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';



  }


  updatenewpassword(): void {
    let user = sessionStorage.getItem('usernamedata');
    if(this.ITypenewpassword.username == user){


    this.addprojectService.updatepass(this.ITypenewpassword)
      .subscribe(
        response => {

          this.message = response.message ? response.message : 'Password was updated successfully!';

        },
        error => {
          console.log(error);
        });
  }
  else{
    this.message = "Enter correct Username"
  }
  }

}
