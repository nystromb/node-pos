var Customer = require('./models/customer.js');
// app/routes.js
module.exports = function(app, passport) {
    
	// =====================================
	// HOME PAGE ===========================
	// =====================================
	app.route('/')
        .get(isLoggedIn, function(req, res) {
		  res.render('admin', { user: req.user });
	    });

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
    app.route('/login')
        .get(function(req, res){
            res.render('login', { message: req.flash('loginMessage') });
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        }));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
    app.route('/signup')
        .get(function(req, res){
            res.render('register', {message: req.flash('signupMessage')});
        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash: true
        }));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.route('/profile')
        .get(isLoggedIn, function(req, res) {
		  res.render('admin', { user : req.user });
	    });
    
	// =====================================
	// CREATE CUSTOMER ROUTE ===============
	// =====================================
    app.route('/create/:collection')
        .post(function (req, res){
            console.log(req.params);
            if(req.params.collection == "customer"){
                //create a new customer using the customer schema
                // should probably do some server side validation / checking
                // i'll get to that...
                console.log(req.body);
                var newCustomer = new Customer({
                    name: req.body.customername,
                    contact: {
                        phone_home: req.body.phonehome,
                        phone_cell: req.body.phonecell,
                        phone_work: req.body.phonework
                    },
                    address: {
                        street: req.body.customeraddr1,
                        unit: req.body.customeraddr2,
                        city: req.body.customercity,
                        state: req.body.customerstate,
                        zip: req.body.customerzip
                    }
                });
                
                //magically save the customer in the cloud.. Ohh la la
                newCustomer.save(function(err){
                    if(err)
                        throw err;

                    res.send(JSON.stringify({
                        message: "Customer has successfully been added.",
                        customer: newCustomer
                    }));
                });
            } //end if
        });

    // =====================================
	// AUTOCOMPLETE SEARCH ROUTING =========
	// =====================================
    app.route('/autocomplete/:collection')
        .get(function(req,res) {
            if(req.params.collection == "customer"){
                console.log('autocomplete hitting');
                Customer.find({}, function(err, user){
                    if (err)
                        throw err
                        
                    res.json(user);
                });
            }
        });
    
    
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.route('/logout')
        .get(function(req, res) {
		  req.logout();
		  res.redirect('/');
	    });
    
};

// route middleware to make sure user is authenticated
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
