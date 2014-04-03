jQuery(document).ready(function() {
    $('#recordingTable').dataTable();
    
    $('.modal-footer').on('click', '.save-recording-data', function(){
        var recordingId = $(this).attr('recordingid');
        var description = $('#description-' + recordingId).val();
        console.log('clicked: ' + recordingId);
        console.log('description: ' + description);
        updateDescription(recordingId, description);
        $('#' + recordingId).modal('toggle');
    });
    
    $('.modal-header').on('click', '.recording-title', function(){
       var recordingTitleObject = $(this);
       var recordingId = recordingTitleObject.attr('recordingid');
       console.log('clicked on id: ' + recordingId);
       $(this).fadeOut('fast', function(){
           $('#filename-input-' + recordingId).fadeIn('fast').focus();
       });
    });
    
    $('.modal-header').on('keypress', '.file-name-input', function(event){
        if(event.which === 13) {
            var fileNameInput = $(this);
            var recordingId = $(this).attr('recordingid');
            var newTitle = fileNameInput.val();
            updateTitle(recordingId, newTitle, fileNameInput);
        }
    });
    
    $('.modal-header').on('blur', '.file-name-input', function(){
        var fileNameInput = $(this);
        var newTitle = fileNameInput.val();
        var recordingId = fileNameInput.attr('recordingid');
        updateTitle(recordingId, newTitle, fileNameInput);
        
    });
    
    $(document).on('click', '.share', function(){
        console.log('share');
        var recordId = $(this).attr('recordingid');
        var sharedIcon = $(this);
        $.ajax({
                url: "/recordings/share",
                type: "post",
                dataType: 'json', 
                data: {recordingid: recordId},
                success: function(data, statusText){
                    console.log(data);
                    if(data.status === 'success'){
                        $(sharedIcon).fadeOut('fast', function(){
                            $(sharedIcon).css('color', 'goldenrod');
                            $(sharedIcon).removeClass('share');
                            $(sharedIcon).addClass('unshare');
                            $(sharedIcon).fadeIn('fast');
                        });
                    }
                },
                error:function(){
                    
                }
            });
    });
    
    $(document).on('click', '.unshare', function(){
        console.log('unshare');
        var recordId = $(this).attr('recordingid');
        var sharedIcon = $(this);
        $.ajax({
                url: "/recordings/unshare",
                type: "post",
                dataType: 'json', 
                data: {recordingid: recordId},
                success: function(data, statusText){
                    console.log(data);
                    if(data.status === 'success'){
                        $(sharedIcon).fadeOut('fast', function(){
                            $(sharedIcon).css('color', '#cacaca');
                            $(sharedIcon).removeClass('unshare');
                            $(sharedIcon).addClass('share');
                            $(sharedIcon).fadeIn('fast');
                        });
                    }
                },
                error:function(){
                    
                }
            });
    });
    $('.data-table').on('click', '.icon-thumbs-up', function(){
        var thumbsUpIcon = $(this);
        var recordingId = $(this).attr('recordingid');
        var totalVoteDomObject = $('#recording-total-votes-' + recordingId);
        $.ajax({
                url: "/vote/recording",
                type: "post",
                dataType: 'json', 
                data: {recordingid: recordingId, vote: 'up'},
                success: function(data, statusText){
                    console.log(data);
                    if(data.status === 'success'){
                        thumbsUpIcon.animate({
                            color: '#c33c09'
                        }, 500);
                        $('#vote-down-' + recordingId).animate({
                            color: '#cacaca'
                        }, 500);
                        totalVoteDomObject.fadeOut('fast', function(){
                            totalVoteDomObject.html(data.totalvotes);
                            totalVoteDomObject.fadeIn('fast');
                        });
                    }
                    
                },
                error:function(){
                    
                }
            });
    });
    
    
    $('.data-table').on('click', '.icon-thumbs-down', function(){
        var thumbsDownIcon = $(this);
        var recordingId = $(this).attr('recordingid');
        var totalVoteDomObject = $('#recording-total-votes-' + recordingId);
        $.ajax({
                url: "/vote/recording",
                type: "post",
                dataType: 'json', 
                data: {recordingid: recordingId, vote: 'down'},
                success: function(data, statusText){
                    console.log(data);
                    if(data.status === 'success'){
                        thumbsDownIcon.animate({
                            color: '#7894bf'
                        }, 500);
                        $('#vote-up-' + recordingId).animate({
                            color: '#cacaca'
                        }, 500);
                        totalVoteDomObject.fadeOut('fast', function(){
                            totalVoteDomObject.html(data.totalvotes);
                            totalVoteDomObject.fadeIn('fast');
                        });
                    };
                    
                },
                error:function(){
                    
                }
            });
    });
    
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
    
    
    // Tooltip (bootstrap)
    // -------------------------------------------------------------------
    // URL: http://bootstrap.twitter.com
    // -------------------------------------------------------------------

    $("[rel='tooltip']").tooltip();

    $("[rel='tooltip']").each(function( index ) {
      $(this).data('tooltip').options.placement = 'bottom';
    });

});


function updateTitle(recordingId, title, inputObject){
    inputObject.fadeOut('fast',function(){
        $('#filename-' + recordingId).html(title);
        $('#filename-' + recordingId).fadeIn('fast');
        $.ajax({
            url: "/recordings/update/title",
            type: "post",
            dataType: 'json', 
            data: {recordingid: recordingId, data: title},
            success: function(data, statusText){
                console.log(data);
                if(data.status === 'success'){
                    $('#table-recording-title-' + recordingId).fadeOut('fast', function(){
                        $('#table-recording-title-' + recordingId).html(title);
                        $('#table-recording-title-' + recordingId).fadeIn('fast');
                    });
                }
            },
            error:function(){

            }
        });
    });
}

function updateDescription(recordingId, description){
    $('#description-' + recordingId).val(description);
    $.ajax({
        url: "/recordings/update/description",
        type: "post",
        dataType: 'json', 
        data: {recordingid: recordingId, data: description},
        success: function(data, statusText){
            console.log(data);
            if(data.status === 'success'){
                
            }
        },
        error:function(){

        }
    });
}