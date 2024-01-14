"use client";
import { Form } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { ChevronRight, Eye, FileEdit, Pencil, SmilePlus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { DeleteForm } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const FormCard = ({form}:{form:Form}) => {
	const router = useRouter();
	const deleteForm = async (id:number) => {
		try {
			await DeleteForm(id);
			toast({
				title: "Success",
				description: "Form deleted successfully",
			  });
			router.refresh();
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong",
			  });
		}
	}
	return ( 
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 justify-between" >
					<span className="truncate font-bold">{form.name}</span>
					{form.published && <Badge>Published</Badge>}
					{!form.published && <Badge variant={'destructive'}>Draft</Badge>}
				</CardTitle>
				<CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
					{formatDistance(form.createdAt,new Date(),{
						addSuffix:true
					})}
					{form.published && (
						<span className="flex items-center gap-2">
							<Eye className="text-muted-foreground"/>
							<span>{form.visits.toLocaleString()}</span>
							<SmilePlus className="text-muted-foreground"/>
							<span>{form.submissions.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        		{form.description || "No description"}
      		</CardContent>
      		<CardFooter className="flex items-center gap-2 justify-between" >
					{form.published && (
						<Button asChild className="mt-2 text-md gap-4">
						<Link href={`/forms/${form.id}`}>
						View submissions <ChevronRight />
						</Link>
					</Button>
					)}
					{!form.published && (
						<Button asChild variant={"secondary"} className="mt-2 text-md gap-4">
						<Link href={`/builder/${form.id}`}>
						Edit form <FileEdit />
						</Link>
					</Button>
					)}
					<Button 
						variant="ghost" 
						className="mt-2 text-md gap-4"
						onClick={(e) =>{
							e.stopPropagation();
							deleteForm(form.id);
						}}
						><Trash2/></Button>
      		</CardFooter>
		</Card>
	 );
}
 
export default FormCard;