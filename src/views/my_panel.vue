<template>
<header>
			<div class="header">
                <div class="li1"><a id="adminBtn" href="javascript:void(0)"><img :src="imageUrl" alt=""></a></div>
					<div class="li2">
						<h1 class="user">{{ sname }}</h1>
						<h2>学号：{{ user.studentID }}</h2>
					</div>
			</div>
			<div onclick="window.open('/personal','_self')" class="tabulation1">
				<img class="tabu" src="@/assets/img/personal_information.png">
				<h3>个人信息</h3>
			</div>
			<div onclick="window.open('/modify_phone','_self')" class="tabulation2">
				<img class="tabu" src="@/assets/img/bind_phone.png">
				<h3>绑定手机：<h4>{{ phone }}</h4></h3>
			</div>
			<div onclick="window.open('/forget_information','_self')" class="tabulation2">
				<img class="tabu" src="@/assets/img/change_password.png" >
				<h3>修改密码</h3>
			</div>
			<div onclick="window.open('/change_face','_self')" class="tabulation1">
				<img class="tabu" src="@/assets/img/personal_center.png">
				<h3>人脸信息</h3>
			</div>
            <div onclick="window.open('/home/','_self')" class="tabulation1">
				<img class="tabu" src="@/assets/img/home_page.png">
				<h3>返回首页</h3>
			</div>
		</header>
        <!-- 登陆框主体 -->
        <div id="login" class="login" enctype='multipart/form-data'>
                <span><a id="closeBtn" href="javascript:void(0)">关闭</a></span>
            <div>
            	<li>当前头像：<img class="sculpt" :src="imageUrl"></li>
            	<p><input class="" type="file" accept="image/*" @change="avatar1" /></p>
            </div>
			<div class="btn">
				<input type="submit" class="xiu"  value="修改头像"/>
			</div>
        </div>
</template>
<script>
import axios from "axios";

export default {
data() {
    return {
      sname:'',
      studentID: '',
      imageUrl:'',
      phone:'',
      rel:[],
      rel2:[],
      rel3:[]
    }
},
created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  mounted:function(){
    this.menu();
    this.panel();
  },
  methods:{
    menu(){
      var login=document.getElementById('login');
            // 1.点击"点击，弹出登陆框"
            var adminBtn=document.getElementById('adminBtn');
            adminBtn.onclick=function(){
                login.style.display="block";
                return false;
            }
            // 2.点击"关闭"
            var closeBtn=document.getElementById('closeBtn');
            closeBtn.onclick=function(){
                login.style.display="none";
                return false;
            }
  },async avatar1(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData.get("image"))
      try {
        const response1 = await axios.post('/index/avatar1/',{
          studentID:this.rel,
        });
        this.rel3=response1.data[0]
        const response = await axios.post('/index/avatar/', formData);
        this.rel3=response.data[0]
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    async panel() {
      try {
        const response = await axios.post('/index/home/',{
          studentID:this.rel,
        });
        this.rel2=response.data[0]
        this.sname=this.rel2.sname
        this.phone=this.rel2.phone
        this.imageUrl=this.rel2.avatar
        this.imageUrl='http://127.0.0.1:8000'+this.imageUrl
        console.log(this.imageUrl)
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>
<style scoped>
* {
			margin: 0;
			padding: 0;
		}
		body{
			background-color: whitesmoke;
		}
		.header {
			background-color: white;
			height: 100px;
			padding: 50px 0px;
		}
		.li1{
			width: 100px;
			height: 100px;
			float: left;
			margin: 10px 0px 0px 30px;
		}
		.header .li2{
			width: 200px;
			height: 100px;
			float: left;
			margin-left: 20px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
		}
		.header img{
			width: 100%;
			border-radius: 20px;
		}
		h1{
			font-size: 22px;
			margin-top: 25px;
		}
		h2{
			color: #303030;
			font-size: 18px;
			margin-top: 15px;
			font-weight: lighter;
		}
		.tabulation1{
			background-color: white;
			height: 50px;
			margin: 8px 0px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			box-shadow: 0px 0px 2px #d1d1d1;
		}
		.tabulation2{
			background-color: white;
			margin: 0.1rem 0px;
			height: 50px;
			display: flex;
			flex-wrap: wrap;
			align-content: center;
			box-shadow: 0px 0px 1px #bababa;
		}
		.tabu{
			margin-left: 25px;
			width: 40px;
			height: 40px;
		}
		h3{
			font-family:"楷体";
			font-weight: 600;
			font-size: 20px;
			margin-left: 30px;
			flex-wrap: wrap;
			display: flex;
			align-content: center;
		}
        h4{
            font-family: "楷体";
            font-weight: 500;
            font-size: 18px;
            margin-left: 11px;
            flex-wrap: wrap;
            display: flex;
            color: red;
            align-content: center;
        }
        .login{
				text-align: center;
                position: absolute;
                width: 80%;
                height: 284px;
                z-index: 9999;
                display: none;
                background-color: white;
                margin-left: 10%;
                margin-top: -320px;
                border: 1px solid grey;
            }
            .sculpt{
                width: 100px;
                height: 100px;
            }
			span{
				float: right;
				padding-right: 5px;
			}
			li{
				list-style: none;
			}
			.btn{
				height: 100px;
				position:absolute;
				left: 0px;
				right: 0px;
				bottom: 0px;
			}
			.xiu{
				width: 90px;
				height: 40px;
				color: white;
				background: #708cf8 linear-gradient(to top, rgba(137, 160, 254, 0), rgba(137, 160, 254, 1));
				border-radius: 20px;
				border: none;
				box-shadow: 2px 2px 10px #708cf8;
			}
</style>