import { Component, OnInit } from '@angular/core';
import { Factura, FacturaService, DetalleEntradaDTO } from '../factura.service';
import { Producto, ProductosService } from '../productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit {
  facturas: Factura[] = [];
  facturaActual: Factura = this.getFacturaVacia();
  modoEditar: boolean = false;

  productosDisponibles: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(
    private facturaService: FacturaService,
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarProductos();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productosDisponibles = data;
    });
  }

  nuevaFactura() {
    this.modoEditar = false;
    this.facturaActual = this.getFacturaVacia();
    this.productoSeleccionado = null;
  }

  guardarFactura() {
    if (this.facturaActual.productos.length === 0) return;

    const detallesEntrada: DetalleEntradaDTO[] = this.facturaActual.productos.map(p => {
      const producto = this.productosDisponibles.find(prod => prod.nombre_producto === p.nombre_producto);
      return {
        id_producto: producto?.id_producto || 0,
        cantidad: p.cantidad
      };
    });

    this.facturaService.createFacturaEntrada(detallesEntrada).subscribe(() => {
      this.cargarFacturas();
      this.nuevaFactura();
    });
  }

  editarFactura(factura: Factura) {
    this.facturaActual = { ...factura };
    this.modoEditar = true;
  }

  eliminarFactura(id: number) {
    if (confirm('¿Estás seguro de eliminar esta factura?')) {
      this.facturaService.deleteFactura(id).subscribe(() => {
        this.cargarFacturas();
      });
    }
  }

  actualizarTotales() {
    this.facturaActual.subtotal = 0;
    this.facturaActual.productos.forEach(p => {
      p.total = p.cantidad * p.precio_unitario;
      this.facturaActual.subtotal += p.total;
    });

    this.facturaActual.iva = +(this.facturaActual.subtotal * 0.16).toFixed(2); // 16% IVA
    this.facturaActual.total = +(this.facturaActual.subtotal + this.facturaActual.iva).toFixed(2);
  }

  agregarProducto() {
    if (this.productoSeleccionado) {
      const yaExiste = this.facturaActual.productos.some(
        p => p.nombre_producto === this.productoSeleccionado!.nombre_producto
      );

      if (!yaExiste) {
        const nuevoDetalle = {
          nombre_producto: this.productoSeleccionado.nombre_producto,
          cantidad: 1,
          precio_unitario: this.productoSeleccionado.precio_unitario,
          total: this.productoSeleccionado.precio_unitario
        };
        this.facturaActual.productos.push(nuevoDetalle);
        this.actualizarTotales();
      }

      this.productoSeleccionado = null;
    }
  }

  getFacturaVacia(): Factura {
    return {
      id_factura: 0,
      fecha: new Date().toISOString().substring(0, 10),
      subtotal: 0,
      iva: 0,
      total: 0,
      productos: []
    };
  }
}
