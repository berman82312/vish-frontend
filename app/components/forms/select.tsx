type SelectOption = {
    value: string;
    label: string;
};

type SelectInputProps = {
    id: string;
    name: string;
    label: string;
    options: Array<SelectOption>;
    value?: string;
    required?: boolean;
    className?: string;
    onChange?: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
};

export default function SelectInput(props: SelectInputProps) {
    const { id, label, name, options, value, onChange } = props;
    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={onChange}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
