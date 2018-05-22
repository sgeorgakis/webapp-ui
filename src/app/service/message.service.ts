import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public life: number = 5000;

  constructor() { }

  displayMessage(type: string, description: string) { }
}
