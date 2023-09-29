import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Select, Store } from '@ngxs/store';
import { GetEmployee } from 'src/app/store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from 'src/app/store/states/employee.state';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  constructor(private store: Store) { }

  @Select(EmployeeState.getEmployeeList) employees$!: Observable<Employee[]>
  @Select(EmployeeState.employeeLoaded) employeeLoaded$!: Observable<boolean>

  isLoadedSubscription! : Subscription;
  ngOnInit(): void {
    // employeeLoaded$ will check state has data or null
    this.isLoadedSubscription = this.employeeLoaded$.subscribe(res => {
      if (!res){
        this.store.dispatch(new GetEmployee()); //if state is null, it'll fetch data from API
      }
    })
  }
  ngOnDestroy() {
    this.isLoadedSubscription.unsubscribe();
  }
}














