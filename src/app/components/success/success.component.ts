import { Component, OnInit } from '@angular/core';
import { CartSessionService } from '../../services/cartSession.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  constructor(private cartSession: CartSessionService, private  router: Router) {}

  ngOnInit(): void {
    this.cartSession.clearCartId(); // czyści koszyk po sukcesie
  }

  goToHome(){
    this.router.navigate(['/'])
  }
}
