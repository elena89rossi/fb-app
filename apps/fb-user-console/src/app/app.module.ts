import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from '@fb-console/core';
import { CommonModule } from '@angular/common';
import { UserSessionGuard } from './features/user-session/guards/user-session.guards';
import { HeaderModule } from '@fb/ui/header';
import { ImageModule } from '@fb/ui/image';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    APP_ROUTES,
    HeaderModule,
    ImageModule,
    MatButtonModule
  ],
  providers: [UserSessionGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
