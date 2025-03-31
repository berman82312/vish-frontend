import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { createBusinessModel, getBusinessModels } from "~/api/rate-cards";
import Button from "~/components/forms/button";
import Form from "~/components/forms/form";
import TextInput from "~/components/forms/text";
import { BusinessModel } from "~/models/RateCard";

export async function loader() {
    return await getBusinessModels();
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await createBusinessModel({
        title: updates.title as string,
    });
    return redirect(".");
};

export default function Page() {
    const businessModels = useLoaderData<Awaited<typeof loader>>();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Business models
                    </h1>
                </header>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {businessModels.map((model, index) => (
                        <BusinessModelItem
                            data={model}
                            first={index === 0}
                            last={index === businessModels.length - 1}
                            key={`business_model_${model.id}`}
                        />
                    ))}
                </ul>
                <Form>
                    <TextInput
                        id="title"
                        name="title"
                        label="Name"
                        placeholder="Enter business model name"
                    />
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export const BusinessModelItem = (
    { data, first, last }: {
        data: BusinessModel;
        first: boolean;
        last: boolean;
    },
) => {
    const classList = first ? "rounded-t-lg" : last ? "rounded-b-lg" : "";
    const className =
        `w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 ${classList}`;
    return (
        <li className={className}>
            {data.id} - {data.title}
        </li>
    );
};
