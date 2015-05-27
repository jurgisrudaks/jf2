<?php

/**
 * Handling database connection
 */
class DbConnect {

    private $conn;
    private $db;

    function __construct() {
    }

    /**
     * Establishing database connection
     * @return database connection handler
     */
    function connect() {
        include_once dirname(__FILE__) . '/Config.php';

        $dbname = DB_NAME;

        try 
        {
            // Connecting to mysql database
            $this->conn = new MongoClient();
            $this->db = $this->conn->$dbname;
        }
        catch ( MongoConnectionException $e )
        {
            echo '<p>Couldn\'t connect to mongodb, is the "mongo" process running?</p>';
            exit();
        }

        // returing connection resource
        return $this->db;
    }

}
