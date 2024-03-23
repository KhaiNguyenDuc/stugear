<?php

namespace App\Repositories\Validation;

use App\Dto\ValidationRequest;
use App\Models\Validation;
use App\Repositories\RepositoryInterface;

interface ValidationRepositoryInterface extends RepositoryInterface
{
    public function createThreadValidation($threadId, ValidationRequest $validation);
    public function createProductValidation($productId, ValidationRequest $validation);
    public function getByThreadId($threadId);
    
}
