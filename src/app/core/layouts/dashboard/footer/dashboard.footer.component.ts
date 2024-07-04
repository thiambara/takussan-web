import {Component} from '@angular/core';
import {DashboardLayoutService} from "../service/dashboard.layout.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard.footer.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class DashboardFooterComponent {
  constructor(public layoutService: DashboardLayoutService) {
  }
}
