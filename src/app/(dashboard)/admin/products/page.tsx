import { PageHeader } from "@/components/admin-components/PageHeader";
import { DeleteDropDownItem } from "@/components/admin-components/ProductActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Produkty</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Pridať Produkt</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      stock: true,
      _count: { select: { orderItems: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) return <p>Nenašli sa žiadne produkty!</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Názov</TableHead>
          <TableHead>Cena</TableHead>
          <TableHead>Kategória</TableHead>
          <TableHead>Počet kusov</TableHead>
          <TableHead>Objednávky</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{formatNumber(product._count.orderItems)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Upraviť
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DeleteDropDownItem id={product.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}