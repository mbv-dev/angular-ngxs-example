import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = 'https://jsonplaceholder.typicode.com';

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<any>{
    return this._http.get(this.url + '/users')
  }
  getEmployee(id:number): Observable<any>{
    return this._http.get(this.url + '/users/'+id)
  }
}
