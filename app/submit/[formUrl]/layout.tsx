import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import React, { PropsWithChildren } from 'react'

const Layout = ({children}:PropsWithChildren) => {
  return (
	<div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen h-screen'>
		<nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
			<Logo/>
			<ThemeSwitcher/>
		</nav>
		
		<main className='flex w-full flex-grow'>{children}</main>
	</div>
  )
}

export default Layout;