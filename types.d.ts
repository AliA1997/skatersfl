import { BlockChildrenObjectField, Image } from "sanity";
import { Category } from "./lib/types";

export type CheckoutRequestDto = {

};

export type ProductRecord = {
    _id: string;
    _createdAt: Date;
    _updatedAt: Date;
    title: string;
    price: number;
    quantity: number;
    tags: string[];
    images: Image[];
    // Sanity type has _key, _type, marks, and text
    body: any[];
    category: Category[];
};
