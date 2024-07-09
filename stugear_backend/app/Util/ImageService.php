<?php

namespace App\Util;

use App\Util\AppConstant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ImageService
{
    public static function uploadImage(Request $request, $id, $path, $tableNameOfImage)
    {
        if ($request->has('image')) {
            $image = $request->image;

            $imgRef = $image[0];
            $imageName = $tableNameOfImage . '_' . $id . '_' . time() . '.' . $imgRef->extension();
            sleep(1);
            $imgRef->move(public_path($path), $imageName);
            self::saveImage($imageName, $id, $path, $tableNameOfImage);

            try {
                for($i = 1; $i < count($image); $i++) {
                    $img = $image[$i];
                    $imageName = $tableNameOfImage . '_' . $id . '_' . time() . '.' . $img->extension();
                    sleep(1);
                    $img->move(public_path($path), $imageName);
                    try {
                        $imageId = DB::table('images')->where('title', $imageName)->value('id');
                        if (!$imageId) {
                            $a = DB::table('images')->insert([
                                'path' => $path . '/' . $imageName,
                                'title' => $imageName,
                                'created_at' => Carbon::now(),
                                'updated_at' => Carbon::now()
                            ]);

                        } else {
                            $c = DB::table('images')
                                ->update([
                                    'updated_at' => Carbon::now()
                                ]);

                            $d = DB::table($tableNameOfImage)
                                ->where('id', $id)
                                ->update([
                                    'updated_at' => Carbon::now()
                                ]);
                        }
                    } catch (\Throwable $th) {
                        return AppConstant::$UPLOAD_FAILURE;
                    }
                }
            } catch (\Throwable $th) {
                return AppConstant::$UPLOAD_FAILURE;
            }

            return AppConstant::$UPLOAD_SUCCESS;
        }
        return 'Lỗi không có ảnh';
    }

    static function saveImage($imageName, $id, $path, $tableNameOfImage)
    {
        try {
            $imageId = DB::table('images')->where('title', $imageName)->value('id');
            if (!$imageId){
                $a = DB::table('images')->insert([
                    'path' => $path . '/' . $imageName,
                    'title' => $imageName,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
                $imageId = DB::table('images')->where('title', $imageName)->value('id');
                // dd($imageId);
                $b = DB::table($tableNameOfImage)
                    ->where('id', $id)
                    ->update([
                        'image_id' => $imageId
                    ]);
                // use a, b, c, d for debug if nessessary
            } else {
                $c = DB::table('images')
                    ->update([
                        'updated_at' => Carbon::now()
                    ]);

                $d = DB::table($tableNameOfImage)
                    ->where('id', $id)
                    ->update([
                        'updated_at' => Carbon::now()
                    ]);
            }
        } catch (\Throwable $th) {
            return AppConstant::$UPLOAD_FAILURE;
        }
    }

    public static function getPathImage($id, $tableNameOfImage){
        try {
            $imageId = DB::table($tableNameOfImage)->where('id', $id)->value('image_id');

            $path = DB::table('images')->where('id', $imageId)->value('path');

            if (!$path){
                return AppConstant::$ERROR_WITH_IMAGE;
            }
            return $path;
        } catch (\Throwable $th) {
            return AppConstant::$ERROR_WITH_IMAGE;
        }

    }
}
