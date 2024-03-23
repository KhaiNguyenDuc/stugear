<?php

namespace App\Util;

class AppConstant {
    public static $UPLOAD_DIRECTORY_USER_IMAGE = 'uploads/users';
    public static $UPLOAD_DIRECTORY_CATEGORY_IMAGE = 'uploads/categories';
    public static $UPLOAD_DIRECTORY_PRODUCT_IMAGE = 'uploads/products';
    public static $UPLOAD_DIRECTORY_ASK_IMAGE = 'uploads/asks';
    public static $UPLOAD_SUCCESS = "Upload successfully!";

    public static $UPLOAD_FAILURE = "Upload fail, please check again!";



    public static $ERROR_WITH_IMAGE = "There're some errors with image!";

    // public static $DOMAIN = 'http://34.205.156.176/';
    // public static $DOMAIN = 'https://stugear.website/';
    public static $DOMAIN = 'https://stugear.website/';
    public static $AVATAR_MALE = 'https://hoaminhngoc.vn/wp-content/uploads/2023/01/cute-1-300x300.png';
    public static $AVATAR_FEMALE = 'https://www.studytienganh.vn/upload/2022/05/112273.jpg';
    public static $PRODUCT_THUMBNAIL = 'https://nordicdesign.ca/wp-content/uploads/2020/02/book-thumbnail.jpg';

    public static $CATEGORY_THUMBNAIL = 'https://o2osell.com/cat_img/default.png?1587036898';

    public static $ASK_THUMBNAIL = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

    public static $STATUS_PRODUCT = [
        'chặn' => '0',
        'nháp' => '1',
        'chờ duyệt' => '2',
        'đã duyệt' => '3',
        'đã bán' => '4',
        'đã thanh toán' => '5'
    ];

    public static $TRANSACTION_METHOD = [
        'Tự do' => '1',
        'Trên web' => '2',
    ];

    public static $FILTER_REPLY = [
        'new' => '1',
        'like' => '2',
        'long' => '3',
        'short' => '4',
        'accept' => '5'
    ];

    public static $FILTER_STATUS_THREAD = [
        'new' => '1',
        'old' => '2',
        'reply' => '3'
    ];
}
