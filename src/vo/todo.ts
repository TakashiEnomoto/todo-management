export interface Todo {
  subject: string;
  detail: string;
  id: number;
  checked: boolean;
  removed: boolean;
  child: Todo | null;
}
