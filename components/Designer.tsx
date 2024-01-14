'use client'

import { cn } from "@/lib/utils";
import DesignerSideBar from "./DesignerSideBar";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import useDesigner from "./hooks/useDesigner";
import { ElementsType, FormElements } from "./FormElements";
import { idGen } from "@/lib/idGen";
import DesignerElementWrapper from "./DesignerElementWrapper";


const Designer = () => {
	const { elements,addElement,selectedElement,setSelectedElement,removeElement } = useDesigner();
	
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
		  isDesignerDropArea: true,
		},
	  });

	useDndMonitor({
		onDragEnd:(event:DragEndEvent) => {
			
			const { active , over } = event;

			if(!active || !over) return;

			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
			const isDroppingOverDesignerDropArea = over?.data?.current?.isDesignerDropArea;

			// 1st scenario : dropping over a sidebar btn element over the designer drop area
			const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;
			
			if(droppingSidebarBtnOverDesignerDropArea){
				
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(idGen());
				addElement(elements.length,newElement);
				return;
			}

			const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement; 
			const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement; 
			const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
			
			const droppingSidebarBtnOverDesignerELement = isDesignerBtnElement && isDroppingOverDesignerElement;
			
			// 2nd Scenario 
			if(droppingSidebarBtnOverDesignerELement)
			{

				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(idGen());
				const overId = over.data?.current?.elementId;
				const overElementIndex = elements.findIndex((el) => el.id === overId);

				if(overElementIndex === -1){
					throw new Error("element not found");
				}

				let indexForNewElement = overElementIndex; // assuming Im on top half ; 
				if(isDroppingOverDesignerElementBottomHalf){
					indexForNewElement = overElementIndex + 1;
				}

				addElement(indexForNewElement,newElement);
				return;
			}

			// 3rd Scenario 
			const isDraggingDesignerElement  = active.data?.current?.isDesignerElement;
			const draggingDesignerElementOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement;
			if(draggingDesignerElementOverAnotherDesignerElement)
			{
				const activeId = active.data?.current?.elementId;
				const overId = over.data?.current?.elementId;

				const activeElementIndex = elements.findIndex((el) => el.id === activeId);
				const overElementIndex = elements.findIndex((el) => el.id === overId);

				if(activeElementIndex === -1 || overElementIndex === -1){
					throw new Error("Element Not Found");
				}
				
				const activeElement = {...elements[activeElementIndex]};
				removeElement(activeId);

				let indexForNewElement = overElementIndex; // assuming Im on top half ; 
				if(isDroppingOverDesignerElementBottomHalf){
					indexForNewElement = overElementIndex + 1;
				}

				addElement(indexForNewElement,activeElement);
				return;
			}


		}
	})
	
	return ( 
		<div className="flex w-full h-full">
			<div className="p-4 w-full" onClick={()=>{
				if(selectedElement) setSelectedElement(null);
			}}>
				<div 
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",droppable.isOver && "ring-4 ring-primary ring-inset",
					)}>
					{!droppable.isOver && elements.length === 0 && (
						<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop Here</p>
					)}
					{droppable.isOver && elements.length === 0 && (
						<div className="p-4 w-full">
							<div className="h-[120px] rounded-md bg-primary/20">

							</div>
						</div>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col w-full gap-2 p-4 ">
							{elements.map((el) => (
								<DesignerElementWrapper key={el.id} element={el}/>
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSideBar/>
		</div>
	 );
}
 
export default Designer;