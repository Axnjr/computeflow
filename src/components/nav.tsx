// import getServerSession from 'next-auth'
// import { authConfig } from '../../backendLib/authOptions';


export default async function Nav() {

    // const session = getServerSession(authConfig);
    // const auth = await session.auth();

    return (
        <nav className="h-16 w-full flex border-b items-center gap-4 justify-end dark:border-neutral-800 
        px-6 dark:bg-black bg-white text-neutral-600 dark:text-neutral-400 font-medium text-base">
            {/* <a href='/overview' className='flex items-center gap-1'>
                <h3 className='text-2xl mx-2 text-neutral-300 dark:text-neutral-700'>⁄</h3>
                <div className=' rounded-full w-5 h-5 bg-gradient-to-br from-sky-400 to-amber-400 mr-1'></div>
                <h3 className='text-base tracking-tighter'>{auth?.user?.name}'s dashboard</h3>
            </a> */}
            {/* <div className='flex items-center gap-4 text-sm'> */}
                <p>Feedback</p>
                <p>Docs</p>
                <p>Help</p>
                {/* <svg className="size-8 p-2 border ml-4 border-neutral-700 rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg> */}
            {/* </div> */}
        </nav>
    )
}
