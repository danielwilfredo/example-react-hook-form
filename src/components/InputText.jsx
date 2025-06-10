const InputText = ({ name, label, placeholder, type = "text", register, error }) => {
  return (
    <div className="sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          {...register(name, { required: `${label} is required` })}
          placeholder={placeholder}
          type={type}
          className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600"
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default InputText;
