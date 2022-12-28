
class ResultDataProperty {
    
    constructor() {
        this.resultStatus = null;
        this.resultCode = null;
        this.developerMessage = null;
        this.userMessage = null;
        this.moreInfo = null;
        this.resultData = null;
    }

    async Set(param1, param2, param3, param4) {

        let resultStatus;
        let resultCode;
        let resultData;
        let developerMessage;
        let userMessage;
        let moreInfo;

        let params = [param1, param2, param3, param4];

        for(let i = 0; i < params.length; i++) {

            let param = params[i];

            if(typeof param === 'boolean') {

                resultStatus = param;
    
            }
            else if(typeof param === 'number') {

                resultCode = param;
    
            }
            else if(typeof params[i] === 'object') {
    
                resultData = param;
    
            }
            else if(typeof params[i] === 'string') {
    
                moreInfo = param;
    
            }
        }

        if(resultCode !== undefined) {

            this.resultStatus = await this.SetResultStatus(resultStatus, resultCode);
            this.resultCode = resultCode;
            this.resultData = resultData || [];
            this.userMessage = await this.SetUserMessage(resultCode);
            this.developerMessage = await this.SetDeveloperMessage(resultCode);
            this.moreInfo = moreInfo || "";
        }
    }

    async SetResultStatus(resultStatus, resultCode) {

        if(resultStatus !== false && resultStatus !== true) {

            if((resultCode === 20000 || resultCode === 20200)) { 

                resultStatus = true; 
    
            }
            else {

                resultStatus = false; 

            }
        }

        return resultStatus;
    }

    async SetUserMessage(resultCode) {

        let userMessage = "";

        if(resultCode === 20000) { 

            userMessage = "The request has succeeded"; 

        }
        else if(resultCode === 20200) { 

            userMessage = "The request has been received"; 

        }
        else if(resultCode === 40000) { 

            userMessage = "The server could not understand the request"; 

        }
        else if(resultCode === 40400) { 

            userMessage = "Data not found"; 

        }
        else if(resultCode === 40401) { 

            userMessage = "Url not found"; 

        }
        else if(resultCode === 50000) {

            userMessage = "The server encountered an unexpected condition"; 

        }

        return userMessage;
    }

    async SetDeveloperMessage(resultCode) {

        let developerMessage = "";

        if(resultCode === 20000) { 

            developerMessage = "OK"; 

        }
        else if(resultCode === 20200) { 

            developerMessage = "Accepted"; 

        }
        else if(resultCode === 40000) { 

            developerMessage = "Bad Request"; 

        }
        else if(resultCode === 40400) { 

            developerMessage = "Data Not Found"; 

        }
        else if(resultCode === 40401) { 

            developerMessage = "Url Not Found"; 

        }
        else if(resultCode === 50000) {

            developerMessage = "System Error"; 

        }

        return developerMessage;
    }

    async GetResponseCode() {

        let resultCode = this.resultCode;

        let responseCode = 200;

        if(resultCode === 20000) { 

            responseCode = 200; 

        }
        else if(resultCode === 20200) { 

            responseCode = 202; 

        }
        else if(resultCode === 40000) { 

            responseCode = 400; 

        }
        else if(resultCode === 40400) { 

            responseCode = 404; 

        }
        else if(resultCode === 40401) { 

            responseCode = 404; 

        }
        else if(resultCode === 50000) {

            responseCode = 500; 

        }

        return responseCode;
    }
}

module.exports = ResultDataProperty;

