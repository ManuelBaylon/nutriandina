import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { Menu } from '../../model/menu.model';

@Component({
  imports: [CommonModule, FormsModule, TableModule, DialogModule, ButtonModule],
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class MenuComponent {
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  items: Menu[] = [];
  verDialogo: boolean = false;
  menu: Menu = {} as Menu;

  ngOnInit() { this.listar(); }

  listar() {
    this.api.GetMenu().subscribe(x => { this.items = x; this.cdr.detectChanges(); });
  }
  nuevo() { this.menu = {} as Menu; this.verDialogo = true; }
  editar(item: Menu) { this.menu = { ...item }; this.verDialogo = true; }

  guardar() {
    if (this.menu.id) {
      this.api.PutMenu(this.menu).subscribe(() => { this.verDialogo = false; this.listar(); });
    } else {
      this.api.PostMenu(this.menu).subscribe(() => { this.verDialogo = false; this.listar(); });
    }
  }
  eliminar(item: Menu) {
    if (!item.id) return;
    this.api.DeleteMenu(item).subscribe(() => this.listar());
  }
}