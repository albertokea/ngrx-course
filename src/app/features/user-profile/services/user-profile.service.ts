import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@ngrx-example/models/user.model';
import { Observable } from 'rxjs';
import { CommonHttpService } from 'src/app/core/services/common-http.service';


@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: CommonHttpService) {}

  userProfile(userId: number): Observable<User> {
    return this.http.get<User>(
      `users-profile/${userId}`
    );
  }
}
