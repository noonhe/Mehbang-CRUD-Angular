import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@shell/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./@shell/shell.module').then((m) => m.ShellModule)
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
