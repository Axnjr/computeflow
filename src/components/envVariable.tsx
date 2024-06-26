export default function EnvVariable() {
    return (
        <div className='w-[96%] rounded-lg m-auto border-2 p-8 border-neutral-200 dark:border-neutral-800'>
            <h1 className='text-xl  font-semibold m-2'>Enviroment variables</h1>
            <div className='m-2 text-neutral-500'>
                Your project secrets will be safe here. Copy paste your .env file. Please add a semi-colon at end the of each value for simpler .env parsing.
            </div>
            <textarea id="envvariblesinputfeild" className='w-full h-14 rounded-md bg-transparent pl-6 pt-4 text-sm border-2 border-neutral-200 dark:border-neutral-800' placeholder='e.g  SECRET_TOKEN=12345;' />
        </div>
    )
}
