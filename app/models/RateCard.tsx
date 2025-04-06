export type BusinessModel = {
    id: number;
    title: string;
};

export type ServiceCategory = {
    id: number;
    title: string;
};

export type ServiceArea = {
    id: number;
    title: string;
};

export type RateCard = {
    id: number;
    milestone: string;
    title: string;
    price: number;
    default_amount: number;
    is_recurring: boolean;
    is_latest: boolean;
    business_model: BusinessModel;
    service_categories: ServiceCategory[];
    service_areas: ServiceArea[];
    price_unit: string;
    include_rate_cards: RateCard[];
};
