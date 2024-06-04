<?php

namespace App\Http\Controllers;

use App\Repositories\Chart\ChartRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class ChartController extends Controller
{
    protected $chartRepository;

    public function __construct(ChartRepositoryInterface $chartRepository)
    {
        $this->chartRepository = $chartRepository;
    }


    public function reportBarChart()
    {
        $result = $this->chartRepository->reportBar();

        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $result
        ]);

    }

    public function gradientLineChart()
    {
        $result = $this->chartRepository->gradientLine();

        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $result
        ]);
    }

    public function recentEvent()
    {
        $result = $this->chartRepository->recentEvent();

        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $result
        ]);
    }

}
