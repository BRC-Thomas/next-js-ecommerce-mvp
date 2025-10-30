import prisma from "@/db/db"
import { notFound } from "next/navigation"

export default async function PurchasePage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {id}
  })

  if (!product) return notFound()
  
  return (
    <div>{id}</div>
  )
}