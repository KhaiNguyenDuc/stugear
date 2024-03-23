<?php
namespace App\Dto;

use App\Util\PromptConstant;

class Message
{
   
    private $role;
    private $content;

    public function __construct($content)
    {
        $this->content = $content;
        $this->role = PromptConstant::$PROMPT_ROLE_USER; // default role user
    }

    public function setRole($role){
        $this->role = $role;
    }

    public function toArray()
    {
        return [
            "role" => $this->role,
            "content" => $this->content
        ];
    }


}
?>
