import getServerSession from 'next-auth'
import { authConfig } from '../../backendLib/authOptions';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Modes from './ui/modes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default async function Nav() {

    const session = getServerSession(authConfig);
    const auth = await session.auth();



    return (
        <nav className="h-16 w-full border-b flex items-center gap-4 justify-between border-neutral-800 px-5">
            <div className='flex items-center gap-1'>
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                </svg>
                <h3 className='text-xl tracking-tighter'>CheapCloud</h3>
                <h3 className='text-2x mx-2 text-neutral-300 dark:text-neutral-800'>⁄</h3>
                <div className=' rounded-full w-5 h-5 bg-gradient-to-br from-sky-400 to-amber-400 mr-1'></div>
                <h3 className='text-base tracking-tighter'>{auth?.user?.name}'s dashboard</h3>
            </div>
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
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Keyboard shortcuts
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem>
                                New Team
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
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
