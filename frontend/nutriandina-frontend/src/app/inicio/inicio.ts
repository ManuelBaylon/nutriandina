import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationToken } from '../../services/auth.service';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class InicioComponent {
  constructor(private autToken: AuthenticationToken) {}

  usuario: any = null;

  ngOnInit() {
    this.usuario = this.autToken.obtenerUsuario();
  }
}
