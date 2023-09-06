import { Component, OnDestroy, OnInit } from "@angular/core";
import { FB_LOGO } from "./commons/static-entities/logo-base64";
import { Observable, Subject } from "rxjs";
import { UserSessionService } from "./features/user-session/services/user-session.service";
import { IUser } from "./features/user-session/models/user.interface";

@Component({
  standalone: false,
  selector: "fb-console-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "fb-user-console";
  protected logoImg = FB_LOGO;
  protected user$!: Observable<IUser>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private userSessionService: UserSessionService) {}
  ngOnInit(): void {
    this.user$ = this.userSessionService.currentUser$;
  }

  protected simulateLogout(): void {
    debugger;
    this.userSessionService.deleteUser().subscribe(() => alert('User successfully logged out'));
  }

  ngOnDestroy() : void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}