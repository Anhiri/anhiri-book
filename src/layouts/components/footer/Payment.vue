<template>
  <div id="about">
    <h1 style="width: 100%; text-align: center; font-size: 35px; margin-top: 20px;   color: #61492e;">
      PHƯƠNG THỨC THANH TOÁN
    </h1>
    <div class="content">
      <img
        class="content-img"
        src="https://www.pacvn.vn/files/6-hinh-thuc-thanh-toan-truc-tuyen-o-viet-nam3-4ESzb08U7M.jpg"
        alt=""
      >
      <div class="content-p">
        <h4><b>THANH TOÁN CHUYỂN KHOẢN QUA NGÂN HÀNG.</b></h4>
        <p>Sau khi hoàn tất đặt hàng tại bước xác nhận đơn hàng, bạn vui lòng chuyển tiền vào tài khoản của chúng tôi theo thông tin sau:</p>
        <p><b>Ngân hàng: Agribank<br>
          Tên tài khoản: NGUYEN THI VAN ANH<br>
          Số tài khoản: 2002220091654</b></p>
        <p><b>Chú ý:</b><br>
          Khi chuyển tiền, vui lòng ghi rõ Mã số đơn hàng mà bạn thanh toán vào phần ghi chú của lệnh chuyển khoản. Sau đó email cho chúng tôi
          theo địa chỉ accounting@anhiri.com để thông báo việc chuyển tiền và số tài khoản của bạn để tiện trong việc kiểm tra đồng thời tiến hành
          giao hàng sớm cho bạn.<br>
          Hoặc bạn có thể điện thoại cho chúng tôi theo số (0799)355 371 nếu cần sự hổ trợ<br>
          Bạn vui lòng thanh toán phí chuyển khoản</p>
        <h4><b>THANH TOÁN BẰNG TIỀN MẶT KHI NHẬN HÀNG (COD)</b></h4>
        <p><b>1. Đối với Đà Nẵng </b></p>
        <p>- Nhân viên giao hàng sẽ liên lạc trước với bạn để thông báo giao hàng.Trường hợp bạn đi vắng vui lòng ủy thác cho người khác thanh
          toán và nhận thay. Bạn vui lòng ký nhận hàng và thanh toán tiền theo giá trị ghi trên phiếu giao hàng và hóa đơn VAT đính kèm. <i>Bạn
            không phải trả thêm một khoản phí nào khác</i></p>
        <p><b>2. Các tỉnh thành khác</b></p>
        <p>- Nhân viên bưu điện địa phương sẽ đến địa chỉ bạn đăng ký để thu tiền và giao hàng.Trường hợp bạn đi vắng vui lòng ủy thác cho người
          khác thanh toán và nhận hàng thay.Trường hợp không có người nhận, bưu điện sẽ để lại lời nhắn mời bạn đến bưu điện để nhận hàng.</p>
      </div>
    </div>
  </div>
</template>
<script>
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    // FeatherIcon,
  },
}
</script>
<style lang="scss" scoped>
#about{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .content {
    display: flex;
    background-color: #fff;
    padding: 30px 0px 20px 0px;
    margin-left: 0px;
    border-radius:15px;
    .content-img{
      margin-left: 40px;
    //   width: 300px;
      height: 350px;
    }
    .content-p{
      h4{
        color: #61492e;
        position:center;
        padding: 0px 40px;
      }
      p {
        margin-bottom: 10px;
        padding: 0px 40px;
        font-size: 15px;
      }
    }
  }
}
</style>
