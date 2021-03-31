import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = null;
  userLogin: string;
  constructor(private router: Router, fb: FormBuilder, private dataService: DataService) {

    // Init intial login form
    this.loginForm = fb.group({
      login: '',
      password: '',
      permission: ''
    });
  }

  ngOnInit() {
    this.userLogin = this.dataService.getUserName();
    console.log('hi I am in login component ' + this.dataService.getUserName().toString());
  }

  submitForm() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm);
      const login = this.loginForm.value.login;
      const password = this.loginForm.value.password;

      this.dataService.login(login, password).subscribe(response => {
        console.log(JSON.stringify(response));
        this.dataService.setUserId(response['objectId']);
        this.dataService.setToken(response['token']);
        this.dataService.setUserName(response['name']);
        this.dataService.setUserPermission(response['permission']);
        this.router.navigate(['/categories']);
        // }
      }, error => {
        console.log(error);
        this.error = true;
        this.error = error.error.message;
        alert(error.message);
      });
    }
  }


}
