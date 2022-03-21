import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../../login/login-credentials';
import { LoginDto } from '../../login/login-dto';
import { CacheService } from '../../services/cache.service';
import { ToastService } from '../../services/toast-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  getLoginToken(values: LoginCredentials): Observable<string | Object | null> {
    return this.http.post<LoginDto>(environment.LOGIN_URL, values).pipe(
      tap(({ token }) => this.handleLogin(token)),
      catchError((error) => {
        console.error(error.error.error);
        this.toastService.onError(error.error.error);
        return of(null);
      })
    );
  }

  private handleLogin(token: string): void {
    this.saveToken(token);
    this.router.navigate(['home']);
  }
  private saveToken(token: string): void {
    this.cacheService.saveTokenInStorage(token);
  }

  logOut(): void {
    this.cacheService.clearTokenFromLocalStorage();
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    return this.cacheService.isInLocalStorage();
  }
}
