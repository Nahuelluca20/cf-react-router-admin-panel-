import {
  json,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router";
import { Product, CategorySlug } from "types/product";
import ProductCard from "~/components/cards/product-card";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let url = new URL(request.url);
  let filterByCategory = url.searchParams.get("category");

  let apiCategoryUrl = "https://dummyjson.com/products/categories";
  let apiProductsUrl = "https://dummyjson.com/products";

  if (filterByCategory) {
    apiProductsUrl = `https://dummyjson.com/products/category/${filterByCategory}?select=title,description,price,tags,thumbnail `;
  } else {
    apiProductsUrl = `${apiProductsUrl}?select=title,description,price,tags,thumbnail`;
  }

  let products: { products: Product[] } = await fetch(apiProductsUrl).then(
    (res) => res.json()
  );

  let categories = await fetch(apiCategoryUrl).then((res) => res.json());

  return json({ products: products.products, categories });
};

export default function route() {
  const navigate = useNavigate();
  let { products, categories } = useLoaderData() as {
    products: Product[];
    categories: CategorySlug[];
  };

  const handleChangeFilter = (category: string) => {
    navigate(`?category=${category}`);
  };

  const handleClearFilters = () => {
    navigate("?");
  };
  return (
    <>
      <title>Dashboard | Products</title>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
      <div
        className="flex-1 p-4 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex gap-4 w-full">
          <Select onValueChange={(value) => handleChangeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {products.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </>
  );
}
