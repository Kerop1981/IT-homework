import {createAction, props} from "@ngrx/store";
import {User} from "../models/User";

export const getUsersAction = createAction('[GET USERS] get users action start');

export const getUsersActionSuccess = createAction('[GET USERS] get users action success',
  props<{users: User[]}>());

export const createUserAction = createAction('[CREATE USER] create user action',
  props<{user: User}>());

export const updateUserAction = createAction('[UPDATE USER] update user action',
  props<{user: User}>());

export const deleteUserAction = createAction('[DELETE USER] delete user action',
  props<{id: number}>());
