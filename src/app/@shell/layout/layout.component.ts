import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeadingService } from 'src/app/@data/services/heading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  title:Observable<string>;

  constructor(
    private headingService: HeadingService
  ){}

  ngOnInit(): void {
    this.title = this.headingService.headingTitle$;
  }
}
