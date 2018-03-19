import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import {Greeting} from './greeting';
import {GreetingService} from './greeting.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  providers: [GreetingService],
  animations: [
    trigger('flyInOut', [
      state('stated', style({transform: 'translateY(0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateY(150%)', opacity: 0}),
        animate('160ms ease-in')
      ]),
      transition('* => void', [
        animate('160ms ease-in', style({transform: 'translateY(-150%)', opacity: 0}))
      ])
    ]), trigger('fadeInOut', [
      state('stated', style({opacity: 1})),
      transition('void => *', [
        style({opacity: 0}),
        animate('160ms')
      ]),
      transition('* => void', [
        animate('160ms 160ms', style({opacity: 0}))
      ])
    ]), trigger('bounceEmphasis', [
      state('base', style({transform: 'translateY(0)'})),
      transition('base => apex', [
        style({transform: 'translateY(-2%)'}),
        animate('160ms ease-in')
      ]),
      transition('apex => base', [
        animate('160ms ease-out', style({transform: 'translateY(0)'}))
      ])
    ])]
})

export class GreetingComponent implements OnInit {

  greetingStarted = false;
  greetingIndex = 0;
  greetingSet: Greeting[] = [new Greeting('', 1000, 0)];
  bounceState = 'base';

  faceImages: string[] = ['assets/images/greeting_pic_00.png',
    'assets/images/greeting_pic_01.png',
    'assets/images/greeting_pic_02.png',
    'assets/images/greeting_pic_03.png',
    'assets/images/greeting_pic_04.png'];

  constructor(private greetingService: GreetingService) {
  }

  ngOnInit() {
    this.greetingService.getGreetings().subscribe(greetingSet => {
      this.greetingSet = greetingSet.map(greeting => new Greeting(greeting.message, greeting.duration, greeting.faceId));
      this.greetingStarted = true;
      this.greetingSet[this.greetingIndex].cycleState();
    });
  }

  nextGreeting() {
    if (this.greetingIndex >= this.greetingSet.length - 1) {
      return;
    }
    this.bounceUp();
    this.greetingSet[this.greetingIndex].cycleState();
    this.greetingIndex = (this.greetingIndex + 1) % this.greetingSet.length;
    this.greetingSet[this.greetingIndex].cycleState();
  }

  bounceUp() {
    this.bounceState = 'apex';
  }

  bounceDown() {
    this.bounceState = 'base';
  }

}
