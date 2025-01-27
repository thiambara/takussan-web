import { Component, ElementRef } from '@angular/core';
import { DashboardMenu } from './dashboard.menu';

@Component({
    selector: 'app-dashboard-sidebar',
    standalone: true,
    imports: [DashboardMenu],
    template: ` <div class="layout-sidebar">
        <app-dashboard-menu></app-dashboard-menu>
    </div>`
})
export class DashboardSidebar {
    constructor(public _: ElementRef) {}
}
