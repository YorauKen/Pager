import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

type StatCardProps = {
	title : string
	value : string 
	helperText : string
	icon : ReactNode
	loading : boolean 
	className : string
}


const StatsCard = ({
	title,
	icon,
	value,
	helperText,
	loading,
	className
  }:StatCardProps) => {
  
	return ( 
	  <Card className={className}>
		<CardHeader className="flex flex-row items-center justify-between pb-2">
		  <CardTitle className="font-['Open Sans'] text-sm font-medium text-muted-foreground">{title}</CardTitle>
		  {icon}
		</CardHeader>
		<CardContent>
		  <div className="text-2xl font-bold">
			{ loading && <Skeleton className="mx-2"><span className="opacity-0">0</span></Skeleton>}
			{ !loading && value}
		  </div>
		  <p className="text-xs text-muted-foreground pt-1 ">{helperText}</p>
		</CardContent>
	  </Card>
	 );
  }

export default StatsCard;