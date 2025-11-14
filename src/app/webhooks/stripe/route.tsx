import prisma from "@/db/db"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    let event: Stripe.Event

    if (signature && process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        )
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          event = JSON.parse(body) as Stripe.Event
        } else {
          throw err
        }
      }
    } else {
      event = JSON.parse(body) as Stripe.Event
    }

    if (event.type === "charge.succeeded" ||event.type  ===  "payment_intent.succeeded") {
      const charge = event.data.object as Stripe.Charge
      const productId = charge.metadata?.productId
      const email = charge.billing_details?.email
      const pricePaidInCents = charge.amount

      const product = await prisma.product.findUnique({ where: { id: productId } })
      if (product == null || email == null) {
        return new NextResponse("Bad Request", { status: 400 })
      }

      const user = await prisma.user.upsert({
        where: { email },
        create: { email },
        update: {},
      })

      const order = await prisma.order.create({
        data: {
          productId,
          pricePaidInCents,
          userId: user.id,
        },
      })

      const downloadVerification = await prisma.downloadVerification.create({
        data: {
          productId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      })

      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order Confirmation",
        react: <h1>Order Confirmed</h1>,
      })
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook error:", error)
    return new NextResponse("Error", { status: 400 })
  }
}
