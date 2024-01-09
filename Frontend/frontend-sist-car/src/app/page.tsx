import TotalsDashboard from "@/components/dashboard/totals"
import BarChartComponent from "@/components/dashboard/bar-chart"

export default function Home() {
  return (
    <div className='bg-slate-50 flex flex-col w-full h-screen'>
      <div className=" p-8 flex flex-col w-full h-auto gap-4 items-center justify-center  
      md:flex md:flex-row md:items-start ">
        <TotalsDashboard iconName="clients" nameComp="Clients" />
        <TotalsDashboard iconName="vehicles" nameComp="Veículos" />
        <TotalsDashboard iconName="schedules" nameComp="Agendamentos" />
      </div>
      <div>
        <BarChartComponent />
      </div>

    </div>
  )
}
