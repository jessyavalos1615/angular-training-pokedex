import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ErrorService } from './error.service';
import { ErrorResponse } from 'src/app/models/errors';
import { environment } from 'src/environments/environment';
import { ApiUserPostReponse, ApiUserResponse, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private limitPerPage = 5;
  public users: User[] = [];
  private userUrl = `${environment.loginUrl}api/user`;

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}

  async getUsers(page: number): Promise<User[] | []> {
    try {
      const params = new HttpParams({
        fromObject: { page, limit: this.limitPerPage },
      });

      const response = (await firstValueFrom(
        this.http.get(this.userUrl, { params })
      )) as ApiUserResponse;

      this.users = response.users;

      return response.users;
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
      return [];
    }
  }

  async delete(id: string) {
    try {
      const urlDelete = `${this.userUrl}/${id}`;

      const response = (await firstValueFrom(
        this.http.delete(urlDelete)
      )) as ApiUserPostReponse;

      return response;
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
      return { message: 'wrong', ok: false, token: '' };
    }
  }

  async createUser(user: User): Promise<ApiUserPostReponse> {
    try {
      const response = (await firstValueFrom(
        this.http.post(this.userUrl, user)
      )) as ApiUserPostReponse;

      return response;
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
      return { message: 'wrong', ok: false, token: '' };
    }
  }

  async editUser(user: User): Promise<ApiUserPostReponse> {
    try {
      const urlPut = `${this.userUrl}/${user.id}`;

      const response = (await firstValueFrom(
        this.http.put(urlPut, { props: user })
      )) as ApiUserPostReponse;
      
      return response;
    } catch (err) {
      console.log(err);

      this.errorHandler.handleError(err as ErrorResponse);
      return { message: 'wrong', ok: false, token: '' };
    }
  }
}
