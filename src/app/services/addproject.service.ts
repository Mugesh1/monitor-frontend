import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/api/data_monitoring/addlayout';
const baseUrl1 = 'http://localhost:5000/api/data_monitoring/add';
const baseUrl2 = 'http://localhost:5000/api/data_monitoring/remove';
const baseUrl3 = 'http://localhost:5000/api/data_monitoring/GetdatabyID';
const baseUrl4 = 'http://localhost:5000/api/data_monitoring/add';
const baseUrl5 = 'http://localhost:5000/api/changepassword';
const baseUrl6 = 'http://localhost:5000/api/ForgetPassword';
const baseUrl7 = 'http://localhost:5000/api/data_monitoring/GetLayoutdatabyID';
const baseUrl8 = 'http://localhost:5000/api/data_monitoring/removeLayout';
const baseUrl9 = 'http://localhost:5000/api/data_monitoring/getData';
@Injectable({
  providedIn: 'root'
})
export class AddprojectService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl1, data);
  }

  update(data: any): Observable<any> {
    return this.http.post(baseUrl1, data);
  }

  updateProject(mid: number, updatedData: any): Observable<any> {
    console.log(mid)
    return this.http.post(`${baseUrl1}/${mid}`, updatedData);
  }



  updatecomments(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl4}/${id}`, data);
  }
  getDataforDivcircity(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http
      .get(`http://localhost:5000/api/data_monitoring/GetData`, { params: { types: types, values: values } })
      .pipe();
  }

  delete(project_name: String): Observable<any> {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.delete(`${baseUrl2}/${project_name}`, { headers: header });
  }

  getdataforedit(id: any): Observable<any> {
    return this.http.get(`${baseUrl3}/${id}`);
  }
  getdataforeditmid(mid: any): Observable<any> {
    return this.http.get(`${baseUrl9}/${mid}`);
  }
  // upload(file: File,name:any): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file,name);

  //   const req = new HttpRequest('POST', `http://localhost:5000//upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  upload(files: FileList, name: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) formData.append("files", file, name);
    }
    const req = new HttpRequest('POST', `http://localhost:5000/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`http://localhost:5000/files`);
  }

  createotp(data: any): Observable<any> {
    sessionStorage.setItem("usernamedata", data.username);

    return this.http.post(`${baseUrl6}`, data);
  }

  updatepass(data: any): Observable<any> {
    return this.http.put(`${baseUrl5}`, data);
  }

  deleteFile(id: string): Observable<any> {
    console.log(id);
    const url = `http://localhost:5000/files/${id}`;
    return this.http.delete(url);
  }
  //layout

  createlayout(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getDataforDivcircitylayout(): Observable<any> {
    const types = sessionStorage.getItem('type')!;
    const values = sessionStorage.getItem('value')!;
    return this.http
      .get(`http://localhost:5000/api/data_monitoring/GetLayoutdata`, { params: { types: types, values: values } })
      .pipe();
  }

  getdataforeditlayout(id: any): Observable<any> {
    return this.http.get(`${baseUrl7}/${id}`);
  }
  updatelayout(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  deletelayout(project_name: String): Observable<any> {
    let header = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.delete(`${baseUrl8}/${project_name}`, { headers: header });
  }

}


