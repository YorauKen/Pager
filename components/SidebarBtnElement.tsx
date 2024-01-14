import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

function SidebarBtnElement({formElement}:{formElement:FormElement}) {
	const { label,icon:Icon  } =  formElement.designerBtnElement;

	const draggable = useDraggable({
		id:`Designer-Btn-${formElement.type}`,
		data:{
			type:formElement.type,
			isDesignerBtnElement:true
		},
	});

  return (
	<Button 
		variant={'outline'} 
		className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',draggable.isDragging && "ring-2 ring-primary")}
		ref={draggable.setNodeRef} 
		{...draggable.listeners}
		{...draggable.attributes}
		>
		<Icon className="h-8 w-8 text-primary cursor-grap"/>
		<p className="text-xs">{label}</p>
	</Button>
  )
}

export function SidebarBtnElementDragOverlay({formElement}:{formElement:FormElement}) {
	const { label,icon:Icon  } =  formElement.designerBtnElement;

	
  return (
	<Button 
		variant={'outline'} 
		className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'
		>
		<Icon className="h-8 w-8 text-primary cursor-grap"/>
		<p className="text-xs">{label}</p>
	</Button>
  )
}

export default SidebarBtnElement