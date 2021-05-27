import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import logoText from "../../assets/images/backgroundit.jpg";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";

function AboutMe(props) {
  const widthScreen = window.innerWidth;
  return (
    <>
      <Box width="100%" marginTop="12px">
        <img
          src={logoText}
          style={{ maxWidth: "100%" }}
          alt="Về chúng tôi - Anti Scam VietNam"
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
          >
            ANTI SCAM - CHỐNG LỪA ĐẢO VIỆT NAM
          </Box>
          <Box textAlign="center" fontWeight="bold" fontSize="20px">
            SỨ MỆNH
          </Box>
          <Box
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            textAlign="left"
            marginTop="12px"
            lineHeight={1.5}
            style={{ textIndent: "24px" }}
          >
            AntiScam là một dự án mang tính Cộng đồng, với mục đích giúp giảm
            thiểu tình trạng lừa đảo trên mạng, giúp người sử dụng Internet yên
            tâm hơn khi đưa ra một quyết định mua sắm hay sử dụng dịch vụ
            online. Vì đây là một dự án cộng đồng, có vốn tự thân nên sẽ có
            nhiều điều chưa được hoàn thiện, Chúng tôi mong sẽ đón nhận được
            nhiều ý kiến đóng góp của cộng đồng để phát triển tốt hơn.
          </Box>
          <Box
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            textAlign="left"
            marginTop="12px"
            lineHeight={1.5}
            style={{ textIndent: "24px" }}
          >
            {" "}
            Bạn có bao giờ sử dụng một dịch vụ/mua sắm trên mạng và được yêu cầu
            chuyển khoản đặt cọc trước? Hay bạn có bao giờ tức giận vì sản phẩm
            từ các Shop trên Facebook/Website có chất lượng không đúng như họ
            quảng cáo nhưng liên hệ lại thì không được hỗ trợ? Với sứ mệnh giúp
            người dùng tránh khỏi những tình trạng đó, chúng tôi đã lập nên một
            Website để mọi người có thể báo cáo những Website, Tài khoản mạng xã
            hội, tài khoản ngân hàng, hay số điện thoại lừa đảo, từ đó những
            người dùng khác có thể tra cứu thông tin để kiểm tra một nhân tố nào
            đó có khả năng lừa đảo hay không.
          </Box>
          <Box
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            textAlign="left"
            marginTop="12px"
            lineHeight={1.5}
            style={{ textIndent: "24px" }}
          >
            Bất kì ai đã bị lừa đảo đều có thể báo cáo tại Website của chúng
            tôi. Nếu bạn thật sự không thích lừa đảo, hãy giúp những người khác
            tránh được nó bằng cách chia sẻ chúng ở đây.
          </Box>
          <Box textAlign="center" fontWeight="bold" fontSize="20px">
            Liên Hệ
          </Box>
          <Box
            padding={widthScreen > 960 ? "0 96px" : "0 16px"}
            letterSpacing="0.8px"
            textAlign="left"
            marginTop="12px"
          >
            <Box marginBottom="8px">Mọi thắc mắc, đóng góp xin liên hệ:</Box>
            <Box
              alignItems="center"
              marginTop="8px"
              paddingLeft="8px"
              display="flex"
            >
              <EmailIcon />
              <Box marginLeft="4px">Email:</Box>
              <Box
                style={{ cursor: "pointer", wordBreak: "break-all" }}
                color="error.main"
                marginLeft="4px"
                component="a"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=antiscam.contact@gmail.com"
                target="_blank"
              >
                antiscam.contact@gmail.com
              </Box>
            </Box>
            <Box
              alignItems="center"
              marginTop="8px"
              paddingLeft="8px"
              display="flex"
            >
              <FacebookIcon />
              <Box marginLeft="4px">Facebook:</Box>
              <Box
                style={{ cursor: "pointer", wordBreak: "break-all" }}
                color="error.main"
                marginLeft="4px"
                component="a"
                href="https://www.facebook.com/baocaoluadao/"
                target="_blank"
              >
                https://www.facebook.com/baocaoluadao/
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

AboutMe.propTypes = {};

export default AboutMe;
