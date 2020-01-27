var Express = require("express");
var app = Express();

module.exports={
    paginate:function (req) {
        console.log("in util file..")
        var page=parseInt(req.query.pageNumber);
        var size=parseInt(req.query.pageSize);
        //var limit;
        //var offset;
        console.log("Utill..",page,size);
        let paginateObj;
        if(!page && !size)
        {
            paginateObj={
                "limit":0,
                "offset":0
                //offset:0
            }
        }
        else{
            paginateObj={
                "limit":1*size,
                "offset":(page-1)*size
                //offset:(page-1)*limit
            }
        }
        //console.log("utill paginate Obj..",paginateObj);
        return paginateObj;
    },
    pageValidate:function (reqObj) {
        var limit=reqObj.page.limit;
        var offset=reqObj.page.offset;
        console.log("util....",limit,offset)
        let queryObj;
        if(limit>0 && offset>=0){
            queryObj = {
                where: {"isDeleted":reqObj.isDeleted},
                "limit": limit,
                "offset": offset
                }
        }
        else{
            queryObj={
                where: {"isDeleted":reqObj.isDeleted}
            }
        }
        console.log("queryObject...",queryObj);
        return queryObj;
    }
}