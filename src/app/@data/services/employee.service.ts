import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Employee, GetEmployee, GetEmployees, SaveEmployee } from 'src/app/@models/employee.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<GetEmployees> {
    return this.http.get<GetEmployees>(`${this.apiUrl}/employees`).pipe(
      map(res => res),
      catchError( err => throwError(() => err))
    );
  }

  getEmployee(id: number): Observable<GetEmployee> {
    return this.http.get<GetEmployee>(`${this.apiUrl}/employee/${id}`);
  }

  createEmployee(employee: SaveEmployee): Observable<GetEmployee> {
    return this.http.post<GetEmployee>(`${this.apiUrl}/create`, employee).pipe(
      map(res => res),
      catchError( err => throwError(() => err))
    );
  }

  updateEmployee(id: number, employee: SaveEmployee): Observable<GetEmployee> {
    return this.http.put<GetEmployee>(`${this.apiUrl}/update/${id}`, employee).pipe(
      map(res => res),
      catchError( err => throwError(() => err))
    );
  }
}
