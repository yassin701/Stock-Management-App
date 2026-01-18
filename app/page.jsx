"use client";

import StatsCards from "./components/StatsCards";
import SalesByProductChart from "./components/SalesByProductChart";
import AiSalesInsight from "./components/AiSalesInsight";
import SalesDashboard from "./components/SalesDashboardVertical";
import SalesTable from "./components/SalesTable";


export default function DashboardPage() {
  return (
    <div className="p-6 ">
      <StatsCards />
      <SalesDashboard>
      <SalesByProductChart/>
      <AiSalesInsight/> 
      </SalesDashboard>
      <SalesTable />
    </div>
  );
}
