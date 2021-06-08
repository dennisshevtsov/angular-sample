import { Component, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';

import { TaskModel, } from './../../models/task.model';
import { TaskPromiseService, } from '../../services';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: [
    './task-list.component.scss',
  ]
})
export class TaskListComponent implements OnInit {
  public tasks: Promise<Array<TaskModel>>;

  public constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService, ) { }

  public ngOnInit(): void {
    this.tasks = this.taskPromiseService.getTasks();
  }

  public onCreateTask(): void {
    const link = [ '/add' ];

    this.router.navigate(link);
  }

  public onCompleteTask(task: TaskModel): void {
    this.updateTask(task)
        .catch(error => console.log(error));
  }

  public onEditTask(task: TaskModel): void {
    const link: Array<any> = [
      '/edit',
      task.id,
    ];

    this.router.navigate(link);
  }

  private async updateTask(task: TaskModel): Promise<void> {
    const updatingTask: TaskModel = {
      ...task,
      done: true,
    };
    const updatedTask: TaskModel = await this.taskPromiseService.updateTask(updatingTask);

    const tasks: TaskModel[] = await this.tasks;
    const index: number = tasks.findIndex(task => task.id === updatedTask.id);

    tasks[index] = { ...updatedTask };
  }
}
