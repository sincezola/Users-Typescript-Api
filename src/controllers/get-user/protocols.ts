import type { User } from "../../models/user";

export type GetUserParams = {
  id: string;
  name?: string;
};

export interface IGetUserRepository {
  getUser( id: string ): Promise<User | null>;
}