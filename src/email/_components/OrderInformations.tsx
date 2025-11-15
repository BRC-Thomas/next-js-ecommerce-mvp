import { formatCurrency } from "@/lib/formatters"
import { Button, Column, Img, Row, Section, Text } from "@react-email/components"

type OrderInformationsProps = {
  order: {
    id: string,
    createdAt: Date,
    pricePaidInCents: number
  },
  product: {
    imagePath: string,
    name: string,
    description: string,
  },
  downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat("fr", { dateStyle: "medium" })


export default function OrderInformations({ order, product, downloadVerificationId }: OrderInformationsProps) {

  const url = process.env.NEXT_PUBLIC_SERVER_URL ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000"
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Order ID</Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Purchase On</Text>
            <Text className="mt-0 mr-4">{dateFormatter.format(order.createdAt)}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Price Paid</Text>
            <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInCents / 100)}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img
          className=""
          width="100%"
          alt={product.name}
          src={`${url}${product.imagePath}`} />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>
          <Column align="right">
            <Button href={`${url}/products/download/${downloadVerificationId}`} className="bg-black text-white px-4 py-4 rounded text-lg">Download</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-gray-500 mb-0">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  )
}