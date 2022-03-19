import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero, HeroResponse } from '../add-hero/hero';
import { HeroError } from '../add-hero/hero-error';
import { ToastService } from './toast-service.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getHeroByName(name: string): Observable<HeroResponse> {
    return this.http
      .get<HeroResponse>(`${environment.BASE_API_URL}/search/${name}`)
      .pipe(
        tap((data: HeroResponse) => {
          if (name === '' || data.error) { throw new Error(data.error); }
        })
      )
      .pipe(
        catchError((error) => {
          this.toastService.onError(error.message);
          return EMPTY;
        })
      );
  }
}
