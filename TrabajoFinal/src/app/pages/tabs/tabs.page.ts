import { Component, OnInit } from '@angular/core';
import {AlertController, PopoverController} from "@ionic/angular";
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  listTickets: any[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.dataService.getTicketsVenta().subscribe(tickets => {
    //  this.listTickets = tickets as any[];
    //});
  }
}
