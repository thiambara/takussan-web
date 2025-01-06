import {Component, OnInit} from '@angular/core';
import {CustomerListComponent} from "./customer-list/customer-list.component";

@Component({
  templateUrl: './customers.component.html',
  imports: [
    CustomerListComponent
  ],
  standalone: true
})
export class CustomersComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
