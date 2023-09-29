import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Select, Selector, Store } from '@ngxs/store';
import { SetEmployee } from 'src/app/store/actions/employee.action';
import { EmployeeState } from 'src/app/store/states/employee.state';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  id!: number;

  @Select(EmployeeState.selectedEmployee) selectedEmployee$!: Observable<Employee>;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
  }
  subscribe!: Subscription;

  employee: any = {};
  ngOnInit(): void {
    this.store.dispatch(new SetEmployee(this.id))

    this.subscribe = this.selectedEmployee$.subscribe(res => {
      this.employee = res
    })
    // this.employeeService.getEmployee(this.id).subscribe(result => {
    //   this.employee = result
    // })
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
