import Link from "next/link";
import ProductCard from "../../_components/listingsPage/ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { BannerType } from "@/app/_components/types";

const Productos = ({ productos }: { productos: TProduct[]}) => {
  return (
    <div className="grid grid-cols-[repeat(2,136px)] lg:grid-cols-[repeat(4,288px)] place-content-center gap-y-6 gap-x-4 ">
      {productos?.map((producto) => (
        // TODO make link
        // <Link href={`${producto.slug}`} 
        <div key={producto.slug} className="w-full justify-between flex flex-col gap-4">
          <ProductCard producto={producto}/>
        </div>
      ))}
    </div>
  );
};

export default Productos;
