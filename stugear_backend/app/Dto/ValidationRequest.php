<?php
namespace App\Dto;


class ValidationRequest
{
   
    private $thread_id;
    private $product_id;
    private $is_valid;
    private $description;

    public function __construct()
    {
       
    }

    public function getIsValid(){
        return $this->is_valid;
    }

    public function getThreadId(){
        return $this->thread_id;
    }

    public function getProductId(){
        return $this->product_id;
    }

    public function getDescription(){
        return $this->description;
    }

    public function isValid($is_valid){
        $this->is_valid = $is_valid;
    }

    public function setThreadId($thread_id){
        $this->thread_id = $thread_id;
    }
    public function setProductId($product_id){
        $this->product_id = $product_id;
    }

    public function setDescription($description){
        $this->description = $description;
    }

}
?>
