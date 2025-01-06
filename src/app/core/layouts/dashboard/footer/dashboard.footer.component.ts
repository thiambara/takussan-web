import {Component} from '@angular/core';
import {DashboardLayoutService} from "../service/dashboard.layout.service";

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard.footer.component.html',
  imports: [
  ],
  standalone: true
})
export class DashboardFooterComponent {
  constructor(public layoutService: DashboardLayoutService) {
  }
}
