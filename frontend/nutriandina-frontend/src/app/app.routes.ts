import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { InicioComponent } from './inicio/inicio';
import { AuthGuard } from '../services/auth.guard';
import { LayoutComponent } from './layout/layout';
import { MenuComponent } from './menu/menu';
import { EstablecimientoComponent } from './establecimiento/establecimiento';
import { ComunidadComponent } from './comunidad/comunidad';
import { NinoComponent } from './nino/nino';
import { InsigniaComponent } from './insignia/insignia';
import { PremioFisicoComponent } from './premiofisico/premiofisico';
import { IngredienteComponent } from './ingrediente/ingrediente';
import { PlatoComponent } from './plato/plato';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InicioComponent },
      { path: 'inicio', redirectTo: '', pathMatch: 'full' },
      { path: 'establecimiento', component: EstablecimientoComponent },
      { path: 'comunidad', component: ComunidadComponent },
      { path: 'nino', component: NinoComponent },
      { path: 'insignia', component: InsigniaComponent },
      { path: 'premiofisico', component: PremioFisicoComponent },
      { path: 'ingrediente', component: IngredienteComponent },
      { path: 'plato', component: PlatoComponent },
      { path: 'menu', component: MenuComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];