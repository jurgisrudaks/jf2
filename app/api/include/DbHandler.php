<?php

/**
 * Class to handle all db operations
 * This class will have CRUD methods for database tables
 */
class DbHandler {

    private $conn;
    private $pages;

    function __construct() {
        require_once dirname(__FILE__) . '/DbConnect.php';

        // opening db connection
        $db = new DbConnect();
        $this->conn = $db->connect();

        // define collections
        $this->pages = new MongoCollection($this->conn, 'pages');
    }

    /**
     * Fetching single page
     * @param String $slug page slug
     */
    public function getPage($slug) {
        $query = array('slug' => $slug);
        $page = $this->pages->findOne($query);
        return $page;
    }

}
