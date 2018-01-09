import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'img[src]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class DefaultImageDirective {
  @Input()
  src:string;

  constructor() {}

  updateUrl() {
    this.src = 'http://www.kickoff.com/chops/images/resized/large/no-image-found.jpg';
  }
}
