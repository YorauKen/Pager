import { GetFormWithSubmissions } from '@/actions/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'
import { ElementsType, FormElementInstance } from './FormElements';
import { format, formatDistance } from 'date-fns';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

type Row = { [key: string]: string } & {
	submittedAt: Date;
};

  function RowCell({ type, value }: { type: ElementsType; value: string }) {
	let node: React.ReactNode = value;
  
	switch (type) {
	  case "DateField":
		if (!value) break;
		const date = new Date(value);
		node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
		break;
	  case "CheckboxField":
		const checked = value === "true";
		node = <Checkbox checked={checked} disabled />;
		break;
	}
  
	return <TableCell>{node}</TableCell>;
}
async function SubmissionsTable({ id }: { id: number }) {
	const form = await GetFormWithSubmissions(id);

	if (!form) {
	  throw new Error("form not found");
	}
  
	const formElements = JSON.parse(form.content) as FormElementInstance[];
	const columns: {
	  id: string;
	  label: string;
	  required: boolean;
	  type: ElementsType;
	}[] = [];
  
	formElements.forEach((element) => {
	  switch (element.type) {
			case "TextField":
			case "NumberField":
			case "TextAreaField":
			case "DateField":
			case "SelectField":
			case "CheckboxField":
		  columns.push({
			id: element.id,
			label: element.extraAttributes?.label,
			required: element.extraAttributes?.required,
			type: element.type,
		  });
		  break;
		default:
		  break;
	  }
	});
  
	const rows: Row[] = [];
	form.FormSubmissions.forEach((submission) => {
	  const content = JSON.parse(submission.content);
	  rows.push({
		...content,
		submittedAt: submission.createdAt,
	  });
	});
  
	return (
	  <>
		<h1 className="text-2xl font-bold my-4">Submissions</h1>
		<div className="rounded-md border">
		  <Table>
			<TableHeader>
			  <TableRow>
				{columns.map((column) => (
				  <TableHead key={column.id} className="uppercase">
					{column.label}
				  </TableHead>
				))}
				<TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
			  </TableRow>
			</TableHeader>
			<TableBody>
			  {rows.map((row, index) => (
				<TableRow key={index}>
				  {columns.map((column) => (
					<RowCell key={column.id} type={column.type} value={row[column.id]} />
				  ))}
				  <TableCell className="text-muted-foreground text-right">
					{formatDistance(row.submittedAt, new Date(), {
					  addSuffix: true,
					})}
				  </TableCell>
				</TableRow>
			  ))}
			</TableBody>
		  </Table>
		</div>
	  </>
	);
}

export default SubmissionsTable