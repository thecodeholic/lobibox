<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends MY_Controller {

    public function index() {
        $this->loadView('home');
    }
    
    public function examples() {
        $this->loadView('examples');
    }
    
    public function doc() {
        $this->loadView('doc');
    }
    
}