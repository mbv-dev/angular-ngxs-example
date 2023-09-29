import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Employee } from "src/app/employees/employee.model";
import { Injectable } from "@angular/core";
import { EmployeeService } from "src/app/employees/employee.service";
import { GetEmployee, SetEmployee } from "../actions/employee.action";
import { Observable, tap } from 'rxjs';


export class EmployeeStateModel {
  employees!: Employee[];
  employeeLoaded!: boolean;
  selectedEmployee!: any;
}

@State<EmployeeStateModel>({
  name: 'employees',
  defaults: {
    employees: [],
    employeeLoaded: false,
    selectedEmployee: null,
  }
})


@Injectable()
export class EmployeeState {
  employees: any;
  constructor(private _employeeService: EmployeeService) { }

  @Selector()
  static getEmployeeList(state: EmployeeStateModel) {
    return state.employees
  }

  @Selector()
  static employeeLoaded(state: EmployeeStateModel) {
    return state.employeeLoaded;
  }

  @Selector()
  static selectedEmployee(state: EmployeeStateModel) {
    return state.selectedEmployee;
  }

  @Action(GetEmployee)
  getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    const state = getState();
    return this._employeeService.getEmployees().pipe(tap(res => {
      setState({
        ...state,
        employees: res,
        employeeLoaded: true
      });
    }))
  }

  @Action(SetEmployee)
  setEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetEmployee): Observable<any> | undefined {
    const state = getState();
    const employeeList = state.employees;
    const index = employeeList.findIndex((res: any) => res.id === +id)
    if (employeeList.length > 0) {
      setState({
        ...state,
        selectedEmployee: employeeList[index],
      })
      // Return an observable that completes immediately
      return new Observable<any>((observer) => {
        observer.complete();
      });
    } else {
      return this._employeeService.getEmployee(id).pipe(tap(res => {
        const state = getState();
        const employeeList = [res]
        console.log(employeeList);

        setState({
          ...state,
          employees: [res],
          selectedEmployee: res,
        })
      }))
    }
  }
}
