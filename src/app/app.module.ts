import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './@features/Employee/employee-list/employee-list.component';
import { AddUpdateEmployeeComponent } from './@features/Employee/add-update-employee/add-update-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './@shell/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddUpdateEmployeeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
