import ColombianPrice from "@/sanity/components/ColombianPrice";
import { defineField } from "sanity";

export const generoSchema = defineField({
  name: "genero",
  title: "Género",
  type: "string",
  options: {
    list: ["mujer", "hombre", "unisex"],
  },
});

export const etiquetaSchema = defineField({
  name: "etiqueta",
  title: "Etiqueta",
  type: "string",
  options: {
    list: ["nuevo", "agotado", "mas vendido", "ultimas unidades"],
  },
});

export const precioSchema =  defineField({
  name: "precio",
  title: "Precio",
  type: "string",
  validation: (Rule) => Rule.required(),
  components: { input: ColombianPrice },
})

export const precioConDescuentoSchema = defineField({
  name: "precioConDescuento",
  title: "Precio con descuento",
  type: "string",
  components: { input: ColombianPrice },
})

export const garantiaSchema = defineField({
  name: "garantia",
  title: "Garantía",
  type: "object",
  group: "detalles",
  fields: [
    defineField({
      name: "meses",
      title: "Meses",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción de la garantía",
      type: "text",
    }),
  ],
});

export const slugSchema = defineField({
  name: "slug",
  title: "Link del producto",
  type: "slug",
  group: "general",
  validation: (Rule) => Rule.required(),
  options: {
    source: "modelo",
    maxLength: 200,
    slugify: (input) => {
      return input.toLowerCase().replace(/\s+/g, "-").slice(0, 200);
    },
  },
});
