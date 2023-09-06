import { BehaviorSubject, Observable, OperatorFunction, distinctUntilChanged, filter, map, shareReplay, switchMap, take, tap } from 'rxjs';
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

  /**
   * Saves a user.
   *
   * @param {IUser} user - The user object to be saved.
   * @return {Observable<IUser>} An observable that emits the saved user.
   */
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

/**
 * Retrieves the current user with the specified ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @return {Observable<IUser>} The observable that emits the user object.
 */
  public getCurrentUser(): Observable<IUser> {
    const userId = this.currenUserSubject.value.id;
    return this.userApiService.getUser(userId).pipe(
        tap((user: IUser) => {
          this.currenUserSubject.next(user);
          }
        )
      )
  }

  /**
   * Deletes the user by closing their session.
   *
   * @return {Observable<any>} An observable that emits the result of the deletion.
   */
  public deleteUser(): Observable<any> {
    return this.currentUser$.pipe(
      filter(obj => Object.keys(obj).length > 0),
      map((user:IUser)=> user.id),
      switchMap((id: number) => this.closeUserSession(id))
    ) 
  }

  /**
   * Retrieves the current user from storage.
   *
   * @return {IUser} The current user object.
   */
  protected retrievecurrentUserFromStrorage(): IUser {
    let currentUser: IUser = {} as IUser;
    const userFromStorage = localStorage.getItem(CURRENT_USER);
    if(userFromStorage) {
      currentUser = JSON.parse(userFromStorage);
    }
    return currentUser;
  }
  /**
   * Deleta a user and closes a user session.
   *
   * @param {number} id - The ID of the user.
   * @return {Observable<any>} An Observable that emits the result of deleting the user and performs additional actions.
   */
  private closeUserSession(id: number): Observable<any> {
    return this.userApiService.deleteUser(id).pipe(
      take(1),
      tap(()=> {
        localStorage.removeItem(CURRENT_USER);
        this.currenUserSubject.next({} as IUser);
      })
    )
  }

}