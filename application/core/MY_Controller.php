<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Description of MY_Controller
 *
 * @author Zura
 */
class MY_Controller extends CI_Controller{
        
        private $templatesDir   = "templates/";
        
        function __construct() 
        {
                parent::__construct();
        }
        
        public function loadView($view, $params = array()) {
            $this->load->view($this->templatesDir.'header', $params);
            $this->load->view($this->templatesDir.'navbar', $params);
            $this->load->view($view, $params);
            $this->load->view($this->templatesDir.'footer', $params);
        }
        
}

/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */
