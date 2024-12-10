"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
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
  imagePath: string;
  publisher: string;
  price: number;
};

function descriptionFormatter(description: string, length: number) {
  let newDescription = "";
  if (description.length > length) {
    newDescription = description.slice(0, length) + "...";
  } else {
    newDescription = description;
  }

  return newDescription;
}

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
    <Link className="block" href={`/products/${id}`}>
      <Card className="flex flex-row overflow-hidden h-[330px] md:h-[300px] cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-shadow">
        <div className="flex justify-center items-center">
          <Image
            src={imagePath}
            width={200}
            height={400}
            alt="ProductImage"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="line-clamp-1">{name}</CardTitle>
            <CardDescription>{price}€</CardDescription>
            <CardDescription className="line-clamp-1">
              {authorName}
            </CardDescription>
            <CardDescription className="line-clamp-1">
              {publisher}
            </CardDescription>
            <p className="block md:hidden">
              {descriptionFormatter(description, 50)}
            </p>
            <p className="hidden md:block">
              {descriptionFormatter(description, 20)}
            </p>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Viac</Button>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
