import { get, post } from "~/api/base";
import { type BusinessModel, ServiceCategory } from "~/models/RateCard";

type MilestoneOption = {
    value: string;
    label: string;
};

type RateCardOptions = {
    milestones: Array<MilestoneOption>;
};

export type BusinessModelPayload = {
    title: string;
};

export type ServiceCategoryPayload = {
    title: string;
};

export async function getBusinessModels() {
    const response = await get<BusinessModel[]>("business-models");
    return response;
}

export async function createBusinessModel(data: BusinessModelPayload) {
    const response = await post("business-models", data);
    return response;
}

export async function getServiceCategories() {
    const response = await get<ServiceCategory[]>("service-categories");
    return response;
}

export async function createServiceCategory(data: ServiceCategoryPayload) {
    const response = await post("service-categories", data);
    return response;
}

export async function getRateCardOptions() {
    const response = await get<RateCardOptions>("options/rate-card");
    return response;
}

export async function createRateCard(data: FormData) {
    const response = await post("rate-cards", data);
    return response;
}
