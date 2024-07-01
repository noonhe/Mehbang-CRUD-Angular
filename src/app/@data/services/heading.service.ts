import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  private headingTitle = new BehaviorSubject<string>('');
  public headingTitle$ = this.headingTitle.asObservable();
  constructor() { }

  set title(val : string){
    this.headingTitle.next(val);
  }

}
