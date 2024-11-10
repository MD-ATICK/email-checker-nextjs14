import HeaderStatsSkeleton from "@/app/(admin)/admin/dashboard/HeaderStatsSkeleton";
import AreaChartSkeleton from "@/components/AreaChartSkeleton";
import { Suspense } from "react";
import AnalysisChart from "./AnalyticsChart";
import AnalysisPieChart from "./AnalyticsPieChart";
import HeaderStats from "./HeaderStats";

export default function UserDashboard() {


  return (
    <div className=" p-3 md:p-6 flex flex-col-reverse md:flex-row items-start gap-6 ">
      <div className=" space-y-20 flex-grow">
        <div>
          <h1 className=" text-2xl font-bold">See Your Usage Analytics By Area Chart</h1>
          <p className=" text-sm mb-5 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p>
          <Suspense fallback={<AreaChartSkeleton />}>
            <AnalysisChart />
          </Suspense>
        </div>
        <div>
          <h1 className=" text-2xl font-bold">See Your Usage Analytics By Pie Chart</h1>
          <p className=" text-sm mb-5 text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p>
          <Suspense fallback={<AreaChartSkeleton />}>
            <AnalysisPieChart />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<HeaderStatsSkeleton type="USER" />}>
        <HeaderStats />
      </Suspense>
    </div>
  )
}
