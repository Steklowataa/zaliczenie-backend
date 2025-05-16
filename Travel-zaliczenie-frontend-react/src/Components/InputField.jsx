const InputField = ({ type, name, value, placeholder, onChange, multiple, accept}) => {
    return (
        <input 
            {...(type !== "file" ? { value } : {})}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            accept={accept}
            multiple={multiple}
            className="w-[400px] h-[40px] border border-borderColor rounded-[10px] px-3"/>
    )
}

export default InputField