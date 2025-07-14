import ProductCarousel from "./ProductCarousel";
import AddToCartButton from "../cart/AddToCartButton";
import { Product, CategoryForProduct } from "@/lib/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ProductDetailCard({ product, category }: { product: Product, category: CategoryForProduct }) {
  return (
    <section className="flex w-full flex-col py-4 md:flex-row">
      <ProductCarousel product={product} />
      <div className=" flex w-full flex-col space-y-2 px-0 py-2 md:w-1/2 md:px-4 lg:px-12">
        <h1 className="p-2 text-xl font-bold md:text-2xl">{product.title}</h1>
        <h2 className="p-2 text-xl font-medium text-primary">
          Price: $ {product.price}
          <span className=" px-2 text-xs text-foreground">(including GST)</span>
        </h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className=" text-nowrap">Product Code:</TableCell>
              <TableCell>{product.slug.current}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity:</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Fabric:</TableCell>
              <TableCell>{product.fabric}</TableCell>
            </TableRow> */}
            {product.description == null ? null : (
              <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Category:</TableCell>
              <TableCell>{product.category.title}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  );
}
