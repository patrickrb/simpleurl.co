<?php
class Url_model extends CI_Model {
function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
	
    function insertUrl($url){
        $this->load->helper('string');
        $this->load->helper('security');
        
        
         $created = date('Y-m-d H:i:s');  
         $shortHash = random_string('alnum', 6);
         
         do{
            $shortHash = random_string('alnum', 6);
          }while(!$this->checkShortHashExists($shortHash));
          
         $insertArray = array(
             'short_hash' => $shortHash,
             'created' => $created,
             'ip_address' =>  $this->input->ip_address(),
             'url' => $url
         );
         $this->db->insert('urls', $insertArray); 
         return $shortHash;
    }
    
    function checkShortHashExists($shortHash){
        $this->db->where('short_hash', $shortHash);
        $query = $this->db->get('simpleurl.urls');
        if(count($query->result_array()) > 0)
            return false;
        else
            return true;
    }
    
    function getUrlByShortHash($shortHash){
        $this->db->where('short_hash', $shortHash);
        $query = $this->db->get('simpleurl.urls');
        return $query->result_array();
    }
    
}