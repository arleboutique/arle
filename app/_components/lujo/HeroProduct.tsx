import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import AddToCart from "@/app/[type]/[id]/_components/AddToCart";
import NuestrasComprasIncluyen from "@/app/[type]/[id]/_components/NuestrasComprasIncluyen";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Labels from "../Labels";
import GalleryProduct from "./GalleryProduct";
import {
  TGafaLujo,
  TPerfumeLujo,
  TRelojLujo,
  isPerfumeLujo,
} from "@/sanity/queries/pages/types";
import { imageType } from "../types";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { VariantSelector } from "@/app/listing/_components/ProductCard";

type HeroProductProps = {
  product: TPerfumeLujo | TRelojLujo | TGafaLujo;
  images: imageType;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
};

const HeroProduct = ({
  product,
  images,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
}: HeroProductProps) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 lg:pb-12 min-h-[70vh] row-auto w-full lg:max-w-mx">
      {/* Product view */}
      <GalleryProduct
        className="col-start-1 col-span-6"
        imagesProduct={images}
        orientation={isPerfumeLujo(product) ? "horizontal" : "vertical"}
      />

      <section className="row-start-1 col-start-7 col-span-6 flex flex-col">
        <Labels
          className="mx-4 relative max-w-fit lg:mt-0 mb-2"
          labelType={"ultimas unidades"}
          label={"ultimas unidades"}
        />
        <header className="px-4 ">
          <h1 className="text-zinc-800 text-[32px] font-semibold font-crimson leading-9 w-full">
            {isPerfumeLujo(product) ? product.titulo : product.modelo}
          </h1>
          <h2 className="text-neutral-600 text-xl font-medium font-tajawal leading-normal">
            {isPerfumeLujo(product) ? product.concentracion : ""}
          </h2>
          <p className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            <span className="capitalize">
              {product.marca} | {product.genero}
            </span>
          </p>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE:{selectedVariant.codigoDeReferencia}
          </span>
          <p className="text-zinc-800 text-[32px] font-normal font-crimson leading-9">
            ${selectedVariant.precio}
          </p>
          <div className="text-justify">
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              Págalo a 4 cuotas de $
              {numberToColombianPriceString(
                colombianPriceStringToNumber(selectedVariant.precio) / 4
              )}{" "}
              sin intereses.
              <br />
              [provider]
            </span>
            <span className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
              .{" "}
            </span>
            <span className="text-zinc-800 text-sm font-normal font-tajawal leading-[16.80px]">
              Learn More
            </span>
          </div>{" "}
        </header>

        <section className="px-4 mb-6 lg:my-6 lg:px-8 flex flex-col gap-5">
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
          <Cantidad
            cantidad={cantidad}
            anadirACantidad={() => setCantidad(cantidad + 1)}
            restarACantidad={() => setCantidad(cantidad - 1)}
          />
        </section>

        <AddToCart
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
          className="hidden static shadow-none w-full py-6 px-4 gap-6 space-y-2 lg:block"
        />

        <section className="px-4 hidden pb-0 lg:block">
          <NuestrasComprasIncluyen
            garantia={isPerfumeLujo(product) ? undefined : product.garantia}
          />
        </section>
      </section>
    </section>
  );
};

export default HeroProduct;
