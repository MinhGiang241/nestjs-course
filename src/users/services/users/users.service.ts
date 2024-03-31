import { Injectable } from '@nestjs/common'
import { CreateUserType } from 'src/utils/type'

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'Anson0', email: 'anson@anson.com' },
    { username: 'Anson1', email: 'anson@anson.com' },
    { username: 'Anson2', email: 'anson@anson.com' },
  ]
  fetcherUser() {
    return this.fakeUsers
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails)
    return this.fakeUsers
  }

  fetchUserById(id: number) {
    if (id >= this.fakeUsers.length) return null
    return { id, username: 'giang', email: 'anson@email.com' }
  }
}
