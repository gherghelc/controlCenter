import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { AppComponent } from './app.component';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { LoginComponent } from './login/login.component';
import { MaptrackerComponent } from './maptracker/maptracker.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: BodyComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  entryComponents: [
    
    ],
  declarations: [
  
    HeaderComponent, 
    FooterComponent, 
    BodyComponent, 
    AppComponent, OnboardingFormComponent, LoginComponent, MaptrackerComponent],
  bootstrap: [
    //ToolbarOverviewExample,
    AppComponent
    ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule {}