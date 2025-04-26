import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FacturaComponent } from './factura/factura.component';
import { ProductosComponent } from './productos/productos.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'factura', component: FacturaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


