
const httpStatus = require("http-status");
module.exports = {

	getExistsResult: function (result, res) {
		res.status(httpStatus.OK).json({ "status": false, error: result });
	},
	getSuccessResult: function (result, res) {
		let jsonmessage = (result && result.message) ? { "status": true, data: result, message: result.message } : { "status": true, data: result };
		res.status(httpStatus.OK).json(jsonmessage);
	},
	getMessageResult: function (response, message, res) {
		if(response?.length===1){
    //    const data = Object.assign({}, ...response);
	   res.status(httpStatus.OK).json({ "status": true, data: response, message: message });
		}
		else{
			res.status(httpStatus.OK).json({ "status": true, data: response, message: message });
		}
	},
	getNotExistsResult: function (response, res) {
		res.status(httpStatus.OK).json({ "status": false, message: response});
	},
	getBadRequestResult: function (result, res) {
		res.status(httpStatus.BAD_REQUEST).json({ "status": false, message: 'Bad request found' });
	},
	getNotFoundmessage: function (message, res) {
		res.status(httpStatus.NOT_FOUND).json({ "status": false, message: message });
	},
	getErrorResult: function (errResp, res) {
		res.status(httpStatus.OK).json({ "status": false, error: errResp.message ? errResp.message :  errResp});
	},
	getMessageResultPagination: function (response, message, res) {
		res.status(httpStatus.OK).json({ "status": true, data: response.rows, count:response.count, pages:response.pages, message: message ,basePath: response.basePath});
	},
	serverError: function (errResp, res) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ "status": false, message: "Internal server error"});
	}
}
