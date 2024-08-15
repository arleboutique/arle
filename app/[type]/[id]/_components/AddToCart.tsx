import Button from "@/app/_components/Button";
import { cn } from "@/app/_lib/utils";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { useCartStore } from "@/app/_components/cart/store";
import { TPricing } from "./Product";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { addedToCartView } from "@/app/_lib/pixelActions";

type PropsAddToCart = {
  className?: string;
  product: TProduct;
  selectedVariant: TVariant;
  quantity: number;
  pricing: TPricing;
};

const AddToCart = ({
  className,
  pricing,
  product,
  quantity,
  selectedVariant,
}: PropsAddToCart) => {
  const { addItem, toggleCart, toggleAddedToCartModal } = useCartStore();
  const addToCart = async (
    producto: TProduct,
    selectedVariant: TVariant,
    quantity: number = 1
  ) => {
    addItem({
      productId: producto._id,
      productName: `${product.marca} ${product._type === "gafasLujo" || product._type === "gafasPremium" || product._type === "relojesLujo" || product._type === "relojesPremium" ? product.modelo : product.titulo}`,
      productCode: selectedVariant.codigoDeReferencia,
      variantId: selectedVariant.codigoDeReferencia,
      price: pricing.finalPrice,
      quantity,
      productType: producto._type,
      discountType: pricing.discountTypeUsed,
      originalPrice: pricing.precioSinDescuento,
    });
    const productObject = {
      productName : `${product.marca} ${product._id}`,
      productType: `${product._type}`,
      productValue: `${selectedVariant.precio}`
    }
    await addedToCartView(productObject);
  };

  return (
    <div
      className={cn(
        "w-[90vw] max-w-lg lg:max-w-none flex flex-col gap-2.5 sticky bottom-5 items-center bg-white shadow py-2 px-2 z-50",
        className
      )}
    >
      <form onSubmit={() => addToCart(product, selectedVariant, quantity)}>
      <Button
        disabled={selectedVariant.unidadesDisponibles <= 0 ? true : false}
        type="submit"
        className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float"
        >
        <LuShoppingCart className="text-base" />
        Añadir al Carrito
      </Button>
      </form>
      <Button
        disabled={selectedVariant.unidadesDisponibles <= 0 ? true : false}
        labelType={"dark"}
        onClick={() => {
          addToCart(product, selectedVariant, quantity);
          toggleCart();
          toggleAddedToCartModal();
        }}
        className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float"
      >
        <MdOutlinePayments className="text-base" /> Compra Rápida
      </Button>
    </div>
  );
};

export default AddToCart;
