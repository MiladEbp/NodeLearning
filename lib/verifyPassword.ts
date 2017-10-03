import * as bCrypt from 'bcrypt';

export function verifyPassword(user,password, next){
    bCrypt.compareSync(password, user.password, function(err){

        if(err){
            return next(false);
        }else{
            return next (true);
        }

    });

}
verifyPassword('milad', 'admin', function(err){
        console.log(err);
});