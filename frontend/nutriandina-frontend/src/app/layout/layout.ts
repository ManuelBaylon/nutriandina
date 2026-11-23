import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Home, User, Users, Book, Building, Sitemap, Trophy, Gift, Apple, List, Cog } from '@primeicons/angular';
import { ApiService } from '../../services/api.service';
import { AuthenticationToken } from '../../services/auth.service';
import { Menu } from '../../model/nutriandina.model';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule,
            Home, User, Users, Book, Building, Sitemap, Trophy, Gift, Apple, List, Cog],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class LayoutComponent {
  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private autToken: AuthenticationToken
  ) {}

  items: Menu[] = [
    { id: 1, texto: 'Inicio', icono: 'home', ruta: '/', orden: 1 },
    { id: 2, texto: 'Establecimientos', icono: 'building', ruta: '/establecimiento', orden: 2 },
    { id: 3, texto: 'Comunidades', icono: 'sitemap', ruta: '/comunidad', orden: 3 },
    { id: 4, texto: 'Niños', icono: 'user', ruta: '/nino', orden: 4 },
    { id: 5, texto: 'Insignias', icono: 'trophy', ruta: '/insignia', orden: 5 },
    { id: 6, texto: 'Premios físicos', icono: 'gift', ruta: '/premiofisico', orden: 6 },
    { id: 7, texto: 'Ingredientes', icono: 'apple', ruta: '/ingrediente', orden: 7 },
    { id: 8, texto: 'Platos', icono: 'list', ruta: '/plato', orden: 8 },
    { id: 9, texto: 'Menú', icono: 'cog', ruta: '/menu', orden: 9 },
  ];
  usuario: any = null;

  ngOnInit() {
    this.usuario = this.autToken.obtenerUsuario();
  }

  cargarMenu() {
    this.api.GetMenu().subscribe(x => {
      this.items = x.sort((a, b) => a.orden - b.orden);
      this.cdr.detectChanges();
    });
  }

  logout() {
    this.autToken.logout().subscribe({
      complete: () => this.router.navigate(['login']),
      error: () => { this.autToken.limpiarSesion(); this.router.navigate(['login']); }
    });
  }
}