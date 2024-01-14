import { cn } from "@/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { BiSolidTrash } from 'react-icons/bi';
import { FormElementInstance, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";

const DesignerElementWrapper = ({element}:{
	element:FormElementInstance
}) => {
	const { removeElement , selectedElement , setSelectedElement } = useDesigner();
	const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
	const topHalf = useDroppable({
		id:element.id + "-top",
		data:{
			type:element.type,
			elementId:element.id,
			isTopHalfDesignerElement:true,
		}
	});

	const bottomHalf = useDroppable({
		id:element.id + "-bottom",
		data:{
			type:element.type,
			elementId:element.id,
			isBottomHalfDesignerElement:true,
		}
	});

	const draggable = useDraggable({
		id:element.id + '-drag-handler',
		data:{
			type:element.type,
			elementId:element.id,
			isDesignerElement:true,
		}
	});
	if(draggable.isDragging) return null
	const DesignerElement = FormElements[element.type].designerComponent; 

	return (
	<div 
		className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset "
		onMouseEnter={()=>{setIsMouseOver(true)}}
		onMouseLeave={()=>{setIsMouseOver(false)}}
		onClick={(e) => {
			e.stopPropagation();
			setSelectedElement(element);
		}}
		ref={draggable.setNodeRef}
		{...draggable.listeners}
		{...draggable.attributes}
		>
		<div ref={topHalf.setNodeRef} className="absolute  w-full h-1/2 rounded-t-md"/>
		<div ref={bottomHalf.setNodeRef}  className="absolute w-full bottom-0 h-1/2 rounded-b-md"/>
		{ isMouseOver && (
			<>
				<div className="absolute right-0 h-full">
					<Button 
						className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 z-10" 
						variant={"outline"}
						onClick={(e)=> {
							e.stopPropagation();
							removeElement(element.id);
						}}>
						<BiSolidTrash className="h-6 w-6"/>
					</Button>
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
					<p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
				</div>
			</>
		)}
		{
			topHalf.isOver && <div className="absolute top-0 w-full rounded-md rounded-b-none h-[10px] bg-primary" />
		}
		<div 
			className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none"
			,isMouseOver && "opacity-30")}>
			<DesignerElement  elementInstance={element}/>
		</div>
		{
			bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[10px] bg-primary" />
		}
	</div>
	);
}
 
export default DesignerElementWrapper;
