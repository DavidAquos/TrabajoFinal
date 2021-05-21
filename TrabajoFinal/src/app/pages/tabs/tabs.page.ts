import { Component, OnInit } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {DataService} from '../../services/data.service';
import {Pedido} from "../../interface/interface";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  listTickets: any[];
  pedido: Pedido;
  constructor(private dataService: DataService) { }

  ngOnInit() {

  }
}
