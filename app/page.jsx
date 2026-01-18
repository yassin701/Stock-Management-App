import StatsCards from "./components/StatsCards";
import SalesByProductChart from "./components/SalesByProductChart";
import AiSalesInsight from "./components/AiSalesInsight";
import SalesDashboard from "./components/SalesDashboardVertical";


export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatsCards />
      <SalesDashboard>
      <SalesByProductChart/>
      <AiSalesInsight/>
 
</SalesDashboard>
    </div>
  );
}
