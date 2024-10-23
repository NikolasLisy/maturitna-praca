import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="absolute left-0 right-0 bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 border-b border-zinc-200">
      <div className="flex items-center justify-center gap-8 h-8 font-semibold">
        <Link href="/admin" className="text-base text-black">
          Dashboard
        </Link>
        <Link href="/admin/products" className="text-base text-black">
          Produkty
        </Link>
        <Link href="/admin/customers" className="text-base text-black">
          Zákazníci
        </Link>
        <Link href="/admin/sales" className="text-base text-black">
          Predaje
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
