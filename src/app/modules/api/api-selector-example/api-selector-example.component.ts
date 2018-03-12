import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-selector-example',
  templateUrl: './api-selector-example.component.html',
  styleUrls: ['./api-selector-example.component.css']
})
export class ApiSelectorExampleComponent implements OnInit {
  newCompanyGroup: FormGroup;
  nameCtrl: FormControl;
  categoryCtrl: FormControl;

  constructor() {
    // Ctrl
    this.nameCtrl = new FormControl('', [Validators.required]);
    this.categoryCtrl = new FormControl('', [Validators.required]);
    this.newCompanyGroup = new FormGroup({
      name: this.nameCtrl,
      category: this.categoryCtrl
    });
  } // constructor()

  next() {
    console.log(this.newCompanyGroup.value);
  }
  selected(selectLink: string[]) {
    console.log('output', selectLink);
  }
  ngOnInit() {}
}
