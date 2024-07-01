export interface Employee {
    id: number,
    employee_name: string,
    employee_salary: number,
    employee_age: number,
    profile_image: string
}

export interface ApiResponse<T> {
    data: T,
    status: string,
    message: string
}

export type GetEmployees = ApiResponse<Employee[]>;
export type GetEmployee = ApiResponse<Employee>;


export interface SaveEmployee {
    name: string,
    salary: number,
    age: number
}
