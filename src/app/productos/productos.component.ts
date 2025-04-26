import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoActual: Producto = this.getProductoVacio();
  modoEditar: boolean = false;

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(datos => {
      this.productos = datos;
    });
  }

  nuevoProducto(): void {
    this.productoActual = this.getProductoVacio();
    this.modoEditar = false;
  }

  guardarProducto(): void {
    if (this.modoEditar) {
      this.productoService.updateProducto(this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.nuevoProducto();
      });
    } else {
      this.productoService.createProducto(this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.nuevoProducto();
      });
    }
  }

  editarProducto(producto: Producto): void {
    this.productoActual = { ...producto };
    this.modoEditar = true;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  getProductoVacio(): Producto {
    return {
      id_producto: 0,
      nombre_producto: '',
      precio_unitario: 0
    };
  }
}
