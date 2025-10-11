"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useActionState, useState } from "react";
import addProduct from "../../_action/products";
import { useFormStatus } from "react-dom";

export default function ProductForm() {
  const [error, action] = useActionState(addProduct, "")
  const [priceInCents, setPriceInCents] = useState<number>()

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required></Input>
        {error.properties?.name && <div className="text-destructive">{error.properties?.name?.errors[0]}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input type="text" id="priceInCents" name="priceInCents" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)}></Input>
        {error.properties?.priceInCents && <div className="text-destructive">{error.properties?.priceInCents?.errors[0]}</div>}

        <div className="text-muted-foreground">{formatCurrency((priceInCents || 0) / 100)}</div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
        {error.properties?.description && <div className="text-destructive">{error.properties?.description?.errors[0]}</div>}
        
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required></Input>
        {error.properties?.file && <div className="text-destructive">{error.properties?.file?.errors[0]}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="imagePath">Image</Label>
        <Input type="file" id="imagePath" name="imagePath" required></Input>
        {error.properties?.imagePath && <div className="text-destructive">{error.properties?.imagePath?.errors[0]}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}