import React, { Dispatch, SetStateAction } from "react";

export interface DeliveryType {
    email: string;
    phoneNumber: string;
    deliveryAddress: string;
    asDropshipper: boolean;
    dropshipperName?: string;
    dropshipperPhoneNumber?: string;
    dropshippingFee?: number;
}

interface DeliveryContextType {
    delivery: DeliveryType;
    setDelivery: Dispatch<SetStateAction<DeliveryType>>;
}

// set the defaults
const DeliveryContext = React.createContext<DeliveryContextType>({
    delivery: {
      email: '',
      phoneNumber: '',
      deliveryAddress: '',
      asDropshipper: false,
    },
    setDelivery: () => {}
});

export default DeliveryContext;
