<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Url extends CI_Controller {
	public function submit()
	{
                $this->load->model('url_model');
                
                $url = $this->input->post('url');
                if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) {
                    die(json_encode(array('status' => 'failed', 'errormessage' => 'Invalid URL')));
                }
                
                $shortUrl = $this->url_model->insertUrl($url);
                if(strlen($shortUrl) != 6){
                    die(json_encode(array('status' => 'failed', 'errormessage' => 'Error creating short URL')));
                }
                else{
                    echo json_encode(array('status' => 'success', 'short_url' => 'http://simpleurl.co/' . $shortUrl));
                }
	}
        
        public function go()
        {
            $this->load->model('url_model');
            $shortHash = $this->uri->segment(1);
            $redirectUrlData = $this->url_model->getUrlByShortHash($shortHash);
            $redirectUrl = $redirectUrlData[0]['url'];
            redirect($redirectUrl, 'refresh');
        }
}
