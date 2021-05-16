import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletadoPageRoutingModule } from './completado-routing.module';

import { CompletadoPage } from './completado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletadoPageRoutingModule
  ],
  declarations: [CompletadoPage]
})
export class CompletadoPageModule {}
