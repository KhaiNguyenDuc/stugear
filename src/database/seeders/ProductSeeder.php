<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Công nghệ sản xuất ferro',
                'price' => rand(10, 1000) * 1000,
                'description' => 'Công nghệ sản xuất ferro là một quy trình quan trọng trong ngành công nghiệp. Nó đóng vai trò quan trọng trong sản xuất và ứng dụng các sản phẩm liên quan đến ferro. Công nghệ này bao gồm nhiều phần khác nhau và đòi hỏi sự chuyên môn cao về quá trình sản xuất và kiểm soát chất lượng.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10, 1000) * 1000,
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Giáo trình hàn trong môi trường khí bảo vệ',
                'price' => rand(10, 1000) * 1000,
                'description' => 'Giáo trình hàn trong môi trường khí bảo vệ là tài liệu học tập về kỹ thuật hàn trong điều kiện an toàn với sự sử dụng của khí bảo vệ. Nó bao gồm các nguyên tắc cơ bản, kỹ thuật và quy trình hàn dưới môi trường khí bảo vệ.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10, 1000) * 1000,
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => "The Foseco Foundryman's Handbook",
                'price' => rand(10000, 1000000),
                'description' => 'The Foseco Foundryman\'s Handbook là một tài liệu quan trọng về quy trình và kỹ thuật trong ngành luyện kim và chế tạo khuôn đúc. Cuốn sách này cung cấp kiến thức về các vật liệu và phương pháp quản lý nhiệt độ và chất lượng trong quá trình đúc kim loại. Đây là nguồn tài liệu quý báu cho những người làm việc trong ngành công nghiệp luyện kim và đúc kim loại.',
                'brand' => 'Nhà xuất bản khoa học',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Marketing căn bản',
                'price' => rand(10, 1000) * 1000,
                'description' => 'Marketing căn bản là một tài liệu giới thiệu về các khái niệm cơ bản trong lĩnh vực tiếp thị. Nó bao gồm các chủ đề như phân loại sản phẩm, nghiên cứu thị trường, chiến lược tiếp thị, quảng cáo, và quan hệ công chúng. Đây là một nguồn tài liệu tham khảo quan trọng cho người mới bắt đầu trong lĩnh vực tiếp thị.',
                'brand' => 'Nhà xuất bản kinh tế',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10, 1000) * 1000,
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Thư bán hàng đỉnh cao',
                'price' => rand(10, 1000) * 1000,
                'description' => 'Thư bán hàng đỉnh cao là một tài liệu hướng dẫn về cách viết thư bán hàng hiệu quả. Nó cung cấp các mẫu thư, kỹ thuật viết thư, và chiến lược để tạo ra những thư bán hàng mạnh mẽ và thuyết phục. Đây là một công cụ quan trọng cho những người làm trong lĩnh vực bán hàng và tiếp thị.',
                'brand' => 'Nhà xuất bản kinh tế',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10, 1000) * 1000,
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Foundation in Microbiology Basic Principles',
                'price' => rand(10000, 1000000),
                'description' => 'Foundation in Microbiology Basic Principles là một cuốn sách giáo trình chuyên sâu về các nguyên tắc cơ bản trong lĩnh vực vi khuẩn học. Cuốn sách này bao gồm các kiến thức về cấu trúc vi khuẩn, chức năng của chúng, và vai trò quan trọng của vi khuẩn trong các khía cạnh khác nhau của cuộc sống. Đây là tài liệu tham khảo quan trọng cho sinh viên và chuyên gia trong lĩnh vực vi khuẩn học.',
                'brand' => 'Nhà xuất bản khoa học',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Python Data Science Handbook',
                'price' => rand(10000, 1000000),
                'description' => 'Python Data Science Handbook là một tài liệu toàn diện về khoa học dữ liệu và học máy sử dụng ngôn ngữ lập trình Python. Cuốn sách này bao gồm các chủ đề quan trọng về phân tích dữ liệu, học máy và trực quan hóa dữ liệu bằng các thư viện Python như NumPy, Pandas, Scikit-Learn và Matplotlib. Đây là một tài liệu hữu ích cho những người làm việc trong lĩnh vực khoa học dữ liệu và phân tích dữ liệu.',
                'brand' => 'Nhà xuất bản khoa học',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Oracle HTML Handbook',
                'price' => rand(10, 1000) * 1000,
                'description' => 'Oracle HTML Handbook là một tài liệu toàn diện về việc sử dụng HTML trong các dự án phát triển ứng dụng và trang web với cơ sở dữ liệu Oracle. Cuốn sách này cung cấp các hướng dẫn, ví dụ và chi tiết về cách tạo và quản lý trang web kết hợp với cơ sở dữ liệu Oracle. Đây là một tài liệu quan trọng cho những người làm việc trong lĩnh vực phát triển ứng dụng web và quản lý cơ sở dữ liệu Oracle.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10, 1000) * 1000,
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'All My Children Wear Fur Coats',
                'price' => rand(10000, 1000000),
                'description' => 'All My Children Wear Fur Coats là một tác phẩm về việc nuôi dưỡng và quan tâm đến các loài động vật cưng. Cuốn sách này cung cấp thông tin về việc chăm sóc, nuôi dưỡng, và tạo môi trường tốt cho các loài động vật trong gia đình. Đây là nguồn thông tin hữu ích cho những người yêu thú cưng và quan tâm đến việc nuôi dưỡng chúng.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Sửa chữa máy photocopy kỹ năng thực hành',
                'price' => rand(10000, 1000000),
                'description' => 'Sửa chữa máy photocopy kỹ năng thực hành là cuốn sách hướng dẫn về việc sửa chữa và bảo dưỡng máy photocopy. Cuốn sách này cung cấp kiến thức và kỹ năng thực hành để người đọc có thể hiểu và khắc phục các sự cố thường gặp trên máy photocopy. Đây là nguồn tài liệu hữu ích cho những người làm việc trong lĩnh vực sửa chữa máy văn phòng.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Basics of Design Layout and Typography for Beginners',
                'price' => rand(10000, 1000000),
                'description' => 'Basics of Design Layout and Typography for Beginners là một cuốn sách giới thiệu cơ bản về thiết kế bố cục và kiểu chữ dành cho người mới bắt đầu. Cuốn sách này giúp người đọc hiểu cách tạo ra bố cục hấp dẫn và sử dụng kiểu chữ một cách hiệu quả trong thiết kế đồ họa. Đây là tài liệu tham khảo cho những người quan tâm đến lĩnh vực thiết kế đồ họa.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Food Composition and Analysis: Methods and Strategies',
                'price' => rand(10000, 1000000),
                'description' => 'Food Composition and Analysis: Methods and Strategies là một tài liệu quan trọng trong lĩnh vực phân tích thức phẩm và thực phẩm hóa học. Cuốn sách này giúp người đọc hiểu cách tiến hành phân tích thức phẩm, xác định thành phần dinh dưỡng và hóa học của thực phẩm. Đây là nguồn tài liệu quý báu cho các nhà khoa học thực phẩm và người làm việc trong ngành công nghiệp thực phẩm.',
                'brand' => 'Nhà xuất bản khoa học',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Xử lý nước thải sinh hoạt quy mô nhỏ và vừa',
                'price' => rand(10000, 1000000),
                'description' => 'Xử lý nước thải sinh hoạt quy mô nhỏ và vừa là một tài liệu quan trọng về cách xử lý nước thải từ các hộ gia đình, khu công nghiệp nhỏ và các cơ sở thương mại. Cuốn sách này cung cấp kiến thức về các phương pháp và kỹ thuật xử lý nước thải để giảm thiểu tác động tiêu cực lên môi trường. Đây là tài liệu hữu ích cho những người quan tâm đến vấn đề môi trường và xử lý nước thải.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Kỹ thuật trồng rau sạch trồng rau ăn lá',
                'price' => rand(10000, 1000000),
                'description' => 'Kỹ thuật trồng rau sạch trồng rau ăn lá là cuốn sách hướng dẫn về cách trồng và chăm sóc rau ăn lá một cách sạch và hiệu quả. Cuốn sách này cung cấp kiến thức về các phương pháp trồng rau, quản lý sâu bệnh, và thu hoạch rau sạch. Đây là tài liệu hữu ích cho những người quan tâm đến trồng rau sạch và thực phẩm hữu cơ.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Giáo trình kỹ thuật trồng cây công nghiệp',
                'price' => rand(10000, 1000000),
                'description' => 'Giáo trình kỹ thuật trồng cây công nghiệp là một tài liệu giảng dạy về cách trồng và quản lý cây trồng trong lĩnh vực nông nghiệp công nghiệp. Cuốn sách này cung cấp kiến thức về phương pháp trồng cây, chăm sóc và bảo vệ cây trồng để tối ưu hóa sản xuất trong lĩnh vực nông nghiệp công nghiệp. Đây là tài liệu hữu ích cho sinh viên và những người làm việc trong ngành nông nghiệp.',
                'brand' => 'Nhà xuất bản kỹ thuật',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Arduino R3',
                'price' => rand(10000, 1000000),
                'description' => 'Arduino R3 là một bo mạch phát triển sử dụng vi điều khiển ATMega328P. Nó được sử dụng rộng rãi trong dự án điện tử và lập trình nhúng. Arduino R3 có thể kết nối với nhiều cảm biến và mô-đun mở rộng, cho phép người dùng tạo ra các ứng dụng sáng tạo và thú vị trong lĩnh vực IoT, robot và nhiều lĩnh vực khác.',
                'brand' => 'Arduino',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Raspberry Pi 4 Model 8GB',
                'price' => rand(10000, 1000000),
                'description' => 'Raspberry Pi 4 Model 8GB là một trong các phiên bản nâng cấp của bo mạch Raspberry Pi. Với bộ nhớ RAM lên đến 8GB, nó cung cấp hiệu suất mạnh mẽ cho các ứng dụng đa nhiệm và IoT. Raspberry Pi 4 Model 8GB có khả năng kết nối với nhiều thiết bị ngoại vi và được sử dụng trong nhiều dự án sáng tạo trong lĩnh vực điện tử và lập trình nhúng.',
                'brand' => 'Raspberry Pi',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Mạch điều khiển LED 8 cổng 6A OneLED',
                'price' => rand(10000, 1000000),
                'description' => 'Mạch điều khiển LED 8 cổng 6A OneLED là một sản phẩm chất lượng cao để điều khiển đèn LED. Với 8 cổng đầu ra và khả năng chịu tải 6A cho mỗi cổng, mạch này giúp bạn dễ dàng điều khiển và làm sáng đèn LED trong các ứng dụng chiếu sáng và trang trí. OneLED là lựa chọn tốt cho các dự án DIY và thương mại.',
                'brand' => 'OneLED',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Điện trở 300 ohm 1/4W 5% 4 vòng màu 300R 0.25W 5%',
                'price' => rand(10000, 1000000),
                'description' => 'Điện trở 300 ohm 1/4W 5% là một loại điện trở có giá trị trở là 300 ohm và công suất là 1/4W (0.25W) với độ chính xác 5%. Điện trở này có bốn vòng màu để biểu thị giá trị trở theo chuẩn màu, với mã màu "300R". Điện trở có ứng dụng rộng rãi trong các mạch điện tử và công việc kỹ thuật khác.',
                'brand' => 'Điện tử thông minh',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
            [
                'name' => 'Đi ốt 5A 1000V',
                'price' => rand(10000, 1000000),
                'description' => 'Đi ốt 5A 1000V là một loại đi ốt có khả năng chịu dòng 5A và điện áp lên đến 1000V. Đi ốt này được sử dụng trong nhiều ứng dụng điện tử và công việc kỹ thuật khác. Nó đảm bảo việc bảo vệ các linh kiện và mạch điện trong trường hợp dòng điện quá tải hoặc sự cố điện áp.',
                'brand' => 'Linh kiện giá rẻ',
                'condition' => rand(1, 2),
                'edition' => 'ver_' . rand(0, 9) . '.' . rand(0, 9) . '.' . rand(0, 9),
                'origin_price' => rand(10000, 1000000),
                'quantity' => rand(1, 10),
                'status' => 3,
                'user_id' => rand(1, 8),
                'category_id' => rand(1, 3),
                'transaction_id' => rand(1, 2),
                'created_by' => rand(1, 5),
                'updated_by' => rand(1, 5),
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day')),
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'name' => $product['name'],
                'price' => $product['price'],
                'description' => $product['description'],
                'condition' => $product['condition'],
                'edition' => $product['edition'],
                'origin_price' => $product['origin_price'],
                'quantity' => $product['quantity'],
                'status' => $product['status'],
                'user_id' => $product['user_id'],
                'category_id' => $product['category_id'],
                'transaction_id' => $product['transaction_id'],
                'created_by' => $product['created_by'],
                'updated_by' => $product['updated_by'],
                'created_at' => $product['created_at'],
                'updated_at' => $product['updated_at'],
            ]);
        }

        $wishlist_products = [
            [1,1],[1,2],[1,3],[2,2],[2,3],[2,4],[3,3],[3,4],[3,5],
            [4,4],[4,5],[4,6],[5,5],[5,6],[5,7],[6,6],[6,7],[6,8],
            [7,9],[7,10],[7,2],[8,8],[8,9],[8,10],[9,1],[9,4],[10,1],
            [10,2],[11,2],[12,2],[13,2],[13,4],[14,4],[15,6]
        ];

        foreach ($wishlist_products as $wishlist_product) {
            DB::table('wishlist_products')->insert([
                'product_id' => $wishlist_product[0],
                'wishlist_id' => $wishlist_product[1],
                'created_by' => $wishlist_product[1],
                'updated_by' => $wishlist_product[1],
                'created_at' => date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years')),
                'updated_at'=> date('Y-m-d H:i:s', strtotime('-' . rand(1, 5) . ' years +1 day'))
            ]);
        }
    }
}