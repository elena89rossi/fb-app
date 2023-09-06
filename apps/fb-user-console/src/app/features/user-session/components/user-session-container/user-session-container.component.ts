import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionService } from '../../services/user-session.service';
import { IUser } from '../../models/user.interface';
import { Observable, Subject,interval, map, of, switchMap, takeUntil } from 'rxjs';
import { CardModule } from '@fb/ui/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'fb-console-user-session-container',
  standalone: true,
  imports: [CommonModule, CardModule, MatToolbarModule, MatDividerModule],
  templateUrl: './user-session-container.component.html',
  styleUrls: ['./user-session-container.component.scss'],
})
export class UserSessionContainerComponent implements OnInit, OnDestroy {
  protected user$!: Observable<IUser>;
  protected userId$!: Observable<number>;
  protected latestUpdateDate$!:Observable<Date>;
  private destroyed$: Subject<void> = new Subject();
  constructor(private userSessionService: UserSessionService){}

  /**
   * Initializes the component and subscribes to the currentUser$ observable.
   *
   * @return {void}
   */
  ngOnInit(): void {
      this.user$ = this.userSessionService.currentUser$.pipe(takeUntil(this.destroyed$));
      this.checkForUserUpdate();
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  protected getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  private checkForUserUpdate(): void {
    const int = 300000;
    this.latestUpdateDate$ = interval(int).pipe(
      takeUntil(this.destroyed$),
      switchMap(() => this.userSessionService.getCurrentUser()),
      map(() => new Date())
    )
  }
}
