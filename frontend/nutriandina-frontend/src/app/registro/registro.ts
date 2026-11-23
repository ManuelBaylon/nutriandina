import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationToken } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class RegistroComponent {
  constructor(private authToken: AuthenticationToken) {}

  nombres: string = '';
  apellidos: string = '';
  dni: string = '';
  username: string = '';
  password: string = '';
  error: string = '';
  exito: string = '';

  registrar() {
    this.error = '';
    this.exito = '';
    if (!this.nombres || !this.apellidos || !this.username || !this.password) {
      this.error = 'Complete todos los campos obligatorios';
      return;
    }
    this.authToken.registro({
      username: this.username,
      password: this.password,
      nombres: this.nombres,
      apellidos: this.apellidos,
      dni: this.dni,
    }).subscribe({
      next: () => {
        this.exito = 'Cuenta creada. Ya puede iniciar sesión.';
        this.nombres = this.apellidos = this.dni = this.username = this.password = '';
      },
      error: e => {
        if (e.error?.username) this.error = 'Ese usuario ya existe';
        else if (e.error?.dni) this.error = 'Ese DNI ya está registrado';
        else if (e.error?.password) this.error = 'La contraseña debe tener al menos 6 caracteres';
        else this.error = 'No se pudo crear la cuenta';
      },
    });
  }
}