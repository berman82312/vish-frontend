type TextInputProps = {
    id: string;
    name: string;
    label: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TextInput(props: TextInputProps) {
    const { id, name, label, placeholder, type, value, onChange } = props;
    return (
        <div className="mb-5">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                value={value}
                type={type ?? "text"}
                id={id}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    );
}
