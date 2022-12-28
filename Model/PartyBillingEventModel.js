
let ExecutiveProperty = require('../../../BusinessData/Executive/ExecutiveProperty.js');

let ResultDataProperty = require('../../../BusinessData/ResultData/ResultDataProperty.js');

class PartyBillingEventModel {

    async Search(stub, dataItem) {

        console.info('Data Item => ');
        console.info(dataItem);

        let resultData = new ResultDataProperty();

        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyBillingEvent';

        let query = {
            selector: {
                BATCH_ID: { $regex: dataItem.BATCH_ID || '' },
                BATCH_NAME: { $regex: dataItem.BATCH_NAME || '' }, 
                RECORD_ID: { $regex: dataItem.RECORD_ID || '' },
                RECORD_STATE: { $regex: dataItem.RECORD_STATE || '' },
                VISIT_PLMN_CODE: { $regex: dataItem.VISIT_PLMN_CODE || '' },
                HOME_PLMN_CODE: { $regex: dataItem.HOME_PLMN_CODE || '' },
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

        try {

            console.info('Data Item => ');
            console.info(dataItem);

            let resultData = new ResultDataProperty();

            let executiveProperty = new ExecutiveProperty();

            let collection = 'PartyBillingEvent';
            
            let result = [];

            for(let i = 0; i < dataItem.RECORD_LIST.length; i++) {

                let item = dataItem.RECORD_LIST[i];

                let key = item.RECORD_ID;

                let schema = {
                    BATCH_ID: item.BATCH_ID,	
                    BATCH_NAME: item.BATCH_NAME,
                    RECORD_ID: item.RECORD_ID,
                    RECORD_STATE: item.RECORD_STATE,	
                    CHARGING_ID: item.CHARGING_ID,	
                    SERVICE: item.SERVICE,	
                    SERVICE_SUB_TYPE: item.SERVICE_SUB_TYPE,
                    IMSI: item.IMSI,	
                    MSISDN: item.MSISDN,		
                    VISIT_PLMN_CODE: item.VISIT_PLMN_CODE,		
                    LOCAL_TIME: item.LOCAL_TIME,		
                    LOCAL_TIME_ZONE: item.LOCAL_TIME_ZONE,		
                    DURATION: item.DURATION,	
                    APN: item.APN,
                    TOTAL_VOLUME: item.TOTAL_VOLUME,	
                    VOLUME_UPLOAD: item.VOLUME_UPLOAD,		
                    VOLUME_DOWNLOAD: item.VOLUME_DOWNLOAD,		
                    GGSN_IP: item.GGSN_IP,		
                    SGSN_IP: item.SGSN_IP,		
                    HOME_PLMN_CODE: item.HOME_PLMN_CODE,		

                    SDR_PRICE: item.SDR_PRICE,
                    LOCAL_PRICE: item.LOCAL_PRICE,
                    LOCAL_CURRENCY: item.LOCAL_CURRENCY,	
                    RATED_TIME: item.RATED_TIME,
                    
                    EXCHANGE_RATE_ID: item.EXCHANGE_RATE_ID,		
                    PARTYOFFERING_ID: item.PARTYOFFERING_ID,

                    CREATE_BY: item.CREATE_BY,
                    CREATE_DATE: item.CREATE_DATE,
                    UPDATE_BY: item.UPDATE_BY,	
                    UPDATE_DATE: item.UPDATE_DATE,
                    IS_ACTIVE: item.IS_ACTIVE	   
                };
                
                let outputOnDb = await executiveProperty.InsertPrivateData(stub, collection, key, schema);

                if(outputOnDb.status === true) {

                    result.push(outputOnDb.data);
                }
                else {

                    item.RECORD_STATE = 'Collected Fail';
                    result.push(item);
                }
            }

            await resultData.Set(20200, result);
        
            return resultData;
        }
        catch(err) {

            console.error(err.message);
            
            let resultData = new ResultDataProperty();

            await resultData.Set(50000);

            return resultData;
        }
    }

    async Update(stub, dataItem) {

        try {

            console.info('Data Item => ');
            console.info(dataItem);

            let resultData = new ResultDataProperty();

            let executiveProperty = new ExecutiveProperty();

            let collection = 'PartyBillingEvent';

            let result = [];

            for(let i = 0; i < dataItem.RECORD_LIST.length; i++) {

                let item = dataItem.RECORD_LIST[i];

                let key = item.RECORD_ID;

                let schema = {
                    RECORD_STATE: item.RECORD_STATE,	

                    PARTYOFFERING_ID: item.PARTYOFFERING_ID,
                    LOCAL_PRICE: item.LOCAL_PRICE,
                    LOCAL_CURRENCY: item.LOCAL_CURRENCY,

                    EXCHANGE_RATE_ID: item.EXCHANGE_RATE_ID,
                    SDR_PRICE: item.SDR_PRICE,
                    
                    RATED_TIME: item.RATED_TIME,

                    UPDATE_BY: item.UPDATE_BY,	
                    UPDATE_DATE: item.UPDATE_DATE 
                };
                
                let outputOnDb = await executiveProperty.FindOneUpdatePrivateData(stub, collection, key, schema);

                if(outputOnDb.status === true) {

                    result.push(outputOnDb.data);
                }
                else {

                    item.RECORD_STATE = 'Accepted Fail';
                    result.push(item);
                }
            }

            await resultData.Set(20200, result);
        
            return resultData;
        }
        catch(err) {

            console.error(err.message);
            
            let resultData = new ResultDataProperty();

            await resultData.Set(50000);

            return resultData;
        }
    }

    async GetRecord(stub, item) {

        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyBillingEvent';

        let key = item.RECORD_ID;
            
        let result = undefined;

        let outputOnDb = await executiveProperty.GetPrivateData(stub, collection, key);

        if(outputOnDb.status === true) {

            result = outputOnDb.data;
        }

        return result;
    }

    async GetPartyOffering(stub, record) {

        let executiveProperty = new ExecutiveProperty();

        let collection = 'PartyOffering';

        let localTime = record.LOCAL_TIME.toString();

        localTime = localTime.slice(0,4) + '-' + localTime.slice(4,6) + '-' + localTime.slice(6,8) + 'T' + localTime.slice(8,10) + ':' + localTime.slice(10,12) + ':' + localTime.slice(12,14) + '+00:00';

        let query = {
            selector: {
                SERVICE_TYPE: { $regex: record.SERVICE },
                //SERVICE_SUB_TYPE: { $regex: record.SERVICE_SUB_TYPE },
                SENDER: { $regex: record.VISIT_PLMN_CODE },
                RECIPIENT: { $regex: record.HOME_PLMN_CODE },
                EFFECTIVE_DATE: { $lte: localTime },
                EXPIRE_DATE: { $gte: localTime },
                IS_ACTIVE: true
            }
        };

        let result = undefined;

        let outputOnDb = await executiveProperty.GetPrivateDataQueryResult(stub, collection, query);

        if(outputOnDb.status === true) {

            result = outputOnDb.data[0];
        }

        return result;
    }

    async GetExchangeRate(stub, record, partyOffering) {

        let executiveProperty = new ExecutiveProperty();

        let collection = 'ExchangeRate';

        let localTime = record.LOCAL_TIME.toString();

        localTime = localTime.slice(0,4) + '-' + localTime.slice(4,6) + '-' + localTime.slice(6,8) + 'T' + localTime.slice(8,10) + ':' + localTime.slice(10,12) + ':' + localTime.slice(12,14) + '+00:00';

        let query = {
            selector: {
                CURRENCY: { $regex: partyOffering.UNIT_COST },
                EFFECTIVE_DATE: { $lte: localTime },
                EXPIRE_DATE: { $gte: localTime },
                IS_ACTIVE: true
            }
        };

        let result = undefined;

        let outputOnDb = await executiveProperty.GetPrivateDataQueryResult(stub, collection, query);

        if(outputOnDb.status === true) {

            result = outputOnDb.data[0];
        }

        return result;
    }

    async GetUnitToByteList(stub) {

        let executiveProperty = new ExecutiveProperty();

        let collection = 'UnitToByte';

        let query = {
            selector: {
                IS_ACTIVE: true
            }
        };

        let result = undefined;

        let outputOnDb = await executiveProperty.GetPrivateDataQueryResult(stub, collection, query);

        if(outputOnDb.status === true) {

            result = outputOnDb.data;
        }

        return result;
    }

    async Rate(stub, dataItem) {

        try {

            console.info('Data Item => ');
            console.info(dataItem);

            let resultData = new ResultDataProperty();

            let result = [];

            for(let i = 0; i < dataItem.RECORD_LIST.length; i++) {

                let item = dataItem.RECORD_LIST[i];
                
                let record = await this.GetRecord(stub, item);

                let partyOffering = await this.GetPartyOffering(stub, record);

                let exchangeRate = await this.GetExchangeRate(stub, record, partyOffering);

                let unitToByteList = await this.GetUnitToByteList(stub);

                if(record !== undefined && partyOffering !== undefined && exchangeRate !== undefined && unitToByteList !== undefined) {
                    
                    console.info();

                    //====== จำนวน volume ทั้งหมด ===========//
                    let totalVolume = Number(record.TOTAL_VOLUME);
    
                    console.info('Total volume: ' + totalVolume + ' byte');
    
                    //====== ราคาของ record ===========//
                    let cost = 0;
                    let sdr = 0;
    
                    //====== จำนวนทศนิยม =============//
                    let digit = 10;
    
                    let covertDoubleToIntByDigitCondition = async function(number) {
    
                        let newNumber = number * (Math.pow(10, digit));
                        
                        newNumber = Number(newNumber.toFixed(digit));
                        
                        return newNumber;
                    }
    
                    let covertIntToDoubleByDigitCondition = async function(number) {
    
                        let newNumber = number / (Math.pow(10, digit));

                        newNumber = Number(newNumber.toFixed(digit));

                        return newNumber;
                    }
    
                    console.info('Service: ' + record.SERVICE);
    
                    //============== Rate Data Logic ====================///
                    if(record.SERVICE === 'Data') {
    
                        //====== จำนวน block ทั้งหมด ===========//
                        let blockLength = partyOffering.VOLUME_PER_UNIT.length;
    
                        console.info('Condition block length: ' + blockLength);
    
                        //====== คำนวณ ที่ละ block ==========//
                        for(let blockIndex = 0; blockIndex < blockLength; blockIndex++) {
    
                            console.info();
    
                            console.info('Use calculation condition block(' + (blockIndex + 1) + ')');
    
                            //====== block ===========//
                            let block = partyOffering.VOLUME_PER_UNIT[blockIndex];
                            
                            console.info('Condition block: ' + block.VALUE + ' ' + block.UNIT + ' per ' + block.COST + ' ' + partyOffering.UNIT_COST);
    
                            //====== ส่วน ===========//
                            let valueBlockToByte = 0;
                            
                            for (let unitToByteIndex = 0; unitToByteIndex < unitToByteList.length; unitToByteIndex++) {
                
                                if(block.UNIT === unitToByteList[unitToByteIndex].UNIT_NAME) {
    
                                    valueBlockToByte = Number(block.VALUE) * Number(unitToByteList[unitToByteIndex].BYTE);
    
                                    console.info('Value block to byte: ' + valueBlockToByte + ' byte');
    
                                    break;
                                }
                            }
                            
                            //====== Calculation volume remain ===========//
                            let calculationVolumeRemain = async function() {
    
                                console.info();

                                console.info('Volume remain[' + totalVolume + '] < Value block[' + valueBlockToByte + ']');
    
                                console.info('Round: ' + partyOffering.ROUND_TYPE);
                                
                                let acceptBlock = async function() {
                                    
                                    console.info();

                                    console.info('Cost = Cost[' + cost + '] + Cost block[' + block.COST + ']');
        
                                    cost = await covertIntToDoubleByDigitCondition(await covertDoubleToIntByDigitCondition(cost) + await covertDoubleToIntByDigitCondition(Number(block.COST)));
    
                                    console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                                    
                                    console.info('Volume remain = 0');
    
                                    totalVolume = 0;
        
                                    console.info('Volume remain: ' + totalVolume + ' byte');
                                }
    
                                let rejectBlock = async function() {
                                    
                                    console.info();

                                    console.info('Cost = Cost[' + cost + '] + Cost block[0]');
    
                                    console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                                    
                                    console.info('Volume remain = 0');
                                    
                                    totalVolume = 0;
        
                                    console.info('Volume remain: ' + totalVolume + ' byte');                                
                                }
    
                                if(partyOffering.ROUND_TYPE === 'Up') {
    
                                    await acceptBlock();
                                }
                                else if(partyOffering.ROUND_TYPE === 'Down') {
                                    
                                    await rejectBlock();
                                }
                                else if(partyOffering.ROUND_TYPE === 'Math') {
                                    
                                    if(totalVolume / valueBlockToByte >= 0.5) {
    
                                        await acceptBlock();
                                    }
                                    else {
                                        
                                        await rejectBlock();
                                    }
                                }
                            }

                            //====== ถ้า volume มากกว่าหรือเท่ากับ block ===========//
                            if(totalVolume >= valueBlockToByte) {
                                
                                //====== ถ้าไม่ใช่ block สุดท้าย ===========//
                                if(blockIndex + 1 !== blockLength) {
    
                                    console.info('Volume remain[' + totalVolume + '] >= Value block[' + valueBlockToByte + ']');
    
                                    console.info('Cost = Cost[' + cost + '] + Cost block[' + block.COST + ']');
        
                                    cost = await covertIntToDoubleByDigitCondition(await covertDoubleToIntByDigitCondition(cost) + await covertDoubleToIntByDigitCondition(Number(block.COST)));
        
                                    console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                                    
                                    console.info('Volume remain = Volume remain[' + totalVolume + '] - Value block[' + valueBlockToByte + ']');
    
                                    totalVolume = totalVolume - valueBlockToByte;
        
                                    console.info('Volume remain: ' + totalVolume + ' byte');
                                }
                                //====== ถ้าใช่ block สุดท้าย ===========//
                                else if(blockIndex + 1 === blockLength) {
    
                                    console.info('Block count = Function Floor(Volume remain[' + totalVolume + '] / Value block[' + valueBlockToByte + '])');
    
                                    let blockCount = Math.floor(totalVolume / valueBlockToByte);
    
                                    console.info('Block count: ' + blockCount + ' block');
    
                                    console.info('Cost = Cost[' + cost + '] + Cost ' + blockCount + ' block[' + (Number(block.COST) * blockCount) + ']');
        
                                    cost = await covertIntToDoubleByDigitCondition(await covertDoubleToIntByDigitCondition(cost) + await covertDoubleToIntByDigitCondition(Number(block.COST) * blockCount));
        
                                    console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                                    
                                    console.info('Volume remain = Volume remain[' + totalVolume + '] - Value ' + blockCount + ' block[' + (valueBlockToByte * blockCount) + ']');
    
                                    totalVolume = totalVolume - (valueBlockToByte * blockCount);
        
                                    console.info('Volume remain: ' + totalVolume + ' byte');

                                    await calculationVolumeRemain();
                                }
                            }
                            
                            //====== ถ้า volume น้อยกว่า block ===========//
                            else if(totalVolume < valueBlockToByte) {

                                await calculationVolumeRemain();
                            }
    
                            //====== End calculation block ===========//
                            if(totalVolume === 0) {
    
                                blockIndex = blockLength;
                            }
                        } 
    
                        console.info();
    
                        console.info('End calculation block');
    
                        if(cost < partyOffering.MIN_CHARGE) {
    
                            console.info();
    
                            console.info('Cost[' + cost + '] < Min charge[' + partyOffering.MIN_CHARGE + ']');
    
                            console.info('Cost = Min charge[' + partyOffering.MIN_CHARGE + ']');
    
                            cost = Number(partyOffering.MIN_CHARGE);
    
                            console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                        }
                        else if(cost >= partyOffering.MIN_CHARGE) {
    
                            console.info();
    
                            console.info('Cost[' + cost + '] >= Min charge[' + partyOffering.MIN_CHARGE + ']');           
                            
                            console.info('next step . . .');
                        }
    
                        console.info();
    
                        console.info('Fixed charge: ' + partyOffering.FIXED_CHARGE + ' ' + partyOffering.UNIT_COST);
    
                        console.info('Cost = Cost[' + cost + '] + Fixed charge[' + partyOffering.FIXED_CHARGE + ']');
    
                        cost = await covertIntToDoubleByDigitCondition(await covertDoubleToIntByDigitCondition(cost) + await covertDoubleToIntByDigitCondition(Number(partyOffering.FIXED_CHARGE)));
    
                        console.info('Cost: ' + cost + ' ' + partyOffering.UNIT_COST);
                    }

                    console.info();
                    
                    console.info('SDR = ' + cost + ' / ' + exchangeRate.RATE);
                    
                    sdr = cost / Number(exchangeRate.RATE);

                    sdr = Number(sdr.toFixed(digit));
    
                    console.info('SDR: ' + sdr);
    
                    console.info();
    
                    record.RECORD_STATE = 'Rated';
    
                    record.PARTYOFFERING_ID = partyOffering.PARTYOFFERING_ID;
                    record.LOCAL_PRICE = cost;
                    record.LOCAL_CURRENCY = partyOffering.UNIT_COST;	
    
                    record.EXCHANGE_RATE_ID = exchangeRate.EXCHANGE_RATE_ID;	
                    record.SDR_PRICE = sdr;
                    
                    record.RATED_TIME = item.UPDATE_DATE;
    
                    record.UPDATE_BY = item.UPDATE_BY;
                    record.UPDATE_DATE = item.UPDATE_DATE;

                    result.push(record);

                }
                else {

                    item.RECORD_STATE = 'Rated Fail';
                    result.push(item);
                }
            };

            await resultData.Set(20200, result);
        
            return resultData;
        }
        catch(err) {

            console.error(err.message);
            
            let resultData = new ResultDataProperty();

            await resultData.Set(50000);

            return resultData;
        }
    }
}

module.exports = PartyBillingEventModel;