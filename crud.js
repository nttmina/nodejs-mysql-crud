'use strict'

const appError = require('bin/config.js').appError;


module.exports.find = async ( pTable, pUID = 0, pWhereClause = '', pEntity ) => {
    
    let results = {}
            
    try {
        if ( pUID > 0) {
            
            results = await global.db.query(`select * from ${pTable} WHERE UID = ${pUID}` );
        }
        else{
            
            if( pWhereClause !== ''){
                
                results = await global.db.query(`SELECT * FROM ${pTable} WHERE ${pWhereClause} ` );  
            }
            else{
                results = await global.db.query(`SELECT * FROM ${pTable}`);
            }
        }
        
    } 
    catch (err) {

        //Checking if the database is connected
        if(typeof err.fatal !== "undefined")
            throw new appError(appError.types.systemError, 5002, err.sqlMessage, "No database connection")
        else 
            throw new appError(appError.types.systemError, 4000, err.sqlMessage, err.sqlMessage)
   
        
    }
    

    return results;
}


module.exports.save = async (pAction, pTable, pFields, pUID=0, pWhereClause='') => {

    let results = {}
    
    try {
    
        if( pAction == 'insert' && pUID == 0) {
            
            results = await global.db.query(`INSERT INTO ${pTable} set ? `, pFields);

        }
        else{ //update
           
           if(pWhereClause !== ''){

               results = await global.db.query(`UPDATE ${pTable} set ? WHERE ${pWhereClause} `, pFields);
               
           }
            else{
                
               results = await global.db.query(`UPDATE ${pTable} set ? WHERE UID = ${pUID} `, pFields);
            }
            
        }
        
        return results;
        
    }
    
    catch(err) {
                
        //Checking if the database is connected
        if(typeof err.fatal !== "undefined")
            throw new appError(appError.types.systemError, 5002, err.sqlMessage, "No database connection")
        else {
            throw new appError(appError.types.systemError, 4000, err.sqlMessage, err.sqlMessage)
        }      
        
    }
    
     
     
}


module.exports.delete = async ( pTable, pUID = 0, pWhereClause = '', pEntity) => {
    
    let results = {}
            
    try {
        if ( pUID > 0) {
            results = await global.db.query(`DELETE FROM ${pTable} WHERE UID = ${pUID} LIMIT 1 ` );
            
        }
        else{ 
            
            if( pWhereClause !== ''){
           
                results = await global.db.query(`DELETE FROM ${pTable} WHERE ${pWhereClause} ` );  
            }
            
        }

    } 
    catch (err) {

        if(typeof err.fatal !== "undefined")
            throw new appError(appError.types.systemError, 5002, err.sqlMessage, "No database connection")
        else 
            throw new appError(appError.types.systemError, 4000, err.sqlMessage, err.sqlMessage)
    
        
    }

    return results;
    
}