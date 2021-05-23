export interface Promocion {
  _id: string;
  nombre: string;
  descripcion: string;
  img: string;
}

export interface Producto {
  _id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  codigo: string;
  img: string;
}

export interface Cupon {
  _id: string;
  nombre: string; // Codigo del cupon
  descuento: number; // Descuento en €
  caducidad: string; // Fecha de caducidad del cupon
}

export interface Usuario {
  _id: string;
  nombre: string;
  apellidos: string;
  num_telefono: number;
  correo: string;
  pw: string;
  direcciones: string[]; // Array que guarda las 2 direcciones de la tarjeta
  datos_tarjeta: string;
  nivel: string;
  id_cupones: string[]; // Array que guarda todos los cupones del usuario
  id_cupones_usado: string[]; // Array que guarda todos los cupones usados del usuario
}

export interface Pedido {
  _id: string;
  entrega: number; // si va a ser entrega con o sin contacto (1 con contacto, 2 sin contacto , 3 etc)
  servicio: number; // Precio del servicio
  envio: number; // Precio del envio
  precio_productos: number[]; // Precio productos orenado por array
  descuento_codigo: number; // Descuento del codigo
  total: number; // Suma de todo y resta del descuento
  metodo_pago: string; // Paypal o CC
  nombre_productos: string[]; // Nombre productos orenado por array
}

export interface RedSocial {
  _id: string;
  nombre: number;
  img: string;
  url: string;
}
