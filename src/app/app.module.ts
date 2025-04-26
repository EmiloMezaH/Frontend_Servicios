import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ProductosComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
