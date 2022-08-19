import { CalenderShowcaseComponent } from './content/calender-showcase/calender-showcase.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { NgMatComponentsModule } from 'projects/ng-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { SubComponent } from './content/home/sub/sub.component';
import { TestComponent } from './content/test/test.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    SubComponent,
    CalenderShowcaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgMatComponentsModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ".",
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
