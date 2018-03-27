import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Router, ActivatedRoute } from '@angular/router';
import { Model } from '../../../../platform/api-browser/api-root/models';

@Component({
  selector: 'app-api-root-example',
  templateUrl: './api-root-example.component.html',
  styleUrls: ['./api-root-example.component.css']
})
export class ApiRootExampleComponent implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  onSelect(model: Model) {
    this.router.navigate([model.name], { relativeTo: this.activeRoute });
  }
}
