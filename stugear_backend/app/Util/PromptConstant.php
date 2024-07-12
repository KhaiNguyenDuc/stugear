<?php

namespace App\Util;

class PromptConstant {
    public static $VALIDATE_PROMPT = 'Examine the provided text: %s. After that identify carefully any inappropriate or negative meaning word, meaningless abbreviations words should accepted. Do not return any extra things other than the following Json Object: The object must include a key named  \"isValid\" with a boolean value. If the input is valid, set "isValid" to true; otherwise, set it to false. Additionally, include a key named \"description\" which provides a description of the validation result in Vietnamese, the description should specify the invalid words separate with commas';
    public static $THREAD_REPLY_PROMPT = 'Examinate this input text %s. I need you to response it in Vietnamese, it should be detail and precise with guidline if possible, returned entirely in JSON format. A key named /"content/" which is the reply formatted as inline-html with bootstrap. A key named /"raw_content"/ which is the plain text form of /"content/"';
    public static $PROMPT_MODEL = 'gpt-4o';
    public static $PROMPT_ROLE_USER = 'user';
    public static $PROMPT_URL = 'https://api.openai.com/v1/chat/completions';
}
