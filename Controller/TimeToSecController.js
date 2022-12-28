
let ResultDataProperty = require('../../../../BusinessData/ResultData/ResultDataProperty.js');

let Model = require('../../../../Model/Common/Convert/TimeToSec/TimeToSecModel.js');

class TimeToSecController {

    async Search(stub, args) {

        try {
        
            console.info('Args => ' + args[1].toString());

            let dataItem = JSON.parse(decodeURIComponent(args[1]));

            let model = new Model();

            let resultData = await model.Search(stub, dataItem);

            return resultData;
        }
        catch(err) {
            
            console.error(err.message);

            let resultData = new ResultDataProperty();
    
            await resultData.Set(40000, err.message);
            
            return resultData;
        }
    }

    async Insert(stub, args) {

        try {
        
            console.info('Args => ' + args[1].toString());

            let dataItem = JSON.parse(decodeURIComponent(args[1]));

            let model = new Model();

            let resultData = await model.Insert(stub, dataItem);

            return resultData;
        }
        catch(err) {
            
            console.error(err.message);

            let resultData = new ResultDataProperty();
    
            await resultData.Set(40000, err.message);
            
            return resultData;
        }
    }

    async Update(stub, args) {

        try {
        
            console.info('Args => ' + args[1].toString());

            let dataItem = JSON.parse(decodeURIComponent(args[1]));

            let model = new Model();

            let resultData = await model.Update(stub, dataItem);

            return resultData;
        }
        catch(err) {
            
            console.error(err.message);

            let resultData = new ResultDataProperty();
    
            await resultData.Set(40000, err.message);
            
            return resultData;
        }
    }
}

module.exports = TimeToSecController;