import {
  TProduct,
  getListingInitialLoadContent,
} from "@/sanity/queries/pages/listingQueries";
import Productos from "./_components/Productos";
import Colecciones from "../_components/Colecciones";
// import Banner from "../_components/homepage/Banner";
import Filters from "./_components/Filters/index";
import { getAllMarcas } from "@/lib/utils";

// export const revalidate = 10; // revalidate at most every hour

export const dynamic = "force-dynamic";

const Listing = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const pageContent = await getListingInitialLoadContent();
  const coleccionSeleccionada = null;
  const tipoDeProductoSeleccionado = searchParams.type as string;
  const campoDeBusquedaSeleccionado = searchParams.search as string;

  const colecciones = pageContent?.colecciones.filter(
    (coleccion) => !!coleccion.productos
  );

  // const newParams = new URLSearchParams(searchParams.toString());

  // let filters: { [key: string]: string } = {};
  // for (let [key, value] of searchParams) {
  //   filters[key] = value;
  // }

  // const coleccionContent = colecciones?.find(
  //   (coleccion) => coleccion.titulo === coleccionSeleccionada
  // );

  if (!pageContent?.relojes && !pageContent?.perfumes && !pageContent?.gafas) {
    return null;
  }

  // const productos= coleccionSeleccionada
  //   ? coleccionContent?.productos
  //   : pageContent?.relojes || pageContent.perfumes
  //   ? [
  //       ...pageContent.relojes,
  //       ...pageContent.perfumes,
  //     ]
  //   : [];

  const productos =
    pageContent?.relojes && pageContent.perfumes && pageContent.gafas
      ? [...pageContent.relojes, ...pageContent.perfumes, ...pageContent.gafas]
      : [];
  const areFiltersActive =
    !!coleccionSeleccionada ||
    !!tipoDeProductoSeleccionado ||
    !!campoDeBusquedaSeleccionado;

  // const filteredProducts = productos?.filter((producto) => {
  //   let matchesTipoDeProducto = true;
  //   let matchesCampoDeBusqueda = true;

  //   if (tipoDeProductoSeleccionado) {
  //     matchesTipoDeProducto = producto.type.includes(
  //       tipoDeProductoSeleccionado
  //     );
  //   }

  //   if (campoDeBusquedaSeleccionado) {
  //     matchesCampoDeBusqueda = Object.entries(producto).some(([key, value]) => {
  //       // If the value is an object and has a 'titulo' property, use that for comparison
  //       if (typeof value === "object" && value !== null && "titulo" in value) {
  //         const tituloValue = (value as { titulo: string }).titulo;
  //         return tituloValue
  //           .toLowerCase()
  //           .includes(campoDeBusquedaSeleccionado.toLowerCase());
  //       }
  //       // Otherwise, convert non-string values to string for comparison
  //       const valueStr = String(value).toLowerCase();
  //       return valueStr.includes(campoDeBusquedaSeleccionado.toLowerCase());
  //     });
  //   }

  //   return matchesTipoDeProducto && matchesCampoDeBusqueda;
  // });

  // console.log({ searchParams });

  
  function filterData(data: TProduct[]) {
    return data.filter((item) =>
      Object.keys(searchParams).every(
        (filterName) =>
          searchParams[filterName] === null ||
          (item as { [key: string]: any })[filterName]?.includes(
            searchParams[filterName]
          )
      )
    );
  }
  const newFilteredProducts = filterData(productos);
  const marcas = getAllMarcas(newFilteredProducts);

  return (
    <main className="bg-neutral-100 min-h-screen md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters areFiltersActive={areFiltersActive} marcas={marcas} />

      {!coleccionSeleccionada ? (
        <Colecciones colecciones={colecciones ?? []} className="py-6 pl-4" />
      ) : (
        <h2 className="text-3xl font-bold capitalize">
          Coleccion {coleccionSeleccionada}
        </h2>
      )}
      <section className="bg-color-bg-surface-1-default flex flex-col items-center">
        <section className="max-w-[1280px] w-full py-6 px-4 md:px-9 flex">
          {/* <Filters marcas={marcas} areFiltersActive={areFiltersActive} /> */}
        </section>

        <section className="max-w-[1280px] w-full py-6 px-4 md:px-9">
          {newFilteredProducts && newFilteredProducts.length > 0 ? (
            <Productos productos={newFilteredProducts} />
          ) : (
            <h2 className="text-3xl font-bold capitalize">No Hay Productos</h2>
          )}
        </section>
      </section>
    </main>
  );
};

export default Listing;
