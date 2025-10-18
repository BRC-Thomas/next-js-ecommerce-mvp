"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Product } from "@/generated/prisma";
import Image from "next/image";
import addProduct, { updateProduct } from "../../_action/products";

export default function ProductForm({product}: {product?:Product | null}) {
  const [error, action] = useActionState(product == undefined ? addProduct : updateProduct.bind(null, product.id), undefined)
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required defaultValue={product?.name || ""}></Input>
        {error?.properties?.name && <div className="text-destructive">{error?.properties?.name?.errors[0]}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input type="text" id="priceInCents" name="priceInCents" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)}></Input>
        {error?.properties?.priceInCents && <div className="text-destructive">{error?.properties?.priceInCents?.errors[0]}</div>}

        <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required defaultValue={product?.description || ""}/>
        {error?.properties?.description && <div className="text-destructive">{error?.properties?.description?.errors[0]}</div>}
        
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product != null && <div className="text-muted-foreground">{product.filePath}</div>}
        {error?.properties?.file && <div className="text-destructive">{error?.properties?.file?.errors[0]}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && <Image
          src={product.imagePath}
          height="400"
          width="400"
          alt="Product image"
        />}
        {error?.properties?.image && <div className="text-destructive">{error?.properties?.image.errors[0]}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}