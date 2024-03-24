<template>
<div class="top">
			<div class="logo"><img src="@/assets/img/logo.png" alt=""></div>
		</div>
		<div class="register-view">
            <h3>{{ message }}</h3>
				<div class="info">
					<img src="@/assets/img/bind_phone.png" />
					<input type="text" v-model="phone" id="phone_num" placeholder="请输入手机号" @blur="checkPhone()">
				</div>
				<div class="divphone"><span id="phoneSpan"></span></div>
				<div class="info">
					<input type="text" class="yanzheng" v-model="code" id="yanzheng" placeholder="请输入验证码" @blur="checkYz()">
					<input type="button" class="zuce" @click="send" id="btn_send" value="发送验证码">
				</div>
				<div class="divphone"><span id="yanzhengSpan"></span></div>
				<div class="btn2"><input type="submit" @click="modify" class="button" value="修改手机号"></div>
		</div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      phone:'',
      message:'',
      code:'',
      studentID:'',
      rel:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },
  methods:{
    async send(){
      try {
        const response = await axios.post('/index/send/',{
          phone:this.phone
        });
        this.message=response.data.msg
      } catch (error) {
        console.error(error);
      }
    },
    async modify(){
      try {
        const response = await axios.post('/index/modify_phone/',{
          studentID:this.rel,
          phone:this.phone,
          code:this.code
        });
        const data=response.data
        if (data.status === "success") {
           this.$router.push({name:'my_panel'})
         }
         else {
           this.message=data.message
         }
      } catch (error) {
        console.error(error);
      }
    },
    checkPhone() {
                var error=false;
				var phonenum = document.getElementById("phone_num").value;
				var reg = /^\d{11}$/
				var phoneSpan = document.getElementById("phoneSpan");
				if (phonenum == "" || phonenum == null) {
					phoneSpan.innerHTML = "*手机号不能为空";
					phoneSpan.style.color = "red";
					error=true;
				} else if (reg.test(phonenum)) {
					phoneSpan.innerHTML = "*手机号通过";
					phoneSpan.style.color = "green";
					error=false;
				} else {
					phoneSpan.innerHTML = "*手机号格式不符"
					phoneSpan.style.color = "red";
					error=true;
				}
                return error;
			},
    checkYz() {
                var error=false;
				var yz = document.getElementById("yanzheng").value;
				var span = document.getElementById("yanzhengSpan");
				var reg = /^\d{4}$/
				if (yz == "" || yz == null) {
					span.innerHTML = "*验证码不能为空";
					span.style.color = "red";
					error=true;
				}else if(reg.test(yz)){
					span.innerHTML = ""
					span.style.color = "green";
					error=false;
				}else{
					span.innerHTML = "验证码应为4位"
					span.style.color = "red";
                    error=true;
				}
                return error;
			},

  }
}
</script>
<style scoped>
body {
			margin: 0px;
		}

		.top {
			background-image: url(https://pic1.zhimg.com/v2-0d9b049f1734e3448d6bc2fde650e584_b.webp);
			background-size: 100% 100%;
			height: 100px;
			padding: 80px 0px;
		}

		.logo {
			font-size: 30px;
			line-height: 100px;
			text-align: center;
			width: 100px;
			height: 100px;
			background-color: white;
			margin: 0px auto;
			color: #999;
			border-radius: 50px;
		}

		.register-view {
			background-color: white;
			box-shadow: 2px 2px 10px #708cf8;
			width: 300px;
			margin: 0px auto;
			height: 280px;
			margin-top: -30px;
			border-radius: 10px;
		}

		.info {
			height: 15px;
			line-height: 20px;
			text-align: center;
			width: 80%;
			padding: 28px 0px;
			margin: 0px auto;
		}

		.info input {
			height: 30px;
			border: none;
			border-bottom: 2px solid #e7e7e7;
		}

		.info img {
			margin: -9px auto;
			height: 25px;
			margin-right: 10px;
		}

		.button {
			margin-top: 20px;
			text-align: center;
			width: 90px;
			height: 40px;
			color: white;
			background: #a7f2f8 linear-gradient(to top, rgba(137, 160, 254, 0), rgba(137, 160, 254, 1));
			border-radius: 20px;
			border: none;
			box-shadow: 2px 2px 10px #708cf8;
		}

		.logo img {
			width: 100%;
		}

		.divphone {
			font-size: 17px;
			text-align: center;
		}

		.btn2 {
			text-align: center;
			width: 100%;
			height: 100px;

		}

		.info #yanzheng {
			width: 40%;
		}

		.zuce {
			width: 35%;
		}
        h3{
            text-align: center;
            color: red;
            margin:0px;
            padding-top: 20px;
        }
</style>