interface InputProps {
    type: string;
    placeholder: string;
    required: boolean;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function Input({ type, placeholder, required, label, onChange}: InputProps) {
    return (
        <div className="grid gap-6 my-5">
            <div>
                <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
                <input onChange={(e) => onChange(e)} type={type} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required = {required} />
            </div>
        </div>
    )
}