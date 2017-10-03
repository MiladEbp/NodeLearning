export function checkAuthentication(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/well');
        }else{
            res.redirect('/login');
        }
}