const Endpoint = {

    adminLogin : ['admin/login'],
    dashboard : ['admin/dashboard'],
    orderListZoneWise : ['admin/order-list-pickup-zone-wise-with-status?'],
    bulkOrderListZoneWise : ['admin/bulk-order-list-pickup-zone-wise-with-status?'],
    orderReceive : ['admin/change-order-status?'],
    bulkOrderReceive : ['admin/change-bulk-order-status?'],
    orderListDetailsBranchWise : ['admin/order-list-by-delivery-branch-with-status?'],
    assignOrderToPickUp : ['admin/assign-orders-to-pickup-van'],
    orderDetais : ['admin/order-details?'],
    getDeliveryMan : ['admin/delivery-officers?'],
    assignOrderToDeleveryMan : ['admin/assign-delivery-officer-to-orders'],

    appliedMarchant : ['admin/merchants?status='],
    approveMarchant :  ['admin/approve-merchant'],
    zone : ['zones'],
    branch : ['branches'],
    area : ['areas'],
    pickupEmployee : ['admin/pickup-officers'],
    addPickUpEmployee : ['admin/pickup-officers'],
    getPickUpEmoloyeeArea : ['admin/pickup-officer-area?id='],
    assignAreaToPickupEmployee : ['admin/assign-area-pickup-officers'],

    // marchant :
    getAllMerchant : ['admin/merchants'],
    postBulkOrder : ['admin/bulk-order'],
    findMarchantId : ['admin/get-merchant-by-mobile?mobile='],
    allBulkOrder : ['admin/bulk-order-list-with-status?status=0'],
    createOrder : ['admin/order'],
    weightRanges : ['weight-ranges'],

    // transport
    getVans : ['pickup-vans'],

    //branch 
    branchDashboard : ['admin/branch-admin-dashboard'],
    receiveInBranch : ['admin/branch-sack-barcode-order-status-update?'],

    //payment
    mechantGroupForPayment : ['admin/merchant-payable-group-wise'],
    individualMerchantDetails : ['admin/individual-merchant-payable?']



}

export default Endpoint;