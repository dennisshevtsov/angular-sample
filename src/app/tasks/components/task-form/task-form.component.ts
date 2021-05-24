import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, } from '@angular/router';

import { PartialObserver, } from 'rxjs';
import { switchMap, } from 'rxjs/operators';

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.task = new TaskModel();

    const observer : PartialObserver<TaskModel | undefined> = {
      next: (task: TaskModel | undefined) => {
        if (task != null) {
          this.task = { ...task };
        }
      },
      error: (error: any) => console.log(error),
    };
    this.route
        .paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            const taskId: string | null = params.get('taskID');

            if (taskId != null)
            {
              return this.taskArrayService.getTask(+taskId);
            }

            return Promise.reject('Parameter taskID is null.');
          }))
        .subscribe(observer);
  }

  public onSaveTask(): void {
    const task: TaskModel = { ...this.task } as TaskModel;

    if (task.id) {
      this.taskArrayService.updateTask(task);
    }
    else {
      this.taskArrayService.createTask(task);
    }

    this.onGoBack();
  }

  public onGoBack(): void {
    this.router.navigate(['/home']);
  }
}