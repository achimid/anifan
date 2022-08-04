const userService = require('../user/user-service')

var auth = async (req, res, next) => {
    var start = now('milli')

    const uuid = req.headers['x-anifan-user-uuid']
    req._userUuid = uuid
    
    if (uuid && uuid != 'undefined' && uuid != 'null') {
      try {
        req._user = await userService.findById(uuid)        
      } catch (error) {
        console.error("Erro ao buscar user", error)
      }
    }

    var end = now('milli')
    console.log(`Find user from request header: ${(end - start).toFixed(3)} ms`)
        
    next()
}

const now = (unit) => {
    const hrTime = process.hrtime();

    switch (unit) {
      
      case 'milli':
        return hrTime[0] * 1000 + hrTime[1] / 1000000
        
      case 'micro':
        return hrTime[0] * 1000000 + hrTime[1] / 1000;
        
      case 'nano':
      default:
        return hrTime[0] * 1000000000 + hrTime[1];
    }    
  };

module.exports = auth