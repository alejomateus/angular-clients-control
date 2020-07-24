import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/services/setting.service';
import { Setting } from 'src/app/models/setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  allowRegistration = false;
  constructor(private router: Router, private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getSetting().subscribe(
      (setting: Setting) => {
        this.allowRegistration = setting.allowRegistration;
      }
    )
  }
  saveChanges(): void {
    let setting = {
      allowRegistration: this.allowRegistration
    }
    this.settingService.editSetting(setting);
    this.router.navigate(['/'])
  }
}
