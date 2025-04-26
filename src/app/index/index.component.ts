import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(private router: Router) {}

  irAProductos() {
    this.router.navigate(['/productos']);
  }

  irAFactura() {
    this.router.navigate(['/factura']);
  }
}

