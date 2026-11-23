import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
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
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.cargarMenu());
  }

  items: Menu[] = [];
  usuario: any = null;

  ngOnInit() {
    this.usuario = this.autToken.obtenerUsuario();
    this.cargarMenu();
  }

  cargarMenu() {
    this.api.GetMenu().subscribe(x => {
      this.items = x.sort((a, b) => a.orden - b.orden);
      this.cdr.detectChanges();
    });
  }

  irAMenu() {
    this.router.navigate(['/menu']);
  }

  logout() {
    this.autToken.logout().subscribe({
      complete: () => this.router.navigate(['login']),
      error: () => { this.autToken.limpiarSesion(); this.router.navigate(['login']); }
    });
  }
}