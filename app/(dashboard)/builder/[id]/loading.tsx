import React from 'react'
import { ImSpinner2 } from "react-icons/im";
function Loading() {
  return (
	<div className='flex flex-col items-center justify-center w-full h-full'>
    <ImSpinner2 className="animate-spin h-12 w-12 text-primary" />
    <h1 className='text-2xl text-muted-foreground mx-100 my-10 '>Loading...</h1>
  </div>
  )
}

export default Loading