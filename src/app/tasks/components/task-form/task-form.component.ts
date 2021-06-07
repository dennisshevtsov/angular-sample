import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, } from '@angular/router';

import { PartialObserver, } from 'rxjs';
import { switchMap, } from 'rxjs/operators';

import { TaskModel, } from '../../models/task.model';
import { TaskArrayService,
         TaskPromiseService, } from '../../services';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  public task: TaskModel;

  public constructor(
    private taskArrayService: TaskArrayService,
    private taskPromiseService: TaskPromiseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.task = new TaskModel();

    const observer : PartialObserver<TaskModel | null> = {
      next: (task: TaskModel | null) => {
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
              return this.taskPromiseService.getTask(+params.get('taskID')!);
            }

            return Promise.resolve(null);
          }))
        .subscribe(observer);
  }

  public onSaveTask(): void {
    const task: TaskModel = { ...this.task } as TaskModel;
    const method: keyof TaskPromiseService = task.id ? 'updateTask' : 'createTask';

    this.taskPromiseService[method](task)
        .then(() => this.onGoBack())
        .catch(error => console.log(error));
  }

  public onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
