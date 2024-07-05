"use client"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu'
import getServerSession from 'next-auth'
import { authConfig } from '../../backendLib/authOptions';
import { Avatar, AvatarImage } from './ui/avatar';
import { links } from '@/constants';

export default function Sidebar() {

    // const session = getServerSession(authConfig);
    // const auth = await session.auth();
    const auth = {
        user:{
            image:"https://avatars.githubusercontent.com/u/111436589?v=4",
            email:"yakshitchhipa@gmail.com",
            name:"Yakshit"
        }
    }

    return (
        <section className='min-h-screen fixed top-0 left-0 w-1/6 border-r border-neutral-300 z-50 
        text-left dark:border-neutral-800 bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white flex flex-col
        items-start justify-between gap-10'>
            <div className='w-full'>
                <a href='/overview' className='text-[1.3rem] font-bold tracking-tighter flex items-center my-6 pl-4'>
                    {/* <svg className="size-6 mt-1 mr-1" viewBox="0 0 500 500" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><mask id="globeOuterOnly">
                        <path d="M73.3252 286.654L162.105 286.654L100.636 348.123L151.632 399.119C181.189 369.562 197.794 329.474 197.794 287.674L197.794 231.637C197.794 222.201 190.145 214.551 180.708 214.551H73.3252L73.3252 286.654ZM213.745 73.3254L213.745 162.105L152.276 100.636L101.28 151.632C130.837 181.189 170.926 197.794 212.726 197.794H268.763C278.199 197.794 285.849 190.145 285.849 180.709L285.849 73.3255L213.745 73.3254ZM286.654 427.075V338.295L348.123 399.764L399.119 348.768C369.562 319.211 329.474 302.606 287.674 302.606H231.636C222.2 302.606 214.551 310.255 214.551 319.691L214.551 427.074L286.654 427.075ZM427.074 213.746H338.295L399.764 152.277L348.768 101.281C319.211 130.838 302.605 170.926 302.605 212.726V268.763C302.606 278.199 310.255 285.849 319.691 285.849L427.074 285.849V213.746ZM250.2 285.406C269.938 285.406 285.849 269.414 285.849 249.757C285.849 230.019 269.897 214.068 250.2 214.108C230.502 214.148 214.551 230.1 214.551 249.757C214.511 269.454 230.502 285.446 250.2 285.406Z" fill="#fff" stroke="#fff" strokeWidth={7} /></mask></defs><path d="M73.3252 286.654L162.105 286.654L100.636 348.123L151.632 399.119C181.189 369.562 197.794 329.474 197.794 287.674L197.794 231.637C197.794 222.201 190.145 214.551 180.708 214.551H73.3252L73.3252 286.654ZM213.745 73.3254L213.745 162.105L152.276 100.636L101.28 151.632C130.837 181.189 170.926 197.794 212.726 197.794H268.763C278.199 197.794 285.849 190.145 285.849 180.709L285.849 73.3255L213.745 73.3254ZM286.654 427.075V338.295L348.123 399.764L399.119 348.768C369.562 319.211 329.474 302.606 287.674 302.606H231.636C222.2 302.606 214.551 310.255 214.551 319.691L214.551 427.074L286.654 427.075ZM427.074 213.746H338.295L399.764 152.277L348.768 101.281C319.211 130.838 302.605 170.926 302.605 212.726V268.763C302.606 278.199 310.255 285.849 319.691 285.849L427.074 285.849V213.746ZM250.2 285.406C269.938 285.406 285.849 269.414 285.849 249.757C285.849 230.019 269.897 214.068 250.2 214.108C230.502 214.148 214.551 230.1 214.551 249.757C214.511 269.454 230.502 285.446 250.2 285.406Z" fill="currentColor" stroke="currentColor" strokeWidth={7} />
                    </svg> */}
                    computeflow
                </a>
                <br/>
                <div className='flex flex-col items-center w-full gap-1'>
                    {
                        links.map((link, id) => <Link key={id} href={link.href} className='-ml-2 my-1 text-sm flex items-center 
                        hover:bg-neutral-100 dark:hover:bg-neutral-900 w-11/12 rounded-lg p-2 font-medium text-neutral-800 
                        dark:text-neutral-300'>
                            {link.svg}
                            {link.name}
                    </Link>)
                    }
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2 mb-6 hover:bg-neutral-100 rounded-lg outline-none px-4 py-2 
                dark:hover:bg-neutral-900 dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800
                justify-center ml-2'>
                    <Avatar className='w-5 h-5'>
                        <AvatarImage src={auth?.user?.image as string} />
                    </Avatar>
                    <p className='text-xs font-bold text-neutral-800 dark:text-neutral-300'>{auth?.user.email?.slice(0, 16)}...</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 px-2 py-3 mr-6 mt-3">
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Invite User
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    )
}