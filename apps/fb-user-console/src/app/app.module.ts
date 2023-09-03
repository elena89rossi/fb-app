import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxWelcomeComponent } from "./nx-welcome.component";
import { NgModule } from "@angular/core";
import { CoreModule } from "@fb-console/core";
import { CommonModule } from "@angular/common";
import { UserSessionGuard } from "./features/user-session/guards/user-session.guards";

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent],
      imports: [
          BrowserModule,
          BrowserAnimationsModule,
          CommonModule,
          HttpClientModule,
          ReactiveFormsModule,
          CoreModule,
          APP_ROUTES
      ],
    providers: [
        UserSessionGuard
    ],
    bootstrap: [AppComponent],
  })
  export class AppModule {}