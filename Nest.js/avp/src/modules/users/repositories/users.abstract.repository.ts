import { UserEntity } from "../entities/user.entity";

export abstract class UsersAbstractRepository {
  abstract createUser(userEntity: UserEntity): Promise<UserEntity>;
  abstract findAll(role?: string): Promise<UserEntity[]>;
  abstract findOne(id: number): Promise<UserEntity | null>;
  abstract findOneByEmail(email: string): Promise<UserEntity | null>;
  abstract update(id: number, userEntity: Partial<UserEntity>): Promise<UserEntity>;
  abstract remove(id: number): Promise<UserEntity | null>;
}