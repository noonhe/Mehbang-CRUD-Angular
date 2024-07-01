import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@shell/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'employees',
        loadChildren: () => import('./@features/Employee/employee.module').then((m) => m.EmployeeModule)
      }
    ]
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'employees'
  },
  {
    path:'**',
    redirectTo:'employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
