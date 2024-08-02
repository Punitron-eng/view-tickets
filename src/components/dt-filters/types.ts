export interface WarehouseObject {
    id: number,
    value: string
}

export interface ShipmentDetails {
    applied_weight: number,
    order_value: number,
    height: number,
    width: number,
    length: number,
    pickup_from: string
}

export interface CardData {
    id: number,
    logistic: {
        svg_logo: string,
        name: string
    },
    courier_mode: string,
    progress: number,
    itl_bill_with_gst: number,
    freight_charges: number,
    cod_charge: number,
    logistics_rating_percentage: number,
    pickup_performance_rating: number,
    delivery_performance_rating: number,
    same_day_pickup: boolean,
    estimated_delivery_time: string
}

export interface DataObject {
    insurance_premium_amount: number,
    vendor_user_id: number,
    shipment_details: ShipmentDetails,
    warehouse_data_array: Array<WarehouseObject>,
    card_data: Array<CardData>
}