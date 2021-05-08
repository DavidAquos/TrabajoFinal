import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Producto, Promocion} from "../../interface/interface";

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
})
export class ImagenPage implements OnInit {

  img: any;

  slideOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    dataService.getPromocion(param).subscribe(res => {
      this.img = (res as Promocion).img;
    });
  }

  ngOnInit() {
  }

}
