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
	// LOGOUT ==============================
	// =====================================
	app.route('/logout')
        .get(function(req, res) {
		  req.logout();
		  res.redirect('/');
	    });
    
    // ====================================
    // INVENTORY ==========================
    //=====================================
    app.route('/inventory')
        .get(isLoggedIn, function(req, res){
            res.render('inventory', {user: req.user}
        );
    });
    
    // ====================================
    // DELIVERIES =========================
    //=====================================
    app.route('/deliveries')
        .get(isLoggedIn, function(req, res){
            res.render('deliveries', {user: req.user}
        );
    });
    
    // ====================================
    // ORDERS  ============================
    //=====================================
    app.route('/orders')
        .get(isLoggedIn, function(req, res){
            res.render('orders', {user: req.user});
    });
    
    
    // ====================================
    // INVOICES  ==========================
    //=====================================
    app.route('/invoice')
        .get(isLoggedIn, function(req, res){
            res.render('invoice', { user: req.user });
        
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