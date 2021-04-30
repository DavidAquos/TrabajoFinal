import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Producto} from "../../interface/interface";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProductos().subscribe(res => {
      this.productos = res as Producto[];
    });
  }

}
