import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'ofertas',
        loadChildren: () => import('../../pages/ofertas/ofertas.module').then(m => m.OfertasPageModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('../../pages/productos/productos.module').then(m => m.ProductosPageModule)
      },
      {
        path: 'cupones',
        loadChildren: () => import('../../pages/cupones/cupones.module').then(m => m.CuponesPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule)
      },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
