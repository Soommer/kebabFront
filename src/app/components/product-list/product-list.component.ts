import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { menuItem } from '../../models/menuItem';
import { MenuItemService } from '../../services/menuItem.services';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, MenuItemComponent, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  menuItems: menuItem[] = [];
  isLoading = true;
  hasError = false;

  constructor(private menuItemService: MenuItemService) {}

  ngOnInit(): void {
      this.menuItemService.getMenuItems().subscribe({
        next: (data: menuItem[]) => {
          this.menuItems = data;
          this.isLoading = false;
        },
        error: (err: Error) =>{
          console.error('Błąd ładowania menu', err)
          this.hasError = true;
          this.isLoading = false;
      }
    });
  }
}
