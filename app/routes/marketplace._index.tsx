import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getRateCards, getServiceAreas } from "~/api/rate-cards";
import Checklist from "~/components/forms/checklist";
import SelectInput from "~/components/forms/select";
import { VTable } from "~/components/VTable";
import { RateCard } from "~/models/RateCard";

export const loader = async () => {
    const [areas, rateCards] = await Promise.all([getServiceAreas(), getRateCards()]);
    return {
        rateCards,
        areas,
    };
};

const RateCardColumns = [
    {
        title: "Milestone",
        field: "milestone",
        renderer: (row: RateCard) => row.milestone.toUpperCase(),
        default: true,
    },
    { title: "ID", field: "id", default: false },
    {
        title: "Business model",
        field: "business_model",
        renderer: (row: RateCard) => row.business_model.title,
        default: false,
    },
    {
        title: "Service categories",
        field: "service_categories",
        renderer: (row: RateCard) => row.service_categories
            .map((category) => category.title)
            .join(", "),
        default: true
    },
    { title: "Title", field: "title", default: true },
    { title: "Unit Price (USD)", field: "price", default: false },
    { title: "Price unit", field: "price_unit", default: false },
    { title: "Is recurring", field: "is_recurring", default: true },
];

export default function Index() {
    const {rateCards: allRateCards, areas} = useLoaderData<Awaited<typeof loader>>();

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectedColumns, setSelectedColumns] = useState(
        RateCardColumns.filter((column) => column.default).map((column) => column.field),
    )
    const [selectedArea, setSelectedAreea] = useState(areas.find(area => area.title === "All")?.id.toString());

    const columns = RateCardColumns.filter((column =>
        selectedColumns.includes(column.field)
    ))

    const selectedRelatedRows = selectedRows.reduce(
        (acc, cur) => {
            const rateCard = allRateCards.find(
                (row) => row.id === cur,
            );
            if (!rateCard) return acc;

            rateCard.include_rate_cards.forEach((relatedRateCard) => {
                if (!acc.includes(relatedRateCard.id)) {
                    acc.push(relatedRateCard.id);
                }
            });
            return acc;
        },
        [] as number[],
    );

    const isServeInArea = (rateCard: RateCard) => {
        const area = areas.find((area) => area.id.toString() === selectedArea);
        if (area?.title === 'All') return true;
        return rateCard.service_areas.some((rateCardArea) => {
            return rateCardArea.id === area?.id || rateCardArea?.title === "All";
        });
    }

    const rateCards = allRateCards.filter(isServeInArea).map((rateCard) => ({
        ...rateCard,
        checked: selectedRows.includes(rateCard.id) ||
            selectedRelatedRows.includes(rateCard.id),
        disabled: selectedRelatedRows.includes(rateCard.id),
        note: selectedRelatedRows.includes(rateCard.id) ? 'Required by other rate cards' : undefined,
    }));

    return (
        <div className="flex flex-col h-screen items-center justify-start p-4">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Marketplace
                    </h1>
                </header>
            </div>
            <div>
                <SelectInput
                    id="service_area"
                    label="Service area"
                    name="service_area"
                    value={selectedArea}
                    options={areas.map((area) => ({
                        value: area.id.toString(),
                        label: area.title,
                    }))}
                    onChange={(event) => {
                        setSelectedAreea(event.target.value);
                    }}
                />
                <Checklist
                    horizontal
                    label="Columns to display"
                    name="columns"
                    options={RateCardColumns.map((column) => ({
                        value: column.field,
                        label: column.title,
                    }))}
                    value={selectedColumns}
                    onChange={(event) => {
                        const selected = event as string[];
                        setSelectedColumns(
                            RateCardColumns.filter((column) =>
                                selected.includes(column.field),
                            ).map((column) => column.field),
                        );
                    }}
                />
            </div>
            <div className="w-full p-4">
                <VTable
                    rows={rateCards}
                    columns={columns}
                    selection
                    onSelectAll={(checked) => {
                        setSelectedRows(
                            checked ? rateCards.map((row) => row.id) : [],
                        );
                    }}
                    onSelectRow={(row, checked) => {
                        setSelectedRows((prev) => {
                            if (checked) {
                                return [...prev, row.id];
                            } else {
                                return prev.filter((id) => id !== row.id);
                            }
                        });
                    }}
                />
            </div>
        </div>
    );
}
