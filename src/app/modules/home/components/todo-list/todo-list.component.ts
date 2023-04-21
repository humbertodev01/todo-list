import { Component, DoCheck} from '@angular/core';

// Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {
  public taskList: TaskList[] = JSON.parse(localStorage.getItem('list') || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number): void {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm("Você deseja realmente deletar tudo?");
    if (confirm) this.taskList = [];
  }

  public setEmitTaskList(event: string){
    const task: string = event[0].toUpperCase() + event.substring(1).toLowerCase();
    this.taskList.push({task: task, checked: false});
  }

  public validationInput(event: string, index: number){
    if (!event.length) {
      const confirm = window.confirm("Task está vazia, deseja Deletar?");
      if (confirm) this.deleteItemTaskList(index)
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
    console.log('setLocalStorage');
  }
}
