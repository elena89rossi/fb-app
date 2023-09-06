import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { IUser } from '../models/user.interface';

export const CURRENT_USER = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private currenUserSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.retrievecurrentUserFromStrorage());
  public currentUser$ = this.currenUserSubject.asObservable().pipe(shareReplay(1)); //todo distinctUnitl changed
  constructor(private userApiService: UserApiService) {
  }

  public saveUser(user: IUser): Observable<IUser> {
    return this.userApiService.saveUser(user).pipe(
      distinctUntilChanged(),
      take(1),
      tap((user: IUser)=> {
        if(user) {
          localStorage.setItem(CURRENT_USER, JSON.stringify(user))
          this.currenUserSubject.next(user);
        }
      })
    )
  }

  public getCurrentUser(id: number): Observable<IUser> {
    return this.currentUser$.pipe(
      map((user:IUser)=> user.id),
      switchMap((id: number) => this.userApiService.getUser(id)),
      tap((user: IUser) => {
        this.currenUserSubject.next(user)
        }
      )    
    )
  }

  //TODO TYPES
  public deleteUser(): Observable<any> {
    debugger;
    return this.currentUser$.pipe(
      map((user:IUser)=> user.id),
      switchMap((id: number) => this.closeUserSession(id))
    ) 
  }

  protected retrievecurrentUserFromStrorage(): IUser {
    let currentUser: IUser = {} as IUser;
    const userFromStorage = localStorage.getItem(CURRENT_USER);
    if(userFromStorage) {
      currentUser = JSON.parse(userFromStorage);
    }
    return currentUser;
  }

  /** Method that simulate logout operation deleting current user */
  //TODO TYPES
  private closeUserSession(id: number): Observable<any> {
    return this.userApiService.deleteUser(id).pipe(
      take(1),
      tap(()=> {
        sessionStorage.removeItem(CURRENT_USER);
        this.currenUserSubject.next({} as IUser);
      })
    )
  }

}