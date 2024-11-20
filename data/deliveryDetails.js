export function getDeliveryDetails(deliveryOptionId){
    let deliveryOptionDetails;
    deliveryDetails.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOptionDetails = option;
        }
    });

    return deliveryOptionDetails || deliveryDetails[0];
}

export const deliveryDetails = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];