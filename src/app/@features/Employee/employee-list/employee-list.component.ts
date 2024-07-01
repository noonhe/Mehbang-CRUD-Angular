import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/@data/services/employee.service';
import { ErrorService } from 'src/app/@data/services/error.service';
import { HeadingService } from 'src/app/@data/services/heading.service';
import { Employee, GetEmployees } from 'src/app/@models/employee.model';
import { environment } from 'src/environments/environment';
import { AddUpdateEmployeeComponent } from '../add-update-employee/add-update-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  loading:boolean;
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns = ['id', 'employee_name', 'employee_salary', 'employee_age', 'action']
  hasError:boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private headingService: HeadingService,
    private employeeService : EmployeeService,
    private errorService : ErrorService,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.headingService.title = 'Employee List';
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEmployees(){
    this.loading = true;
    this.hasError = false;
    this.employeeService.getEmployees().subscribe({
      next: (res: GetEmployees)=> {
        this.dataSource.data = [...res.data];
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
        if(environment.showErrorDescriptions){
          this.errorService.openSnackBar(error.error.message , '');
        }
        this.loading = false;
        this.hasError = true;
      }
    });
  }

  openAddForm(){
    let dialogRef = this.dialog.open(AddUpdateEmployeeComponent, {
      closeOnNavigation: true,
      hasBackdrop: true,
      width: '600px',
      height: '450px',
      data:{
        isAdd: true,
      }
    })
    dialogRef.afterClosed().subscribe(
      res => {
        if(res){
          this.getEmployees();
        }
      }
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
          this.getEmployees();
        }
      }
    )
  }

}
