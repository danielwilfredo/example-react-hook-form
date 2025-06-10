const SelectInput = ({ name, label, options, register, error }) => {
  return (
    <div className="sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required: `${label} is required` })}
        className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
