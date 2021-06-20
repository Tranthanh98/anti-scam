import React from "react";
import PropTypes from "prop-types";
import { Box, useTheme } from "@material-ui/core";
import logoText from "../../assets/images/questions.png";
import EmailIcon from "@material-ui/icons/Email";
import step1Img from "../../assets/images/step1.png";
import step2Img from "../../assets/images/step2.png";
import successImg from "../../assets/images/success.png";

function AskedQuestions(props) {
  const widthScreen = window.innerWidth;
  const theme = useTheme();
  return (
    <>
      <Box width="100%" marginTop="-80px">
        <img
          src={logoText}
          style={{ maxWidth: "100%" }}
          alt="Câu hỏi thường gặp - ANTISCAM VIETNAM"
        />
      </Box>
      <Box
        padding={widthScreen > 960 ? "0 96px" : undefined}
        justifyContent="center"
        minHeight="100vh"
        marginTop="12px"
      >
        <Box>
          <Box
            margin="16px"
            textAlign="center"
            fontWeight="bold"
            style={{ color: "#808080" }}
            fontSize="24px"
            letterSpacing="0.8px"
          >
            CÁC CÂU HỎI THƯỜNG GẶP
          </Box>
          <Box
            margin="16px"
            textAlign="center"
            fontWeight="bold"
            style={{ color: "#13528a" }}
            fontSize="20px"
            letterSpacing="0.8px"
          >
            VỀ BÁO CÁO LỪA ĐẢO
          </Box>
          <Box
            textAlign="left"
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            lineHeight={1.5}
          >
            <Box margin="8px 0" fontWeight="bold">
              1. Làm thế nào để tôi có thể báo cáo lừa đảo?
            </Box>
            <Box margin="8px 0">
              Dưới đây là các bước sẽ giúp bạn biết cách báo cáo lừa đảo:
            </Box>
            <Box margin="8px 0">
              Bước 1. Click chuột vào nút Báo Cáo Lừa Đảo trên trang chủ:
              <Box
                margin="8px 0 24px 0"
                width="100%"
                display="flex"
                justifyContent="center"
              >
                <img
                  alt="Bước 1 báo cáo lừa đảo anti scam vietnam, antiscam, anti-scam"
                  style={{ maxWidth: "100%" }}
                  src={step1Img}
                />
              </Box>
            </Box>
            <Box margin="8px 0 24px 0">
              Bước 2. Tại form báo cáo lừa đảo click vào nút thả xuống tại ô{" "}
              <span style={{ color: theme.palette.error.main }}>Thể loại</span>{" "}
              lừa đảo, chọn thông tin của kẻ lừa đảo mà bạn đang có (SDT, STK,
              LINK,...) sau đó chọn{" "}
              <span style={{ fontWeight: "bold" }}>THÊM</span>, tiếp tục điền
              các phần còn lại như{" "}
              <span style={{ fontWeight: "bold" }}>Tiêu đề</span> (VD: cảnh giác
              lừa đảo ví điện tử,...),{" "}
              <span style={{ color: theme.palette.error.main }}>Mô tả</span> và
              cuối cùng là <span style={{ fontWeight: "bold" }}>XÁC NHẬN</span>{" "}
              và gửi báo cáo.
              <Box
                margin="8px 0"
                width="100%"
                display="flex"
                justifyContent="center"
              >
                <img
                  alt="Bước 2 báo cáo lừa đảo anti scam vietnam, antiscam, anti-scam"
                  style={{ maxWidth: "100%" }}
                  src={step2Img}
                />
              </Box>
            </Box>
            <Box margin="8px 0 24px 0">
              Bước 3. Sau khi gửi báo cáo và xác nhận đăng bài, bạn sẽ nhận được
              thông báo và bài của bạn sẽ sớm xuất hiện trên Website của chúng
              tôi.
              <Box
                margin="8px 0"
                width="100%"
                display="flex"
                justifyContent="center"
              >
                <img
                  alt="Bước 2 báo cáo lừa đảo anti scam vietnam, antiscam, anti-scam"
                  style={{ maxWidth: "100%" }}
                  src={successImg}
                />
              </Box>
            </Box>
            <Box margin="8px 0" fontWeight="bold">
              2. Làm thế nào để tôi có thể tìm kiếm chính xác thông tin?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Nếu bạn sắp mua hàng trên website/ Fanpage (hoặc cá nhân), hãy
              dùng link của website/ SĐT/ Fanpage (link tài khoản cá nhân) đó để
              tra cứu. Nếu bạn sắp thực hiện giao dịch chuyển khoản, hãy sử dụng
              STK ngân hàng của đối tượng để kiểm tra. Càng nhiều thông tin về
              đối tượng sẽ càng giúp bạn dễ tra cứu hơn.
            </Box>
            <Box margin="8px 0" fontWeight="bold">
              3. Làm thế nào để bài báo cáo được duyệt?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Vì một số lý do, chúng tôi sẽ không thể duyệt những bài báo cáo có
              thông tin nhạy cảm, những vấn đề dễ gây tranh cãi, hay những vấn
              đề mâu thuẫn với pháp luật, hay bài mang tính phản đối nhà nước...
              Nếu bạn báo cáo một tài khoản mạng xã hội lừa đảo hay Website lừa
              đảo, xin hãy dùng link dẫn trực tiếp đến tài khoản/website đó. Và
              điều đó sẽ dễ dàng hơn cho người dùng khác trong việc tra cứu.
              Hoặc nếu có thể, hãy bổ sung bằng chứng bằng cách thêm hình ảnh để
              cảnh báo những người khác.
            </Box>
            <Box margin="8px 0" fontWeight="bold">
              4. Bạn tố cáo nhầm lẫn? Hay kẻ lừa đảo đã hoàn lương và bây giờ
              tôi muốn xóa bài tố cáo?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Điều này rất tốt và chúng tôi rất vui vì điều đó. Bạn có thể Copy
              link bài báo cáo của bạn trước đó và gửi về{" "}
              <a href="mailto:antiscam.contact@gmail.com" target="_blank">
                antiscam.contact@gmail.com
              </a>{" "}
              với tiêu đề “XIN XÓA BÀI BÁO CÁO LỪA ĐẢO”. Chúng tôi sẽ xử lý yêu
              cầu của bạn sớm nhất có thể.
            </Box>
          </Box>
          <Box
            margin="16px"
            textAlign="center"
            fontWeight="bold"
            style={{ color: "#13528a" }}
            fontSize="20px"
            letterSpacing="0.8px"
          >
            VỀ DỊCH VỤ UY TÍN
          </Box>
          <Box
            textAlign="left"
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            lineHeight={1.5}
          >
            <Box margin="8px 0" fontWeight="bold">
              1. Tại sao lại có dịch vụ uy tín ở trên Website chống lừa đảo?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Đúng là rất lạ, nhưng vì để giúp bạn tránh khỏi lừa đảo, chúng tôi
              cần đề xuất những dịch vụ/nhà cung cấp/website uy tín để bạn có
              thể yên tâm khi sử dụng và không cần lo lắng gì cả. Tất nhiên là
              chúng tôi đã xác minh rất kĩ trước khi để họ xuất hiện trên
              website của mình rồi. Chúng tôi còn có đầy đủ thông tin của họ và
              sẽ đảm bảo uy tín cho bạn.
            </Box>
            <Box margin="8px 0" fontWeight="bold">
              2. Người dùng có thể tự đăng bài vào phần Dịch vụ uy tín không?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Rất tiếc là không, vì để xuất hiện trong Dịch Vụ Uy Tín, chúng tôi
              cần kiểm tra rất kĩ càng và tất nhiên chỉ chúng tôi mới có thể đề
              xuất vì nếu ai cũng có thể đăng thì sẽ không đảm bảo được độ tin
              cậy của bài viết. Tất cả là vì lời ích của người dùng.
            </Box>
            <Box margin="8px 0" fontWeight="bold">
              3. Tôi là doanh nghiệp uy tín, làm sao để tôi được đăng bài vào
              DỊCH VỤ UY TÍN?
            </Box>
            <Box margin="8px 0 24px 0" style={{ textIndent: "24px" }}>
              Nếu bạn tự tin về độ tin cậy của mình, xin hãy liên hệ với chúng
              tôi thông qua{" "}
              <a href="mailto:antiscam.contact@gmail.com" target="_blank">
                antiscam.contact@gmail.com
              </a>{" "}
              . Chúng tôi sẽ có quy trình xác minh và sau đó bạn sẽ được xuất
              hiện trên Website của chúng tôi.
            </Box>
          </Box>
          <Box
            margin="16px"
            textAlign="center"
            fontWeight="bold"
            style={{ color: "#13528a" }}
            fontSize="20px"
            letterSpacing="0.8px"
          >
            Nếu có bất kì thắc mắc hay câu hỏi nào khác, xin hãy{" "}
            <a href="/about-me">liên hệ</a> với chúng tôi.
          </Box>
        </Box>
      </Box>
    </>
  );
}

AskedQuestions.propTypes = {};

export default AskedQuestions;
