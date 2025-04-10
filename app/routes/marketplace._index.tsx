import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getRateCards } from "~/api/rate-cards";
import { VTable } from "~/components/table";
import { RateCard } from "~/models/RateCard";

export const loader = async () => {
    return await getRateCards();
};

export default function Index() {
    const allRateCards = useLoaderData<Awaited<typeof loader>>();

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

    const rateCards = allRateCards.map((rateCard) => ({
        ...rateCard,
        checked: selectedRows.includes(rateCard.id) ||
            selectedRelatedRows.includes(rateCard.id),
        disabled: selectedRelatedRows.includes(rateCard.id),
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
            <div className="w-full p-4">
                <VTable
                    rows={rateCards}
                    columns={[
                        {
                            title: "Milestone",
                            field: "milestone",
                            renderer: (row: RateCard) => row.milestone.toUpperCase(),
                        },
                        { title: "ID", field: "id" },
                        {
                            title: "Business model",
                            field: "business_model",
                            renderer: (row: RateCard) => row.business_model.title,
                        },
                        {
                            title: "Service categories",
                            field: "service_categories",
                            renderer: (row: RateCard) =>
                                row.service_categories
                                    .map((category) => category.title)
                                    .join(", "),
                        },
                        { title: "Price unit", field: "price_unit" },
                        { title: "Title", field: "title" },
                        { title: "Unit Price (USD)", field: "price" },
                        { title: "Is recurring", field: "is_recurring" },
                    ]}
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
