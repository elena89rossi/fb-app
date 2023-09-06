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
    /**
   * Initializes the component.
   *
   * @return {void} 
   */
  ngOnInit(): void {
    this.user$ = this.userSessionService.currentUser$;
  }
  /**
   * Simulates the logout functionality.
   *
   * This function is used to simulate the logout behavior by deleting the user's data
   * and displaying a success message.
   *
   * @return {void} This function does not return a value.
   */
  protected simulateLogout(): void {
    debugger;
    this.userSessionService.deleteUser().subscribe(() => alert('User successfully logged out'));
  }
  /**
   * Destroys the component and cleans up any resources.
   *
   * @return {void} 
   */
  ngOnDestroy() : void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}