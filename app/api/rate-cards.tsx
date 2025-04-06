import { get, post } from "~/api/base";
import {
    type BusinessModel,
    RateCard,
    type ServiceArea,
    type ServiceCategory,
} from "~/models/RateCard";

type Option = {
    value: string;
    label: string;
};

type RateCardOptions = {
    milestones: Array<Option>;
    business_models: Array<Option>;
    service_categories: Array<Option>;
    service_areas: Array<Option>;
    price_units: Array<Option>;
    rate_cards: Array<Option>;
};

export type BusinessModelPayload = {
    title: string;
};

export type ServiceCategoryPayload = {
    title: string;
};

export type ServiceAreaPayload = {
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

export async function getServiceAreas() {
    const response = await get<ServiceArea[]>("service-areas");
    return response;
}

export async function createServiceArea(data: ServiceAreaPayload) {
    const response = await post("service-areas", data);
    return response;
}

export async function getRateCardOptions() {
    const response = await get<RateCardOptions>("options/rate-card");
    return response;
}

export async function getRateCards() {
    const response = await get<RateCard[]>("rate-cards");
    return response;
}

export async function getRateCard(id: number | string) {
    const response = await get<RateCard>(`rate-cards/${id}`);
    return response;
}

export async function createRateCard(data: Record<string, unknown>) {
    const response = await post("rate-cards", data);
    return response;
}
