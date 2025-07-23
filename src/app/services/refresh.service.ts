import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RefreshService {
  private refreshTrigger = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshTrigger.asObservable();

  triggerRefresh() {
    this.refreshTrigger.next();
  }
}