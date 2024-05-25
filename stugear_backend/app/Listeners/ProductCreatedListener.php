<?php

namespace App\Listeners;

use App\Dto\ValidationRequest;
use App\Events\ProductCreated;
use App\Jobs\ValidateProductJob;
use App\Models\Product;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;

class ProductCreatedListener
{
    protected ValidationRepositoryInterface $validationRepository;
    protected ProductRepositoryInterface $productRepository;
    /**
     * Create the event listener.
     */
    public function __construct(
        ValidationRepositoryInterface $validationRepository,
        ProductRepositoryInterface $productRepository,
        )
    {
        $this->validationRepository = $validationRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Handle the event.
     */
    public function handle(ProductCreated $event): void
    {
        $waitingApprovedStatus = 3;
        $this->createProductValidation($event->getProduct(), $waitingApprovedStatus);
        dispatch(new ValidateProductJob($event->getProduct(), $this->validationRepository, $this->productRepository));
    }

    private function createProductValidation(Product $product, $status){
        $validation = new ValidationRequest();
        $validation->setProductId($product->id);
        $validation->setStatus($status);
        $validation->setDescription("Đang chờ duyệt");
        $this->validationRepository->createProductValidation($product->id, $validation);
    }



}
