import React from 'react';
import { Team } from '../vo/team';
import { Todo } from '../vo/todo';
import { User } from '../vo/user';

export class Mock extends React.Component {
  static load(): Todo[] {
    return [
      {
        subject: 'test',
        detail: 'hoge',
        id: 1,
        checked: false,
        removed: false,
        child: null,
      },
    ];
  }

  static getTeams(): Team[] {
    return [
      { id: 1, name: 'team1' },
      { id: 2, name: 'team2' },
    ];
  }

  static getMember(): User[] {
    return [
      { id: 1, name: 'userA' },
      { id: 2, name: 'userB' },
      { id: 3, name: 'userC' },
    ];
  }
}
