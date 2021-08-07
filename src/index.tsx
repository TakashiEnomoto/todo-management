import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Select, Checkbox, Paper, List, ListItem, MenuItem, ListSubheader, InputLabel, FormControl, TextareaAutosize, TextField } from '@material-ui/core';
import { Todo } from './vo/todo';
import { User } from './vo/user';
import { Team } from './vo/team';
import { Dao } from './dao/dao';
import NativeSelect from '@material-ui/core/NativeSelect';
import classes from '*.module.css';

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';


const App: React.VFC = () => {
  /**
   * text = ステートの値
   * setText = ステートの値を更新するメソッド
   */
  const [text, setText] = useState('');
  const [detail, setDetail] = useState('');
  const [user, setUser] = useState('');
  const [team, setTeam] = useState('');
  const [todos, setTodos] = useState<Todo[]>(Dao.load());
  const [users, setUsers] = useState<User[]>(Dao.getMember());
  const [teams, setTeams] = useState<Team[]>(Dao.getTeams());
  const [filter, setFilter] = useState<Filter>('all');
  const [userFilter, setUserFilter] = useState<User>({id:-1,name:"全員"});
  const [teamFilter, setTeamFilter] = useState<Team>({id:-1,name:"全員"});
  // const teams = config['TEAM'];

  // todos ステートを更新する関数
  const handleOnSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLDivElement>
  ) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      subject: text,
      detail: detail,
      id: new Date().getTime(),
      checked: false,
      removed: false,
      child: null,
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnEdit = (id: number, subject: string) => {
    /**
     * 引数として渡された todo の id が一致する
     * todos ステート（のコピー）内の todo の
     * value プロパティを引数 value に書き換える
     */
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.subject = subject;
      }
      return todo;
    });

    // todos ステートを更新
    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  }

  return (
    <div>
      <Select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}>
        <MenuItem value="all">すべてのタスク</MenuItem>
        <MenuItem value="checked">完了したタスク</MenuItem>
        <MenuItem value="unchecked">未完了のタスク</MenuItem>
        <MenuItem value="removed">削除済みのタスク</MenuItem>
      </Select>
      <Select defaultValue="-1" >
        <MenuItem value="-1">全チーム</MenuItem>
        {teams.map((team) => {
          return(
            <MenuItem value={team.id}>{team.name}</MenuItem>
          );
        })}
      </Select>
      <Select defaultValue="-1">
        <MenuItem value="-1">全員</MenuItem>
        {users.map((user) => {
          return(
            <MenuItem value={user.id}>{user.name}</MenuItem>
          );
        })}
      </Select>

      {filter === 'removed' ? (
        <Button
          onClick={() => handleOnEmpty()}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </Button>
      ) : (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          {/* 自分が選択されている状態にする */}
          <Select 
            defaultValue="1"
            // onChange={(e) => setTeam(e.target.value)}
          > 
            {teams.map((team) => {
              return(
                <MenuItem value={team.id}>{team.name}</MenuItem>
              );
            })}
          </Select>
          <Select defaultValue="1">
            {users.map((user) => {
              return(
                <MenuItem value={user.id}>{user.name}</MenuItem>
              );
            })}
          </Select>
          <Input
            type="text"
            value={text}
            disabled={filter === 'checked'}
            onChange={(e) => setText(e.target.value)}
            placeholder="概要"
          />
          <TextField       
            multiline
            rows={4}
            placeholder="詳細"
            onChange={(e) => setDetail(e.target.value)} />
          <Input
            type="submit"
            value="追加"
            disabled={filter === 'checked'}
            onSubmit={(e) => handleOnSubmit(e)}
          />
        </form>
      )}
      <List>
        <ListSubheader>{`Check  value`}</ListSubheader>
        {filteredTodos.map((todo) => {
          return (
            <Paper>
              <ListItem key={todo.id}>
                <Checkbox
                  disabled={todo.removed}
                  checked={todo.checked}
                  onChange={() => handleOnCheck(todo.id, todo.checked)}
                />
                <Input
                  type="text"
                  disabled={todo.checked || todo.removed}
                  value={todo.subject}
                  onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                />
                <Button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                  {todo.removed ? '復元' : '削除'}
                </Button>
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));