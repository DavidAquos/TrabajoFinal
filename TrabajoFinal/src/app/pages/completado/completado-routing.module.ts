import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletadoPage } from './completado.page';

const routes: Routes = [
  {
    path: '',
    component: CompletadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletadoPageRoutingModule {}
