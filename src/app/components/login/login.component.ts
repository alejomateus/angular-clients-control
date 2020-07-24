import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private flashMessages: FlashMessagesService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.verifyActiveSession();
  }
  login(): void {
    this.loginService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      })
  }

}
