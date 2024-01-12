import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UsersApiService} from "../services/users-api.service";
import UsersActionsTypes from "./users.actions-types";
import {map, switchMap} from "rxjs";
import {User} from "../models/User";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActionsTypes.getUsersAction),
      switchMap(_ =>
        this.usersApiService.getUsers().pipe(
          map((users: User[]) => UsersActionsTypes.getUsersActionSuccess({users})),
        )
      )
    )
  });

}
