import { Component, Input } from '@angular/core';
import { menuItem } from '../../models/menuItem';
import { NgIf } from '@angular/common';
import { MenuItemModalComponent } from '../menu-item-modal/menu-item-modal.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [NgIf, MenuItemModalComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})

export class MenuItemComponent {
  @Input() menuItem!: menuItem;

  showPopup: Boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  onConfirm(event: {
    item: menuItem;
    sauces: string[];
    extras: string[];
    sizes: string[];
  }) {
    this.showPopup = false;
    console.log('✔ Wybrane opcje:', event);
  }
  

  onCancel() {
    this.showPopup = false;
  }

}
