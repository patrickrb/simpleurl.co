<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
	public function index()
	{
                error_log($this->uri->uri_string());
		$this->load->view('home_view');
	}
}