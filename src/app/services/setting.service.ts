import { Injectable } from '@angular/core';
import { Setting } from '../models/setting';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  settingDoc: AngularFirestoreDocument<Setting>;
  setting: Observable<Setting>;
  id = '1';
  constructor(private db: AngularFirestore
  ) { }
  getSetting(): Observable<Setting> {
    this.settingDoc = this.db.doc<Setting>(`setting/${this.id}`);
    this.setting = this.settingDoc.valueChanges();
    return this.setting;
  }
  editSetting(setting: Setting) {
    this.settingDoc = this.db.doc<Setting>(`setting/${this.id}`);
    this.settingDoc.update(setting);
  }
}
