import { useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";
import { getRateCards } from "~/api/rate-cards";

export const loader = async () => {
    return await getRateCards();
};

export default function Index() {
    const rateCards = useLoaderData<Awaited<typeof loader>>();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Rate cards
                    </h1>
                    <Button href="/rate-cards/create">
                        Create new rate card
                    </Button>
                </header>
                {rateCards.length > 0
                    ? rateCards.map((card) => (
                        <div key={card.id}>{card.title}</div>
                    ))
                    : <h2>No cards</h2>}
            </div>
        </div>
    );
}
