<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Predefined Vietnamese data for threads
        $contents = [
            [
                'title' => 'Làm thế nào để khuyến khích đam mê âm nhạc cho trẻ em?',
                'description' => 'Chia sẻ vấn đề của bạn và hỏi cộng đồng về cách khuyến khích đam mê âm nhạc cho trẻ em một cách hiệu quả.',
                'content' => "<h1 class='text-primary'>Tôi cần sự giúp đỡ: Làm thế nào để khuyến khích đam mê âm nhạc cho trẻ em?</h1><p>Xin chia sẻ tình huống của bạn và mở đầu cuộc trò chuyện với cộng đồng về cách bạn có thể thúc đẩy sự đam mê âm nhạc cho trẻ em một cách hiệu quả. Dưới đây là một số câu hỏi để khởi đầu cuộc trò chuyện.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Làm thế nào để tạo điều kiện thuận lợi để trẻ em phát triển đam mê với âm nhạc?</li><li>Người nào đã có kinh nghiệm trong việc khuyến khích con cái yêu thích âm nhạc có thể chia sẻ kinh nghiệm của mình không?</li><li>Phương pháp nào hiệu quả để giúp trẻ xác định và lựa chọn loại nhạc phù hợp với họ?</li><li>Làm thế nào để vượt qua những thách thức khi trẻ không thể quyết định loại nhạc họ thích?</li><li>Có gợi ý về việc tích hợp âm nhạc vào cuộc sống hàng ngày của trẻ không?</li></ul><h2 class='text-success'>Đề xuất giải pháp:</h2><p>Hãy chia sẻ ý kiến, kinh nghiệm và giải pháp của bạn để giúp những người khác trong cộng đồng xây dựng tình yêu thích âm nhạc cho trẻ em.</p>",
                'raw_content' => "Tôi cần sự giúp đỡ: Làm thế nào để khuyến khích đam mê âm nhạc cho trẻ em? Xin chia sẻ tình huống của bạn và mở đầu cuộc trò chuyện với cộng đồng về cách bạn có thể thúc đẩy sự đam mê âm nhạc cho trẻ em một cách hiệu quả. Dưới đây là một số câu hỏi để khởi đầu cuộc trò chuyện. Câu hỏi thảo luận: - Làm thế nào để tạo điều kiện thuận lợi để trẻ em phát triển đam mê với âm nhạc? - Người nào đã có kinh nghiệm trong việc khuyến khích con cái yêu thích âm nhạc có thể chia sẻ kinh nghiệm của mình không? - Phương pháp nào hiệu quả để giúp trẻ xác định và lựa chọn loại nhạc phù hợp với họ? - Làm thế nào để vượt qua những thách thức khi trẻ không thể quyết định loại nhạc họ thích? - Có gợi ý về việc tích hợp âm nhạc vào cuộc sống hàng ngày của trẻ không? Đề xuất giải pháp: Hãy chia sẻ ý kiến, kinh nghiệm và giải pháp của bạn để giúp những người khác trong cộng đồng xây dựng tình yêu thích âm nhạc cho trẻ em."
            ],
            [
                'title' => 'Làm thế nào để giúp trẻ học môn Toán một cách hiệu quả?',
                'description' => 'Hãy đặt câu hỏi và cùng cộng đồng thảo luận về các phương pháp giúp trẻ học môn Toán một cách hiệu quả.',
                'content' => "<h1 class='text-primary'>Cần tư vấn: Làm thế nào để giúp trẻ học môn Toán một cách hiệu quả?</h1><p>Hãy chia sẻ thách thức của bạn và đặt câu hỏi cho cộng đồng về cách giúp trẻ học môn Toán một cách hiệu quả nhất. Dưới đây là một số câu hỏi để mở đầu cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Làm thế nào để tạo hứng thú cho trẻ trong quá trình học môn Toán?</li><li>Nên sử dụng phương pháp giảng dạy nào để giúp trẻ hiểu và áp dụng kiến thức một cách sâu sắc?</li><li>Cách làm thế nào để khuyến khích trẻ tự tin và không sợ hãi khi đối mặt với các vấn đề toán học?</li><li>Phương pháp nào giúp trẻ thấy môn Toán không chỉ là một nhiệm vụ mà còn là một trải nghiệm thú vị?</li><li>Làm thế nào để tối ưu hóa thời gian học Toán cho trẻ một cách hiệu quả?</li></ul><h2 class='text-success'>Hãy chia sẻ kinh nghiệm của bạn:</h2><p>Chia sẻ những phương pháp, kinh nghiệm và gợi ý của bạn để giúp các bậc phụ huynh và giáo viên tăng cường khả năng học môn Toán cho trẻ em.</p>",
                'raw_content' => "Cần tư vấn: Làm thế nào để giúp trẻ học môn Toán một cách hiệu quả? Hãy chia sẻ thách thức của bạn và đặt câu hỏi cho cộng đồng về cách giúp trẻ học môn Toán một cách hiệu quả nhất. Dưới đây là một số câu hỏi để mở đầu cuộc thảo luận. Câu hỏi thảo luận: - Làm thế nào để tạo hứng thú cho trẻ trong quá trình học môn Toán? - Nên sử dụng phương pháp giảng dạy nào để giúp trẻ hiểu và áp dụng kiến thức một cách sâu sắc? - Cách làm thế nào để khuyến khích trẻ tự tin và không sợ hãi khi đối mặt với các vấn đề toán học? - Phương pháp nào giúp trẻ thấy môn Toán không chỉ là một nhiệm vụ mà còn là một trải nghiệm thú vị? - Làm thế nào để tối ưu hóa thời gian học Toán cho trẻ một cách hiệu quả? Hãy chia sẻ kinh nghiệm của bạn: Chia sẻ những phương pháp, kinh nghiệm và gợi ý của bạn để giúp các bậc phụ huynh và giáo viên tăng cường khả năng học môn Toán cho trẻ em."
            ],
            [
                'title' => 'Làm thế nào để giảm căng thẳng trong công việc hàng ngày?',
                'description' => 'Hãy chia sẻ trải nghiệm và nhờ cộng đồng tư vấn về cách giảm căng thẳng trong công việc hàng ngày.',
                'content' => "<h1 class='text-primary'>Cần lời khuyên: Làm thế nào để giảm căng thẳng trong công việc hàng ngày?</h1><p>Hãy chia sẻ trải nghiệm của bạn và mở cuộc thảo luận với cộng đồng về cách bạn có thể giảm căng thẳng trong công việc hàng ngày một cách hiệu quả. Dưới đây là một số câu hỏi để bạn có thể đặt ra trong cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Những phương pháp nào bạn đã thử để giảm căng thẳng trong công việc?</li><li>Làm thế nào để duy trì cân bằng giữa công việc và cuộc sống cá nhân?</li><li>Phương pháp nào giúp bạn tạo ra một môi trường làm việc tích cực?</li><li>Làm thế nào để quản lý thời gian hiệu quả để giảm căng thẳng?</li><li>Bạn có gợi ý nào cho việc giảm căng thẳng mà bạn muốn chia sẻ với cộng đồng không?</li></ul><h2 class='text-success'>Chia sẻ lời khuyên:</h2><p>Hãy chia sẻ kinh nghiệm và lời khuyên của bạn để giúp những người khác xây dựng một môi trường làm việc tích cực và lành mạnh.</p>",
                'raw_content' => "Cần lời khuyên: Làm thế nào để giảm căng thẳng trong công việc hàng ngày? Hãy chia sẻ trải nghiệm của bạn và mở cuộc thảo luận với cộng đồng về cách bạn có thể giảm căng thẳng trong công việc hàng ngày một cách hiệu quả. Dưới đây là một số câu hỏi để bạn có thể đặt ra trong cuộc thảo luận. Câu hỏi thảo luận: - Những phương pháp nào bạn đã thử để giảm căng thẳng trong công việc? - Làm thế nào để duy trì cân bằng giữa công việc và cuộc sống cá nhân? - Phương pháp nào giúp bạn tạo ra một môi trường làm việc tích cực? - Làm thế nào để quản lý thời gian hiệu quả để giảm căng thẳng? - Bạn có gợi ý nào cho việc giảm căng thẳng mà bạn muốn chia sẻ với cộng đồng không? Chia sẻ lời khuyên: Hãy chia sẻ kinh nghiệm và lời khuyên của bạn để giúp những người khác xây dựng một môi trường làm việc tích cực và lành mạnh."
            ],
            [
                'title' => 'Làm thế nào để nấu một bữa tối ngon miệng?',
                'description' => 'Nếu bạn đang cần ý kiến và gợi ý cho việc nấu ăn, hãy đặt câu hỏi và nhờ cộng đồng chia sẻ kinh nghiệm.',
                'content' => "<h1 class='text-primary'>Hỏi đáp: Làm thế nào để nấu một bữa tối ngon miệng?</h1><p>Nếu bạn đang cảm thấy mơ hồ với việc nấu ăn và cần ý kiến và gợi ý, hãy đặt câu hỏi và nhờ cộng đồng chia sẻ kinh nghiệm và kiến thức của họ. Dưới đây là một số câu hỏi bạn có thể đặt ra.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Loại món nào phù hợp cho một bữa tối đơn giản nhưng ngon miệng?</li><li>Có cách nấu món gì đó nhanh chóng và dễ dàng mà bạn muốn chia sẻ không?</li><li>Phương pháp nào giúp bạn tạo ra các món ăn hấp dẫn mà không tốn nhiều thời gian?</li><li>Làm thế nào để lựa chọn nguyên liệu và gia vị phù hợp cho một bữa tối ngon miệng?</li><li>Bạn có bí quyết nào để biến những món ăn đơn giản thành một bữa tối đầy đủ và ngon miệng không?</li></ul><h2 class='text-success'>Chia sẻ kinh nghiệm:</h2><p>Hãy chia sẻ những kinh nghiệm, gợi ý và bí quyết của bạn để giúp những người khác tạo ra những bữa tối ngon miệng và đa dạng hơn.</p>",
                'raw_content' => "Hỏi đáp: Làm thế nào để nấu một bữa tối ngon miệng? Nếu bạn đang cảm thấy mơ hồ với việc nấu ăn và cần ý kiến và gợi ý, hãy đặt câu hỏi và nhờ cộng đồng chia sẻ kinh nghiệm và kiến thức của họ. Dưới đây là một số câu hỏi bạn có thể đặt ra. Câu hỏi thảo luận: - Loại món nào phù hợp cho một bữa tối đơn giản nhưng ngon miệng? - Có cách nấu món gì đó nhanh chóng và dễ dàng mà bạn muốn chia sẻ không? - Phương pháp nào giúp bạn tạo ra các món ăn hấp dẫn mà không tốn nhiều thời gian? - Làm thế nào để lựa chọn nguyên liệu và gia vị phù hợp cho một bữa tối ngon miệng? - Bạn có bí quyết nào để biến những món ăn đơn giản thành một bữa tối đầy đủ và ngon miệng không? Chia sẻ kinh nghiệm: Hãy chia sẻ những kinh nghiệm, gợi ý và bí quyết của bạn để giúp những người khác tạo ra những bữa tối ngon miệng và đa dạng hơn."
            ],
            [
                'title' => 'Làm thế nào để duy trì một lối sống lành mạnh?',
                'description' => 'Chia sẻ thắc mắc và nhận lời khuyên về cách duy trì một lối sống lành mạnh và cân đối.',
                'content' => "<h1 class='text-primary'>Hỏi về sức khỏe: Làm thế nào để duy trì một lối sống lành mạnh?</h1><p>Hãy chia sẻ thắc mắc của bạn và nhận lời khuyên từ cộng đồng về cách duy trì một lối sống lành mạnh và cân đối. Dưới đây là một số câu hỏi để bạn có thể đặt ra trong cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Phương pháp nào giúp bạn duy trì một chế độ ăn lành mạnh và cân đối?</li><li>Làm thế nào để tạo ra một kế hoạch tập luyện hiệu quả và duy trì nó?</li><li>Có cách nào để giảm căng thẳng và cải thiện tâm trạng một cách tự nhiên không?</li><li>Làm thế nào để duy trì một giấc ngủ đủ và chất lượng hàng đêm?</li><li>Bạn có gợi ý nào cho việc duy trì một lối sống lành mạnh mà bạn muốn chia sẻ với cộng đồng không?</li></ul><h2 class='text-success'>Chia sẻ kinh nghiệm:</h2><p>Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc duy trì một lối sống lành mạnh và cân đối.</p>",
                'raw_content' => "Hỏi về sức khỏe: Làm thế nào để duy trì một lối sống lành mạnh? Hãy chia sẻ thắc mắc của bạn và nhận lời khuyên từ cộng đồng về cách duy trì một lối sống lành mạnh và cân đối. Dưới đây là một số câu hỏi để bạn có thể đặt ra trong cuộc thảo luận. Câu hỏi thảo luận: - Phương pháp nào giúp bạn duy trì một chế độ ăn lành mạnh và cân đối? - Làm thế nào để tạo ra một kế hoạch tập luyện hiệu quả và duy trì nó? - Có cách nào để giảm căng thẳng và cải thiện tâm trạng một cách tự nhiên không? - Làm thế nào để duy trì một giấc ngủ đủ và chất lượng hàng đêm? - Bạn có gợi ý nào cho việc duy trì một lối sống lành mạnh mà bạn muốn chia sẻ với cộng đồng không? Chia sẻ kinh nghiệm: Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc duy trì một lối sống lành mạnh và cân đối."
            ],
            [
                'title' => 'Làm thế nào để chăm sóc cây cảnh một cách hiệu quả?',
                'description' => 'Nếu bạn có cây cảnh và muốn biết cách chăm sóc chúng tốt nhất, hãy đặt câu hỏi và nhận lời khuyên từ cộng đồng.',
                'content' => "<h1 class='text-primary'>Tư vấn: Làm thế nào để chăm sóc cây cảnh một cách hiệu quả?</h1><p>Nếu bạn đang gặp khó khăn trong việc chăm sóc cây cảnh hoặc muốn biết cách chăm sóc chúng tốt nhất, hãy đặt câu hỏi và nhận lời khuyên từ cộng đồng. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Những loại cây nào phù hợp với điều kiện ánh sáng và nước cụ thể trong nhà bạn?</li><li>Có phương pháp nào để phòng trừ sâu bệnh và bảo vệ cây cảnh khỏi các vấn đề gây hại không?</li><li>Làm thế nào để biết khi nào cần phải tưới nước cho cây cảnh và cách tưới sao cho đúng cách?</li><li>Phương pháp nào giúp cây cảnh phát triển mạnh mẽ và khỏe mạnh nhất?</li><li>Bạn có gợi ý nào cho việc chăm sóc cây cảnh mà bạn muốn chia sẻ với cộng đồng không?</li></ul><h2 class='text-success'>Chia sẻ kinh nghiệm:</h2><p>Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc chăm sóc cây cảnh để giúp những người khác tận hưởng vẻ đẹp của các loài cây trong nhà.</p>",
                'raw_content' => "Tư vấn: Làm thế nào để chăm sóc cây cảnh một cách hiệu quả? Nếu bạn đang gặp khó khăn trong việc chăm sóc cây cảnh hoặc muốn biết cách chăm sóc chúng tốt nhất, hãy đặt câu hỏi và nhận lời khuyên từ cộng đồng. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận. Câu hỏi thảo luận: - Những loại cây nào phù hợp với điều kiện ánh sáng và nước cụ thể trong nhà bạn? - Có phương pháp nào để phòng trừ sâu bệnh và bảo vệ cây cảnh khỏi các vấn đề gây hại không? - Làm thế nào để biết khi nào cần phải tưới nước cho cây cảnh và cách tưới sao cho đúng cách? - Phương pháp nào giúp cây cảnh phát triển mạnh mẽ và khỏe mạnh nhất? - Bạn có gợi ý nào cho việc chăm sóc cây cảnh mà bạn muốn chia sẻ với cộng đồng không? Chia sẻ kinh nghiệm: Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc chăm sóc cây cảnh để giúp những người khác tận hưởng vẻ đẹp của các loài cây trong nhà."
            ],
            [
                'title' => 'Hướng dẫn nấu mì xào hải sản ngon tuyệt',
                'description' => 'Cùng khám phá cách nấu mì xào hải sản ngon đậm đà từ những nguyên liệu đơn giản nhưng hấp dẫn.',
                'content' => "<h1 class='text-primary'>Hướng dẫn nấu mì xào hải sản ngon tuyệt</h1><p>Mì xào hải sản là một món ăn dân dã, phổ biến và rất được ưa chuộng trong bữa ăn gia đình. Để chuẩn bị món ăn này, bạn cần có mì xào, hải sản tươi ngon như tôm, cua, mực, và các loại rau cải. Sau đây là cách nấu mì xào hải sản ngon và đơn giản.</p><h2 class='text-info'>Nguyên liệu cần chuẩn bị:</h2><ul class='list-unstyled'><li>Mì xào</li><li>Tôm</li><li>Cua</li><li>Mực</li><li>Rau cải</li></ul><h2 class='text-success'>Cách thực hiện:</h2><ol class='list-group'><li class='list-group-item'>Chuẩn bị nguyên liệu.</li><li class='list-group-item'>Xào hải sản với rau cải.</li><li class='list-group-item'>Luộc mì xào và trộn đều với hải sản đã xào.</li><li class='list-group-item'>Dọn ra đĩa và thưởng thức.</li></ol><h2 class='text-danger'>Ghi chú:</h2><p>Để mì xào hải sản thêm phần hấp dẫn, bạn có thể thêm gia vị và sốt theo khẩu vị cá nhân.</p><table class='table table-bordered'><thead><tr><th>STT</th><th>Nguyên liệu</th><th>Số lượng</th></tr></thead><tbody><tr><td>1</td><td>Mì xào</td><td>1 gói</td></tr><tr><td>2</td><td>Tôm</td><td>200g</td></tr><tr><td>3</td><td>Cua</td><td>100g</td></tr><tr><td>4</td><td>Mực</td><td>150g</td></tr></tbody></table>",
                'raw_content' => "Hướng dẫn nấu mì xào hải sản ngon tuyệt Mì xào hải sản là một món ăn dân dã, phổ biến và rất được ưa chuộng trong bữa ăn gia đình. Để chuẩn bị món ăn này, bạn cần có mì xào, hải sản tươi ngon như tôm, cua, mực, và các loại rau cải. Sau đây là cách nấu mì xào hải sản ngon và đơn giản. Nguyên liệu cần chuẩn bị: - Mì xào - Tôm - Cua - Mực - Rau cải Cách thực hiện: 1. Chuẩn bị nguyên liệu. 2. Xào hải sản với rau cải."
            ],
            [
                'title' => 'Bí quyết chọn mua đồ chơi an toàn cho trẻ nhỏ',
                'description' => 'Tìm hiểu những điều cần lưu ý khi chọn mua đồ chơi để đảm bảo an toàn cho trẻ em.',
                'content' => "<h1 class='text-primary'>Bí quyết chọn mua đồ chơi an toàn cho trẻ nhỏ</h1><p>Việc chọn mua đồ chơi cho trẻ nhỏ không chỉ đơn giản là lựa chọn theo sở thích mà còn cần phải cân nhắc đến yếu tố an toàn. Dưới đây là những bí quyết cần nhớ khi mua đồ chơi cho trẻ em.</p><h2 class='text-info'>Những điều cần lưu ý:</h2><ul class='list-unstyled'><li>Chọn đồ chơi phù hợp với độ tuổi của trẻ.</li><li>Chọn đồ chơi không có phần nhọn, sắc.</li><li>Chọn đồ chơi có nguồn gốc xuất xứ rõ ràng.</li><li>Kiểm tra kỹ lưỡng trước khi mua.</li></ul><h2 class='text-success'>Lời khuyên:</h2><p>Luôn luôn giữ đồ chơi sạch sẽ và kiểm tra định kỳ để đảm bảo an toàn cho trẻ.</p>",
                'raw_content' => "Bí quyết chọn mua đồ chơi an toàn cho trẻ nhỏ Việc chọn mua đồ chơi cho trẻ nhỏ không chỉ đơn giản là lựa chọn theo sở thích mà còn cần phải cân nhắc đến yếu tố an toàn. Dưới đây là những bí quyết cần nhớ khi mua đồ chơi cho trẻ em. Những điều cần lưu ý: - Chọn đồ chơi phù hợp với độ tuổi của trẻ. - Chọn đồ chơi không có phần nhọn, sắc. - Chọn đồ chơi có nguồn gốc xuất xứ rõ ràng. - Kiểm tra kỹ lưỡng trước khi mua. Lời khuyên: Luôn luôn giữ đồ chơi sạch sẽ và kiểm tra định kỳ để đảm bảo an toàn cho trẻ."
            ],
            [
                'title' => 'Hãy chia sẻ kinh nghiệm của bạn trong việc học trực tuyến',
                'description' => 'Dù bạn là học sinh, sinh viên hay người đi làm, hãy đặt câu hỏi và thảo luận về kinh nghiệm học trực tuyến của bạn.',
                'content' => "<h1 class='text-primary'>Thảo luận: Hãy chia sẻ kinh nghiệm của bạn trong việc học trực tuyến</h1><p>Dù bạn là học sinh, sinh viên hay người đi làm, hãy đặt câu hỏi và thảo luận về kinh nghiệm học trực tuyến của bạn. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Phương pháp nào giúp bạn duy trì tập trung khi học trực tuyến?</li><li>Làm thế nào để tạo điều kiện học tốt nhất tại nhà?</li><li>Phương pháp nào giúp bạn quản lý thời gian hiệu quả khi học trực tuyến?</li><li>Có cách nào để tận dụng tối đa các tài nguyên trực tuyến để học tập?</li><li>Bạn có gợi ý nào cho việc học trực tuyến mà bạn muốn chia sẻ với cộng đồng không?</li></ul><h2 class='text-success'>Chia sẻ kinh nghiệm:</h2><p>Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc học trực tuyến để giúp những người khác tận dụng tốt nhất các cơ hội học tập trực tuyến.</p>",
                'raw_content' => "Thảo luận: Hãy chia sẻ kinh nghiệm của bạn trong việc học trực tuyến Dù bạn là học sinh, sinh viên hay người đi làm, hãy đặt câu hỏi và thảo luận về kinh nghiệm học trực tuyến của bạn. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận. Câu hỏi thảo luận: - Phương pháp nào giúp bạn duy trì tập trung khi học trực tuyến? - Làm thế nào để tạo điều kiện học tốt nhất tại nhà? - Phương pháp nào giúp bạn quản lý thời gian hiệu quả khi học trực tuyến? - Có cách nào để tận dụng tối đa các tài nguyên trực tuyến để học tập? - Bạn có gợi ý nào cho việc học trực tuyến mà bạn muốn chia sẻ với cộng đồng không? Chia sẻ kinh nghiệm: Hãy chia sẻ những kinh nghiệm, gợi ý và lời khuyên của bạn về việc học trực tuyến để giúp những người khác tận dụng tốt nhất các cơ hội học tập trực tuyến."
            ],
            [
                'title' => '5 công thức làm bánh ngon không thể bỏ qua',
                'description' => 'Khám phá 5 công thức làm bánh độc đáo và ngon miệng để thưởng thức cùng gia đình và bạn bè.',
                'content' => "<h1 class='text-primary'>5 công thức làm bánh ngon không thể bỏ qua</h1><p>Để tạo ra những chiếc bánh ngon và hấp dẫn, bạn không cần phải là đầu bếp chuyên nghiệp. Dưới đây là 5 công thức làm bánh độc đáo và ngon miệng mà bạn có thể thử làm tại nhà.</p><h2 class='text-info'>Công thức bánh:</h2><ul class='list-unstyled'><li>Bánh mì nướng tỏi bơ.</li><li>Bánh cheesecake dâu.</li><li>Bánh tiramisu chocolate.</li><li>Bánh mì bơ tỏi.</li><li>Bánh cookie hạnh nhân.</li></ul><h2 class='text-success'>Cách làm:</h2><p>Theo dõi các bước chi tiết trong từng công thức để có được những chiếc bánh ngon nhất.</p>",
                'raw_content' => "5 công thức làm bánh ngon không thể bỏ qua Để tạo ra những chiếc bánh ngon và hấp dẫn, bạn không cần phải là đầu bếp chuyên nghiệp. Dưới đây là 5 công thức làm bánh độc đáo và ngon miệng mà bạn có thể thử làm tại nhà. Công thức bánh: - Bánh mì nướng tỏi bơ. - Bánh cheesecake dâu. - Bánh tiramisu chocolate. - Bánh mì bơ tỏi. - Bánh cookie hạnh nhân. Cách làm: Theo dõi các bước chi tiết trong từng công thức để có được những chiếc bánh ngon nhất."
            ],
            [
                'title' => 'Có nên bắt đầu kinh doanh trực tuyến trong tình hình hiện nay?',
                'description' => 'Nếu bạn đang phân vân về việc bắt đầu kinh doanh trực tuyến, hãy đặt câu hỏi và chia sẻ quan điểm với cộng đồng.',
                'content' => "<h1 class='text-primary'>Hỏi: Có nên bắt đầu kinh doanh trực tuyến trong tình hình hiện nay?</h1><p>Nếu bạn đang phân vân về việc bắt đầu kinh doanh trực tuyến, hãy đặt câu hỏi và chia sẻ quan điểm của bạn với cộng đồng. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận.</p><h2 class='text-info'>Câu hỏi thảo luận:</h2><ul class='list-unstyled'><li>Điều gì làm cho việc kinh doanh trực tuyến trở thành một cơ hội trong tình hình hiện nay?</li><li>Phương pháp nào có thể giúp bạn bắt đầu kinh doanh trực tuyến một cách hiệu quả?</li><li>Làm thế nào để tạo ra một kế hoạch kinh doanh trực tuyến thành công?</li><li>Có rủi ro nào bạn cần cân nhắc khi bắt đầu kinh doanh trực tuyến?</li><li>Bạn có quan điểm gì về việc bắt đầu kinh doanh trực tuyến mà bạn muốn chia sẻ với cộng đồng không?</li></ul><h2 class='text-success'>Chia sẻ quan điểm:</h2><p>Hãy chia sẻ quan điểm của bạn và thảo luận về ưu điểm, nhược điểm và cơ hội của việc kinh doanh trực tuyến trong thời điểm hiện tại.</p>",
                'raw_content' => "Hỏi: Có nên bắt đầu kinh doanh trực tuyến trong tình hình hiện nay? Nếu bạn đang phân vân về việc bắt đầu kinh doanh trực tuyến, hãy đặt câu hỏi và chia sẻ quan điểm của bạn với cộng đồng. Dưới đây là một số câu hỏi bạn có thể đặt ra trong cuộc thảo luận. Câu hỏi thảo luận: - Điều gì làm cho việc kinh doanh trực tuyến trở thành một cơ hội trong tình hình hiện nay? - Phương pháp nào có thể giúp bạn bắt đầu kinh doanh trực tuyến một cách hiệu quả? - Làm thế nào để tạo ra một kế hoạch kinh doanh trực tuyến thành công? - Có rủi ro nào bạn cần cân nhắc khi bắt đầu kinh doanh trực tuyến? - Bạn có quan điểm gì về việc bắt đầu kinh doanh trực tuyến mà bạn muốn chia sẻ với cộng đồng không? Chia sẻ quan điểm: Hãy chia sẻ quan điểm của bạn và thảo luận về ưu điểm, nhược điểm và cơ hội của việc kinh doanh trực tuyến trong thời điểm hiện tại."
            ],
            [
                'title' => 'Cách chăm sóc cây cảnh trong nhà cho người mới bắt đầu',
                'description' => 'Khám phá những bước cơ bản để chăm sóc cây cảnh trong nhà một cách hiệu quả, đặc biệt dành cho người mới bắt đầu.',
                'content' => "<h1 class='text-primary'>Cách chăm sóc cây cảnh trong nhà cho người mới bắt đầu</h1><p>Chăm sóc cây cảnh trong nhà là một hoạt động thú vị và mang lại nhiều lợi ích cho sức khỏe và tinh thần. Dưới đây là những bước cơ bản mà người mới bắt đầu có thể thực hiện để chăm sóc cây cảnh trong nhà một cách hiệu quả.</p><h2 class='text-info'>Những bước cơ bản:</h2><ul class='list-unstyled'><li>Chọn cây phù hợp với điều kiện ánh sáng và không gian.</li><li>Thực hiện việc tưới nước đều đặn nhưng đừng làm cây ngập nước.</li><li>Chăm sóc đất và bón phân định kỳ.</li><li>Quan sát và kiểm tra sức khỏe của cây định kỳ.</li><li>Thuốc trừ sâu và xử lý vết thương cho cây nếu cần.</li></ul><h2 class='text-success'>Lưu ý quan trọng:</h2><p>Luôn tìm hiểu về cây cảnh bạn đang chăm sóc để có thể cung cấp điều kiện tốt nhất cho chúng.</p>",
                'raw_content' => "Cách chăm sóc cây cảnh trong nhà cho người mới bắt đầu Chăm sóc cây cảnh trong nhà là một hoạt động thú vị và mang lại nhiều lợi ích cho sức khỏe và tinh thần. Dưới đây là những bước cơ bản mà người mới bắt đầu có thể thực hiện để chăm sóc cây cảnh trong nhà một cách hiệu quả. Những bước cơ bản: - Chọn cây phù hợp với điều kiện ánh sáng và không gian. - Thực hiện việc tưới nước đều đặn nhưng đừng làm cây ngập nước. - Chăm sóc đất và bón phân định kỳ. - Quan sát và kiểm tra sức khỏe của cây định kỳ. - Thuốc trừ sâu và xử lý vết thương cho cây nếu cần. Lưu ý quan trọng: Luôn tìm hiểu về cây cảnh bạn đang chăm sóc để có thể cung cấp điều kiện tốt nhất cho chúng."
            ],
            [
                'title' => '5 công thức món salad độc đáo và bổ dưỡng',
                'description' => 'Khám phá 5 công thức món salad sáng tạo và bổ dưỡng để làm mới bữa ăn hàng ngày của bạn.',
                'content' => "<h1 class='text-primary'>5 công thức món salad độc đáo và bổ dưỡng</h1><p>Món salad không chỉ là một lựa chọn ăn khéo léo mà còn là cách tốt nhất để cung cấp dinh dưỡng cho cơ thể. Dưới đây là 5 công thức món salad sáng tạo và bổ dưỡng mà bạn có thể thử làm để làm mới bữa ăn hàng ngày của mình.</p><h2 class='text-info'>Công thức salad:</h2><ul class='list-unstyled'><li>Salad gà hấp.</li><li>Salad trứng cà chua.</li><li>Salad hải sản phong cách Ý.</li><li>Salad rau củ tươi ngon.</li><li>Salad hạnh nhân và cà rốt.</li></ul><h2 class='text-success'>Cách làm:</h2><p>Theo dõi các bước chi tiết trong từng công thức để tạo ra những chiếc salad ngon và bổ dưỡng nhất.</p>",
                'raw_content' => "5 công thức món salad độc đáo và bổ dưỡng Món salad không chỉ là một lựa chọn ăn khéo léo mà còn là cách tốt nhất để cung cấp dinh dưỡng cho cơ thể. Dưới đây là 5 công thức món salad sáng tạo và bổ dưỡng mà bạn có thể thử làm để làm mới bữa ăn hàng ngày của mình. Công thức salad: - Salad gà hấp. - Salad trứng cà chua. - Salad hải sản phong cách Ý. - Salad rau củ tươi ngon. - Salad hạnh nhân và cà rốt. Cách làm: Theo dõi các bước chi tiết trong từng công thức để tạo ra những chiếc salad ngon và bổ dưỡng nhất."
            ],
            [
                'title' => 'Tác dụng tuyệt vời của việc học nhạc đối với trẻ em',
                'description' => 'Khám phá những tác dụng tích cực mà việc học nhạc mang lại cho sự phát triển toàn diện của trẻ em.',
                'content' => "<h1 class='text-primary'>Tác dụng tuyệt vời của việc học nhạc đối với trẻ em</h1><p>Việc học nhạc không chỉ mang lại niềm vui và sự sáng tạo mà còn có nhiều tác dụng tích cực khác đối với sự phát triển của trẻ em. Dưới đây là những lợi ích tuyệt vời mà việc học nhạc mang lại cho trẻ em.</p><h2 class='text-info'>Tác dụng của học nhạc:</h2><ul class='list-unstyled'><li>Phát triển trí não và khả năng tư duy.</li><li>Giúp trẻ cảm nhận và thể hiện cảm xúc.</li><li>Thúc đẩy sự phát triển văn hóa và xã hội.</li><li>Giảm căng thẳng và cải thiện tâm trạng.</li><li>Phát triển kỹ năng xã giao và tương tác xã hội.</li></ul><h2 class='text-success'>Lời khuyên:</h2><p>Hãy khuyến khích trẻ em tham gia vào việc học nhạc từ khi còn nhỏ để tận hưởng những lợi ích đa dạng mà nó mang lại.</p>",
                'raw_content' => "Tác dụng tuyệt vời của việc học nhạc đối với trẻ em Việc học nhạc không chỉ mang lại niềm vui và sự sáng tạo mà còn có nhiều tác dụng tích cực khác đối với sự phát triển của trẻ em. Dưới đây là những lợi ích tuyệt vời mà việc học nhạc mang lại cho trẻ em. Tác dụng của học nhạc: - Phát triển trí não và khả năng tư duy. - Giúp trẻ cảm nhận và thể hiện cảm xúc. - Thúc đẩy sự phát triển văn hóa và xã hội. - Giảm căng thẳng và cải thiện tâm trạng. - Phát triển kỹ năng xã giao và tương tác xã hội. Lời khuyên: Hãy khuyến khích trẻ em tham gia vào việc học nhạc từ khi còn nhỏ để tận hưởng những lợi ích đa dạng mà nó mang lại."
            ]

        ];

        foreach ($contents as $content) {
            // Insert thread data
            $threadId = DB::table('threads')->insertGetId([
                'title' => $content['title'],
                'description' => $content['description'],
                'content' => $content['content'],
                'raw_content' => $content['raw_content'],
                'view' => rand(0, 100),
                'like' => 0, // Initialize likes to 0
                'dislike' => 0, // Initialize dislikes to 0
                'reply' => 0,
                'category_id' => rand(1, 6),
                'user_id' => rand(1, 10),
                'created_by' => 1,
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_by' => 1,
                'updated_at' => now()->subDays(rand(1, 30)),
                'deleted_by' => null,
                'deleted_at' => null,
            ]);

            DB::table('validations')->insert([
                'thread_id'=>$threadId,
                'status'=>1 //allow status
            ]);

            // Determine the number of likes and dislikes for this thread
            $numLikes = rand(0, 20);
            $numDislikes = rand(0, 10);

            // Insert reactions for this thread
            for ($i = 0; $i < $numLikes; $i++) {
                DB::table('reacts')->insert([
                    'like' => 1, // Indicate like
                    'reply_id' => null, // Thread reaction, so no reply_id
                    'user_id' => rand(1, 10),
                    'thread_id' => $threadId,
                    'created_by' => 1,
                    'created_at' => now()->subDays(rand(1, 30)),
                    'updated_by' => 1,
                    'updated_at' => now()->subDays(rand(1, 30)),
                    'deleted_by' => null,
                    'deleted_at' => null,
                ]);
            }

            for ($i = 0; $i < $numDislikes; $i++) {
                DB::table('reacts')->insert([
                    'like' => 0, // Indicate dislike
                    'reply_id' => null, // Thread reaction, so no reply_id
                    'user_id' => rand(1, 10),
                    'thread_id' => $threadId,
                    'created_by' => 1,
                    'created_at' => now()->subDays(rand(1, 30)),
                    'updated_by' => 1,
                    'updated_at' => now()->subDays(rand(1, 30)),
                    'deleted_by' => null,
                    'deleted_at' => null,
                ]);
            }

            // Update the thread with the actual like and dislike counts and reply count
            DB::table('threads')
                ->where('id', $threadId)
                ->update([
                    'like' => $numLikes,
                    'dislike' => $numDislikes,
                ]);
        }
    }
}
