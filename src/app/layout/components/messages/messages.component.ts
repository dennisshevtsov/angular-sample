import { Component, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';

import { MessagesService, } from 'src/app/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss',]
})
export class MessagesComponent implements OnInit {
  public message: string = '';

  public constructor(
    public messagesService: MessagesService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public onClose(): void {
    this.router.navigate([{
        outlets: {
          messages: null,
        },
      }]);
    this.messagesService.isDisplayed = false;
  }

  public onSend(): void {
    if (this.message) {
      this.messagesService.addMessages(this.message);
      this.message = "";
    }
  }
}
