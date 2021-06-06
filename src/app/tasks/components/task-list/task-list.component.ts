import { Component, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';
import { TaskPromiseService } from '../../services';

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
    private router: Router,
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService, ) { }

  public ngOnInit(): void {
    this.tasks = this.taskArrayService.getTasks();
    this.tasks = this.taskPromiseService.getTasks();
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
    const updatedTask: TaskModel = await this.taskPromiseService.updateTask({
      ...task,
      done: true,
    });

    const tasks: TaskModel[] = await this.tasks;
    const index: number = tasks.findIndex(task => task.id === updatedTask.id);

    tasks[index] = { ...updatedTask };
  }
}
