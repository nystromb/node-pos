$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(document).ready(function () {
    $('#customer-form').formValidation({
        framework: 'bootstrap',
        excluded: [':disabled'],
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            customername: {
                validators: {
                    notEmpty: {
                        message: 'This field is required.'
                    },
                    stringLength: {
                        min: 2,
                        max: 16
                    }
                }
            },
            phonehome: {
                validators: {
                    notEmpty: {
                        message: 'This field is required.'
                    },
                    phone: {
                        country: "US",
                        message: "This is not a valid US phone number."
                    }
                },
            },
            phonecell: {
                validators: {
                    phone: {
                        country: "US",
                        message: "This is not a valid US phone number."
                    }
                }
            },
            phonework: {
                validators: {
                    phone: {
                        country: "US",
                        message: "This is not a valid US phone number."
                    }
                }
            },
            customeraddr1: {
                validators: {
                    notEmpty: {
                        message: "Please enter a street address."
                    }
                }
            },
            customercity: {
                validators: {
                    notEmpty: {
                        message: "Please enter a valid city."
                    },
                    stringLength: {
                        min: 2,
                        message: "Please enter a valid city."
                    }
                }
            },
            customerzip: {
                validators: {
                    zipCode: {
                        country: "US",
                        message: "Zip code must contain 5 digits."
                    }
                }
            }
        }
    
    });

});

$('#create-customer-btn').click(function (e) {
    e.preventDefault();
    console.log("Button Clicked");
    
    
});
