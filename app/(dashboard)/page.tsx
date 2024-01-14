import { GetFormStats, GetForms } from "@/actions/form";
import CreateFormButton from "@/components/CreateFormBtn";
import FormCard from "@/components/FormCard";
import StatsCard from "@/components/StatsCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Frown, SmilePlus, Vote } from "lucide-react";
import { Suspense } from "react";

type StatsCardProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading:boolean
}

const StatsCards = (props:StatsCardProps) => {
  const {data , loading} = props;
  
  return ( 
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Visits" 
        icon={<Eye className="text-cyan-400"/>}
        helperText="All time form visits" 
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-cyan-600"
        />
      <StatsCard 
        title="Total Submissions" 
        icon={<Vote className="text-amber-400"/>}
        helperText="All time form submissions" 
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-amber-600"
        />
      <StatsCard 
        title="Submission Rate" 
        icon={<SmilePlus className="text-emerald-400"/>}
        helperText="Successfull Submissions" 
        value={data?.submissionRate.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-emerald-600"
        />
      <StatsCard 
        title="Bounce Rate" 
        icon={<Frown className="text-rose-400"/>}
        helperText="SeenZone" 
        value={data?.bounceRate.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-rose-600"
        />
    </div>
     );
}
 
const CardStatsWrapper = async() => {
  const stats = await GetFormStats();
  return ( 
    <StatsCards loading={false} data={stats} />
  );
}

const FormCardSkeleton = () => {
  return ( 
    <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"/>
   );
}
 
const FormCards = async() => {
  const forms = await GetForms();
  return <>
    {forms.map(form => (
      <FormCard 
        key={form.id} form={form} />
    ))}
  </>

}


export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>
      <Separator className='my-6'/>
      <h2 className="text-4xl font-bold col-span-2 font-OpenSans">Your Forms</h2>
      <Separator className="my-6"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton/>
        <Suspense fallback={[1,2,3,4].map((el) => (<FormCardSkeleton key={el}/>))}>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  )
}


 