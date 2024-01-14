import React, { PropsWithChildren } from 'react'

function Layout({children}:PropsWithChildren) {
  return (
	<div className="flex w-full flex-grow mx-auto">{children}</div>
  )
}

export default Layout