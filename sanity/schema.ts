import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    {
      name: "product",
      title: "Products",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "images",
          type: "array",
          title: "Images",
          of: [{ type: "image" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "price",
          title: "Price",
          type: "number",
          validation: (Rule) => Rule.required(),
        },

        {
          name: "quantity",
          title: "Quantity",
          type: "number",
        },
        {
          name: "tags",
          type: "array",
          title: "Tags",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
          },
        },
        {
          name: "showOnHomePage",
          title: "Show on Home Page",
          type: "boolean",
        },
        {
          name: "category",
          title: "Product Category",
          type: "reference",
          to: [
            {
              type: "category",
            },
          ],
        },
      ],
    },
    {
      name: "category",
      type: "document",
      title: "Categories",
      fields: [
        {
          name: "title",
          title: "Title of Category",
          type: "string",
        },
        {
          name: "description",
          title: "Description of Category",
          type: "string",
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
          },
        },
      ],
    },
  ],
};
