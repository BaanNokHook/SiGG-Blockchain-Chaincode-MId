
let ExecutiveProperty = require('../../../../BusinessData/Executive/ExecutiveProperty.js');

let ResultDataProperty = require('../../../../BusinessData/ResultData/ResultDataProperty.js');

class UnitToByteModel {

    async Search(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);

        let resultData = new ResultDataProperty();

        let executiveProperty = new ExecutiveProperty();

        let collection = 'UnitToByte';

        let query = {
            selector: {
                UNIT_ID: { $regex: dataItem.UNIT_ID || '' },
                UNIT_NAME: { $regex: dataItem.UNIT_NAME || '' },
                IS_ACTIVE: true
            }
        };

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

        let collection = 'UnitToByte';
        
        let key = dataItem.UNIT_ID;

        let schema = {
            UNIT_ID: dataItem.UNIT_ID,
            UNIT_NAME: dataItem.UNIT_NAME,	
            BYTE: dataItem.BYTE,	

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

        let collection = 'UnitToByte';

        let key = dataItem.UNIT_ID;

        let schema = {
            UNIT_NAME: dataItem.UNIT_NAME,	
            BYTE: dataItem.BYTE,	

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

module.exports = UnitToByteModel;