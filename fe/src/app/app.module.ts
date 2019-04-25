import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PetitionComponent } from './components/petition/petition.component';
import { PunishmentComponent } from './components/punishment/punishment.component';
import { AdminComponent } from './components/admin/admin.component';
import { PraetorComponent } from './components/praetor/praetor.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ObserverComponent } from './components/observer/observer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { AuthenticationService } from './services/authentication.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { appReducers, appEffects } from './store/app-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'petition',
    component: PetitionComponent
  },
  {
    path: 'punishment',
    component: PunishmentComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'praetor',
    component: PraetorComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'observer',
    component: ObserverComponent
  },
  {
    path: 'home',
    component: ObserverComponent
  },
  {
    path: '',
    component: ObserverComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PetitionComponent,
    PunishmentComponent,
    AdminComponent,
    PraetorComponent,
    ProfileComponent,
    ObserverComponent,
    LoginComponent,
    NavbarComponent
  ],
  providers: [
    AuthenticationService
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(appReducers),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    EffectsModule.forRoot(appEffects),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
