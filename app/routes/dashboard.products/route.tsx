import { json, LoaderFunctionArgs, useLoaderData } from "react-router";
import { Product, CategorySlug } from "types/product";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let url = new URL(request.url);
  let filterByCategory = url.searchParams.get("category");

  let apiCategoryUrl = "https://dummyjson.com/products/categories";
  let apiProductsUrl = "https://dummyjson.com/products";

  if (filterByCategory) {
    apiProductsUrl = `https://dummyjson.com/products/category/${filterByCategory}?select=title,description,price,tags`;
  } else {
    apiProductsUrl = `${apiProductsUrl}?select=title,description,price,tags`;
  }

  let products: { products: Product[] } = await fetch(apiProductsUrl).then(
    (res) => res.json()
  );

  let categories = await fetch(apiCategoryUrl).then((res) => res.json());

  return json({ products, categories });
};

export default function route() {
  let { products, categories } = useLoaderData() as {
    products: Product[];
    categories: CategorySlug[];
  };
  console.log(products);

  return (
    <>
      <title>Dashboard | Products</title>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  onClick={() => alert(category.name)}
                  key={category.slug}
                  value={category.slug}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
}
