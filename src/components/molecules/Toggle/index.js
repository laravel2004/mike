const Toggle = (props) => {
    return(
        <>
        <div className="">
            <p className="text-lg text-slate-700 dark:text-slate-400">{props.labelTitle}</p>
        </div>
        <div className="">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onClick={props.onClick} onChange={props.onChange} checked={props.checked}/>
                <div className="w-11 h-6 bg-secondary-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-primary-teal after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:bg-primary-teal after:bg-[#E1E1E2] after:border-[#E1E1E2] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-sky"></div>
            </label>
        </div>
        </>
    )
}

export default Toggle