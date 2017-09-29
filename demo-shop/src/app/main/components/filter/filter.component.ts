import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  canSeeFilter: boolean;

  constructor() { }

  ngOnInit() {
    // this.canSeeFilter = false;
    this.canSeeFilter = true;
  }

  toggleFilter() {
    this.canSeeFilter = !this.canSeeFilter;
  }

}
