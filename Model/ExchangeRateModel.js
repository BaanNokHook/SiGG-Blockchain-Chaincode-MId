
let ExecutiveProperty = require('../../../BusinessData/Executive/ExecutiveProperty.js');

let ResultDataProperty = require('../../../BusinessData/ResultData/ResultDataProperty.js');

class ExchangeRateModel {

    async Search(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);

        let resultData = new ResultDataProperty();

        let executiveProperty = new ExecutiveProperty();

        let collection = 'ExchangeRate';

        let query = {
            selector: {
                EXCHANGE_RATE_ID: { $regex: dataItem.EXCHANGE_RATE_ID || '' },
                CURRENCY: { $regex: dataItem.CURRENCY || '' },
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

        let collection = 'ExchangeRate';
        
        let key = dataItem.EXCHANGE_RATE_ID;

        let schema = {
            EXCHANGE_RATE_ID: dataItem.EXCHANGE_RATE_ID,
            CURRENCY: dataItem.CURRENCY,	
            RATE: dataItem.RATE,	

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

        let collection = 'ExchangeRate';

        let key = dataItem.EXCHANGE_RATE_ID;

        let schema = {
            CURRENCY: dataItem.CURRENCY,	
            RATE: dataItem.RATE,	
            EFFECTIVE_DATE: dataItem.EFFECTIVE_DATE,	
            EXPIRE_DATE: dataItem.EXPIRE_DATE,	
 
            UPDATE_BY: dataItem.UPDATE_BY,	
            UPDATE_DATE: dataItem.UPDATE_DATE
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

module.exports = ExchangeRateModel;