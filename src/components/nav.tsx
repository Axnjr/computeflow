import getServerSession from 'next-auth'
import { authConfig } from '../../backendLib/authOptions';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function Nav() {

    const session = getServerSession(authConfig);
    const auth = await session.auth();

    return (
        <nav className="h-20 w-full flex border-b items-center gap-4 justify-between dark:border-neutral-800 
        px-6 dark:bg-black bg-white dark:text-white text-black">
            <a href='/overview' className='flex items-center gap-1'>
                <h3 className='text-2xl font-medium tracking-tighter flex items-center'>
                    <svg className="size-6 mt-1" viewBox="0 0 500 500" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><mask id="globeOuterOnly">
                        <path d="M73.3252 286.654L162.105 286.654L100.636 348.123L151.632 399.119C181.189 369.562 197.794 329.474 197.794 287.674L197.794 231.637C197.794 222.201 190.145 214.551 180.708 214.551H73.3252L73.3252 286.654ZM213.745 73.3254L213.745 162.105L152.276 100.636L101.28 151.632C130.837 181.189 170.926 197.794 212.726 197.794H268.763C278.199 197.794 285.849 190.145 285.849 180.709L285.849 73.3255L213.745 73.3254ZM286.654 427.075V338.295L348.123 399.764L399.119 348.768C369.562 319.211 329.474 302.606 287.674 302.606H231.636C222.2 302.606 214.551 310.255 214.551 319.691L214.551 427.074L286.654 427.075ZM427.074 213.746H338.295L399.764 152.277L348.768 101.281C319.211 130.838 302.605 170.926 302.605 212.726V268.763C302.606 278.199 310.255 285.849 319.691 285.849L427.074 285.849V213.746ZM250.2 285.406C269.938 285.406 285.849 269.414 285.849 249.757C285.849 230.019 269.897 214.068 250.2 214.108C230.502 214.148 214.551 230.1 214.551 249.757C214.511 269.454 230.502 285.446 250.2 285.406Z" fill="#fff" stroke="#fff" strokeWidth={7} /></mask></defs><path d="M73.3252 286.654L162.105 286.654L100.636 348.123L151.632 399.119C181.189 369.562 197.794 329.474 197.794 287.674L197.794 231.637C197.794 222.201 190.145 214.551 180.708 214.551H73.3252L73.3252 286.654ZM213.745 73.3254L213.745 162.105L152.276 100.636L101.28 151.632C130.837 181.189 170.926 197.794 212.726 197.794H268.763C278.199 197.794 285.849 190.145 285.849 180.709L285.849 73.3255L213.745 73.3254ZM286.654 427.075V338.295L348.123 399.764L399.119 348.768C369.562 319.211 329.474 302.606 287.674 302.606H231.636C222.2 302.606 214.551 310.255 214.551 319.691L214.551 427.074L286.654 427.075ZM427.074 213.746H338.295L399.764 152.277L348.768 101.281C319.211 130.838 302.605 170.926 302.605 212.726V268.763C302.606 278.199 310.255 285.849 319.691 285.849L427.074 285.849V213.746ZM250.2 285.406C269.938 285.406 285.849 269.414 285.849 249.757C285.849 230.019 269.897 214.068 250.2 214.108C230.502 214.148 214.551 230.1 214.551 249.757C214.511 269.454 230.502 285.446 250.2 285.406Z" fill="currentColor" stroke="currentColor" strokeWidth={7} />
                    </svg>
                    computeflow
                </h3>
                <h3 className='text-2xl mx-2 text-neutral-300 dark:text-neutral-700'>⁄</h3>
                <div className=' rounded-full w-5 h-5 bg-gradient-to-br from-sky-400 to-amber-400 mr-1'></div>
                <h3 className='text-base tracking-tighter'>{auth?.user?.name}'s dashboard</h3>
            </a>
            <div className='flex items-center gap-4 text-sm'>
                <p>Feedback</p>
                <p>Docs</p>
                <p>Balance</p>
                <p>Help</p>
                <svg className="size-8 p-2 border ml-4 border-neutral-700 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={auth?.user?.image as string} />
                        </Avatar>
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
            </div>
        </nav>
    )
}
