import Form from "~/components/forms/form";
import SelectInput from "~/components/forms/select";
import TextInput from "~/components/forms/text";

import { useLoaderData } from "@remix-run/react";
import { getRateCardOptions } from "~/api/rate-cards";

export async function loader() {
    return await getRateCardOptions();
}

export default function Page() {
    const { milestones, business_models } = useLoaderData<
        Awaited<typeof loader>
    >();

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Rate cards
                    </h1>
                </header>
                <h2>Rate card creation page</h2>
                <Form>
                    <SelectInput
                        id="milestone"
                        name="milestone"
                        label="Milestone"
                        options={milestones || []}
                    />
                    <SelectInput
                        id="business_model"
                        name="business_model"
                        label="Business model"
                        options={business_models || []}
                    />
                    <TextInput id="title" name="title" label="Title" />
                </Form>
            </div>
        </div>
    );
}
