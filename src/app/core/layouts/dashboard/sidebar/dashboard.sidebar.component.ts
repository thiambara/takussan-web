import {Component, ElementRef} from '@angular/core';
import {DashboardLayoutService} from "../service/dashboard.layout.service";
import {DashboardMenuComponent} from "./menu/dashboard.menu.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard.sidebar.component.html',
  imports: [
    CommonModule,
    DashboardMenuComponent
  ],
  standalone: true
})
export class DashboardSidebarComponent {
  constructor(public layoutService: DashboardLayoutService, public el: ElementRef) {
  }
}

