import Form from "~/components/forms/form";
import SelectInput from "~/components/forms/select";
import TextInput from "~/components/forms/text";

import { redirect, useLoaderData } from "@remix-run/react";
import { createRateCard, getRateCardOptions } from "~/api/rate-cards";
import Checklist from "~/components/forms/checklist";
import Toggle from "~/components/forms/toggle";
import Button from "~/components/forms/button";
import { ActionFunctionArgs } from "@remix-run/node";

export async function loader() {
    return await getRateCardOptions();
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const payload = {
        milestone: formData.get("milestone"),
        business_model: formData.get("business_model"),
        title: formData.get("title"),
        price: formData.get("price"),
        price_unit: formData.get("price_unit"),
        default_amount: formData.get("default_amount"),
        service_categories: formData.getAll("service_categories[]"),
        service_areas: formData.getAll("service_areas[]"),
        is_recurring: formData.get("is_recurring") === "on",
    };
    // console.log("Updates: ", payload);
    await createRateCard(payload);
    return redirect("/rate-cards");
};

export default function Page() {
    const {
        milestones,
        business_models,
        service_categories,
        service_areas,
        price_units,
    } = useLoaderData<
        Awaited<typeof loader>
    >();

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col w-[480px] p-8 gap-16">
                <header className="flex flex-col gap-9">
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
                    <Checklist
                        label="Service Cateogories"
                        name="service_categories"
                        options={service_categories}
                    />
                    <TextInput id="title" name="title" label="Title" />
                    <Toggle name="is_recurring" label="Recurring" />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        label="Price (USD)"
                    />
                    <SelectInput
                        id="price_unit"
                        name="price_unit"
                        label="Price unit"
                        options={price_units || []}
                    />
                    <TextInput
                        id="default_amount"
                        type="number"
                        name="default_amount"
                        label="Default amount"
                    />
                    <Checklist
                        label="Service Areas"
                        name="service_areas"
                        options={service_areas || []}
                    />
                    <Button>Submit</Button>
                </Form>
            </div>
        </div>
    );
}
