import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Promocion} from "../../interface/interface";

@Component({
  selector: 'app-promocion',
  templateUrl: './promocion.page.html',
  styleUrls: ['./promocion.page.scss'],
})
export class PromocionPage implements OnInit {

  promocion: Promocion = {_id: '', nombre: '', descripcion: '', img: ''};

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getPromocion(param).subscribe(res => {
      this.promocion = res as Promocion;
      console.log(this.promocion.descripcion);
    });
  }

}
