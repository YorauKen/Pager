import React from 'react'
import { FormElementInstance } from '@/components/FormElements';
import { GetFormContentByUrl } from '@/actions/form';
import FormSubmitComponent from '@/components/FormSubmitComponent';

async function SubmitPage({
	params,
  }: {
	params: {
	  formUrl: string;
	};
  }) {
	const form = await GetFormContentByUrl(params.formUrl);
  
	if (!form) {
	  throw new Error("form not found");
	}
  
	const formContent = JSON.parse(form.content) as FormElementInstance[];
  
	return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
  }
  
  export default SubmitPage;