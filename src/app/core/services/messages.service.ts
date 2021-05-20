import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public isDisplayed: Boolean = false;

  private messages: string[] = [];

  public addMessages(message: string): void {
    const currentDate: Date = new Date();
    this.messages.unshift(`${message} at ${currentDate.toLocaleString()}`);
  }

  public getMessages(): string[] {
    return this.messages;
  }
}
