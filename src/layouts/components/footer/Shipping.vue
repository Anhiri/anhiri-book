<template>
  <div id="shipping">
    <h1 style="width: 100%; text-align: center; font-size: 35px; margin-top: 20px;   color: #61492e;">
      PHƯƠNG THỨC ĐÓNG GÓI / VẬN CHUYỂN
    </h1>
    <div class="content">
      <img
        class="content-img"
        src="https://nhanh.vn/img/landing/landing9/vanchuyen.png"
        alt=""
      >
      <div class="content-p">
        <h3><b>THÔNG TIN ĐÓNG GÓI, VẬN CHUYỂN HÀNG</b></h3>
        <p>Với đa phần đơn hàng, Fahasa.com cần vài giờ làm việc để kiểm tra thông tin và đóng gói hàng. Nếu các sản phẩm đều có sẵn hàng,
          cửa hàng sẽ nhanh chóng bàn giao cho đối tác vận chuyển. Nếu đơn hàng có sản phẩm sắp phát hành, cửa hàng sẽ ưu tiên giao những
          sản phẩm có hàng trước cho Quý khách hàng.</p>
        <p>Trong một số trường hợp, hàng nằm không có sẵn tại kho gần nhất, thời gian giao hàng có thể chậm hơn so với dự kiến do điều hàng.
          Các phí vận chuyển phát sinh, Fahasa.com sẽ hỗ trợ hoàn toàn.</p>
        <p>Thời gian giao hàng không tính thứ 7, Chủ nhật, các ngày Lễ, Tết và không bao gồm tuyến huyện đảo xa.</p>
        <p>THỜI GIAN VÀ CHI PHÍ GIAO HÀNG TẠI TỪNG KHU VỰC TRONG LÃNH THỔ VIỆT NAM:</p>
        <p><b>1. Nội thành TP.HCM và Hà Nội</b></p>
        <p>Thời gian: 1-2 ngày <br>
          Chi phí: 15.000đ/ đơn hàng (không giới hạn giá trị)</p>
        <p><b>2. Các tỉnh thành khác</b></p>
        <p>Thời gian: 2-3 ngày <br>
          Chi phí: 30.000đ/ đơn hàng (không giới hạn giá trị)</p>
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
#shipping{
  display: flex;
  flex-wrap: wrap;
  margin: 68px 7% 10px 7% !important;
  .content {
    display: flex;
    background-color: #fff;
    padding: 30px 0px 20px 0px;
    margin-left: 0px;
    border-radius:7px;
    .content-img{
      margin-left: 40px;
      width: auto;
      height: 100%;
    }
    .content-p{
      h3{
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
