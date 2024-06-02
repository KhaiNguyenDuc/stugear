<?php

namespace App\Repositories\Chart;

use App\Models\Product;
use App\Repositories\BaseRepository;
use App\Repositories\Chart\ChartRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ChartRepository extends BaseRepository implements ChartRepositoryInterface
{
    public function getModel()
    {
        return Product::class;
    }

    public function reportBar()
    {
        $currentYear = date('Y');

        $categories = DB::table('categories')->orderBy('id')->pluck('id');

        $colors = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'dark',
        ];

        $unusedIndexes = array_keys($colors);

        $result = [];
        $totalCounts = []; // Mảng để lưu tổng số lượng của từng tháng
        $totalByCategory = 0;
        foreach ($categories as $categoryId) {
            $totalCategoryCount = 0; // Tạo biến để tính tổng số lượng của category này
            $category = DB::table('categories')->find($categoryId);
            $statistics = [];
            for ($month = 1; $month <= 12; $month++) {
                $productCount = DB::table('products')
                    ->where('category_id', $category->id)
                    ->whereYear('created_at', '=', $currentYear)
                    ->whereMonth('created_at', '=', $month)
                    ->count();

                $threadCount = DB::table('threads')
                    ->where('category_id', $category->id)
                    ->whereYear('created_at', '=', $currentYear)
                    ->whereMonth('created_at', '=', $month)
                    ->count();

                $totalCount = $productCount + $threadCount;

                // Cộng tổng số lượng vào biến tổng của category này
                $totalCategoryCount += $totalCount;

                $statistics['thang_' . $month] = $totalCount;

                // Thêm số lượng của tháng vào mảng tổng số lượng của từng tháng
                if (isset($totalCounts[$month])) {
                    $totalCounts[$month] += $totalCount;
                } else {
                    $totalCounts[$month] = $totalCount;
                }
            }

            // Thêm tổng số lượng của category này vào mảng statistics
            $statistics['total'] = $totalCategoryCount;

            // Chọn một chỉ mục ngẫu nhiên từ mảng $unusedIndexes
            $randomIndex = array_rand($unusedIndexes);

            // Sử dụng chỉ mục đã chọn để lấy màu từ mảng $colors
            $color = $colors[$unusedIndexes[$randomIndex]];

            // Sau khi đã sử dụng màu, loại bỏ chỉ mục đã chọn khỏi mảng $unusedIndexes
            unset($unusedIndexes[$randomIndex]);

            // Đảm bảo mảng chỉ mục không bị trống
            if (empty($unusedIndexes)) {
                // Nếu mảng chỉ mục bị trống, tái khởi tạo nó với các chỉ mục ban đầu
                $unusedIndexes = array_keys($colors);
            }


            $result[] = [
                'icon' => [
                    'color' => $color,
                    'component' => 'touch_app',
                ],
                'label' => $category->name,
                'progress' => [
                    'content' => $totalCategoryCount,
                    'percentage' => ($totalCategoryCount > 0) ? round(($totalCategoryCount / array_sum($totalCounts)) * 100) : 0,
                ],
            ];

            $totalByCategory += $totalCategoryCount;
        }

        foreach ($result as &$item) {
            // dd($item['progress']['content']);
            $item['progress']['percentage'] = ($item['progress']['content'] > 0) ? round(($item['progress']['content'] / $totalByCategory) * 100) : 0;
        }

        // Đảo ngược mảng số liệu để chuyển từ tháng 1 đến tháng 12 thành tháng 12 đến tháng 1
        $totalCounts = array_reverse($totalCounts);

        $labels = [];
        $data = [];
        foreach ($totalCounts as $month => $count) {
            $labels[] = 'Tháng ' . $month;
            $data[] = $count;
        }

        return [
            'chart' => [
                'labels' => $labels,
                'datasets' => [
                    [
                        'label' => 'Bài đăng',
                        'data' => $data,
                    ],
                ],
            ],
            'items' => $result,
        ];
    }

    public function gradientLine()
    {
        $currentYear = date('Y');
        $categories = DB::table('categories')->orderBy('id')->pluck('id');

        $result = [
            'labels' => [
                "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            'datasets' => [],
        ];
        $colors = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'dark',
        ];

        $unusedIndexes = array_keys($colors);


        foreach ($categories as $categoryId) {
            $data = [];
            $category = DB::table('categories')->find($categoryId);
            for ($month = 1; $month <= 12; $month++) {
                $productCount = DB::table('products')
                    ->where('category_id', $category->id)
                    ->whereYear('created_at', '=', $currentYear)
                    ->whereMonth('created_at', '=', $month)
                    ->count();

                $threadCount = DB::table('threads')
                    ->where('category_id', $category->id)
                    ->whereYear('created_at', '=', $currentYear)
                    ->whereMonth('created_at', '=', $month)
                    ->count();

                $totalCount = $productCount + $threadCount;

                $data[] = $totalCount;
            }

            // Chọn một chỉ mục ngẫu nhiên từ mảng $unusedIndexes
            $randomIndex = array_rand($unusedIndexes);

            // Sử dụng chỉ mục đã chọn để lấy màu từ mảng $colors
            $color = $colors[$unusedIndexes[$randomIndex]];

            // Sau khi đã sử dụng màu, loại bỏ chỉ mục đã chọn khỏi mảng $unusedIndexes
            unset($unusedIndexes[$randomIndex]);

            // Đảm bảo mảng chỉ mục không bị trống
            if (empty($unusedIndexes)) {
                // Nếu mảng chỉ mục bị trống, tái khởi tạo nó với các chỉ mục ban đầu
                $unusedIndexes = array_keys($colors);
            }


            $result['datasets'][] = [
                'label' => $category->name,
                'color' => $color,
                'data' => $data,
            ];
        }

        return $result;
    }

    function recentEventItem1($entity)
    {
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        $newEntitysCount = DB::table($entity)
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        if ($newEntitysCount > 0) {
            $newestEntity = DB::table($entity)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->orderBy('created_at', 'desc')
                ->first();
        }

        try {
            $entityDateTime = ($newestEntity) ? Carbon::parse($newestEntity->created_at)->format('d M h:i A') : Carbon::now()->format('d M h:i A');
        } catch (\Throwable $th) {
            $entityDateTime = Carbon::now()->format('d M h:i A');
        }


        $result = [
            'color' => 'success',
            'icon' => $entity,
            'title' => $newEntitysCount,
            'dateTime' => $entityDateTime,
        ];

        return $result;
    }

    function recentEventItem2($type)
    {
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        $newEntitysCount = DB::table('asks')
        ->where('type', '=', $type)
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->count();

        if ($newEntitysCount > 0) {
            $newestEntity = DB::table('asks')
            ->where('type', '=', $type)
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->orderBy('created_at', 'desc')
                ->first();
        }

        try {
            $entityDateTime = ($newestEntity) ? Carbon::parse($newestEntity->created_at)->format('d M h:i A') : Carbon::now()->format('d M h:i A');
        } catch (\Throwable $th) {
            $entityDateTime = Carbon::now()->format('d M h:i A');
        }

        $typeArr = [
            1 => 'Rút tiền',
            2 => 'Tố cáo'
        ];


        $result = [
            'color' => 'success',
            'icon' => $typeArr[$type],
            'title' => $newEntitysCount,
            'dateTime' => $entityDateTime,
        ];

        return $result;
    }


    public function recentEvent()
    {
        $resultUsers = $this->recentEventItem1('users');
        $resultProducts = $this->recentEventItem1('products');
        $resultOrders = $this->recentEventItem1('orders');
        $resultWithdraw = $this->recentEventItem2(1);
        $resultReport = $this->recentEventItem2(2);

        $result = [
            $resultUsers,
            $resultProducts,
            $resultOrders,
            $resultWithdraw,
            $resultReport
        ];

        return $result;
    }
}
