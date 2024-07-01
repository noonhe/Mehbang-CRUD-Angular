import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { EmployeeService } from 'src/app/@data/services/employee.service';
import { ErrorService } from 'src/app/@data/services/error.service';
import { HeadingService } from 'src/app/@data/services/heading.service';
import { Employee, GetEmployee } from 'src/app/@models/employee.model';
import { environment } from 'src/environments/environment';
import { AddUpdateEmployeeComponent } from '../add-update-employee/add-update-employee.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  id: number;
  employeeData$: Observable<any>;
  loading:boolean = true;
  hasError:boolean = false;
  constructor(
    private headingService: HeadingService,
    private employeeService : EmployeeService,
    private errorService : ErrorService,
    private route : ActivatedRoute,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.headingService.title = 'Employee Detail';
    this.getID();
    this.getEmployeeDetail();
  }

  getID(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  getEmployeeDetail(){
    this.loading = true;
    this.hasError = false;
    this.employeeData$ = this.employeeService.getEmployee(this.id).pipe(
      map((res : GetEmployee) => {
        this.loading = false;
        this.hasError = false;
        return res.data
      }),
      catchError((error) => {
        this.hasError = true;
        this.loading = false;
        if(environment.showErrorDescriptions){
          this.errorService.openSnackBar(error.error.message , '');
        }
        return throwError(() => throwError(() => error))
      })
    )
  }

  openUpdateForm(employee: Employee){
    let dialogRef = this.dialog.open(AddUpdateEmployeeComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      width: '600px',
      height: '450px',
      data:{
        isAdd: false,
        employee: employee,
      }
    })
    dialogRef.afterClosed().subscribe(
      res => {
        if(res){
          this.getEmployeeDetail();
        }
      }
    )
  }



}
