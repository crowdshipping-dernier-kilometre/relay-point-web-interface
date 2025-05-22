// models mapping
// example of mapping function
export const mapParcelModel = (parcel) => {
    return {
        id: parcel.id,
        name: parcel.name,
        description: parcel.description,
        beginDate: parcel.beginDate,
        endDate: parcel.endDate,
        code: parcel.code,
    }
}


// data grid mapping
export const mapParcelForDataGrid = (parcel) => {
    const mapModel = mapParcelModel(parcel);
    return {
        id: mapModel.id,
        crowdshipperId: mapModel.crowdshipperId,
        recipientId: mapModel.recipientId,
        parcelSize: mapModel.parcelSize,
        parcelWeight: mapModel.parcelWeight,
        parcelVolume: mapModel.parcelVolume,
        parcelStatus: mapModel.parcelStatus,
    }
}