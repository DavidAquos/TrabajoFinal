export interface Promocion {
  _id: string;
  nombre: string;
  precio: number;
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
  nombre: string;
  descuento: number;
  caducidad: string;
}

export interface Usuario {
  _id: string;
  nombre: string;
  apellidos: string;
  num_telefono: number;
  correo: string;
  pw: string;
  direcciones: string[];
  datos_tarjeta: string;
  nivel: string;
}

export interface Pedido {
  _id: string;
  entrega: number; // si va a ser entrega con o sin contacto (1 con contacto, 2 sin contacto , 3 etc)
  servicio: number; // Precio del servicio
  envio: number; // Precio del envio
  precio_productos: number; // Precio productos
  descuento_codigo: number; // Descuento del codigo
  total: number; // Suma de todo y resta del descuento
  metodo_pago: string; // Paypal o CC
}
