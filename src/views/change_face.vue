<template>
<div class="content">
    <header>
        <div class="top">
            <div class="back">
                <a href="javascript:history.back()">
                    <img src="@/assets/img/chevron-back-outline.svg">
                </a>
            </div>
            人脸信息
        </div>
    </header>
        <div class="content1">
            <!-- 直接访问相机功能进行拍照 -->
            <h2><img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" /></h2>
            <h3>姓名：{{sname}}</h3>
            <h3>学号：{{studentID}}</h3>
            <h3>
              <input class="" type="file" accept="image/*" @change="change_face" />
            </h3>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
   data() {
    return {
      user: null,
      studentID: '',
      sname: '',
      imageUrl: '',
      rel:[],
      rel2:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
    mounted:function(){
    this.change_face2();
  },
  methods:{
     back(){
       window.history.back();
     },
    async change_face(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData.get("image"))
      try {
        const response1 = await axios.post('/index/change_face1/',{
          studentID:this.rel,
        });
        this.rel2=response1.data[0]
        const response = await axios.post('/index/change_face/', formData);
        this.rel2=response.data[0]
        this.sname=this.rel2['sname']
        this.studentID=this.rel2['studentID']
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },async change_face2() {
      try {
        const response = await axios.post('/index/change_face1/', {
          studentID: this.rel,
        });
        this.rel2 = response.data[0]
        this.sname = this.rel2['sname']
        this.studentID = this.rel2['studentID']
        this.imageUrl=this.rel2.face_image
        this.imageUrl='http://127.0.0.1:8000'+this.imageUrl
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  }
}
</script>
<style scoped>
body{
			background-color: whitesmoke;
		}
		* {
			margin: 0;
			padding: 0;
		}
		.top {
            box-shadow:0px 1px #afacac;
			font-weight: bolder;
			font-size: 26px;
			text-align: center;
			background-color: white;
			width: 100%;
			height: 40px;
            padding-top: 40px;
		}
		.back{
			width: 10%;
			height: 37px;
			position: fixed;
			top: 39px;
		}
		.back img{
			width: 40px;
			height: 40px;
		}
		.content {
			background-color: white;
			position : absolute;
	        width : 100%;
	        height : 100%;
		}
        .content1{
            margin-top: 15px;
            background-color: whitesmoke;
			width: 80%;
            left: 10%;
            position: relative;
            float:left;
        }
        h2{
            padding-top:10px ;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        img{
            width: 100px;
        }
        h3{
            text-align: center;
            padding: 5px 0px;
            font-family:"楷体";
			font-weight: 400;
        }
</style>