import { Component, OnInit, Input } from '@angular/core';
import { ShowModalService } from 'src/app/services/show-modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() show: boolean = false;

  constructor(private showModal: ShowModalService) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.showModal.changeState(false);
  }
}
