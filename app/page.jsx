import StatsCards from "./components/StatsCards";
import SalesByProductChart from "./components/SalesByProductChart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <StatsCards />
      <SalesByProductChart/>
    </div>
  );
}
