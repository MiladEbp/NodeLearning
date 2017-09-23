import {userModel} from '../model/user'

export class Check {

    checkNull(username:string, password:string, next:any){

        if(!username || !password){
            next(false);
        }else{
            next(true);
        }
    }// checkNull Function




    checkCollection(username:string, password:string, next:any){

        userModel(function(err, result){
            if(err){
                console.log("function useModel is error");
            }else{
                result.findOne({username: username, password: password}, function(err, result){
                    if(err){
                        console.log("findOne function is Error");
                    }else{
                        if(!result){
                            next(false, null);
                        }else{
                            next(null,result);
                        }//else
                    }// else
                });// findOne
            }//else
        });

    }//checkCollection function
}// class


