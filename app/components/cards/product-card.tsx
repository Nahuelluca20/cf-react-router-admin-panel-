import { Product } from "types/product";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ProductCard({
  title,
  description,
  tags,
  price,
  thumbnail,
}: Product) {
  return (
    <Card className="max-w-[308px] w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <img src={thumbnail} alt={title} width={200} height={200} />
        <p className="mt-2 font-medium">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {tags.map((tag) => (
            <Badge key={`${title}-${tag}`}>{tag}</Badge>
          ))}
        </div>
        <p>$ {price}</p>
      </CardFooter>
    </Card>
  );
}
