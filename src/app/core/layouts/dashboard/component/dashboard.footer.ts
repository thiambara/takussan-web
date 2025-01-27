import {Component} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard-footer',
  template: `
    <div class="layout-footer">
      TAKUSSAN by
      <a href="https://cidemia.com" target="_blank" rel="noopener noreferrer"
         class="text-primary font-bold hover:underline">Cidemia</a>
    </div>`
})
export class DashboardFooter {
}
