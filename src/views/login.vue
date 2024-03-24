<template>
  <div class="home">
    <div class="top">
			<div class="logo"><img src="../assets/img/logo.png" alt=""></div>
		</div>
		<div class="register-view">
            <h3>{{ message }}</h3>
                <a href="http://127.0.0.1:8000/admin">管理员登录</a>
				<div class="info">
					<img src="../assets/img/icon_username.png" />
					<input type="text" v-model="studentID" placeholder="请输入学号">
				</div>
				<div class="ID_num"><span id="IDSpan"></span></div>
				<div class="info">
					<img src="../assets/img/icon_passward.png" alt="">
					<input type="text" v-model="password" placeholder="请输入密码">
				</div>
                <div class="ID_num"><span id="pwdSpan"></span></div>
                <div class="fgpwd" >
                    <input type="checkbox" name="rem_name">
                    <label>记住用户名</label>
                    <a href="{% url 'forget_pwd' %}">忘记密码</a>
                </div>
				<div class="btn1"><input type="submit" @click="login" class="button" value="登录"></div>
				<div class="btn2"><input type="submit" class="button" value="注册" @click="zuce()"></div>
		</div>
  </div>
</template>

<script>
import axios from 'axios';
import router from "@/router";

export default {
  data() {
    return {
      studentID: '',
      password: '',
      rel:[],
      message:''
    };
  },
  methods: {
    zuce(){
      this.$router.push({name:'register'})
    },
    async login() {
      try {
        const response = await axios.post('/index/login/',{
          studentID:this.studentID,
          password:this.password,
        });
        const data=response.data
         if (data.status === "success") {
           localStorage.setItem('user', JSON.stringify(response.data.user));
           this.$router.push({name:'home'})
         }
         else {
           this.message=data.message
         }
        //this.rel=response.data[0]
        //var test = JSON.stringify(this.rel)
        //this.stuentID=test
        //this.stuentID=this.rel['stuentID']
        //this.password=this.rel['password']
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
		/**重置body样式**/
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
			height: 350px;
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

		.btn1 {
			text-align: center;
			width: 50%;
			height: 100px;
			float: left;
		}
		.fgpwd{
			padding: 19px 0px 8px 45px;
			font-size: 14px;
		}
		.btn2 {
			text-align: center;
			width: 50%;
			height: 100px;
			float: left;
		}

		.button {
			margin-top: 20px;
			text-align: center;
			width: 90px;
			height: 40px;
			color: white;
			background: #708cf8 linear-gradient(to top, rgba(137, 160, 254, 0), rgba(137, 160, 254, 1));
			border-radius: 20px;
			border: none;
			box-shadow: 2px 2px 10px #708cf8;
		}

		.logo img {
			width: 100%;
		}

		.ID_num {
			font-size: 17px;
			text-align: center;
		}
        h3{
            text-align: center;
            color: red;
            margin:0px;
            padding-top: 20px;
        }
        a{
            float: right;
            padding-right: 40px;
        }
</style>