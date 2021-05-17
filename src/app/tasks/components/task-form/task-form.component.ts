import { Component, OnInit, } from '@angular/core';

import { TaskModel, } from '../../models/task.model';
import { TaskArrayService, } from '../../services/task-array.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  public task: TaskModel;

  public constructor(
    private taskArrayService: TaskArrayService,
  ) { }

  public ngOnInit(): void {
    this.task = new TaskModel();
  }

  public onSaveTask(): void {
    const task: TaskModel = { ...this.task } as TaskModel;

    if (task.id) {
      this.taskArrayService.updateTask(task);
    }
    else {
      this.taskArrayService.createTask(task);
    }
  }

  public onGoBack(): void {}
}
