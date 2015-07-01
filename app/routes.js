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
    app.route('/create/customer')
        .post(function (req, res){
            //test to see if is working first
            console.log(req.body);
        
            //create a new customer using the customer schema
            var newCustomer = new Customer();
        
            newCustomer.name = req.body.customername;
            newCustomer.contact.phone_home = req.body.phonehome;
            newCustomer.contact.phone_cell = req.body.phonecell;
            newCustomer.contact.phone_work = req.body.phonework;
            newCustomer.address.street = req.body.customeraddr1;
            newCustomer.address.unit = req.body.customeraddr2;
            newCustomer.address.city = req.body.customercity;
            newCustomer.address.state = req.body.customerstate;
            newCustomer.address.zip = req.body.customerzip;
            
            //magically save the customer in the cloud.. Ohh la la
            newCustomer.save(function(err){
                if(err)
                    throw err;
                
                //send json response to handle on the client side
            });
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

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
