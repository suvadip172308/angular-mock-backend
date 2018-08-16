import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mock Back End';
  baseUrl = 'https://xyz.com';
  endPoint = '/api/login';

  showLoginStatus: string;

  constructor(
    private apiService: ApiService
  ) {};

  onLogin(userName, password) {
    const url = this.baseUrl + this.endPoint;
    this.apiService.doGet(url, userName, password).subscribe((data) => {
      this.showLoginStatus = data.message;
    });
  }
}
