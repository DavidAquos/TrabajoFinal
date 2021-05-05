import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {RedSocial} from "../../interface/interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  redSocial: RedSocial[] = [];

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.dataService.getSocial().subscribe(res => {
      this.redSocial = res as RedSocial[];
      console.log(this.redSocial);
    });
  }

}
