
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AbstractBaseHttpService } from 'apps/fb-user-console/src/app/commons/abstract/abstract-base-http.service';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { USERS_SERVICE } from '../static-entities/apis/apis-service-names';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AbstractBaseHttpService {

  constructor(private http: HttpClient) {
    super(USERS_SERVICE);
  }

  /**
   * Retrieves all users.
   *
   * @return {Observable<IUser[]>} An observable of an array of IUser objects representing all users.
   */
  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.getControllerBaseUrl());
  }

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @return {Observable<IUser>} An Observable that emits the retrieved user.
   */
  public getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.getControllerBaseUrl() + 'id');
  }

  /**
   * Save a user.
   *
   * @param {IUser} user - The user to be saved.
   * @return {Observable<IUser>} The saved user.
   */
  public saveUser(user: IUser): Observable<IUser> {
    if (user?.id) {
      return this.http.patch<IUser>(this.getControllerBaseUrl() + user.id, user);
    }
    return this.http.post<IUser>(this.getControllerBaseUrl(), user);
  }
  
  /**
   * Deletes a user by their ID.
   *
   * @param {number} id - The ID of the user to delete.
   * @return {Observable<HttpResponse<null>>} A response indicating the success of the deletion.
   */
  public deleteUser(id: number): Observable<HttpResponse<null>> {
    //TODO VERIFICARE COSA RITPRNA
      return this.http.delete(this.getControllerBaseUrl() + id).pipe(map(() => new HttpResponse<null>()));
  }
}