import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(private flashMessages: FlashMessagesService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginService.verifyActiveSession();
  }
  singUp(): void {
    this.loginService.singUp(this.email, this.password)
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
