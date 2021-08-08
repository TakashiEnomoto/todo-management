import { Team } from '../vo/team';
import { User } from '../vo/user';
import { Mock } from './mock';

enum KEYS {
  SAMPLE_TEXT = 'TODO_DATA',
}

export class LocalStrage {
  getItem(key: KEYS) {
    const value = localStorage.getItem(KEYS.SAMPLE_TEXT);
    if (value !== null) {
      return value;
    }
    return '';
  }

  removeItem(key: KEYS) {
    localStorage.removeItem(key);
  }

  setItem(key: KEYS, value: any) {
    localStorage.setItem(key, value);
  }

  getTeams(): Team[] {
    return Mock.getTeams();
  }

  getMember(): User[] {
    return Mock.getMember();
  }
}
