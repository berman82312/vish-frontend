import { ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { createBusinessModel, getBusinessModels } from "~/api/rate-cards";
import Button from "~/components/forms/button";
import Form from "~/components/forms/form";
import TextInput from "~/components/forms/text";

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
                {businessModels.map((model) => (
                    <p key={`business_model_${model.id}`}>{model.title}</p>
                ))}
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
