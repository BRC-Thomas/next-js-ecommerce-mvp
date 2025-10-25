import { Nav, NavLink } from "@/components/Nav";

export const dynamique = "force-dynamic"

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6 px-6 mx-auto">
        {children}
    </div>
    </>
  )
}