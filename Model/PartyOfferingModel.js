
let ExecutiveProperty = require('../../../BusinessData/Executive/ExecutiveProperty.js');

let ResultDataProperty = require('../../../BusinessData/ResultData/ResultDataProperty.js');

class PartyOfferingModel {

    async Search(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);

        let resultData = new ResultDataProperty();

        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyOffering';

        let query = {
            selector: {
                PARTYOFFERING_ID: { $regex: dataItem.PARTYOFFERING_ID || '' },
                PARTYOFFERING_NAME: { $regex: dataItem.PARTYOFFERING_NAME || '' },
                PROFILE_CHARGING: { $regex: dataItem.PROFILE_CHARGING || '' },
                SERVICE_TYPE: { $regex: dataItem.SERVICE_TYPE || '' },
                SERVICE_SUB_TYPE: { $regex: dataItem.SERVICE_SUB_TYPE || '' },
                SENDER: { $regex: dataItem.SENDER || '' },
                RECIPIENT: { $regex: dataItem.RECIPIENT || '' },
                IS_ACTIVE: true
            }
        };

        if(dataItem.EFFECTIVE_DATE) {
            query.selector.EFFECTIVE_DATE = { $lte: dataItem.EFFECTIVE_DATE };
        }
        
        if(dataItem.EXPIRE_DATE) {
            query.selector.EXPIRE_DATE = { $gte: dataItem.EXPIRE_DATE };
        }

        let result = await executiveProperty.GetPrivateDataQueryResult(stub, collection, query);

        if(result.status === true) {

            if(result.data.length > 0) {

                await resultData.Set(20000, result.data);
    
                return resultData;
            }
            else {

                console.error('Data not found');

                await resultData.Set(40400);
    
                return resultData;
            }
        }
        else {

            console.error(result.message);

            await resultData.Set(50000);

            return resultData;
        }
    }

    async Insert(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);

        let resultData = new ResultDataProperty();

        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyOffering';
        
        let key = dataItem.PARTYOFFERING_ID;

        let schema = {
            PARTYOFFERING_ID: dataItem.PARTYOFFERING_ID,
            PARTYOFFERING_NAME: dataItem.PARTYOFFERING_NAME,	
            PARTYOFFERING_DESC: dataItem.PARTYOFFERING_DESC,	

            PROFILE_CHARGING: dataItem.PROFILE_CHARGING,//volume,time	
            SERVICE_TYPE: dataItem.SERVICE_TYPE,	
            SERVICE_SUB_TYPE: dataItem.SERVICE_SUB_TYPE,	

            SENDER: dataItem.SENDER,	
            RECIPIENT: dataItem.RECIPIENT,	

            MIN_CHARGE: dataItem.MIN_CHARGE,
            FIXED_CHARGE: dataItem.FIXED_CHARGE,

            UNIT_COST: dataItem.UNIT_COST,
            ROUND_TYPE : dataItem.ROUND_TYPE,

            VOLUME_PER_UNIT: dataItem.VOLUME_PER_UNIT,

            TIME_PER_UNIT: dataItem.TIME_PER_UNIT,

            EFFECTIVE_DATE: dataItem.EFFECTIVE_DATE,	
            EXPIRE_DATE: dataItem.EXPIRE_DATE,	

            CREATE_BY: dataItem.CREATE_BY,
            CREATE_DATE: dataItem.CREATE_DATE,
            UPDATE_BY: dataItem.UPDATE_BY,	
            UPDATE_DATE: dataItem.UPDATE_DATE,
            IS_ACTIVE: dataItem.IS_ACTIVE	   
        };

        let result = await executiveProperty.InsertPrivateData(stub, collection, key, schema);

        if(result.status === true) {

            await resultData.Set(20200);

            return resultData;
        }
        else {

            console.error(result.message);

            await resultData.Set(50000);

            return resultData;
        }
    }

    async Update(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);
        
        let resultData = new ResultDataProperty();
        
        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyOffering';

        let key = dataItem.PARTYOFFERING_ID;

        let schema = {
            PARTYOFFERING_ID: dataItem.PARTYOFFERING_ID,
            PARTYOFFERING_NAME: dataItem.PARTYOFFERING_NAME,	
            PARTYOFFERING_DESC: dataItem.PARTYOFFERING_DESC,	

            PROFILE_CHARGING: dataItem.PROFILE_CHARGING,
            SERVICE_TYPE: dataItem.SERVICE_TYPE,
            SERVICE_SUB_TYPE: dataItem.SERVICE_SUB_TYPE,

            SENDER: dataItem.SENDER,
            RECIPIENT: dataItem.RECIPIENT,

            MIN_CHARGE: dataItem.MIN_CHARGE,
            FIXED_CHARGE: dataItem.FIXED_CHARGE,

            UNIT_COST: dataItem.UNIT_COST,
            ROUND_TYPE: dataItem.ROUND_TYPE,

            VOLUME_PER_UNIT: dataItem.VOLUME_PER_UNIT,
            TIME_PER_UNIT: dataItem.TIME_PER_UNIT,

            EFFECTIVE_DATE: dataItem.EFFECTIVE_DATE,
            EXPIRE_DATE: dataItem.EXPIRE_DATE,

            UPDATE_BY: dataItem.UPDATE_BY,
            UPDATE_DATE: dataItem.UPDATE_DATE,
        };

        let result = await executiveProperty.FindOneUpdatePrivateData(stub, collection, key, schema);

        if(result.status === true) {

            await resultData.Set(20200);

            return resultData;
        }
        else {

            console.error(result.message);

            await resultData.Set(50000);

            return resultData;
        }
    }
}

module.exports = PartyOfferingModel;