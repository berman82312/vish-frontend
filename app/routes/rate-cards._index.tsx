import { useLoaderData } from "@remix-run/react";
import { Button } from "flowbite-react";

export const loader = async () => {
    const rateCards = await fetch("http://127.0.0.1:8000/api/rate-cards");
    return Response.json(rateCards);
};

export default function Index() {
    const rateCards = useLoaderData();
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
