<template>
  <div id="about">
    <h2 class="content-header-title float-left pr-1 mb-0">
      Anh Iri
    </h2>
    <b-breadcrumb class="breadcrumb-slash">
      <b-breadcrumb-item @click="$router.push('/')">
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item active>
        About
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="content">
      <img
        class="content-img"
        src="https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2020/10/8/photo1602127619982-16021276201931567617424.jpg"
        alt=""
      >
      <div class="content-p">
        <p>Cửa hàng chuyên cung cấp: sách quốc văn, ngoại văn, văn hóa phẩm, văn phòng phẩm, dụng cụ học tập, quà lưu niệm, đồ chơi dành cho trẻ em…
          Một số Nhà sách trực thuộc Công ty FAHASA còn kinh doanh các mặt hàng siêu thị như: hàng tiêu dùng, hàng gia dụng, hóa  mỹ phẩm…
        </p>
        <p>Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa – tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều
          chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy,
          nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...
          của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia;
          Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…
        </p>
        <p>Sách ngoại văn bao gồm: từ điển, giáo trình, tham khảo, truyện tranh thiếu nhi , sách học ngữ, từ vựng, ngữ pháp, luyện thi TOEFL, TOEIC,
          IELS…được nhập từ các NXB nước ngoài như: Cambridge, Mc Graw-Hill, Pearson Education, Oxford, Macmillan, Cengage Learning…
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import {
  BBreadcrumb,
  BBreadcrumbItem,
} from 'bootstrap-vue'

export default {
  components: {
    // FeatherIcon,
    BBreadcrumb,
    BBreadcrumbItem,
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
    border-radius:7px;
    .content-img{
      margin-left: 40px;
      // max-width: 100%;
      height: 300px;
    }
    .content-p{
      p {
      padding: 0px 40px;
      font-size: 15px;
      }
    }
  }
}
</style>
