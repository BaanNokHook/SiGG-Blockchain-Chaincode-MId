
let OutputOnDbProperty = require('../../BusinessData/ResultData/OutputOnDbProperty.js');

class ExecutiveProperty {
    
    constructor() {

    }

    async GetPrivateData(stub, collection, key) {

        try {

            console.info('Collection => ');
            console.info(collection);

            console.info('Key => ');
            console.info(key);

            let bufferPrivateData = await stub.getPrivateData(collection, key)
            
            console.info('Buffer PrivateData => ');
            console.info(bufferPrivateData);

            let privateData = JSON.parse(JSON.stringify(bufferPrivateData));

            console.info('PrivateData => ');
            console.info(privateData);

            let bufferResult = Buffer.from(privateData.data);

            console.info('Buffer Result => ');
            console.info(bufferResult);
            
            let result = JSON.parse(bufferResult.toString('utf8'));

            console.info('Result => ');
            console.info(result);

            let outputOnDb = new OutputOnDbProperty();

            await outputOnDb.Set(true, result);

            return outputOnDb;
        }   
        catch(err) {

            console.error(err.message);

            let outputOnDb = new OutputOnDbProperty();

            await outputOnDb.Set(false, err.message);
            
            return outputOnDb;
        }
    }

    async GetPrivateDataQueryResult(stub, collection, query) {
        
        try {

            console.info('Collection => ');
            console.info(collection);

            console.info('Query => ');
            console.info(query);

            let outputOnDb = new OutputOnDbProperty();

            let resultIterator = await stub.getPrivateDataQueryResult(collection, JSON.stringify(query));

            console.info('Result Iterator => ');
            console.info(resultIterator);

            let result = [];

            while (true) {

                let res = await resultIterator.iterator.next();
                
                console.info('Res => ');
                console.info(res);

                if (res.value && res.value.value.toString()) {

                    let item = JSON.parse(res.value.value.toString('utf8'));

                    result.push(item);
                }

                if (res.done) {

                    console.info('End of data');

                    await resultIterator.iterator.close();

                    console.info('Result => ');
                    console.info(result);

                    await outputOnDb.Set(true, result);

                    return outputOnDb;
                }
            }
        }   
        catch(err) {

            console.error(err.message);

            let outputOnDb = new OutputOnDbProperty();
    
            await outputOnDb.Set(false, err.message);
            
            return outputOnDb;
        }
    }

    async InsertPrivateData(stub, collection, key, schema) {

        try {

            console.info('Collection => ');
            console.info(collection);

            console.info('Key => ');
            console.info(key);

            console.info('Schema => ');
            console.info(schema);

            let outputOnDb = new OutputOnDbProperty();
            
            await stub.putPrivateData(collection, key, Buffer.from(JSON.stringify(schema)));

            await outputOnDb.Set(true, schema);

            return outputOnDb;
        }   
        catch(err) {

            console.error(err.message);

            let outputOnDb = new OutputOnDbProperty();

            await outputOnDb.Set(false, err.message);
            
            return outputOnDb;
        }
    }

    async FindOneUpdatePrivateData(stub, collection, key, schema) {

        try {

            console.info('Collection => ');
            console.info(collection);

            console.info('Key => ');
            console.info(key);

            console.info('Schema => ');
            console.info(schema);

            let bufferPrivateData = await stub.getPrivateData(collection, key)
            
            console.info('Buffer PrivateData => ');
            console.info(bufferPrivateData);

            let privateData = JSON.parse(JSON.stringify(bufferPrivateData));

            console.info('PrivateData => ');
            console.info(privateData);

            let bufferResult = Buffer.from(privateData.data);

            console.info('Buffer Result => ');
            console.info(bufferResult);
            
            let schemaOld = JSON.parse(bufferResult.toString('utf8'));

            console.info('Schema Old => ');
            console.info(schemaOld);

            for (let [key, value] of Object.entries(schema)) {

                for (let [keyOld, valueOld] of Object.entries(schemaOld)) {

                    if(key === keyOld) {

                        schemaOld[keyOld] = schema[key] || null;

                        break;
                    }
                }
            }

            console.info('Schema New => ');
            console.info(schemaOld);
            
            let outputOnDb = new OutputOnDbProperty();
            
            await stub.putPrivateData(collection, key, Buffer.from(JSON.stringify(schemaOld)));

            await outputOnDb.Set(true, schemaOld);

            return outputOnDb;
        }   
        catch(err) {

            console.error(err.message);

            let outputOnDb = new OutputOnDbProperty();

            await outputOnDb.Set(false, err.message);
            
            return outputOnDb;
        }
    }
}

module.exports = ExecutiveProperty;

