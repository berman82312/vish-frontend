import {
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
};

export function VTable(props: TableProps) {
    const { rows, columns } = props;

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
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHeadCell key={column.field}>
                                {column.title}
                            </TableHeadCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
