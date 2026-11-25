export class PremioEntregado {
    id: number;
    apoderado: number;
    personal: number | null;
    premio: number;
    fecha_otorgado: string;
    estado: string;
    fecha_entrega: string | null;
}