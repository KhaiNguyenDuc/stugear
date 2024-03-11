<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReplySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    public function run()
    {
        $contents = [
            [
                'content' => "<p>Mình nghĩ chúng ta cần tìm hiểu sâu hơn về vấn đề này. <span class='highlight'>Bạn đồng ý không?</span></p>",
                'raw_content' => "Mình nghĩ chúng ta cần tìm hiểu sâu hơn về vấn đề này. Bạn đồng ý không?"
            ],
            [
                'content' => "<p>Một góc nhìn khác về vấn đề này. <span class='important'>Bạn nghĩ thế nào?</span></p>",
                'raw_content' => "Một góc nhìn khác về vấn đề này. Bạn nghĩ thế nào?"
            ],
            [
                'content' => "<p>Cảm thấy rất hứng thú với vấn đề này. <span class='note'>Mọi người thấy sao?</span></p>",
                'raw_content' => "Cảm thấy rất hứng thú với vấn đề này. Mọi người thấy sao?"
            ],
            [
                'content' => "<p>Chia sẻ cảm nghĩ về vấn đề này. <span class='highlight'>Bạn cũng có cảm xúc như mình không?</span></p>",
                'raw_content' => "Chia sẻ cảm nghĩ về vấn đề này. Bạn cũng có cảm xúc như mình không?"
            ],
            [
                'content' => "<p>Nhận xét về quan điểm của bạn. <span class='important'>Mình cần biết ý kiến của bạn.</span></p>",
                'raw_content' => "Nhận xét về quan điểm của bạn. Mình cần biết ý kiến của bạn."
            ],
            [
                'content' => "<p>Mình đang cần ý kiến từ mọi người. <span class='highlight'>Ai muốn chia sẻ không?</span></p>",
                'raw_content' => "Mình đang cần ý kiến từ mọi người. Ai muốn chia sẻ không?"
            ],
            [
                'content' => "<p>Hỏi ý kiến mọi người về vấn đề này. <span class='note'>Mình quan tâm đến ý kiến của mọi người.</span></p>",
                'raw_content' => "Hỏi ý kiến mọi người về vấn đề này. Mình quan tâm đến ý kiến của mọi người."
            ],
            [
                'content' => "<p>Chia sẻ ý kiến và thảo luận cùng mọi người. <span class='important'>Cùng nhau tìm ra giải pháp nhé!</span></p>",
                'raw_content' => "Chia sẻ ý kiến và thảo luận cùng mọi người. Cùng nhau tìm ra giải pháp nhé!"
            ],
            [
                'content' => "<p>Một góc nhìn mới về vấn đề này. <span class='highlight'>Chúng ta nên xem xét điều này.</span></p>",
                'raw_content' => "Một góc nhìn mới về vấn đề này. Chúng ta nên xem xét điều này."
            ],
            [
                'content' => "<p>Một số ý kiến của mình về vấn đề này. <span class='note'>Mình rất mong nghe ý kiến của mọi người.</span></p>",
                'raw_content' => "Một số ý kiến của mình về vấn đề này. Mình rất mong nghe ý kiến của mọi người."
            ],
            [
                'content' => "<p>Có vẻ như chúng ta đang tiến triển về hướng tích cực. <span class='highlight'>Bạn nghĩ sao?</span></p>",
                'raw_content' => "Có vẻ như chúng ta đang tiến triển về hướng tích cực. Bạn nghĩ sao?"
            ],
            [
                'content' => "<p>Mình nghĩ có một số phương án khả thi cho vấn đề này. <span class='important'>Bạn muốn biết thêm không?</span></p>",
                'raw_content' => "Mình nghĩ có một số phương án khả thi cho vấn đề này. Bạn muốn biết thêm không?"
            ],
            [
                'content' => "<p>Mình cảm thấy rất hứng thú về chủ đề này. <span class='note'>Bạn cảm thấy thế nào?</span></p>",
                'raw_content' => "Mình cảm thấy rất hứng thú về chủ đề này. Bạn cảm thấy thế nào?"
            ],
            [
                'content' => "<p>Mình nghĩ chúng ta nên tập trung vào một số giải pháp cụ thể. <span class='highlight'>Bạn có đồng ý không?</span></p>",
                'raw_content' => "Mình nghĩ chúng ta nên tập trung vào một số giải pháp cụ thể. Bạn có đồng ý không?"
            ],
            [
                'content' => "<p>Ý kiến của bạn rất quan trọng đối với cuộc thảo luận này. <span class='important'>Bạn có gì để chia sẻ không?</span></p>",
                'raw_content' => "Ý kiến của bạn rất quan trọng đối với cuộc thảo luận này. Bạn có gì để chia sẻ không?"
            ],
            [
                'content' => "<p>Chúng ta cần nhìn nhận vấn đề này từ nhiều góc độ khác nhau. <span class='note'>Cùng thảo luận để tìm ra cách tiếp cận tốt nhất.</span></p>",
                'raw_content' => "Chúng ta cần nhìn nhận vấn đề này từ nhiều góc độ khác nhau. Cùng thảo luận để tìm ra cách tiếp cận tốt nhất."
            ],
            [
                'content' => "<p>Cảm ơn bạn đã chia sẻ quan điểm của mình. <span class='highlight'>Rất mong bạn tiếp tục thảo luận với chúng tôi.</span></p>",
                'raw_content' => "Cảm ơn bạn đã chia sẻ quan điểm của mình. Rất mong bạn tiếp tục thảo luận với chúng tôi."
            ],
            [
                'content' => "<p>Mình nghĩ chúng ta cần tìm hiểu sâu hơn về vấn đề này. <span class='important'>Bạn đồng ý không?</span></p>",
                'raw_content' => "Mình nghĩ chúng ta cần tìm hiểu sâu hơn về vấn đề này. Bạn đồng ý không?"
            ],
            [
                'content' => "<p>Bạn nghĩ sao về góc nhìn của mình? <span class='highlight'>Mình đang cần ý kiến của bạn.</span></p>",
                'raw_content' => "Bạn nghĩ sao về góc nhìn của mình? Mình đang cần ý kiến của bạn."
            ],
            [
                'content' => "<p>Mình cảm thấy thú vị khi thảo luận về vấn đề này. <span class='note'>Bạn cảm thấy thế nào?</span></p>",
                'raw_content' => "Mình cảm thấy thú vị khi thảo luận về vấn đề này. Bạn cảm thấy thế nào?"
            ],
            [
                'content' => "<p>Mình đồng ý với quan điểm của bạn. <span class='important'>Cùng nhau tìm hiểu thêm điều này nhé!</span></p>",
                'raw_content' => "Mình đồng ý với quan điểm của bạn. Cùng nhau tìm hiểu thêm điều này nhé!"
            ],
            [
                'content' => "<p>Cảm ơn bạn đã chia sẻ ý kiến của mình. <span class='highlight'>Rất mong được nghe thêm từ bạn.</span></p>",
                'raw_content' => "Cảm ơn bạn đã chia sẻ ý kiến của mình. Rất mong được nghe thêm từ bạn."
            ],
            [
                'content' => "<p>Mình cảm thấy hạnh phúc vì có thể thảo luận với mọi người. <span class='important'>Mong muốn nhận được nhiều ý kiến từ bạn!</span></p>",
                'raw_content' => "Mình cảm thấy hạnh phúc vì có thể thảo luận với mọi người. Mong muốn nhận được nhiều ý kiến từ bạn!"
            ],
            [
                'content' => "<p>Chúng ta cần tập trung vào giải pháp thực tế. <span class='highlight'>Mong bạn cùng thảo luận để tìm ra giải pháp.</span></p>",
                'raw_content' => "Chúng ta cần tập trung vào giải pháp thực tế. Mong bạn cùng thảo luận để tìm ra giải pháp."
            ],
            [
                'content' => "<p>Mình rất quan tâm đến ý kiến của bạn. <span class='note'>Rất mong bạn sẽ chia sẻ thêm!</span></p>",
                'raw_content' => "Mình rất quan tâm đến ý kiến của bạn. Rất mong bạn sẽ chia sẻ thêm!"
            ],
            [
                'content' => "<p>Mình nghĩ chúng ta nên tìm hiểu kỹ hơn về vấn đề này. <span class='important'>Bạn có ý kiến gì không?</span></p>",
                'raw_content' => "Mình nghĩ chúng ta nên tìm hiểu kỹ hơn về vấn đề này. Bạn có ý kiến gì không?"
            ],
            [
                'content' => "<p>Mình muốn biết bạn nghĩ gì về vấn đề này. <span class='highlight'>Mong bạn sẽ chia sẻ suy nghĩ của mình.</span></p>",
                'raw_content' => "Mình muốn biết bạn nghĩ gì về vấn đề này. Mong bạn sẽ chia sẻ suy nghĩ của mình."
            ],
            [
                'content' => "<p>Cảm ơn bạn đã đóng góp ý kiến. <span class='important'>Mình mong được nghe thêm từ bạn.</span></p>",
                'raw_content' => "Cảm ơn bạn đã đóng góp ý kiến. Mình mong được nghe thêm từ bạn."
            ],
            [
                'content' => "<p>Bạn cảm thấy thế nào về quan điểm của mình? <span class='highlight'>Mình rất muốn biết ý kiến của bạn.</span></p>",
                'raw_content' => "Bạn cảm thấy thế nào về quan điểm của mình? Mình rất muốn biết ý kiến của bạn."
            ],
            [
                'content' => "<p>Mình cảm ơn bạn đã đóng góp vào cuộc thảo luận này. <span class='note'>Rất mong được nghe ý kiến của bạn.</span></p>",
                'raw_content' => "Mình cảm ơn bạn đã đóng góp vào cuộc thảo luận này. Rất mong được nghe ý kiến của bạn."
            ],
            [
                'content' => "<p>Mình không chắc là ý kiến đó là đúng. <span class='highlight'>Có vẻ như cần phải xem xét kỹ hơn.</span></p>",
                'raw_content' => "Mình không chắc là ý kiến đó là đúng. Có vẻ như cần phải xem xét kỹ hơn."
            ],
            [
                'content' => "<p>Đó là một góc nhìn khá khác biệt so với quan điểm của mình. <span class='important'>Mình cần thời gian để suy nghĩ về điều này.</span></p>",
                'raw_content' => "Đó là một góc nhìn khá khác biệt so với quan điểm của mình. Mình cần thời gian để suy nghĩ về điều này."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='note'>Có vẻ như cần một cuộc thảo luận chi tiết hơn.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Có vẻ như cần một cuộc thảo luận chi tiết hơn."
            ],
            [
                'content' => "<p>Mình cảm thấy quan điểm đó hơi mâu thuẫn. <span class='highlight'>Có lẽ cần phải xem xét lại.</span></p>",
                'raw_content' => "Mình cảm thấy quan điểm đó hơi mâu thuẫn. Có lẽ cần phải xem xét lại."
            ],
            [
                'content' => "<p>Điều đó không chính xác theo quan điểm của mình. <span class='important'>Cần một cái nhìn toàn diện hơn về vấn đề này.</span></p>",
                'raw_content' => "Điều đó không chính xác theo quan điểm của mình. Cần một cái nhìn toàn diện hơn về vấn đề này."
            ],
            [
                'content' => "<p>Mình không thấy đồng tình với quan điểm đó. <span class='note'>Có lẽ cần phải thảo luận kỹ hơn.</span></p>",
                'raw_content' => "Mình không thấy đồng tình với quan điểm đó. Có lẽ cần phải thảo luận kỹ hơn."
            ],
            [
                'content' => "<p>Mình nghĩ có một số khía cạnh cần phải được cân nhắc kỹ hơn. <span class='highlight'>Có lẽ quan điểm của mình sẽ khác.</span></p>",
                'raw_content' => "Mình nghĩ có một số khía cạnh cần phải được cân nhắc kỹ hơn. Có lẽ quan điểm của mình sẽ khác."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='important'>Cần một bước tiến xa hơn trong cuộc thảo luận này.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Cần một bước tiến xa hơn trong cuộc thảo luận này."
            ],
            [
                'content' => "<p>Mình cảm thấy khó khăn để chấp nhận quan điểm đó. <span class='note'>Có lẽ cần phải tìm hiểu thêm.</span></p>",
                'raw_content' => "Mình cảm thấy khó khăn để chấp nhận quan điểm đó. Có lẽ cần phải tìm hiểu thêm."
            ],
            [
                'content' => "<p>Mình không thấy hợp lý với quan điểm đó. <span class='highlight'>Có lẽ cần một cái nhìn khác.</span></p>",
                'raw_content' => "Mình không thấy hợp lý với quan điểm đó. Có lẽ cần một cái nhìn khác."
            ],
            [
                'content' => "<p>Mình không chắc về quan điểm đó. <span class='highlight'>Có lẽ cần phải xem xét từ một góc nhìn khác.</span></p>",
                'raw_content' => "Mình không chắc về quan điểm đó. Có lẽ cần phải xem xét từ một góc nhìn khác."
            ],
            [
                'content' => "<p>Mình cảm thấy có một số điểm cần được kiểm tra lại. <span class='important'>Có vẻ như cần một bàn thảo luận chi tiết hơn.</span></p>",
                'raw_content' => "Mình cảm thấy có một số điểm cần được kiểm tra lại. Có vẻ như cần một bàn thảo luận chi tiết hơn."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='note'>Có lẽ cần phải xem xét từ một góc độ khác.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Có lẽ cần phải xem xét từ một góc độ khác."
            ],
            [
                'content' => "<p>Đó là một ý kiến khá đặc biệt. <span class='highlight'>Có lẽ cần một cuộc trò chuyện sâu sắc hơn để hiểu rõ hơn.</span></p>",
                'raw_content' => "Đó là một ý kiến khá đặc biệt. Có lẽ cần một cuộc trò chuyện sâu sắc hơn để hiểu rõ hơn."
            ],
            [
                'content' => "<p>Mình cảm thấy có một số vấn đề cần được nắm bắt kỹ hơn. <span class='important'>Có lẽ cần phải đi vào chi tiết hơn về điều này.</span></p>",
                'raw_content' => "Mình cảm thấy có một số vấn đề cần được nắm bắt kỹ hơn. Có lẽ cần phải đi vào chi tiết hơn về điều này."
            ],
            [
                'content' => "<p>Mình không cảm thấy thoải mái với quan điểm đó. <span class='note'>Có lẽ cần phải xem xét từ nhiều góc nhìn hơn.</span></p>",
                'raw_content' => "Mình không cảm thấy thoải mái với quan điểm đó. Có lẽ cần phải xem xét từ nhiều góc nhìn hơn."
            ],
            [
                'content' => "<p>Mình không thấy hợp lý với quan điểm đó. <span class='highlight'>Cần phải có thêm thông tin để hiểu rõ hơn.</span></p>",
                'raw_content' => "Mình không thấy hợp lý với quan điểm đó. Cần phải có thêm thông tin để hiểu rõ hơn."
            ],
            [
                'content' => "<p>Mình cảm thấy có một số điểm cần được thảo luận thêm. <span class='important'>Có vẻ như cần phải đàm phán kỹ lưỡng hơn về vấn đề này.</span></p>",
                'raw_content' => "Mình cảm thấy có một số điểm cần được thảo luận thêm. Có vẻ như cần phải đàm phán kỹ lưỡng hơn về vấn đề này."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='note'>Cần một sự thảo luận rộng lớn hơn để làm sáng tỏ vấn đề.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Cần một sự thảo luận rộng lớn hơn để làm sáng tỏ vấn đề."
            ],
            [
                'content' => "<p>Mình nghĩ có một số vấn đề cần được giải quyết. <span class='highlight'>Có lẽ cần một cuộc thảo luận sâu sắc hơn.</span></p>",
                'raw_content' => "Mình nghĩ có một số vấn đề cần được giải quyết. Có lẽ cần một cuộc thảo luận sâu sắc hơn."
            ],
            [
                'content' => "<p>Mình không cảm thấy thoải mái với quan điểm đó. <span class='important'>Có lẽ cần phải đi sâu vào chi tiết hơn về vấn đề này.</span></p>",
                'raw_content' => "Mình không cảm thấy thoải mái với quan điểm đó. Có lẽ cần phải đi sâu vào chi tiết hơn về vấn đề này."
            ],
            [
                'content' => "<p>Mình không thấy hợp lý với quan điểm đó. <span class='note'>Cần một bước tiến mới trong cuộc thảo luận này.</span></p>",
                'raw_content' => "Mình không thấy hợp lý với quan điểm đó. Cần một bước tiến mới trong cuộc thảo luận này."
            ],
            [
                'content' => "<p>Mình cảm thấy có một số điều cần được xem xét kỹ hơn. <span class='highlight'>Có lẽ cần một cái nhìn tổng quan hơn về vấn đề này.</span></p>",
                'raw_content' => "Mình cảm thấy có một số điều cần được xem xét kỹ hơn. Có lẽ cần một cái nhìn tổng quan hơn về vấn đề này."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='important'>Cần một cuộc trò chuyện sâu sắc hơn để giải quyết vấn đề này.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Cần một cuộc trò chuyện sâu sắc hơn để giải quyết vấn đề này."
            ],
            [
                'content' => "<p>Mình nghĩ có một số điểm cần được thảo luận kỹ hơn. <span class='note'>Có lẽ cần phải có một cuộc trao đổi ý kiến chi tiết hơn.</span></p>",
                'raw_content' => "Mình nghĩ có một số điểm cần được thảo luận kỹ hơn. Có lẽ cần phải có một cuộc trao đổi ý kiến chi tiết hơn."
            ],
            [
                'content' => "<p>Mình không đồng ý với quan điểm đó. <span class='highlight'>Cần một góc nhìn rõ ràng hơn để hiểu vấn đề này.</span></p>",
                'raw_content' => "Mình không đồng ý với quan điểm đó. Cần một góc nhìn rõ ràng hơn để hiểu vấn đề này."
            ],
            [
                'content' => "<p>Mình cảm thấy có một số điều cần được xem xét kỹ hơn. <span class='important'>Có lẽ cần phải có một cuộc thảo luận sâu sắc hơn.</span></p>",
                'raw_content' => "Mình cảm thấy có một số điều cần được xem xét kỹ hơn. Có lẽ cần phải có một cuộc thảo luận sâu sắc hơn."
            ],
            [
                'content' => "<p>Mình không cảm thấy thoải mái với quan điểm đó. <span class='note'>Có lẽ cần phải có một cuộc trao đổi ý kiến chi tiết hơn.</span></p>",
                'raw_content' => "Mình không cảm thấy thoải mái với quan điểm đó. Có lẽ cần phải có một cuộc trao đổi ý kiến chi tiết hơn."
            ],
            [
                'content' => "<p>Mình không thấy hợp lý với quan điểm đó. <span class='highlight'>Có lẽ cần phải xem xét từ một góc nhìn khác.</span></p>",
                'raw_content' => "Mình không thấy hợp lý với quan điểm đó. Có lẽ cần phải xem xét từ một góc nhìn khác."
            ],
            [
                'content' => "<p>Mình nghĩ có một số điều cần được thảo luận kỹ hơn. <span class='important'>Có vẻ như cần phải đi sâu vào chi tiết hơn về vấn đề này.</span></p>",
                'raw_content' => "Mình nghĩ có một số điều cần được thảo luận kỹ hơn. Có vẻ như cần phải đi sâu vào chi tiết hơn về vấn đề này."
            ],
            [
                'content' => "<p>Hoàn toàn đồng ý với ý kiến của bạn. <span class='highlight'>Điều này rất đúng.</span></p>",
                'raw_content' => "Hoàn toàn đồng ý với ý kiến của bạn. Điều này rất đúng."
            ],
            [
                'content' => "<p>Đúng vậy, đó là quan điểm của mình. <span class='important'>Rất khả thi và cần thiết.</span></p>",
                'raw_content' => "Đúng vậy, đó là quan điểm của mình. Rất khả thi và cần thiết."
            ],
            [
                'content' => "<p>Điều đó hoàn toàn đúng. <span class='note'>Tôi hoàn toàn đồng ý với bạn.</span></p>",
                'raw_content' => "Điều đó hoàn toàn đúng. Tôi hoàn toàn đồng ý với bạn."
            ],
            [
                'content' => "<p>Chính xác như bạn nói. <span class='highlight'>Điều đó là đúng.</span></p>",
                'raw_content' => "Chính xác như bạn nói. Điều đó là đúng."
            ],
            [
                'content' => "<p>Đúng vậy, mình cũng nghĩ như vậy. <span class='important'>Rất đúng.</span></p>",
                'raw_content' => "Đúng vậy, mình cũng nghĩ như vậy. Rất đúng."
            ],
            [
                'content' => "<p>Chính xác, mình hoàn toàn đồng ý. <span class='note'>Rất chính xác.</span></p>",
                'raw_content' => "Chính xác, mình hoàn toàn đồng ý. Rất chính xác."
            ],
            [
                'content' => "<p>Hoàn toàn đồng ý với quan điểm của bạn. <span class='highlight'>Điều đó là rất đúng.</span></p>",
                'raw_content' => "Hoàn toàn đồng ý với quan điểm của bạn. Điều đó là rất đúng."
            ],
            [
                'content' => "<p>Chính xác như vậy, mình cũng nghĩ vậy. <span class='important'>Rất đúng.</span></p>",
                'raw_content' => "Chính xác như vậy, mình cũng nghĩ vậy. Rất đúng."
            ],
            [
                'content' => "<p>Hoàn toàn đồng ý với ý kiến của bạn. <span class='note'>Điều đó là rất chính xác.</span></p>",
                'raw_content' => "Hoàn toàn đồng ý với ý kiến của bạn. Điều đó là rất chính xác."
            ],
            [
                'content' => "<p>Đúng vậy, mình cũng nghĩ như vậy. <span class='highlight'>Rất đúng.</span></p>",
                'raw_content' => "Đúng vậy, mình cũng nghĩ như vậy. Rất đúng."
            ],
            [
                'content' => "<p>Chính xác, tôi hoàn toàn đồng ý. <span class='important'>Điều đó là chính xác.</span></p>",
                'raw_content' => "Chính xác, tôi hoàn toàn đồng ý. Điều đó là chính xác."
            ],
            [
                'content' => "<p>Đúng vậy, đó là quan điểm của mình. <span class='note'>Rất khả thi và cần thiết.</span></p>",
                'raw_content' => "Đúng vậy, đó là quan điểm của mình. Rất khả thi và cần thiết."
            ],
            [
                'content' => "<p>Hoàn toàn đúng, mình cũng nghĩ như vậy. <span class='highlight'>Rất chính xác.</span></p>",
                'raw_content' => "Hoàn toàn đúng, mình cũng nghĩ như vậy. Rất chính xác."
            ],
            [
                'content' => "<p>Chính xác như vậy, mình cũng nghĩ như vậy. <span class='important'>Rất chính xác.</span></p>",
                'raw_content' => "Chính xác như vậy, mình cũng nghĩ như vậy. Rất chính xác."
            ],
            [
                'content' => "<p>Hoàn toàn đồng ý với quan điểm của bạn. <span class='note'>Điều đó là rất chính xác.</span></p>",
                'raw_content' => "Hoàn toàn đồng ý với quan điểm của bạn. Điều đó là rất chính xác."
            ],
            [
                'content' => "<p>Đúng vậy, mình cũng nghĩ như vậy. <span class='highlight'>Rất đúng.</span></p>",
                'raw_content' => "Đúng vậy, mình cũng nghĩ như vậy. Rất đúng."
            ],
            [
                'content' => "<p>Chính xác, tôi hoàn toàn đồng ý. <span class='important'>Điều đó là chính xác.</span></p>",
                'raw_content' => "Chính xác, tôi hoàn toàn đồng ý. Điều đó là chính xác."
            ],
            [
                'content' => "<p>Đúng vậy, đó là quan điểm của mình. <span class='note'>Rất khả thi và cần thiết.</span></p>",
                'raw_content' => "Đúng vậy, đó là quan điểm của mình. Rất khả thi và cần thiết."
            ],
            [
                'content' => "<p>Hoàn toàn đúng, mình cũng nghĩ như vậy. <span class='highlight'>Rất chính xác.</span></p>",
                'raw_content' => "Hoàn toàn đúng, mình cũng nghĩ như vậy. Rất chính xác."
            ],
            [
                'content' => "<p>Chính xác như vậy, mình cũng nghĩ như vậy. <span class='important'>Rất chính xác.</span></p>",
                'raw_content' => "Chính xác như vậy, mình cũng nghĩ như vậy. Rất chính xác."
            ]
        ];
        
        for ($i = 0; $i < 18; $i++){
            DB::table('replies')->insert([
                'content' => $contents[$i]['content'],
                'raw_content' => $contents[$i]['raw_content'],
                'user_id' => rand(1, 10),
                'like' => rand(0, 100),
                'dislike' => rand(0, 20),
                'thread_id' => rand(1, 14),
                'created_by' => 1,
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_by' => 1,
                'updated_at' => now()->subDays(rand(1, 30)),
                'deleted_by' => null,
                'deleted_at' => null,
            ]);
        }

        for ($i = 19; $i < count($contents); $i++){

            DB::table('replies')->insert([
                'content' => $contents[$i]['content'],
                'raw_content' => $contents[$i]['raw_content'],
                'user_id' => rand(1, 10),
                'parent_id' => rand(1, 18), // assuming this is required
                'reply_on' => rand(1, 10), // assuming this is required
                'like' => rand(0, 100),
                'dislike' => rand(0, 20),
                'thread_id' => rand(1, 14),
                'created_by' => 1,
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_by' => 1,
                'updated_at' => now()->subDays(rand(1, 30)),
                'deleted_by' => null,
                'deleted_at' => null,
            ]);
        }
    }
}
