import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSessionService } from '../../services/user-session.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '../../models/user.interface';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'fb-console-user-session-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-session-container.component.html',
  styleUrls: ['./user-session-container.component.scss'],
})
export class UserSessionContainerComponent implements OnInit {
  user$!: Observable<IUser>;
  private userId!: number;
  private destroyed$: Subject<void> = new Subject();
  constructor(private userSessionService: UserSessionService, private route: ActivatedRoute){}

  ngOnInit(): void {
      this.user$ = this.userSessionService.currentUser$.pipe(takeUntil(this.destroyed$))

  }
  
  // private getIdFromRouteAndRefreshData(): void {
  //   debugger;
  //   this.route.params.pipe(
  //     takeUntil(this.destroyed$),
  //     tap((params: Params) => {
  //       this.userId = params['id'];
  //       this.userSessionService.getCurrentUser(this.userId);
  //     }),
  //   ).subscribe();
  // }
  
}
