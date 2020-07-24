import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authService: AngularFireAuth,
    private router: Router) { }
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password)
        .then(data => resolve(data),
          error => reject(error))
    })
  }
  getAuth() {
    return this.authService.authState.pipe(
      map(auth => auth)
    )
  }
  logout() {
    this.authService.signOut();
  }
  verifyActiveSession(): void {
    this.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }
  singUp(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
        .then(data => resolve(data),
          error => reject(error))
    })

  }
}
