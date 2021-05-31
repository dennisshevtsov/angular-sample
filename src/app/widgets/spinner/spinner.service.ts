import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  private visible: boolean = false;

  public isVisible(): boolean {
    return this.visible;
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }
}
