
const shim = require('fabric-shim');
const util = require('util');

let ResultDataProperty = require('./BusinessData/ResultData/ResultDataProperty.js');

let PartyBillingEventController = new (require('./Controller/Billing/PartyBillingEvent/PartyBillingEventController.js'));
let ExchangeRateController = new (require('./Controller/Rule/ExchangeRate/ExchangeRateController.js'));
let PartyOfferingController = new (require('./Controller/Rule/PartyOffering/PartyOfferingController.js'));
let TimeToSecController = new (require('./Controller/Common/Convert/TimeToSec/TimeToSecController.js'));
let UnitToByteController = new (require('./Controller/Common/Convert/UnitToByte/UnitToByteController.js'));

class Chaincode {

    //===================== [START Chaincode request method ]====================//

    async Init(stub) {

        let ret = stub.getFunctionAndParameters();

        console.info(ret);

        console.info('=========== Instantiated Marbles Chaincode ===========');

        return shim.success();

    }

    async Invoke(stub) {

        console.info('Transaction ID: ' + stub.getTxID());

        console.info(util.format('Args: %j', stub.getArgs()));

        let ret = stub.getFunctionAndParameters();

        console.info(ret);

        let method = this[ret.fcn];

        if (!method) {

            console.error('No function of name:' + ret.fcn + ' found');

            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }

        try {

            let payload = await method(stub, ret.params, this);
            
            console.info(payload);
            
            return shim.success(payload);
        } 
        catch (err) {

            console.error(err.message)

            let resultData = new ResultDataProperty();
            
            await resultData.Set(50000, err.message);

            let resultJson = JSON.stringify(resultData);

            return shim.error(Buffer.from(resultJson, 'utf-8'));
        }
    }

    async HelpCheck(stub, args) {

        console.info('Help check method => Peer node Already');

        let resultData = new ResultDataProperty();

        await resultData.Set(20000, [{PEER_STATUS : 'Already', PEER_MESSAGE: 'Help check method => Peer node Already'}]);

        let resultJson = JSON.stringify(resultData);

        return Buffer.from(resultJson, 'utf-8'); 
            
    }

    //===================== [END Chaincode request method ]====================//
    
    async Request(stub, args) {

        if(args.length === 2) {

            let routerPath = args[0];

            console.info('Request Path => ' + routerPath);

            //=================== PartyBillingEventController =======================//

            if (routerPath === '/PartyBillingEventController/Search') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyBillingEventController.Search(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/PartyBillingEventController/Insert') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyBillingEventController.Insert(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/PartyBillingEventController/Update') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyBillingEventController.Update(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/PartyBillingEventController/Rate') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyBillingEventController.Rate(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }

            //=================== ExchangeRateController =======================//

            else if (routerPath === '/ExchangeRateController/Search') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await ExchangeRateController.Search(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/ExchangeRateController/Insert') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await ExchangeRateController.Insert(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/ExchangeRateController/Update') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await ExchangeRateController.Update(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }

            //=================== PartyOfferingController =======================//

            else if (routerPath === '/PartyOfferingController/Search') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyOfferingController.Search(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/PartyOfferingController/Insert') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyOfferingController.Insert(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/PartyOfferingController/Update') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await PartyOfferingController.Update(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            
            //=================== TimeToSecController =======================//

            else if (routerPath === '/TimeToSecController/Search') {
    
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await TimeToSecController.Search(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/TimeToSecController/Insert') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await TimeToSecController.Insert(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/TimeToSecController/Update') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await TimeToSecController.Update(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }

            //=================== UnitToByteController =======================//

            else if (routerPath === '/UnitToByteController/Search') {

                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await UnitToByteController.Search(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/UnitToByteController/Insert') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await UnitToByteController.Insert(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
            else if (routerPath === '/UnitToByteController/Update') {
                
                console.info('Calling Controller Path => ' + routerPath);
                
                let resultData = await UnitToByteController.Update(stub, args);

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }

            //=================== Url not found =======================//

            else {

                console.error('Url not found');

                let resultData = new ResultDataProperty();

                await resultData.Set(40401, 'Url not found');

                let resultJson = JSON.stringify(resultData);
    
                return Buffer.from(resultJson, 'utf-8'); 
            }
        }
        else {
            
            console.error('Incorrect number of arguments')

            let resultData = new ResultDataProperty();
            
            await resultData.Set(40000, 'Incorrect number of arguments');

            let resultJson = JSON.stringify(resultData);
    
            return Buffer.from(resultJson, 'utf-8'); 
        }
    }
};

shim.start(new Chaincode());
