import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowModalService {
  public showModal = new BehaviorSubject<boolean>(false);

  showModalObservable = this.showModal.asObservable();

  changeState(state: boolean): void {
    this.showModal.next(state);
  }
}
