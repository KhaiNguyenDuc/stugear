<?php

namespace App\Util;

class PromptConstant {
    public static $VALIDATE_PROMPT = 'Examine the provided text: %s. Please assess the meaning of each word in both Vietnamese and English languages. After that identify carefully any inappropriate words or abbreviations with negative meaning. Inappropriate words are those that have offensive meanings or are commonly known as derogatory slang ( remember to analyzic input by both vietnamese and english ). Return your assessment as a JSON object. The object should include a key named  \"isValid\" with a boolean value. If the input is valid, set "isValid" to true; otherwise, set it to false. Additionally, include a key named \"description\" which provides a description of the validation result in Vietnamese, the description should specify the invalid words separate with commas.';
    public static $PROMPT_MODEL = 'gpt-3.5-turbo-0613';
    public static $PROMPT_ROLE_USER = 'user';
    public static $PROMPT_URL = 'https://api.openai.com/v1/chat/completions';
}