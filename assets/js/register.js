
jQuery(document).ready(function() {   
    enableSubmitButton = false;
    validUser = false;
    validPassword = false;
    $("#username").bindWithDelay("keydown", checkValidUsername, 500);
    
    $('#password1').bindWithDelay("keydown", checkValidPassword, 1000);
    
    $('#password2').bindWithDelay("keydown", checkValidPassword2, 600);
    
    $('#register').click(function(event){
        $('#register-error-container').slideUp('fast').empty();
        event.preventDefault();
        var username = $('#username').val();
        var password1 = $('#password1').val();
        var password2 = $('#password2').val();
        var hash = $('#hash').val();
        $.ajax({
        url: "/invite/submit",
        type: "post",
        dataType: 'json', 
        data: {username: username, hash: hash, password1: password1, password2: password2},
        success: function(data, statusText){
            console.log(data);
            if(data.status === 'failed'){
                 $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
                '<i class="icon-bolt"></i>' + data.errormessage +
                '</div>').appendTo('#register-error-container');
            $('#register-error-container').slideDown('slow');
            }
            else{
                window.location.replace("http://prankforce.com/dashboard");
            }
        },
        error:function(){
            $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
                '<i class="icon-bolt"></i> Unable to connect to registration server right now, please try again later' +
                '</div>').appendTo('#register-error-container');
            $('#register-error-container').slideDown('slow');
            return false;
        }
  });
    });
    
    $("[rel='tooltip']").tooltip();

    $("[rel='tooltip']").each(function( index ) {
      $(this).data('tooltip').options.placement = 'bottom';
    });
});

function checkEnableSubmit(){
    if((validUser === true) && (validPassword === true)){
        $('#register').attr('disabled', false);
    }
    else{
        $('#register').attr('disabled', true);
    }
}

function checkValidPassword(){
    console.log('checking password');
  $('#register-error-container').empty();
  var password1 = $('#password1').val();
  var password2 = $('#password2').val();
  var password1Length = password1.length;
  
  if(password1Length <=6 ){
      validPassword = false;
      checkEnableSubmit();
       $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
            '<i class="icon-bolt"></i> Password should be at least 6 characters' +
            '</div>').appendTo('#register-error-container');
        $('#register-error-container').slideDown('slow');
        return false;
  }
  else if((password1 === password2)){
      validPassword = true;
      checkEnableSubmit();
  }
  else{
    $('#register-error-container').empty();
      checkEnableSubmit();
  }
    
}

function checkValidPassword2(){
    console.log('checking password');
  $('#register-error-container').empty();
  var password1 = $('#password1').val();
  var password2 = $('#password2').val();
  var password2Length = password2.length;
  
  if(password2Length <=6 ){
      validPassword = false;
       checkEnableSubmit();
       $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
            '<i class="icon-bolt"></i> Password should be at least 6 characters' +
            '</div>').appendTo('#register-error-container');
        $('#register-error-container').slideDown('slow');
        return false;
  }
  else if(password1 !== password2){
      validPassword = false;
      checkEnableSubmit();
      $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
            '<i class="icon-bolt"></i> Passwords should match' +
            '</div>').appendTo('#register-error-container');
        $('#register-error-container').slideDown('slow');
        return false;
  }
  else{
    validPassword = true;
      checkEnableSubmit();
    $('#register-error-container').empty();
  }
    
}



function checkValidUsername() {
  $('#register-error-container').empty();
  var username = $('#username').val();
  var usernameLength = username.length;
  var specialCharRegex = /^[a-zA-Z0-9- ]*$/;
  if(!specialCharRegex.test(username)){
      validUser = false;
      checkEnableSubmit();
      $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
            '<i class="icon-bolt"></i> No special characters allowed' +
            '</div>').appendTo('#register-error-container');
        $('#register-error-container').slideDown('slow');
        $('#username-success').fadeOut('fast', function(){
            $('#username-error').fadeIn('fast');
        });
        return false;
  }
  if((username === null) || ( usernameLength <=4 )){
       validUser = false;
       checkEnableSubmit();
       $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
            '<i class="icon-bolt"></i> Username should be at least 5 characters' +
            '</div>').appendTo('#register-error-container');
        $('#register-error-container').slideDown('slow');
        $('#username-success').fadeOut('fast', function(){
            $('#username-error').fadeIn('fast');
        });
        return false;
  }
  $.ajax({
        url: "/user/checkUserExists",
        type: "post",
        dataType: 'json', 
        data: {username: username},
        success: function(data, statusText){
            if(data.status === 'failed'){
                validUser = false;
                checkEnableSubmit();
                $('<div class="alert alert-error" style="margin-bottom:0px;"><button type="button" class="close" data-dismiss="alert">×</button>'+
                    '<i class="icon-bolt"></i>'+ data.errormessage +
		    '</div>').appendTo('#register-error-container');
                $('#register-error-container').slideDown('slow');
                $('#username-success').fadeOut('fast', function(){
                    $('#username-error').fadeIn('fast');
                });
            }
            else{
                validUser = true;
                $('#username-error').fadeOut('fast',function(){
                    $('#username-success').fadeIn('fast');
                });
                console.log(validUser);
                checkEnableSubmit();
            }
        },
        error:function(){
            
        }
  });
}
