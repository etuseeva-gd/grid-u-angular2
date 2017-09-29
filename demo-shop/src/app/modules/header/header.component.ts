import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  user: IUser;

  @Output()
  logoutEventEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.logoutEventEmitter.emit();
  }

}
