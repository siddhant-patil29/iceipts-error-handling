const Joi=require('joi');

module.exports={
    bidsValidates:(schema)=>{
        //console.log("in validation");
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }
         
    },
    schemas:{
        bidsSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            bidDate:Joi.string().required(),
            amount:Joi.number().required(),
            //bidBy:Joi.number().required(),
            bidFor:Joi.number().required(),
            notificationId:Joi.number().required(),
            returnPeriod:Joi.string().required(),
        }),
        craSchema: Joi.object().keys({
            //id: Joi.integer().required(),
            //customerId: Joi.number().required(),
            //retailerId: Joi.number().required(),
            balance: Joi.number().positive().required(),
            notificationAfter: Joi.string().required(),
            loyalty: Joi.string().required(),
            currency: Joi.string().required(),
            //isDeleted: Joi.boolean().required()
        }),
        feedbackSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            description:Joi.string().required(),
            rating:Joi.number().required(),
            //userId:Joi.number().required(),
           // notificationId:Joi.number().required(),
        }),
        recieptsSchema:Joi.object().keys({
            //id: Joi.integer().required(),
            vendor: Joi.string().required(),
            receiptCardBlobUrl: Joi.string(),
            createDate: Joi.string().required(),
            //tagId:Joi.number().required(),
            //customerId:Joi.number().required(),
            reimbursiblePeriod:Joi.number().required(),
            totalBill: Joi.number().required(),
            NoOfItems:Joi.number().required(),           
        }),
        serviceRequestSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            type:Joi.string().required(),
            description:Joi.string().required(),
            priority:Joi.number().required(),
            requestDate:Joi.string().required(),
            notification:Joi.string().required(),
            requestorId:Joi.number().required(),
            warrantryItem:Joi.number().required(),
        }),
        reimbursementsSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            //receiptId:Joi.number().required(),
            reimbursementPeriod:Joi.string().required(),
            notificationId:Joi.number().required(),
        }),
        rolesSchema:Joi.object().keys({
            roleName:Joi.string().required(),
        }),
        subscriptionsSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            type:Joi.string().required(),
            description:Joi.string().required(),
            rechargeOn:Joi.string().required(),
            validity:Joi.string().required(),
            free:Joi.number().required(),
            //notificationId:Joi.number().required(),
            //subscriberId:Joi.number().required(),
        }),
        transactionHistoriesSchema:Joi.object().keys({
            // id:Joi.integer().required(),//UUID type
             //customerId:Joi.string().required(),
             //retailerId:Joi.string().required(),
             //receiptsId:Joi.string().required(),
             transactionAmount:Joi.string().required(),
             paidAmount:Joi.number().required(),
            
         }),
         usersSchema: Joi.object().keys({
            //id:Joi.integer().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            mobileNumber:Joi.string().required(),
            name:Joi.string().required(),
            address:Joi.string().required(),
            district:Joi.string().required(),
            state:Joi.string().required(),
            pin:Joi.string().required(),
            gstin:Joi.string().required(),
            currency:Joi.string().required(),
            loyalty:Joi.string().required(),
            roleName:Joi.string().required()

        }),
        visitorsSchema:Joi.object().keys({
            emailId:Joi.string().required(),
        }),
        warrantiesSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            warrantyPeriodRemain:Joi.number().required(),
            //notificationId:Joi.number().required(),
        }),
        warrantyItemsSchema:Joi.object().keys({
            //id:Joi.integer().required(),
            //productId:Joi.number().required(),
            productName:Joi.string().required(),
            price:Joi.number().required(),
            warrantryPeriod:Joi.date().required(),
            returnPeriod:Joi.date().required(),
           // warrantryCard:Joi.blob().required(),
            receiptID:Joi.number().required(),
            //notificationId:Joi.number().required(),
            NoOfItems:Joi.number().required(),
        }),
        wishListSchema : Joi.object().keys({
            //id:Joi.number().required(),
            itemName:Joi.string().required(),
            budgetMin:Joi.number().required(),
            budgetMax:Joi.number().required(),
            wishlistedBy:Joi.number().required(),
            //notificationId:Joi.number().required()
        })

        
        
    },

    //crm function
    crmValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
    
   

    //feedback function
    feedbackValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
    

    //receipts function (not apply on receiptsRoute.js file because of )
    receiptValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
    

    //reimbrusement function
    reimbrusementValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //role function
    roleValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
    
    //serviceRequest function
    serviceValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   
    //subscription function
    subscriptionValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //tag function
    tagValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //transactionHistories function
    transactionHistoriesValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //users function
    userValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //visitor function
    visitorValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //warranties function
    warrantiesValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   

    //warrantyItem function
    warrantyItemValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
    

    //wishList function
    wishlistValidate:(schema)=>{
        return(req,res,next)=>{
            const result=Joi.validate(req.body,schema);
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value){req.value={};}
            req.value['body']=result.value;
            next();
        }   
    },
   


}