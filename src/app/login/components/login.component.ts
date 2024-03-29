import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast-service.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    this.toastService.showSuccess('Loggin in... Please wait...');
    this.authService.getLoginToken(this.loginForm.value).subscribe();
  }
}
