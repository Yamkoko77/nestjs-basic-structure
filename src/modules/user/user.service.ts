import { Injectable } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  private readonly userDocs: UserEntity[] = [
    {
      username: 'ykk777',
      password: '$2a$10$7.H9RfGqFfL1p25s/3T9G.qlyVUPn52SkHpF1dUJUELnhv/vldqXO', //123456
      roles: ['user', 'admin'],
      accessToken: null,
    },
  ]

  // constructor() {
  //   this.userDocs = [
  //     {
  //       username: 'ykk777',
  //       password:
  //         '$2a$10$7.H9RfGqFfL1p25s/3T9G.qlyVUPn52SkHpF1dUJUELnhv/vldqXO', //123456
  //       roles: ['user', 'admin'],
  //       accessToken: null,
  //     },
  //   ]
  // }

  async findOneUser(username: string): Promise<UserEntity> {
    console.log('🚀 ~ UserService ~ findOneUser ~ username:', username)
    console.log('🚀 ~ UserService ~ create ~ userDocs:', this.userDocs)
    const user = this.userDocs.find((user) => user.username === username)
    console.log('🚀 ~ UserService ~ findOneUser ~ user:', user)

    return user
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.userDocs.push(user)
    console.log('🚀 ~ UserService ~ create ~ userDocs:', this.userDocs)

    return user
  }

  async comparePassword(
    passwordHash: string,
    password: string,
  ): Promise<boolean> {
    const res = await bcrypt.compare(password, passwordHash)
    return res
  }

  async hashPassword(password: string, hashSize = 10): Promise<string> {
    return bcrypt.hash(password, hashSize)
  }
}
