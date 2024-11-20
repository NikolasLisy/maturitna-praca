import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import db from "@/lib/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import Link from "next/link";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { total: true },
    _count: true,
  });

  return {
    amount: data._sum.total || 0,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { total: true },
    }),
  ]);

  return {
    userCount,
    averageValue:
      userCount === 0 ? 0 : (orderData._sum.total || 0) / userCount / 100,
  };
}

async function getProductData() {
  const allProducts = await db.product.count();
  return { allProducts };
}

const WithAdminRights = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  type DashBoardCardProps = {
    title: string;
    subtitle: string;
    body: string;
  };

  function DashboardCard({ title, subtitle, body }: DashBoardCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{body}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Predaje"
        subtitle={`${formatNumber(salesData.numberOfSales)} Objednávok`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Zákazníci"
        subtitle={`${formatCurrency(userData.averageValue)} Priemerná Hodnota`}
        body={`Počet registrovaných zákazníkov: ${formatNumber(
          userData.userCount
        )}`}
      />
      <DashboardCard
        title="Aktívne Produkty"
        subtitle={`Všetky Produkty`}
        body={`Počet všetkých produktov - ${formatNumber(
          productData.allProducts
        )}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Hlavný banner</CardTitle>
          <CardDescription>Reklamný banner</CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <Link
            href="/admin/banner/edit"
            className="text-blue-500 hover:text-blue-600"
          >
            Upraviť
          </Link>
          <p className="pl-2 pr-2">alebo</p>
          <Link
            href="/admin/banner/new"
            className="text-blue-500 hover:text-blue-600"
          >
            Vytvoriť
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithAdminRights;
