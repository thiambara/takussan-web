import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DashboardLayoutService} from "../service/dashboard.layout.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard.topbar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class DashboardTopbarComponent {

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: DashboardLayoutService) {
  }
}
