import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  allowRegistration: boolean;
  constructor(private loginService: LoginService,
    private settingService: SettingService,
    private router: Router) { }

  ngOnInit(): void {
    this.verifyLogin();
    this.settingService.getSetting().subscribe(setting=>{
      this.allowRegistration = setting.allowRegistration;
    })
  }
  verifyLogin() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
