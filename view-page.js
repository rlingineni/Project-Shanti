$(document).ready(function() {

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('.submit_email_subscribe').submit(function(ev) {
        ev.preventDefault(); // to stop the form from submitting

        if (validateEmail($(".email_address_field").val()))
        {
            // Create the conversion record using ajax
            var pageview = $("#pageview_id").val();
            var page = $("#page_id").val();

            if ($.isNumeric(pageview))
            {
                var full_url = getFullHostName() + '/ajax/create_conversion/' + pageview + '/' + page;
                var current_form = this;

                // This will create the actual conversion
                $.ajax({url: full_url,
                    success: function(result)
                    {
                        if (result['status'] === 'error')
                        {
                            alert ('The following error occured: ' + result['message']);
                        }
                        else
                        {
                            current_form.submit();
                        }
                    },
                    error: function() {
                        alert('There was an error registering the conversion.')
                    }
                });
            }
        }
        else
        {
            alert ('Email address is not valid');
        }
    });

});