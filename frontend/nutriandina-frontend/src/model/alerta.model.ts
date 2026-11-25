export class Alerta {
    id: number;
    nino: number;
    personal: number | null;
    tipo: string;
    fecha_generada: string;
    estado: string;
    fecha_atencion: string | null;
}