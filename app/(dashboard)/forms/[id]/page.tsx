import { GetFormById } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import StatsCard from "@/components/StatsCard";
import VisitBtn from "@/components/VisitBtn";
import { Eye, Frown, SmilePlus, Vote } from "lucide-react";
import SubmissionsTable from "@/components/SubmissionsTable";

async function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }

  const {visits,submissions} = form;

	let submissionRate = 0;

	if(visits > 0){
		submissionRate = (submissions / visits)*100;
	}

	const bounceRate = 100 - submissionRate;
  return <>
    <div className="py-10  border-b border-muted ">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
    </div>
        <div className="py-4 border-b border-muted">
            <div className="container flex gap-2 items-center justify-between">
                <FormLinkShare shareUrl={form.shareURL} />
            </div>
        </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container ">
          <StatsCard 
            title="Total Visits" 
            icon={<Eye className="text-cyan-400"/>}
            helperText="All time form visits" 
            value={visits.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-cyan-600"
            />
          <StatsCard 
            title="Total Submissions" 
            icon={<Vote className="text-amber-400"/>}
            helperText="All time form submissions" 
            value={submissions.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-amber-600"
            />
          <StatsCard 
            title="Submission Rate" 
            icon={<SmilePlus className="text-emerald-400"/>}
            helperText="Successfull Submissions" 
            value={submissionRate.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-emerald-600"
            />
          <StatsCard 
            title="Bounce Rate" 
            icon={<Frown className="text-rose-400"/>}
            helperText="SeenZone" 
            value={bounceRate.toLocaleString() || ""}
            loading={false}
            className="shadow-md shadow-rose-600"
            />
      </div>
      <div className="container pt-10 ">
        <SubmissionsTable id={form.id} />
      </div>
  </>;
}

export default FormDetailPage;