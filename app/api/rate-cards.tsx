import { get, post } from "~/api/base";

type MilestoneOption = {
    value: string;
    label: string;
};

type RateCardOptions = {
    milestones: Array<MilestoneOption>;
};

export async function getRateCardOptions() {
    const response = await get<RateCardOptions>("options/rate-card");
    return response;
}

export async function createRateCard(data: FormData) {
    const response = await post("rate-cards", data);
    return response;
}
