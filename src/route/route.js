const express = require('express');
const { bulkdata, getData, updateData, getDataById, deleteById } = require('../controller/controller');
const router = express.Router();


/------------Data Routes--------------------/
router.post('/bulkData', bulkdata);
router.get('/getAllData', getData );
router.get('/getDataById/:id', getDataById); 
router.put('/updateData/:id', updateData); 
router.delete('/deleteById/:id', deleteById)



module.exports=router;