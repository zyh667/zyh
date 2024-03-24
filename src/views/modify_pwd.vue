<template>
<div class="top">
			<div class="logo"><img src="@/assets/img/logo.png" alt=""></div>
		</div>
		<div class="register-view">
				<div class="info">
                        <img src="@/assets/img/icon_passward.png" alt="">
                        <input type="text" v-model="pwd" id="password" placeholder="请输入密码" @blur="checkPwd()">
			    	</div>
					<div class="user_name"><span id="pwdSpan"></span></div>
					<div class="info">
					    <img src="@/assets/img/password2.png" alt="">
					    <input type="text" id="password2" placeholder="请再次输入密码" @blur="checkPwd2()">
					</div>
					<div class="user_name"><span id="pwd2Span"></span></div>
				<div class="btn2"><input type="submit" @click="modify_pwd" id="xiu" class="button" value="修改密码"></div>
		</div>
</template>
<script >
import axios from "axios";

export default {
  data() {
    return {
      pwd:'',
      message: '',
      studentID: '',
      rel: [],
    };
  }, created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel = this.user.studentID
  },
  methods: {
    async modify_pwd() {
      try {
        const response = await axios.post('/index/modify_pwd/', {
          studentID:this.rel,
          pwd:this.pwd
        });
        this.message = response.data.msg
        this.$router.push({name:'login'})
      } catch (error) {
        console.error(error);
      }
    },
    checkPwd(){
                let error=false;
                //获取用户获得用户名信息
                var upwd=document.getElementById("password").value;
                //创建校验规则,密码要求6-16位
                var reg=/.{6,16}/;
                //获取span对象
                var span=document.getElementById("pwdSpan");
                //开始交验
                if(upwd==""||upwd==null){
                    //输入校验结果
                    span.innerHTML="*密码不能为空";
                    span.style.color="red";
                    error=true;
                }else if(reg.test(upwd)){
                    //输入校验结果
                    span.innerHTML="*密码通过";
                    span.style.color="green";
                    error=false;
                }else{
                    //输入校验结果
                    span.innerHTML="*密码应设6-16位";
                    span.style.color="red";
                    error=true;
                }
                return error;//第一次密码为a123456，第二次密码为a1234567，则修改的第一次密码，确认密码也会重新校验
            },
            //校验确认密码
            checkPwd2(){
                let error=false;
                //获取第一次校验密码
                var pwd=document.getElementById("password").value;
                //获取确认密码
                var pwd2=document.getElementById("password2").value;
                //获取span对象
                var span=document.getElementById("pwd2Span");
                //比较前两次密码是否相同
                if( pwd2==""|| pwd2==null){
                    //输入校验结果
                    span.innerHTML="*密码不能为空";
                    span.style.color="red";
                    error=true;
                }else if(pwd!=pwd2){
                    //输入校验结果
                    span.innerHTML="*密码不同，请重新输入"
                    span.style.color="red";
                    error=true;
                }else{
                    //输入校验结果
                    span.innerHTML="*密码通过";
                    span.style.color="green";
                    error=false;
                }
                return error;
            }
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

		.btn2 {
			text-align: center;
			width: 100%;
			height: 100px;

		}
		.user_name {
			font-size: 17px;
			text-align: center;
		}
		.btn2 {
			text-align: center;
			width: 100%;
			height: 100px;
		}
		h3{
            text-align: center;
            color: red;
            margin:0px;
            padding-top: 20px;
        }
</style>