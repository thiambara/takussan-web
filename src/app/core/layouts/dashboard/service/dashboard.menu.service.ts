import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DashboardMenuchangeevent} from '../api/dashboard.menuchangeevent';

@Injectable({
  providedIn: 'root'
})
export class DashboardMenuService {

  private menuSource = new Subject<DashboardMenuchangeevent>();
  menuSource$ = this.menuSource.asObservable();
  private resetSource = new Subject();
  resetSource$ = this.resetSource.asObservable();

  onMenuStateChange(event: DashboardMenuchangeevent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }
}
