$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var formIsValid = false;

var options = {
        excluded: [':disabled'],
        onSuccess: function (e){
            console.log('onSuccess: form is valid');
            
            var $form = $(e.target),
                fv    = $form.data('formValidation');
            
            $.ajax({
                url: '/create/customer',
                type: 'POST',
                dataType: 'json',
                data: $form.serialize(),
                success: function(data) {
                    console.log('Great Success!');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('Something went wrong.');
                }
            });
        },
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
                        message: 'At least one phone number is required.'
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
                    notEmpty: {
                        message: "Please enter a zip code."
                    },
                    zipCode: {
                        country: "US",
                        message: "Zip code must contain 5 digits."
                    }
                }
            }
        }
};

$(document).ready(function () {
    //validate form on click
    $('#create-customer-btn').on('click', function (e) {
        $('#customer-form').formValidation(options);
    });
    
    //reset form when modal is hidden
    $('#customer-modal-form').on('hidden.bs.modal', function() {
        $('#customer-form').formValidation('resetForm', true);
    });
    
});