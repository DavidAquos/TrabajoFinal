import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Promocion, RedSocial} from "../../interface/interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  redSocial: RedSocial[] = [];
  promociones: Promocion[] = [];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.dataService.getSocial().subscribe(res => {
      this.redSocial = res as RedSocial[];
    });
    this.dataService.getPromociones().subscribe(res => {
      this.promociones = res as Promocion[];
    });
  }

}
