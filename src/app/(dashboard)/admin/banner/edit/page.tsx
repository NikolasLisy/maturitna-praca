import { DeleteDropDownBannerItem } from "@/components/admin-components/BannerActions";
import { PageHeader } from "@/components/admin-components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BannerEdit() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Bannery</PageHeader>
        <Button asChild>
          <Link href="/admin">Späť</Link>
        </Button>
      </div>
      <BannerTable />
    </>
  );
}

async function BannerTable() {
  const banners = await db.banner.findMany({
    select: {
      id: true,
      title: true,
      imagePath: true,
    },
  });

  if (banners.length === 0) {
    return (
      <h1>
        Nenašli sa žiadne bannery,{" "}
        <Link
          href="/admin/banner/new"
          className="text-blue-500 hover:text-blue-600"
        >
          vytvoriť banner
        </Link>
        ?
      </h1>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Obrázok</TableHead>
          <TableHead>Názov</TableHead>
          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.map((banner) => (
          <TableRow key={banner.id}>
            <TableCell>
              <Image
                alt="Product Image"
                width="200"
                height="200"
                src={banner.imagePath}
              />
            </TableCell>
            <TableCell>{banner.title}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DeleteDropDownBannerItem id={banner.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
