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

const WithAdminRights = async () => {
  const [salesData, userData] = await Promise.all([
    getSalesData(),
    getUserData(),
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
        subtitle={`${formatNumber(salesData.numberOfSales)} Neaktívne`}
        body={formatCurrency(salesData.amount)}
      />
    </div>
  );
};

export default WithAdminRights;
