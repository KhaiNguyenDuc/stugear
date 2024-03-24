<?php

namespace App\Listeners;

use App\Events\ProductCreated;
use App\Jobs\ValidateProductJob;
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
        dispatch(new ValidateProductJob($event->getProduct(), $this->validationRepository, $this->productRepository));
   
    }



}
