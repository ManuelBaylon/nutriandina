export class Ingrediente {
    id: number;
    nombre: string;
    tipo_hierro: string;
    no_combinar_con: number[];
    tiene_hierro: boolean;
    foto: string | null;
}