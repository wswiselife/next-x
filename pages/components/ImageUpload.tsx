import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
    value?:string
    disabled?:boolean
    label?:string;
    onChange:(base64:string) => void
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    value,
    disabled,
    label,
    onChange
})=>{

    const [base64,setBase64] = useState(value)

    const handleChange = useCallback((base64:string)=>{
        onChange(base64)
    },[onchange])

    const handleDrop = useCallback((files:any) =>{
        const file = files[0]
        const reader = new FileReader()

        reader.onload = (event:any) =>{
            setBase64(event.target.result)
            handleChange(event.target.result)
        }

        reader.readAsDataURL(file)
    },[handleChange])

    const {getRootProps,getInputProps} = useDropzone({
        maxFiles:1,
        disabled,
        onDrop:handleDrop,
        accept:{
            'image/jpeg':[],
            'image/jpg':[],
            'image/png':[]
        }
    })

    return (
        <div
            {...getRootProps({
                className:'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700'
            })}
        >
            <input {...getInputProps()}></input>

            {
                base64?(
                    <div className="flex justify-center items-center">
                        <Image 
                            src={base64}
                            height={100}
                            width={100}
                            alt='Upload image'
                        />
                    </div>
                ):(
                    <p className="text-white">{label}</p>
                )
            }

        </div>
    )
}

export default ImageUpload