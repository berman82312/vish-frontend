import Form from "~/components/forms/form";
import SelectInput from "~/components/forms/select";
import TextInput from "~/components/forms/text";

import { redirect, useLoaderData } from "@remix-run/react";
import {
    getRateCard,
    getRateCardOptions,
    updateRateCard,
} from "~/api/rate-cards";
import Checklist from "~/components/forms/checklist";
import Toggle from "~/components/forms/toggle";
import Button from "~/components/forms/button";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
    const [rateCard, options] = await Promise.all([
        getRateCard(params.id as string),
        getRateCardOptions(),
    ]);
    return {
        data: rateCard,
        options: options,
    };
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const payload = {
        milestone: formData.get("milestone"),
        business_model_id: formData.get("business_model"),
        title: formData.get("title"),
        price: formData.get("price"),
        price_unit: formData.get("price_unit"),
        default_amount: formData.get("default_amount"),
        service_category_ids: formData.getAll("service_categories[]"),
        service_area_ids: formData.getAll("service_areas[]"),
        is_recurring: formData.get("is_recurring") === "on",
        include_rate_card_ids: formData.getAll("include_rate_cards[]"),
    };
    await updateRateCard(params.id as string, payload);
    return redirect("/rate-cards");
};

export default function Page() {
    const {
        data: originRateCard,
        options: {
            milestones,
            business_models,
            service_categories,
            service_areas,
            price_units,
            rate_cards,
        },
    } = useLoaderData<
        Awaited<typeof loader>
    >();

    const [rateCard, setRateCard] = useState(originRateCard);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col md:w-1/2 w-full p-8 gap-16">
                <header className="flex flex-col gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Rate card: {rateCard.title}
                    </h1>
                </header>
                <h2>Rate card creation page</h2>
                <Form>
                    <SelectInput
                        id="milestone"
                        name="milestone"
                        label="Milestone"
                        options={milestones || []}
                        value={rateCard.milestone}
                        onChange={(event) => {
                            setRateCard((prev) => ({
                                ...prev,
                                milestone: event.target.value,
                            }));
                        }}
                    />
                    <SelectInput
                        id="business_model"
                        name="business_model"
                        label="Business model"
                        options={business_models || []}
                        value={rateCard.business_model_id ||
                            rateCard.business_model.id.toString()}
                        onChange={(event) => {
                            setRateCard((prev) => ({
                                ...prev,
                                business_model_id: event.target.value,
                            }));
                        }}
                    />
                    <Checklist
                        label="Service Cateogories"
                        name="service_categories"
                        options={service_categories}
                        value={rateCard.service_category_ids ||
                            rateCard.service_categories.map(
                                (category) => category.id,
                            )}
                        onChange={(values) => {
                            setRateCard((prev) => ({
                                ...prev,
                                service_category_ids: values,
                            }));
                        }}
                    />
                    <TextInput
                        id="title"
                        name="title"
                        label="Title"
                        value={rateCard.title}
                        onChange={(e) =>
                            setRateCard((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))}
                    />
                    <Toggle
                        name="is_recurring"
                        label="Recurring"
                        value={rateCard.is_recurring}
                        onChange={(e) =>
                            setRateCard((prev) => ({
                                ...prev,
                                is_recurring: e.target.checked,
                            }))}
                    />
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        label="Price (USD)"
                        value={rateCard.price.toString()}
                        onChange={(e) =>
                            setRateCard((prev) => ({
                                ...prev,
                                price: Number(e.target.value),
                            }))}
                    />
                    <SelectInput
                        id="price_unit"
                        name="price_unit"
                        label="Price unit"
                        options={price_units || []}
                        value={rateCard.price_unit}
                        onChange={(e) =>
                            setRateCard((prev) => ({
                                ...prev,
                                price_unit: e.target.value,
                            }))}
                    />
                    <TextInput
                        id="default_amount"
                        type="number"
                        name="default_amount"
                        label="Default amount"
                        value={rateCard.default_amount.toString()}
                        onChange={(e) =>
                            setRateCard((prev) => ({
                                ...prev,
                                default_amount: Number(e.target.value),
                            }))}
                    />
                    <Checklist
                        label="Service Areas"
                        name="service_areas"
                        options={service_areas || []}
                        value={rateCard.service_area_ids ||
                            rateCard.service_areas.map((area) => area.id)}
                        onChange={(values) => {
                            setRateCard((prev) => ({
                                ...prev,
                                service_area_ids: values,
                            }));
                        }}
                    />
                    <Checklist
                        name="include_rate_cards"
                        label="Related rate cards"
                        options={rate_cards || []}
                        value={rateCard.include_rate_card_ids ||
                            rateCard.include_rate_cards.map((card) => card.id)}
                        onChange={(values) =>
                            setRateCard((prev) => ({
                                ...prev,
                                include_rate_card_ids: values,
                            }))}
                    />
                    <Button>Submit</Button>
                </Form>
            </div>
        </div>
    );
}
