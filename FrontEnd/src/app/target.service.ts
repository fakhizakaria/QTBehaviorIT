import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from './environment'
import { Observable } from 'rxjs';
import { Target } from './target';


@Injectable({
  providedIn: 'root'
})
export class TargetService {
  socket:any;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', 'Hello there from Behavior App.');
  }

  getRandomBehavior() {
    return new Observable((subscriber) => {
      this.socket.on('new-behavior', (behavior: Target) =>{
        subscriber.next(behavior);
      });
    });
  }

  getBehaviorScore() {
    return new Observable((subscriber) => {
      this.socket.on('score-behavior', (score: Target) =>{
        subscriber.next(score);
      });
    }); 
  }
}
