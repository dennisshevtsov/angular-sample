import { Component, OnInit, } from '@angular/core';

import { TaskModel, } from './../../models/task.model';
import { TaskArrayService, } from './../../services/task-array.service';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: [
    './task-list.component.scss',
  ]
})
export class TaskListComponent implements OnInit {
  public tasks: Promise<Array<TaskModel>>;

  public constructor(
    private taskArrayService: TaskArrayService, ) { }

  public ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
  }

  public onCompleteTask(task: TaskModel): void {
    const updatedTask = { ...task, done: true, };

    this.taskArrayService.updateTask(updatedTask);
  }

  public onEditTask(task: TaskModel): void {}
}
