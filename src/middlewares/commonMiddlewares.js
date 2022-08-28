const mid1 = function (req, res, next) 
{
    let data = req.headers.isfreeappuser
    if (data) {
        if (data === 'true') 
        {
            req.body.isFreeAppUser = true
            req.body.amount = 0
        } else if (data === 'false') 
        {
            req.body.isFreeAppUser = false
        }; next()
    
    } 
else if (!data) { res.send({ error: "the request is missing a mandatory header" })
 }
}



module.exports = { mid1 }