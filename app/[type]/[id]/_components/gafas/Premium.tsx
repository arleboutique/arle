import { TGafaPremium } from "@/sanity/queries/pages/types";
import Image from "next/image";
import Cantidad from "../Cantidad";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import CollapsibleProductSection from "../CollapsibleSection";

type TGafaPremiumProps = {
  product: TGafaPremium;
};

const GafaPremium = ({ product }: TGafaPremiumProps) => {
  return (
    <>
      <Image
        className="w-full object-cover"
        src={product.variantes[0].imagenes[0].url}
        width={300}
        height={400}
        alt={product.variantes[0].imagenes[0].alt}
      />
      <section className="flex flex-col px-5">
        <header>
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca} {product.modelo}
          </h1>
          <span>CODE: {product.variantes[0].codigo}</span>
          <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
            ${product.variantes[0].precio}
          </p>
          <div className="text-justify">
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              Págalo a 4 cuotas de $
              {numberToColombianPriceString(
                colombianPriceStringToNumber(product.variantes[0].precio) / 4
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
        <section className="mt-2">
          <Cantidad />
        </section>
        <CollapsibleProductSection classNames="mt-2" title="Descripción">
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
        <CollapsibleProductSection classNames="mt-2" title="Especificaciones" titleActive>
          <p>{product.descripcion}</p>
        </CollapsibleProductSection>
      </section>
    </>
  );
};

export default GafaPremium;

  