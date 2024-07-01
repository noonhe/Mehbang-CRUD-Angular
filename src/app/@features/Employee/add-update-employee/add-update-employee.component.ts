import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/@data/services/employee.service';
import { ErrorService } from 'src/app/@data/services/error.service';
import { navigationKeys } from 'src/app/@data/shared/consts';
import { Employee, GetEmployee } from 'src/app/@models/employee.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.scss']
})
export class AddUpdateEmployeeComponent implements OnInit {

  isAdd:boolean;
  employeeData:Employee;
  loading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = null;
  employeeForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    salary: new FormControl(null, [Validators.required, Validators.min(0)]),
    age: new FormControl(null, [Validators.required, Validators.min(18)])
  });
  constructor(
    public dialogRef: MatDialogRef<AddUpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService : EmployeeService,
    private errorService : ErrorService
  ){}

  ngOnInit(): void {
    if(this.data){
      this.isAdd = this.data.isAdd;
      this.employeeData = this.data.employee;
      if(this.employeeData){
        this.employeeForm.controls.name.setValue(this.employeeData.employee_name)
        this.employeeForm.controls.age.setValue(this.employeeData.employee_age)
        this.employeeForm.controls.salary.setValue(this.employeeData.employee_salary)
      }
    }
  }

  save(){
    this.loading = true;
    this.hasError = false;
    this.errorMessage = null;
    this.employeeForm.disable();
    if(this.isAdd){
      this.addNewEmployee();
    }else{
      this.updateEmployee();
    }
  }

  addNewEmployee(){
    this.employeeService.createEmployee({
      name: this.employeeForm.controls.name.value,
      age: Number(this.employeeForm.controls.age.value),
      salary: Number(this.employeeForm.controls.salary.value),
    }).subscribe(
      {
        next: (res: GetEmployee) => {
          this.loading = false;
          this.hasError = false;
          this.dialogRef.close(true)
        },
        error: (error) => {
          this.loading = false;
          this.hasError = true;
          this.employeeForm.enable();
          this.errorMessage = environment.showErrorDescriptions ? error.error.message : `An Error Occured`;
          this.errorService.openSnackBar(this.errorMessage , ''); 
        }
      }
    )
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeData.id , {
      name: this.employeeForm.controls.name.value,
      age: Number(this.employeeForm.controls.age.value),
      salary: Number(this.employeeForm.controls.salary.value),
    }).subscribe(
      {
        next: (res: GetEmployee) => {
          this.loading = false;
          this.hasError = false;
          this.dialogRef.close(true)
        },
        error: (error) => {
          this.loading = false;
          this.hasError = true;
          this.employeeForm.enable();
          this.errorMessage = environment.showErrorDescriptions ? error.error.message : `An Error Occured`;
          this.errorService.openSnackBar(this.errorMessage , ''); 
        }
      }
    )
  }

  checkOnlyNumber(e: KeyboardEvent){
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter, etc
      navigationKeys.indexOf(e.key) > -1 ||
      (e.key === "a" && e.ctrlKey === true) ||  // Allow: Ctrl+A
      (e.key === "c" && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === "v" && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === "x" && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === "a" && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === "c" && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === "v" && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === "x" && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return;  // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }

  }
}
