 import { Injectable } from '@angular/core';
 import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  doGet(url: string, userName: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    const body = {
      'username': userName,
      'password': password
    }

    return this.http.post<any>(url, body, httpOptions);
  }
}
