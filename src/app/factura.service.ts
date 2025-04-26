import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetalleFactura {
  nombre_producto: string;
  cantidad: number;
  precio_unitario: number;
  total: number;
}

export interface Factura {
  id_factura: number;
  fecha: string;
  subtotal: number;
  iva: number;
  total: number;
  productos: DetalleFactura[];
}

export interface DetalleEntradaDTO {
  id_producto: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:8080/facturas';

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  createFacturaEntrada(detalles: DetalleEntradaDTO[]): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, detalles);
  }

  updateFactura(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${factura.id_factura}`, factura);
  }

  deleteFactura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
