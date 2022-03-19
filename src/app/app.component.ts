import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements DoCheck {
  isLoggedin = false;

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    this.isLoggedin = this.authService.isAuthenticated();
  }
}
