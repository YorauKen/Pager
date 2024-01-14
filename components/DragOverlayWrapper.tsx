import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { ElementsType, FormElements } from './FormElements';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import useDesigner from './hooks/useDesigner';

function DragOverlayWrapper() {
	const { elements } = useDesigner();
	const [draggedItem, setDraggedItem] = useState<Active|null>(null);

	useDndMonitor({
		onDragStart:(event) => {
			//console.log("DRAG ITEM",event);
			setDraggedItem(event.active);
		},
		onDragCancel:(event) => {
			setDraggedItem(null);
		},
		onDragEnd:(event) => {
			setDraggedItem(null);
		},
	});
	if(!draggedItem) return null;

	let node = <div>No drag Overlay</div>	
	
	const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
	const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

	if (isSidebarBtnElement) {
		const type = draggedItem.data?.current?.type as ElementsType;
		node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
	}
	if(isDesignerElement){
		const elementId = draggedItem.data?.current?.elementId;
		const element = elements.find(el => el.id === elementId);
		if(!element)  node = <div>Element not found !</div>
		else{
			const DesignerElementComponent = FormElements[element.type].designerComponent
			node = (
			<div className='flex bg-accent rouded-md border h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none'>
				<DesignerElementComponent elementInstance={element} />
			</div>
			) 
		}
	}
  return (
	<DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverlayWrapper