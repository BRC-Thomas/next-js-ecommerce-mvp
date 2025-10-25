import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export default function ProductCard({ id, name, priceInCents, description, imagePath}:ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name}></Image>
      </div>
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flew-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
      <Card className="flex flex-col overflow-hidden animate-pulse">
      <div className=" w-full h-auto aspect-video bg-gray-300"/>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}