import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apoderado } from '../model/apoderado.model';
import { Comunidad } from '../model/comunidad.model';
import { Establecimiento } from '../model/establecimiento.model';
import { Ingrediente } from '../model/ingrediente.model';
import { Insignia } from '../model/insignia.model';
import { Menu } from '../model/menu.model';
import { Nino } from '../model/nino.model';
import { Plato } from '../model/plato.model';
import { PremioFisico } from '../model/premiofisico.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private raizAPI = 'http://127.0.0.1:8000/api/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private cliente: HttpClient) {}

  // ===== ESTABLECIMIENTOS =====
  GetEstablecimiento(): Observable<Establecimiento[]> {
    return this.cliente.get<Establecimiento[]>(this.raizAPI + 'establecimiento/');
  }

  PostEstablecimiento(item: Establecimiento): Observable<Establecimiento> {
    return this.cliente.post<Establecimiento>(this.raizAPI + 'establecimiento/', JSON.stringify(item), { headers: this.headers });
  }

  PutEstablecimiento(item: Establecimiento): Observable<Establecimiento> {
    return this.cliente.put<Establecimiento>(this.raizAPI + 'establecimiento/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeleteEstablecimiento(item: Establecimiento): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'establecimiento/' + item.id + '/');
  }

  // ===== COMUNIDADES =====
  GetComunidad(): Observable<Comunidad[]> {
    return this.cliente.get<Comunidad[]>(this.raizAPI + 'comunidad/');
  }

  PostComunidad(item: Comunidad): Observable<Comunidad> {
    return this.cliente.post<Comunidad>(this.raizAPI + 'comunidad/', JSON.stringify(item), { headers: this.headers });
  }

  PutComunidad(item: Comunidad): Observable<Comunidad> {
    return this.cliente.put<Comunidad>(this.raizAPI + 'comunidad/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeleteComunidad(item: Comunidad): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'comunidad/' + item.id + '/');
  }

  // ===== NIÑOS =====
  GetNino(): Observable<Nino[]> {
    return this.cliente.get<Nino[]>(this.raizAPI + 'nino/');
  }

  PostNino(item: Nino): Observable<Nino> {
    return this.cliente.post<Nino>(this.raizAPI + 'nino/', JSON.stringify(item), { headers: this.headers });
  }

  PutNino(item: Nino): Observable<Nino> {
    return this.cliente.put<Nino>(this.raizAPI + 'nino/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeleteNino(item: Nino): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'nino/' + item.id + '/');
  }

  // ===== INSIGNIAS =====
  GetInsignia(): Observable<Insignia[]> {
    return this.cliente.get<Insignia[]>(this.raizAPI + 'insignia/');
  }

  PostInsignia(item: Insignia): Observable<Insignia> {
    return this.cliente.post<Insignia>(this.raizAPI + 'insignia/', JSON.stringify(item), { headers: this.headers });
  }

  PutInsignia(item: Insignia): Observable<Insignia> {
    return this.cliente.put<Insignia>(this.raizAPI + 'insignia/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeleteInsignia(item: Insignia): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'insignia/' + item.id + '/');
  }

  // ===== PREMIOS FÍSICOS =====
  GetPremioFisico(): Observable<PremioFisico[]> {
    return this.cliente.get<PremioFisico[]>(this.raizAPI + 'premio_fisico/');
  }

  PostPremioFisico(item: PremioFisico): Observable<PremioFisico> {
    return this.cliente.post<PremioFisico>(this.raizAPI + 'premio_fisico/', JSON.stringify(item), { headers: this.headers });
  }

  PutPremioFisico(item: PremioFisico): Observable<PremioFisico> {
    return this.cliente.put<PremioFisico>(this.raizAPI + 'premio_fisico/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeletePremioFisico(item: PremioFisico): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'premio_fisico/' + item.id + '/');
  }

  // ===== INGREDIENTES =====
  GetIngrediente(): Observable<Ingrediente[]> {
    return this.cliente.get<Ingrediente[]>(this.raizAPI + 'ingrediente/');
  }

  PostIngrediente(item: Ingrediente): Observable<Ingrediente> {
    return this.cliente.post<Ingrediente>(this.raizAPI + 'ingrediente/', JSON.stringify(item), { headers: this.headers });
  }

  PutIngrediente(item: Ingrediente): Observable<Ingrediente> {
    return this.cliente.put<Ingrediente>(this.raizAPI + 'ingrediente/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeleteIngrediente(item: Ingrediente): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'ingrediente/' + item.id + '/');
  }

  PostIngredienteForm(item: Ingrediente, foto: File | null): Observable<Ingrediente> {
    return this.cliente.post<Ingrediente>(
      this.raizAPI + 'ingrediente/', this.armarFormIngrediente(item, foto));
  }

  PutIngredienteForm(item: Ingrediente, foto: File | null): Observable<Ingrediente> {
    return this.cliente.put<Ingrediente>(
      this.raizAPI + 'ingrediente/' + item.id + '/', this.armarFormIngrediente(item, foto));
  }

  private armarFormIngrediente(item: Ingrediente, foto: File | null): FormData {
    const formData = new FormData();
    formData.append('nombre', item.nombre);
    formData.append('tipo_hierro', item.tipo_hierro ?? 'SIN_HIERRO');
    (item.no_combinar_con ?? []).forEach(id =>
      formData.append('no_combinar_con', String(id)));
    if (foto) {
      formData.append('foto', foto, foto.name);
    }
    return formData;
  }

  // ===== PLATOS =====
  GetPlato(): Observable<Plato[]> {
    return this.cliente.get<Plato[]>(this.raizAPI + 'plato/');
  }

  PostPlato(item: Plato): Observable<Plato> {
    return this.cliente.post<Plato>(this.raizAPI + 'plato/', JSON.stringify(item), { headers: this.headers });
  }

  PutPlato(item: Plato): Observable<Plato> {
    return this.cliente.put<Plato>(this.raizAPI + 'plato/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }

  DeletePlato(item: Plato): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'plato/' + item.id + '/');
  }

  // ===== APODERADOS (solo lectura) =====
  GetApoderado(): Observable<Apoderado[]> {
    return this.cliente.get<Apoderado[]>(this.raizAPI + 'apoderado/');
  }

    // ===== MENU =====
  GetMenu(): Observable<Menu[]> {
    return this.cliente.get<Menu[]>(this.raizAPI + 'menu/');
  }
  PostMenu(item: Menu): Observable<Menu> {
    return this.cliente.post<Menu>(this.raizAPI + 'menu/', JSON.stringify(item), { headers: this.headers });
  }
  PutMenu(item: Menu): Observable<Menu> {
    return this.cliente.put<Menu>(this.raizAPI + 'menu/' + item.id + '/', JSON.stringify(item), { headers: this.headers });
  }
  DeleteMenu(item: Menu): Observable<void> {
    return this.cliente.delete<void>(this.raizAPI + 'menu/' + item.id + '/');
  }
}