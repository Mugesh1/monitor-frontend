import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/data_monitoring';

@Injectable({ providedIn: 'root' })
export class DataMonitoringService {
  constructor(private http: HttpClient) { }
  get(): Observable<any> { return this.http.get(`${baseUrl}`).pipe(); }
  post(data: any): Observable<any> { return this.http.post(`${baseUrl}/add`, data); }
}
