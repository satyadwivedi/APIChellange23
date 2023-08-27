 const cloudRequest = require('@sap-cloud-sdk/http-client');
 const APIParser = require('./utils/APIParser');
 const fs = require('fs');

module.exports = (srv)=>{

  srv.on('*', 'books', req => {
        console.log('book called')
    })

    srv.on('*', 'Products', async req => {
        const oNorthBreze = await cds.connect.to('northbreeze')
        console.log('>>deligating to external service');
        console.log(req.query)
        //return oNorthBreze.run(req.query);
        let aProducts = await oNorthBreze.run(req.query);
        console.log('no of active products', aProducts.length)
        let totalStock = 0;
        for(key in aProducts) {
            totalStock = totalStock + aProducts[key].UnitsInStock;
        }
        console.log('totalStock', totalStock)

        const myServ  = await cds.connect.to (
               'myService',  
              options = {
                kind : 'rest',
                credentials : {
                  'url': `https://developer-challenge.cfapps.eu10.hana.ondemand.com/v1` //'https://dummy.restapiexample.com/api/v1/'
                }
              }
        ) 

        const result = await myServ.send({
          method: 'GET',
          path: `/hash(value='${totalStock}')`,
          headers: {CommunityID:'satya-dev'}
        })

        console.log('hash value of totalStock = ', result)


        const response = await cloudRequest.executeHttpRequest({
            url: `https://dummy.restapiexample.com/api/v1/employees`

        });

        // const response = await cloudRequest.executeHttpRequest(
        //     {
        //       url: "https://developer-challenge.cfapps.eu10.hana.ondemand.com/v1/hash(value='this')"
        //     },
        //     {
        //       method: 'get',
        //       params: {
        //         CommunityID: 'satya-dev'
        //       }
        //     }
        //   );

          console.log('response', response);

        return totalStock;

    })

    srv.on('calculateStock', async req => {

    })

    srv.on('mySelectProduct', async (req) => {
        console.log(req.data)
        let sCommunityID = req.data.communityID;
        // call remote odata service
        const oBreezeConn = await cds.connect.to('northbreeze');
        const sProductForMe = await oBreezeConn.send({
          method: 'POST',
          path : 'selectProduct',
          data: {communityid: sCommunityID }
        })
        console.log('Product For Me', sProductForMe)
    
        const sHash = await getHash(sProductForMe)
        console.log('mySelectProduct Hash', sHash) 
        return sHash;
      
    })

    getHash = async (sData) => {
        const myServ  = await cds.connect.to (
            'myService',  
            options = {
              kind : 'rest',
              credentials : {
                'url': `https://developer-challenge.cfapps.eu10.hana.ondemand.com/v1` 
              }
            }
        ) 

      const result = await myServ.send({
          method: 'GET',
          path: `/hash(value='${sData}')`,
          headers: {CommunityID:'satya-dev'}
        })

        console.log('Hashed data', result)

        return result;
    }


    srv.on('getAPIPaths', async (req) => {
      const fdata = await fs.readFile('./DateAndTime.json', 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        let aPaths = []
        const oAPIDetails = JSON.parse(data)
        let oPaths = oAPIDetails['paths'] 
        for(sPath in oPaths){
            if(Object.hasOwn(oPaths[sPath], 'get'))
              if(Object.hasOwn(oPaths[sPath]['get'], 'produces'))
                if(Object.hasOwn(oPaths[sPath]['get']['produces'][0]), 'application/json')
                    aPaths.push(sPath)
        }
        console.log('aPaths', aPaths);
        aPaths.sort(function(a,b){
            a = a.toUpperCase();
            b = b.toUpperCase();
            if(a < b)
              return -1
            else 
              return 1  
        })
        if(Object.hasOwn(aPaths, '/getCountryDateFormat')){
            
        }
        let sSortedAPIPaths = aPaths.join(':')
        console.log('sSortedAPIs', sSortedAPIPaths)
        const sHash = await getHash(sSortedAPIPaths)
        console.log('week 4 sHash', sHash)
       

    });    
    })
}