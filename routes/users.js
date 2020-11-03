const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../services/modals/Users');
const verifyToken = require('../services/middleware/verify-token');


router.post('/register',(req,res,next)=>{
  const {fullName,password,telephone} = req.body;
  if(!fullName || !password || !telephone){
    res.json({
      status: false,
      message: 'Lütfen Tüm alanları doldurunuz.'});
  }
  else if(telephone.length!=10){
    res.json({
      status: false,
      message: 'Lütfen telefonun numaranızı kontrol ediniz. Başında sıfır olmadan 10 hane olarak giriniz.'});
  }
	Users.findOne({telephone:telephone},(err,data)=>{
		if(data){
			res.json({
				status: false,
				message: 'Bu telefon numarasına ait zaten bir hesap bulunmakta.'});
		}else{
			bcrypt.hash(password,10).then((hash)=>{
				const New = new Users({
          fullName,
          telephone,
					password:hash
				});
				const promise = New.save();
				promise.then((data)=>{
					res.json({
            status: true,
            message: 'Kullanıcı başarıyla oluşturuldu.'
          });
				}).catch((err)=>{
          res.json({
            status: false,
            message: 'Kullanıcı oluşturulamadı, tekrar deneyiniz.'
          });
				})
			});
		}
	})
});

router.post('/login', (req, res) => {
	const { telephone, password } = req.body;
	Users.findOne({telephone}, (err, Users) => {
    if(!Users){
      res.json({
        status: false,
        message: 'Telefon numarasına ait kullanıcı bulunamadı.'
      });
    }else{
          const user_id=Users._id;
          bcrypt.compare(password, Users.password).then((result) => {
            if (result){
              const token = jwt.sign({user_id:Users._id}, req.app.get('api_key'));
              res.json({status:true, token, user_id})
            }else{
              res.json({
                status: false,
                message: 'Doğrulama hatası, hatalı parola.'
              });
                    }
                })
    }
    })
});


module.exports = router;
