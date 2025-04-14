type ChecklistProps = {
    name: string;
    label: string;
    horizontal?: boolean;
    options: Array<{
        value: string;
        label: string;
    }>;
    value?: Array<number | string>;
    onChange?: (newValue: Array<number | string>) => void;
};

export default function Checklist(props: ChecklistProps) {
    const { options, horizontal, name, label, value, onChange } = props;

    const selectedValues = value || [];

    const handleItemChanged = (value: string, checked: boolean) => {
        let newValues: Array<number | string>;
        if (checked) {
            newValues = [...selectedValues, value];
        } else {
            newValues = selectedValues.filter((v) => v !== value);
        }
        if (onChange) {
            onChange(newValues);
        }
    };
    return (
        <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {label}
            </h3>
            <ul className={`${horizontal ? 'flex'  : ''} text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}>
                {options.map((option) => {
                    return (
                        <ChecklistItem
                            horizontal={horizontal}
                            key={option.value}
                            name={name}
                            value={option.value}
                            label={option.label}
                            checked={selectedValues.includes(option.value)}
                            onChange={(e) =>
                                handleItemChanged(
                                    option.value,
                                    e.target.checked,
                                )}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function ChecklistItem(
    { name, value, label, checked, horizontal, onChange }: {
        name: string;
        value: string;
        label: string;
        checked: boolean;
        horizontal?: boolean;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
    },
) {
    const id = `${name}-${value}`;
    return (
        <li className={`${horizontal ? '' : 'w-full'} border-b border-gray-200 rounded-t-lg dark:border-gray-600`}>
            <div className="flex items-center ps-3">
                <input
                    id={id}
                    type="checkbox"
                    name={`${name}[]`}
                    value={value}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    checked={checked}
                    onChange={onChange}
                />
                <label
                    htmlFor={id}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    {label}
                </label>
            </div>
        </li>
    );
}
