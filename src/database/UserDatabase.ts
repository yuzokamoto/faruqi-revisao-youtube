import { UserDB } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users"

  public findUserById = async (id: string): Promise<UserDB | undefined> => {
    const response: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ id })
    
    return response[0]
  }
}