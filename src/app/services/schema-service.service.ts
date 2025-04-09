import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SchemaServiceService {

  private data: any;

  constructor(private http: HttpClient) {}

  loadSchema() {
    return this.http.get('/assets/dora_schema.json');
  }

  private dataSubject = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }
}
