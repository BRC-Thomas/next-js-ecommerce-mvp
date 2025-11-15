import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import OrderInformations from "./_components/OrderInformations";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10_000,
      product: {
        name: "Spring Drive 8-Day Jewelry Watch",
        imagePath: "/products/f0e6fd2e-0575-4c06-82ba-fd9eb72677c3-image.png",
        description: "SBGD223",
      },
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 10_000,
      product: {
        name: "Spring Drive 8-Day Jewelry Watch",
        imagePath: "/products/f0e6fd2e-0575-4c06-82ba-fd9eb72677c3-image.png",
        description: "SBGD223",
      },
    },
  ],
};
export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformations
                  order={order}
                  product={order.product}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
