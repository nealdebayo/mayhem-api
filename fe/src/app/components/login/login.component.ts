import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.credentials.password = '';
      this.router.navigateByUrl('/petition');
    }, (err) => {
      // TODO: handle login error
      this.toastr.error('Invalid email or password', 'Login Error', {
        positionClass: 'toast-top-center'
      });
      console.error(err);
    });
  }

  ngOnInit() {
  }

}
