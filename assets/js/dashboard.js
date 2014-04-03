// -------------------------------------------------------------------
// Avocado Panel Custom JS/jQuery
// -------------------------------------------------------------------

// jQuery Waits for Document to Load
// -------------------------------------------------------------------
// URL: http://jquery.com
// -------------------------------------------------------------------

jQuery(document).ready(function() {
    $("#dialnumber").mask('999-999-9999',{placeholder:" "});
    $("#callerid").mask('999-999-9999',{placeholder:" "});
    
    
    
    if ($(".typeahead")[0]){

    $('.typeahead').typeahead({
        source: [ "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
                  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
                  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
                  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
                  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", 
                  "Colombi", "Comoros", "Congo (Brazzaville)", "Congo", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", 
                  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor (Timor Timur)", 
                  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", 
                  "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", 
                  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
                  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
                  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", 
                  "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
                  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
                  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
                  "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", 
                  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
                  "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
                  "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
                  "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", 
                  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
                  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
                  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe" 
                  ]
        }
    );

};
    
    
    
    
    
    
    
    //send invite code blcok
    $('#send-invite').click(function(){
        $('#invite-error-container').slideUp('fast').empty();
        var emailAddress = $('#invite-address').val();
        $.ajax({
                url: "/invite/request",
                type: "post",
                dataType: 'json', 
                data: {email: emailAddress},
                success: function(data, statusText){
                    console.log(data);
                    if(data.status === 'failed'){
                        console.log('showing alert');
                        $('<div class="alert alert-error">'+
                                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                '<i class="icon-remove-sign"></i> <b>Invite Failed:</b>' + data.errormessage + '.'+
                        '</div>').appendTo('#invite-error-container');
                        $('#invite-error-container').slideDown('slow');
                    }
                    else{
                       $('#invite').modal('toggle');
                       $('#invite-address').val('');
                       $('<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                '<i class="icon-ok-circle"></i> <b>Prank Successful:</b> Your prank will be dialed shortly.'+
                        '</div>').appendTo('#prank-message-container');
                        $('#invite-error-container').fadeIn('slow');
                        $('#invites-remaining').fadeOut('slow', function(){
                            $(this).empty();
                            $(this).html(data.newInviteNumber);
                        });
                        $('#invites-remaining').fadeIn('slow');
                        $('#main-message-container').slideUp('fast').empty();
                        $('<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                '<i class="icon-remove-sign"></i> Invite Success: your invite has been sent to <b>' + emailAddress + '</b>.'+
                        '</div>').appendTo('#main-message-container');
                        $('#main-message-container').slideDown('fast');
                    }
                },
                error:function(){
                    
                }
            });
            
      //$('#invite').modal('toggle');
    });
    
    //dial prank code block
    $('#dial').click(function(){
        event.preventDefault();
        $('#prank-message-container').hide();
        $('#prank-message-container').empty();
        var dialNumber = $('#dialnumber').val();
        var callerId = $('#callerid').val();
        
        dialNumber = $.trim(dialNumber.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-'));
        callerId = $.trim(callerId.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-'));
        
        console.log(dialNumber);
        console.log(callerId);
        if(dialNumber == callerId){
            $('<div class="alert alert-error">'+
                            '<button type="button" class="close" data-dismiss="alert">×</button>'+
                            '<i class="icon-remove-sign"></i> <b>Prank Failed:</b>  The Phone number and Caller ID must be different.'+
                    '</div>').appendTo('#prank-message-container');
                    $('#prank-message-container').fadeIn('slow');
        }
        else if((!$.isNumeric(dialNumber)) || (!$.isNumeric(callerId))){
            $('<div class="alert alert-error">'+
                            '<button type="button" class="close" data-dismiss="alert">×</button>'+
                            '<i class="icon-remove-sign"></i> <b>Prank Failed:</b> Please only insert numbers.'+
                    '</div>').appendTo('#prank-message-container');
                    $('#prank-message-container').fadeIn('slow');
        }
        else{
            prankCall();
        }
    });
    function prankCall(){
        var prankData = $('#prank-form').serialize();
        console.log(prankData);
        var dialNumber = $('#dialnumber').val();
        var callerId = $('#callerid').val();
        $.ajax({
                url: "/prank/submit/rickroll",
                type: "post",
                dataType: 'json', 
                data: {callerid: callerId, dialnumber: dialNumber},
                success: function(data, statusText){
                    if(data.status === 'failed'){
                        $('<div class="alert alert-error">'+
                            '<button type="button" class="close" data-dismiss="alert">×</button>'+
                            '<i class="icon-remove-sign"></i> <b>Prank Failed:</b>' + data.errormessage +
                    '</div>').appendTo('#prank-message-container');
                    $('#prank-message-container').fadeIn('slow');
                    }
                    else{
                       $('<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">×</button>'+
                                '<i class="icon-ok-circle"></i> <b>Prank Successful:</b> Your prank will be dialed shortly.'+
                        '</div>').appendTo('#prank-message-container');
                        $('#prank-message-container').fadeIn('slow');
                        $('#pranks-remaining').fadeOut('slow', function(){
                            $(this).empty();
                            $(this).html(data.pranksremaining);
                        });
                        $('#pranks-remaining').fadeIn('slow');
                    }
                },
                error:function(){
                    $('<div class="alert alert-error">'+
                            '<button type="button" class="close" data-dismiss="alert">×</button>'+
                            '<i class="icon-remove-sign"></i> <b>Prank Failed:</b> Error connecting to prank server.  Please try again later.' +
                    '</div>').appendTo('#prank-message-container');
                    $('#prank-message-container').fadeIn('slow');
                }
            });
    }
   



// Tabs (bootstrap)
// -------------------------------------------------------------------
// URL: http://twitter.github.io/bootstrap/javascript.html#tabs
// -------------------------------------------------------------------

    $('.tab-container a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    })





// Tooltip (bootstrap)
// -------------------------------------------------------------------
// URL: http://bootstrap.twitter.com
// -------------------------------------------------------------------

$("[rel='tooltip']").tooltip();

$("[rel='tooltip']").each(function( index ) {
  $(this).data('tooltip').options.placement = 'bottom';
});

// Chosen
// -------------------------------------------------------------------
// URL: http://harvesthq.github.io/chosen/
// -------------------------------------------------------------------

if ($("select")[0]){

  $("select").chosen({disable_search_threshold: 10});

};


// END: jQuery Waits for Document to Load
// -------------------------------------------------------------------
// URL: http://jquery.com
// -------------------------------------------------------------------

});

