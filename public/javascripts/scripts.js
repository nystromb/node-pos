$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function phoneFormat(number){
    var p = number.toString();
    var result = "(" + p.substr(0,3) + ") " + p.substr(3,3) + " - " + p.substr(6,9);
    return result;
}
function printCustomer(data){
    var customerinfo = document.getElementById('customer-info');
        customerinfo.innerHTML += "<tbody>";
        customerinfo.innerHTML += "<tr><td style='font-weight:bold;'>Customer Name:</td><td>" + data.customer.name + "</td></tr>";
        customerinfo.innerHTML += "<tr><td style='font-weight:bold;'>Address: </td><td>" + data.customer.address.street + " " + data.customer.address.unit + "<br/>" + data.customer.address.city + ", " + data.customer.address.state + "<br/>" + data.customer.address.zip + "</td>" 
        customerinfo.innerHTML += "<tr><td style='font-weight:bold;'>Contact:</td><td>" + phoneFormat(data.customer.contact.phone_home) + " (Home)</td></tr>";
        customerinfo.innerHTML += "</tbody>";
    return customerinfo;
}

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
                    console.log('Great Success! Here is what we got to work with:');
                    
                    $('#customer-modal-form').modal('hide');
                    var messageDiv = document.getElementById('customermessage');
                    messageDiv.innerHTML += "<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Success!</strong> " + data.message + "</div>";
                    printCustomer(data);
                    
                    
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