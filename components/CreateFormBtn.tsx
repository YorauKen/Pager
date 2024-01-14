'use client';
import { formSchema, formSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import { FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";



const CreateFormButton = () => {
	const router = useRouter();
	const form = useForm<formSchemaType>({ resolver:zodResolver(formSchema) });

	const OnSubmit = async(values:formSchemaType) => {
		try {
			const formId = await CreateForm(values);
			toast({
				title:"Success",
				description:"Form Created Successfully"
			});
			router.push(`/builder/${formId}`);
		} catch (error) {
			toast({
				title:"Error",
				description:"Something went wrong please try again",
				variant:"destructive",
			});
		}
	}

	return ( 
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:	secondary hover:cursor-pointer border-dashed gap-4 "><FilePlus2 className="h-8 w-8 text-muted-foreground group-hover:text-primary"/><p className="font-bold text-xl text-muted-foreground group-hover:text-primary font-OpenSans">Create new form</p></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create Form 
					</DialogTitle>
					
					<DialogDescription>
						Create a new form to start collecting responses
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-2">
						<FormField control={form.control} name="name" render={({field}) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}></FormField>
						<FormField control={form.control} name="description" render={({field}) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea rows={3} {...field} />
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}></FormField>
					</form>
				</Form>
				<DialogFooter>
					<Button 
						disabled={form.formState.isSubmitting} 
						className="w-full mt-4" 
						onClick={form.handleSubmit(OnSubmit)}>
						{ !form.formState.isSubmitting && <span>Save</span>} 
						{ form.formState.isSubmitting && <span className="loading loading-spinner loading-md "></span>} 
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	 );
}
 
export default CreateFormButton;