import { Component } from '@angular/core';
import { NgIf, AsyncPipe  } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, AsyncPipe ],
  template: `
    <div *ngIf="toastService.message$ | async as message" class="toast">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
