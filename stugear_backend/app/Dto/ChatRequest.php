<?php
namespace App\Dto;

use App\Util\PromptConstant;
use Exception;
use Illuminate\Support\Facades\Http;

class ChatRequest
{
    private $model;
    private array $messages = [];
    private $response;


    public function __construct($model)
    {
        $this->model = $model;
    }

    public function addMessages(Message $message){
        
        $this->messages[] = $message;
    }

    private function getMessages(){
        foreach ($this->messages as $message) {
            $messagesContent[] = 
                $message->toArray();
        }
        return $messagesContent;
    }

    
    public function getResponse(){
        
        return json_decode($this->response['choices'][0]['message']['content'], true);
    }

    public function sendMessages(){

        try{
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '. env('OPENAI_API_KEY')
            ])->post(PromptConstant::$PROMPT_URL, [
                'model' => $this->model,
                'messages' =>  $this->getMessages(),
            ]);
            logger()->info("sendMessages: ", [$response->body()]);
        }catch(Exception $e){
            $response = $e->getMessage();
        }
        $this->response = $response;
    }
}
?>
