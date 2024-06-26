import { features, plans } from '@/constants'
import { ProjectConfigType } from '@/types/types'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function SelectCompute({projectConfig} : {projectConfig: ProjectConfigType}) {

    const [instanceType, setInstanceType] = useState(projectConfig.compute.instanceType);

    return (
        <div className='w-[96%] rounded-lg m-auto border-2 p-8 border-neutral-200 dark:border-neutral-800'>
            <div className='flex items-center justify-between gap-2 h-full'>
                <div className='w-[30%] mx-2'>
                    <h1 className='text-xl  font-semibold my-1'>Select compute type</h1>
                    <p className='text-neutral-500'>All instance's support below features.
                        Need more compute power? &nbsp;
                        <a className='text-blue-500 underline font-medium' href='mailto:sales@computeflow.gmail.com'>Contact us</a>
                        <br />
                        <a className='text-blue-500 underline font-medium' href='mailto:sales@computeflow.gmail.com'>Pricing FAQ's </a>
                    </p>
                    <br />
                    <ul>
                        {
                            features.map((feature, id) => <li key={id} className='flex items-center gap-2 font-medium'>
                                <CheckCircledIcon /> {feature}
                            </li>)
                        }
                    </ul>
                </div>
                <div className='grid grid-cols-1 w-[70%] h-64 gap-2 overflow-y-scroll'>
                    {
                        plans.map((plan, id) => <div key={id} className={`border-2 border-neutral-200 dark:border-neutral-800 
                            col-span-1 rounded-lg h-24 p-4 flex items-end justify-between 
                            ${instanceType == plan.name ? "bg-neutral-200 dark:bg-neutral-800" : ""}`}
                            onClick={() => {
                                setInstanceType(plan.name)
                                projectConfig.compute.instanceType = plan.name
                            }}>
                            <div>
                                <p className='font-medium text-neutral-500'>{plan.name}</p>
                                <h1 className='text-xl font-bold'>${plan.price}<span className='text-xs font-light'> / Month</span></h1>
                            </div>
                            <p className='font-bold text-md text-neutral-500'>{plan.cpu}vCPU · {plan.ram}(RAM) · {plan.gpu}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
