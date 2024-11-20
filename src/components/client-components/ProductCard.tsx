import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  authorName: string;
  imagePath: String;
  publisher: String;
  price: Number;
};

export function ProductCard({
  id,
  name,
  description,
  authorName,
  imagePath,
  publisher,
  price,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="flex justify-center items-center">
        <Image src={imagePath} width={200} height={400} alt="ProductImage" />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{price}€</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <Link href={"/products"} className="text-blue-500 hover:text-blue-600">
          Viac
        </Link>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Pridať do košíka</Button>
      </CardFooter>
    </Card>
  );
}
