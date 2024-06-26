import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip'
import { useState } from 'react'
import { ProjectConfigType, UserRepo } from '@/types/types'

export default function ProjectConfig({projectConfig, projectName}:{projectConfig: ProjectConfigType, projectName: string}) {
    return (
        <div className='w-[55%] h-[42rem] rounded-lg border-2 border-neutral-200 dark:border-neutral-800
            p-[2%] flex flex-col gap-3'>

            <h1 className='text-xl text-right font-semibold m-2'>Configure Project</h1>
            <div className='w-full h-[1.25px] bg-neutral-200 dark:bg-neutral-800 my-1'></div>

            <div>
                <label className='text-[0.8rem] text-neutral-400'>Project name</label>
                <input 
                // onChange={(e) => {
                //     projectConfig.name = e.currentTarget.value;
                // }} 
                id='projectnameinputfeild'
                className='pl-2 bg-transparent h-10 rounded-md mt-1 text-sm w-full border-2 border-neutral-200 dark:border-neutral-800'
                type='text' placeholder='my money making project!'
                // @ts-ignore
                defaultValue={projectName.length > 0 ? projectName : null} />
            </div>

            <div className='w-full'>
                <label className='text-[0.8rem] text-neutral-400'>Language</label>
                <Select onValueChange={(e) => {
                    console.log(e)
                    projectConfig.lang = e;
                }}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue className='text-slate-400' placeholder="Programming language used in your porject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="nodejs">Nodejs</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="go">Golang</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='w-full'>
                <label className='text-[0.8rem] text-neutral-400'>Region</label>
                <Select onValueChange={(e) => {
                    console.log(e)
                    projectConfig.region = e;
                }}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Where would you like to deploy your project ?" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="virginia">Virginia (us-east)</SelectItem>
                        <SelectItem value="oregon">Oregon (use-west)</SelectItem>
                        <SelectItem value="frankfurt">frankfurt (eu-central)</SelectItem>
                        <SelectItem value="mumbai">Mumbai (south-asia)</SelectItem>
                        <SelectItem value="singapore">Singapore (southeast-asia)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className='text-[0.8rem] text-neutral-400'>Root directory - <span className='text-xs'>optional</span></label>
                <input id='rootdirinputfeild' className='pl-2 bg-transparent h-10 rounded-md mt-1 text-sm w-full border-2 border-neutral-200 dark:border-neutral-800'
                    type='text' placeholder='e.g. src' />
            </div>
            
            <h1 className='text-xl text-right font-semibold m-2'>Commands</h1>
            <div className='w-full h-[1.25px] bg-neutral-200 dark:bg-neutral-800 my-1'></div>
            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className='text-[0.8rem] text-neutral-400 flex items-center'>
                            Build Commands -&nbsp;<span className='text-xs'> seprate each command with a semi-colon if more than 1</span>&nbsp; <InfoCircledIcon />
                        </TooltipTrigger>
                        <TooltipContent className='mt-1'>
                            Will use these to build your project, seprate each command with a semi-colon
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <input id='buildcommandinputfeild' className='pl-2 bg-transparent h-10 rounded-md mt-1 text-sm w-full border-2 border-neutral-200 dark:border-neutral-800'
                    type='text' placeholder='e.g. npm install; npm run build' />
            </div>
            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className='text-[0.8rem] text-neutral-400 flex items-center'>Start Command&nbsp; <InfoCircledIcon /></TooltipTrigger>
                        <TooltipContent className='mt-1'>
                            Will use these to start / run your project on each deployemnt
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <input id='startcommandinputfeild' className='pl-2 bg-transparent h-10 rounded-md mt-1 text-sm w-full border-2 border-neutral-200 dark:border-neutral-800'
                    type='text' placeholder='e.g. npm run start or cargo run' />
            </div>
        </div>
    )
}
