var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Seat Swap'});
}); 

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "szj9yv5s3zzv8448",
  publicKey: "t8gwb94d7x973mg9",
  privateKey: "e935cf7123b6c2eb05739c80ea1007cf"
});

router.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});


router.post("/checkout", function (req, res) {
	console.log(req.body)
	var nonceFromTheClient = req.body.payment_method_nonce;
	gateway.transaction.sale({
	  amount: req.body.amount,
	  paymentMethodNonce: nonceFromTheClient,
	  options: {
	    submitForSettlement: true
	  }
	}, function (err, result) {
		console.log(JSON.stringify(result));
		res.render('thanks', { title: 'Seat Swap' ,result: result ,seatNo: req.body.seat });
	});
});

module.exports = router;
