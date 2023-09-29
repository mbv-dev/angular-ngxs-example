import { Employee } from "src/app/employees/employee.model";

export class GetEmployee {
  static readonly type = "[Employee] Get";
}

export class SetEmployee {
  static readonly type = '[Employee] Set';
  constructor(public id: number){}
}

export class AddEmployee {
  static readonly type = "[Employee] Add";
  constructor(public payload: Employee) { }
}
