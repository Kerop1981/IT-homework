import {User} from "../models/User";
import {createReducer, on} from "@ngrx/store";
import UsersActionsTypes from "./users.actions-types";

export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: []
}

export const userFeatureKey = 'users';

export const userReducer = createReducer(
  initialUserState,
  on(UsersActionsTypes.getUsersActionSuccess,
    (state, {users}) => {
    return {...state, users: [...state.users, ...users] }
  }),
  on(UsersActionsTypes.createUserAction,
    (state, {user}) => {
      return {...state, users: [...state.users, user]}
    }),
  on(UsersActionsTypes.updateUserAction,
    (state, {user}) => {
      return {...state, users: [...state.users.map(usr => usr.id === user.id ? user : usr)]}
    }),
  on(UsersActionsTypes.deleteUserAction,
    (state, {id}) => {
      return {...state, users: [...state.users.filter(user => user.id !== id)]}
    })
);
