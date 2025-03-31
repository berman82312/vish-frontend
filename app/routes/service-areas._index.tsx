import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { createServiceArea, getServiceAreas } from "~/api/rate-cards";
import Button from "~/components/forms/button";
import Form from "~/components/forms/form";
import TextInput from "~/components/forms/text";
import { ServiceArea } from "~/models/RateCard";

export async function loader() {
    return await getServiceAreas();
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await createServiceArea({
        title: updates.title as string,
    });
    return redirect(".");
};

export default function Page() {
    const serviceAreas = useLoaderData<Awaited<typeof loader>>();
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Service areas
                    </h1>
                </header>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {serviceAreas.map((model, index) => (
                        <ServiceAreaItem
                            data={model}
                            first={index === 0}
                            last={index === serviceAreas.length - 1}
                            key={`service_area_${model.id}`}
                        />
                    ))}
                </ul>
                <Form>
                    <TextInput
                        id="title"
                        name="title"
                        label="Name"
                        placeholder="Enter area name"
                    />
                    <Button type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export const ServiceAreaItem = (
    { data, first, last }: {
        data: ServiceArea;
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
