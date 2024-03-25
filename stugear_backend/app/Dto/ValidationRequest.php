<?php
namespace App\Dto;


class ValidationRequest
{
   
    private $thread_id;
    private $product_id;
    private $status;
    private $description;

    public function __construct()
    {
       
    }

    public function getStatus(){
        return $this->status;
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

    public function setStatus($status){
        $this->status = $status;
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
