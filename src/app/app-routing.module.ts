import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'client/edit/:id', component: EditClientComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
