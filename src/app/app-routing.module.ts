import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingGuard } from './guards/setting.guard';


const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'singup', component: RegisterComponent, canActivate: [SettingGuard] },
  {
    path: 'setting', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
