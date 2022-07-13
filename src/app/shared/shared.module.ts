import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { HttpService } from "./services/http-service/http.service";
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HeaderComponent, ProductComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ProductComponent
  ],
  providers: [HttpService],
})
export class SharedModule { }
