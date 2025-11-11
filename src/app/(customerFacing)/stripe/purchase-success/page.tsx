import { Button } from "@/components/ui/button";
import prisma from "@/db/db";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage({
  searchParams
}: {
  searchParams: { payment_intent: string }
}) {
  const params = await searchParams;
  if (!params?.payment_intent) return notFound()

  const paymentIntent = await stripe.paymentIntents.retrieve(
    params.payment_intent
  )

  if (paymentIntent?.metadata?.productId == null) return notFound()

  const product = await prisma.product.findUnique({
    where: { id: paymentIntent.metadata.productId }
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded";

  if (isSuccess) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      params.payment_intent,
      {
        expand: ["latest_charge", "latest_charge.billing_details"],
      }
    );

    const email =
      paymentIntent.receipt_email ||
      ((paymentIntent.latest_charge as Stripe.Charge | null)?.billing_details
        ?.email ??
        null);

    if (email) {
      try {
        const user = await prisma.user.upsert({
          where: { email },
          create: { email },
          update: {},
        });

        const existing = await prisma.order.findFirst({
          where: {
            productId: product.id,
            userId: user.id,
          },
        });
        if (!existing) {
          await prisma.order.create({
            data: {
              productId: product.id,
              pricePaidInCents: paymentIntent.amount,
              userId: user.id,
            },
          });
        }
      } catch (err) {
        console.error("Order creation failed:", err);
      }
    } else {
      console.warn("No email on payment intent; user cannot be created");
    }
  }

  const downloadId = await createDownloadVerification(product.id);
  const downloadLink = "/products/download/" + downloadId;
  const tryAgainLink = "/products/" + product.id + "/purchase";

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a href={downloadLink}>Download</a>
            ) : (
              <Link href={tryAgainLink}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function createDownloadVerification(productId: string) {
  const dv = await prisma.downloadVerification.create({
    data: {
      productId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });
  return dv.id;
}
