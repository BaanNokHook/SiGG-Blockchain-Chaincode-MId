
class OutputOnDbProperty {
    
    constructor() {
        this.status = null;
        this.message = null;
        this.data = null;
    }

    async Set(param1, param2, param3) {

        let status;
        let message;
        let data;

        let params = [param1, param2, param3];

        for(let i = 0; i < params.length; i++) {

            let param = params[i];

            if(typeof param === 'boolean') {

                status = param;
    
            }
            else if(typeof params[i] === 'string') {
    
                message = param;
    
            }
            else if(typeof params[i] === 'object') {
    
                data = param;
    
            }
        }
        
        if(status !== undefined) {

            this.status = status;
            this.message = message;
            this.data = data || [];

            if(status === true) {

                this.message = message || 'success';
            }
            else {
    
                this.message = message || 'fail';
            }
        }
    }
}

module.exports = OutputOnDbProperty;

