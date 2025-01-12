import {computed, effect, inject, Injectable, Signal, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment.development";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal= signal<User | null>(null);
  user = this.#userSignal.asReadonly();

  constructor(private http: HttpClient) {
  }

  isLoggedIn = computed(() => !!this.user);

  async login(email: string, password: string): Promise<User> {
    const response$ = this.http.post<User>(`${environment.apiRoot}/login`, {email, password});
    const userPromised =  await firstValueFrom(response$);
    this.#userSignal.set(userPromised);
    return userPromised;

  }

}
