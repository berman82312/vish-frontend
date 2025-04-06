import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";

type Column = {
    title: string;
    field: string;
    renderer?: (row: unknown, field: string) => React.ReactNode | string;
};

type TableProps = {
    rows: unknown[];
    columns: Column[];
    canEdit?: boolean;
    selection?: boolean;
    onSelectAll?: (selected: boolean) => void;
    onSelectRow?: (row: unknown, selected: boolean) => void;
};

export function VTable(props: TableProps) {
    const { rows, columns, onSelectAll, onSelectRow } = props;

    function autoRender(value: unknown) {
        if (typeof value === "boolean") {
            return value ? "Y" : "N";
        }
        return String(value);
    }

    function renderField(
        row: unknown,
        field: Column["field"],
        renderer: Column["renderer"],
    ) {
        if (renderer) {
            return renderer(row, field);
        }
        return autoRender(row[field]);
    }

    return (
        <div className="w-100 overflow-x-auto">
            <Table hoverable={props.selection}>
                <TableHead>
                    <TableRow>
                        {props.selection && (
                            <TableHeadCell className="text-center">
                                <Checkbox
                                    onChange={(e) =>
                                        onSelectAll?.(e.target.checked)}
                                />
                            </TableHeadCell>
                        )}
                        {columns.map((column) => (
                            <TableHeadCell key={column.field}>
                                {column.title}
                            </TableHeadCell>
                        ))}
                        {props.canEdit && (
                            <TableHeadCell className="text-center">
                                Edit
                            </TableHeadCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                                row.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            {props.selection && (
                                <TableCell className="text-center">
                                    <Checkbox
                                        checked={row.checked}
                                        disabled={row.disabled}
                                        onChange={(e) =>
                                            onSelectRow?.(
                                                row,
                                                e.target.checked,
                                            )}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                >
                                    {renderField(
                                        row,
                                        column.field,
                                        column.renderer,
                                    )}
                                </TableCell>
                            ))}
                            {props.canEdit && (
                                <TableCell className="text-center">
                                    <a
                                        href={`rate-cards/${row.id}/edit`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
