import { groq } from "next-sanity";
import { client } from "./client";

export async function getProductBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
            _id,
            title,
            tags,
            slug,
            description,
            images,
            price,
            quantity,
            "category": category->{
            _id,
            title,
            slug
          }
        }`,
    { slug },
  );
}

export async function getProductSlugByID(id: number) {
  return client.fetch(
    groq`*[_type == "product" && _id == $id][0]{
            _id,
            title,
            tags,
            slug,
            description,
            images,
            price, 
            "category": *[_type=='category' && references(^._id)]{ 
              _id,
              title,
              slug
            }
        }`,
    { id },
  );
}
export async function getFeaturedProducts() {
  return client.fetch(
    groq`*[ _type == "product"] {
        _id,
        title,
        tags,
        slug,
        description,
        images,
        price, 
        category {
          _ref
        }
    }`,
  );
}

export async function getProductsByCategory(categorySlug: string) {
  return client.fetch(
    groq`*[_type == "product" && category->slug.current == $categorySlug]{
        _id,
        title,
        tags,
        slug,
        description,
        images,
        price, 
        category {
          _ref
        }
    }`,
    { categorySlug },
  );
}

export async function getCategoryById(categoryId: string) {
  return client.fetch(
    groq`*[_type == "category" && reference($categoryId)]{
        title,
        slug
    }`,
    {
      categoryId
    }
  );
}

export async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"]{
        title,
        slug
    }`,
  );
}

export async function getProductsSlug() {
  return client.fetch(
    groq`*[_type == "product"] {
      slug {
        current
      }
    }`,
  );
}


export async function getProductsByIDs(ids: string[]) {
  return client.fetch(
    groq`*[_type == "product" && _id in $ids]{
            _id,
            title,
            tags,
            slug,
            description,
            images,
            price, 
            "category": *[_type=='category' && references(^._id)]{ 
              _id,
              title,
              slug
            }
        }`,
    { ids }
  );
}