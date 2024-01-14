'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaDesktop, FaFire } from "react-icons/fa";
import { IoSnow } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';


const ThemeSwitcher = () => {
	const {theme,setTheme} = useTheme();
	const [mounted, setMounted] = useState(false);
	
	useEffect(() => {
		setMounted(true);
	},[]);

	if(!mounted) return	null;

	

  	return (

		<Tabs defaultValue={theme}>
			<TabsList className='border'>
				<TabsTrigger value='light' onClick={()=>setTheme('light')}><FaFire className='h-[1.2rem] w-[1.2rem] text-primary '/></TabsTrigger>
				<TabsTrigger value='dark' onClick={()=>setTheme('dark')}><IoSnow className='h-[1.2rem] w-[1.2rem] dark:text-sky-400 '/></TabsTrigger>
				{/* <TabsTrigger value='system' onClick={()=>setTheme('system')}><FaDesktop className='h-[1.2rem] w-[1.2rem] dark:text-sky-400 text-primary '/></TabsTrigger> */}
			</TabsList>
		</Tabs>
  )
}

export default ThemeSwitcher