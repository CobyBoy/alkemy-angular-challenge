import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './notfound/page-not-found.component';
import { AuthService } from './auth/services/auth.service';
import { CacheService } from './services/cache.service';
import { ToastService } from './services/toast-service.service';
import { AuthGuard } from './auth/auth.guard';
import { TeamContainerComponent } from './team-container/team-container.component';
import { TeamContainerService } from './team-container/services/team-container.service';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PowerStatsComponent } from './power-stats/power-stats.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    PageNotFoundComponent,
    TeamContainerComponent,
    AddHeroComponent,
    PowerStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      easeTime: 200,
      positionClass: 'toast-center-center',
    }),
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  providers: [
    AuthService,
    CacheService,
    ToastService,
    TeamContainerService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
