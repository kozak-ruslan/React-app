import find from 'lodash/find';

export default function recalculateTotal({supply, demand, qualityViewModel}){

    const totalQualityDemandSupply = [];

    qualityViewModel.forEach(q => {
        let _totalDemand = 0;
        let _totalSupply = 0;

        demand.forEach(d => {
            find(d.demandQuality, (demandQuality) => {
                if ( +demandQuality.qualityId === q.qualityId ) {
                  _totalDemand += demandQuality.demandCustom;
                }
            })
        });

        supply.forEach(s => {
            find(s.wagonSupplyQuality, (supplyQuality) => {
                if ( +supplyQuality.qualityId === q.qualityId ) {
                  _totalSupply += supplyQuality.companyWagonsCustom;
                }
            })
        });

        totalQualityDemandSupply.push({
            qualityId: q.qualityId,
            qualityName: q.qualityName,
            demand: _totalDemand,
            companyWagons: _totalSupply,
            diff: (_totalSupply - _totalDemand),
        });
        console.log(totalQualityDemandSupply);
    });

    return totalQualityDemandSupply;
}