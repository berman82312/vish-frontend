import { useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";
import { getRateCards } from "~/api/rate-cards";
import { VTable } from "~/components/table";

export const loader = async () => {
    return await getRateCards();
};

export default function Index() {
    const rateCards = useLoaderData<Awaited<typeof loader>>();
    return (
        <div className="flex flex-col h-screen items-center justify-start p-4">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Rate cards
                    </h1>
                    <Button href="/rate-cards/create">
                        Create new rate card
                    </Button>
                </header>
            </div>
            <div className="w-full p-4">
                <VTable
                    rows={rateCards}
                    columns={[
                        { title: "ID", field: "id" },
                        { title: "Milestone", field: "milestone" },
                        {
                            title: "Business model",
                            field: "business_model",
                            renderer: (row) => row.business_model.title,
                        },
                        {
                            title: "Service categories",
                            field: "service_categories",
                            renderer: (row) =>
                                row.service_categories
                                    .map((category) => category.title)
                                    .join(", "),
                        },
                        { title: "Price unit", field: "price_unit" },
                        { title: "Title", field: "title" },
                        { title: "Unit Price (USD)", field: "price" },
                        { title: "Is recurring", field: "is_recurring" },
                    ]}
                />
            </div>
        </div>
    );
}
