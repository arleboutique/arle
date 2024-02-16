import Main from "@/app/_components/Main";
import { getOrderById } from "@/sanity/queries/orders";
import React from "react";
import ProductCard from "@/app/_components/cart/ProductCard";

const Page = async ({ 
  params, 
}: {
  params: {
    paymentId: string
  }
}) => {

  const sanityOrder = await getOrderById(params.paymentId);

  if (!sanityOrder) return <div>no sanity order found</div>;


  return (
    <Main extraClasses="bg-white md:pt-[60px] px-10 pb-10">

      <h1>Tu Orden {sanityOrder._id}</h1>
      <h2>Gracias por tu compra</h2>
      <h3>Detalles de tu pedido:</h3>
      <p>Id: {sanityOrder._id}</p>
      <p>Fecha: {sanityOrder.orderDate}</p>
      <p>Estado: {sanityOrder.status}</p>
      <p>Cliente: {sanityOrder.customer.name}</p>
      <p>Email: {sanityOrder.customer.email}</p>
      <p>Teléfono: {sanityOrder.customer.phone}</p>
      <p>Dirección: {sanityOrder.customer.addressObject?.address}</p>
      <p>Subtotal: {sanityOrder.amounts.subtotal}</p>
      <p>Descuento: {sanityOrder.amounts.discount}</p>
      <p>Impuestos: {sanityOrder.amounts.taxes}</p>
      <p>Estado del envío: {sanityOrder.shipping.status}</p>
      <p>Envío: {sanityOrder.amounts.shipping}</p>
      <p>Total: {sanityOrder.amounts.total}</p>
      <h3>Productos:</h3>
      <ul>
        {sanityOrder.items.map((item) => {
          const { product } = item;

          const variant = product.variantes.find(variante => variante.codigoDeReferencia === item.variantId)

          const image =
            product._type === "relojesLujo" ||
              product._type === "relojesPremium" ||
              product._type === "gafasLujo" ||
              product._type === "gafasPremium"
              // @ts-ignore
              ? variant.imagenes[0]
              : product.imagenes[0];

          const productTitle =
            product._type === "relojesLujo" ||
              product._type === "relojesPremium" ||
              product._type === "gafasLujo" ||
              product._type === "gafasPremium"
              ? product.modelo
              : product.titulo;


          return (
            <ProductCard key={item.variantId} item={item} image={image} productTitle={productTitle} product={product} />
          )
        }
        )}
      </ul>

    </Main>
  );
}

export default Page;