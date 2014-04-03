<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>simpleurl.co - A simple url shortener</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Styles -->
	<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
  	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,600,300' rel='stylesheet' type='text/css'> 
	<style type="text/css">
		body { padding-top: 102px; }
                #errorContainer{ position:absolute; width:300px; height:36px;}
                .control-group{margin-top: 30px;}
                
                /* CUSTOMIZE THE NAVBAR-------------------------------------------------- */

                /* Special class on .container surrounding .navbar, used for positioning it into place. */
                .navbar-wrapper {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  z-index: 10;
                  margin-top: 20px;
                  margin-bottom: -90px; /* Negative margin to pull up carousel. 90px is roughly margins and height of navbar. */
                }
                .navbar-wrapper .navbar {

                }

                /* Remove border and change up box shadow for more contrast */
                .navbar .navbar-inner {
                  border: 0;
                  -webkit-box-shadow: 0 2px 10px rgba(0,0,0,.25);
                     -moz-box-shadow: 0 2px 10px rgba(0,0,0,.25);
                          box-shadow: 0 2px 10px rgba(0,0,0,.25);
                }

                /* Downsize the brand/project name a bit */
                .navbar .brand {
                  padding: 14px 20px 16px; /* Increase vertical padding to match navbar links */
                  font-size: 16px;
                  font-weight: bold;
                  text-shadow: 0 -1px 0 rgba(0,0,0,.5);
                }

                /* Navbar links: increase padding for taller navbar */
                .navbar .nav > li > a {
                  padding: 15px 20px;
                }

                /* Offset the responsive button for proper vertical alignment */
                .navbar .btn-navbar {
                  margin-top: 10px;
                }

	</style>
	<link href="assets/css/bootstrap-responsive.css" rel="stylesheet">
	
	<!-- JavaScript/jQuery, Pre-DOM -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
        <script type="text/javascript">
            jQuery(document).ready(function() {
                $('#errorContainer').hide();
                $('#submitLink').click(function(event){
                    event.preventDefault();
                    $('#errorContainer').stop();
                    if($('#errorContainer').is(':visible')){
                        $('#errorContainer').slideUp('fast').empty();
                    }
                    var url = $('#urlInput').val();
                    if(!isUrl(url)){
                        $('<div class="alert alert-error">'
                         +'<a class="close" data-dismiss="alert">×</a>'
                         +'<i class="icon icon-warning-sign"></i> <b>Error</b> Invalid URL, try again'
                         +'</div>').appendTo('#errorContainer');
                        $('#errorContainer').slideDown('fast');
                    }
                    $.ajax({
                        url: "/url/submit",
                        type: "post",
                        dataType: 'json', 
                        data: {url: url},
                        success: function(data, statusText){
                            if(data.status === "success"){
                                $('<div class="alert alert-success">'
                                +'<a class="close" data-dismiss="alert">×</a>'
                                +'<i class="icon icon-thumbs-up-alt"></i> <b>Short Url: </b><a href="' + data.short_url + '">' + data.short_url + '</a>'
                                +'</div>').appendTo('#errorContainer');
                               $('#errorContainer').slideDown('fast');
                            }

                        },
                        error:function(){

                        }
                    });
                });
                
                $('#clearLink').click(function(event){
                    event.preventDefault();
                    $('#errorContainer').stop();
                    $('#errorContainer').slideUp('fast').empty();
                    $('#urlInput').val('');
                });
                function isUrl(s) {
                    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                    return regexp.test(s);
                }
            });
        </script>

</head>

<body>
        <div class="navbar-wrapper">
            <!-- Wrap the .navbar in .container to center it within the absolutely positioned parent. -->
            <div class="container">

              <div class="navbar navbar-inverse">
                <div class="navbar-inner">
                  <!-- Responsive Navbar Part 1: Button for triggering responsive navbar (not covered in tutorial). Include responsive CSS to utilize. -->
                  <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="brand" href="http://simpleurl.co/">URL Shortner</a>
                  <!-- Responsive Navbar Part 2: Place all navbar contents you want collapsed withing .navbar-collapse.collapse. -->
                  <div class="nav-collapse collapse">
                    <ul class="nav">
                      <li class="active"><a href="http://burnsforcedevelopment.com/">Home</a></li>
                      <li><a href="#about">Source</a></li>
                      <li><a href="http://www.linkedin.com/in/burnsforce">Contact</a></li>
                      <!-- Read about Bootstrap dropdowns at http://twbs.github.com/bootstrap/javascript.html#dropdowns -->
                      <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Projects <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                          <li><a href="http://simpleurl.co">URL Shortener</a></li>
                          <li><a href="http://burnsforcedevelopment.com/linkbaitgenerator/">Link Bait Generator</a></li>
                          <li><a href="http://chat.burnsforcedevelopment.com/">Web Sockets Chat</a></li>
                          <li><a href="http://burnsforcedevelopment.com/citysay/">Kansas City Says</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div><!--/.nav-collapse -->
                </div><!-- /.navbar-inner -->
              </div><!-- /.navbar -->

            </div> <!-- /.container -->
    </div><!-- /.navbar-wrapper -->
    
	<!-- Content Container -->
	<div class="container">
            <form class="form-signin form-horizontal">
                <div class="top-bar">
                <h3><i class="icon-leaf"></i>Submit a link</h3>
                <div><a href="#" class="top-bar-minimize" rel="tooltip" title="" data-original-title="Minimize"><i class="icon-resize-small"></i></a> </div></div>
                <div class="well no-padding">
                    <div id="errorContainer"></div>
                <div class="control-group">
                    <label class="control-label" for="userURL"><i class="icon-user"></i></label>
                    <div class="controls">
                    <input type="text" id="urlInput" placeholder="https://example.com" data-cip-id="userURL" autocomplete="off">
                    </div>
                </div>
               

                <div class="padding">
                <button class="btn btn-primary" type="submit" id="submitLink">Submit</button>
                <button class="btn" type="submit" id="clearLink">Clear</button>
                </div>
                </div>
            </form>
	</div> 
	<!-- / Content Container -->

</body>

	<!-- Javascript
	================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="assets/js/jquery-ui-1.10.2.custom.min.js"></script>
	<script src="assets/js/bootstrap/bootstrap.min.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-45853345-1', 'simpleurl.co');
            ga('send', 'pageview');

          </script>
	
</html>