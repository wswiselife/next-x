interface InputProps {
    placeholder?: string;
    value?:string;
    type?:string;
    disabled:boolean;
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const Input:React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
})=>{
    return (
        <input 
            disabled={disabled}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            value={value}  
            className="
                w-full
                p-4
                text-lg
                text-white
                bg-black
                border-2
                border-neutral-800
                rounded-md
                outline-none
                focus:border-2
                focus:border-sky-500
                transition
                disabled:bg-neutral-900
                disabled:opacit-70
                disabled:cursor-not-allowed

            "     
        />
    )
}

export default Input