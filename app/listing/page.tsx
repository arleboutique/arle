import { getListingInitialLoadContent } from "@/sanity/queries/pages/listingQueries";
import Productos from "./_components/Productos";
import Filters from "../_components/listingsPage/Filters";
import Colecciones from "../_components/Colecciones";


export const revalidate = 10; // revalidate at most every hour


const Listing = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const pageContent = await getListingInitialLoadContent();

  const coleccionSeleccionada = null;
  const tipoDeProductoSeleccionado = searchParams.producto as string;
  const campoDeBusquedaSeleccionado = searchParams.search as string;

  const colecciones = pageContent?.colecciones.filter(
    (coleccion) => !!coleccion.productos
  );

  // const { colecciones } = pageContent;
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
      ? [
          ...pageContent.relojes,
          ...pageContent.perfumes,
          ...pageContent.gafas
        ]
      : [];

  const areFiltersActive =
    !!coleccionSeleccionada ||
    !!tipoDeProductoSeleccionado ||
    !!campoDeBusquedaSeleccionado;

  const filteredProducts = productos?.filter((producto) => {
    let matchesTipoDeProducto = true;
    let matchesCampoDeBusqueda = true;

    if (tipoDeProductoSeleccionado) {
      matchesTipoDeProducto = producto.type.includes(
        tipoDeProductoSeleccionado
      );
    }

    // if (campoDeBusquedaSeleccionado) {
    //   // Assuming the product has a 'name' or 'titulo' field to match against. Adjust as needed.
    //   matchesCampoDeBusqueda = producto.type.toLowerCase().includes(campoDeBusquedaSeleccionado.toLowerCase());
    // }

    if (campoDeBusquedaSeleccionado) {
      matchesCampoDeBusqueda = Object.entries(producto).some(([key, value]) => {
        // If the value is an object and has a 'titulo' property, use that for comparison
        if (typeof value === "object" && value !== null && "titulo" in value) {
          const tituloValue = (value as { titulo: string }).titulo;
          return tituloValue
            .toLowerCase()
            .includes(campoDeBusquedaSeleccionado.toLowerCase());
        }
        // Otherwise, convert non-string values to string for comparison
        const valueStr = String(value).toLowerCase();
        return valueStr.includes(campoDeBusquedaSeleccionado.toLowerCase());
      });
    }

    return matchesTipoDeProducto && matchesCampoDeBusqueda;
  });

  console.log({filteredProducts})
  return (
    <main className="bg-neutral-100 min-h-screen md:px-10 px-5 pt-[70px] md:pt-0">
      <Filters
        areFiltersActive={areFiltersActive}
        searchParams={searchParams}
      />
      {!coleccionSeleccionada ? (
        <Colecciones colecciones={colecciones ?? []} />
      ) : (
        <h2 className="text-3xl font-bold capitalize">
          Coleccion {coleccionSeleccionada}
        </h2>
      )}

      {filteredProducts && filteredProducts.length > 0 ? (
        <Productos productos={filteredProducts} />
      ) : (
        <h2 className="text-3xl font-bold capitalize">No Hay Productos</h2>
      )}
    </main>
  );
};

export default Listing;
