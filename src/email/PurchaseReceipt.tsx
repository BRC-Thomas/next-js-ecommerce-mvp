import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import OrderInformations from "./_components/OrderInformations";


type PurchaseReceiptEmailProps = {
  product: {
    name: string,
    imagePath: string
    description: string,
  },
   order: {
    id: string,
    createdAt: Date,
    pricePaidInCents: number
   },
   downloadVerificationId: string
}
console.log("Server URL:", process.env.NEXT_PUBLIC_SERVER_URL)

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Spring Drive 8-Day Jewelry Watch",
    imagePath: "/products/f0e6fd2e-0575-4c06-82ba-fd9eb72677c3-image.png",
    description: "SBGD223"
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 100000,
  },
  downloadVerificationId: crypto.randomUUID(),
}
export default function PurchaseReceiptEmail({product, order,downloadVerificationId}:PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformations order={order} product={product} downloadVerificationId={downloadVerificationId} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}