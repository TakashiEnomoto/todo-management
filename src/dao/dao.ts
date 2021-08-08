import { Team } from '../vo/team';
import { Todo } from '../vo/todo';
import { User } from '../vo/user';
import { Mock } from './mock';

export class Dao {
  static load(): Todo[] {
    return Mock.load();
  }

  static getTeams(): Team[] {
    return Mock.getTeams();
  }

  static getMember(): User[] {
    return Mock.getMember();
  }
}
