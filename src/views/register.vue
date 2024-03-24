<template>
<div class="top">
			<div class="logo"><img src="../assets/img/logo.png" alt=""></div>
            <h3 class="error_msg">
			{{message}}
		    </h3>
		</div>
		<div class="register-view">
                    <div class="info">
					    <img src="../assets/img/icon_username.png"/>
                        <input type="text" v-model="sname"  placeholder="请输入姓名">
					</div>
                    <div class="info">
					    <img src="../assets/img/icon_username.png"/>
                        <input type="text"v-model="sex"  placeholder="性别">
					</div>
                    <div class="info">
					    <img src="../assets/img/icon_username.png"/>
                        <input type="text"v-model="studentID" id="studentID" placeholder="请输入学号" @blur="checkID()">
					</div>
					<div class="ID_num"><span id="IDSpan"></span></div>
			    	<div class="info">
                        <img src="../assets/img/icon_passward.png" alt="">
                        <input type="password"v-model="password" id="password" placeholder="请输入密码" @blur="checkPwd()">
			    	</div>
					<div class="ID_num"><span id="pwdSpan"></span></div>
					<div class="info">
					    <img src="../assets/img/password2.png" alt="">
					    <input type="password2" id="password2" placeholder="请再次输入密码" @blur="checkPwd2()">
					</div>
					<div class="ID_num"><span id="pwd2Span"></span></div>
				    <div class="btn1"><input type="submit" class="zuce" @click="register" value="注册"></div>
				    <div class="btn2"><input type="submit" class="zuce" @click="back" value="返回登录"></div>
			</div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      sname:'',
      sex:'',
      studentID: '',
      password: '',
      message:''
    };
  },
  methods:{
    back(){
      this.$router.push({name:'login'})
    },
    async register(){
      try {
        const response = await axios.post('/index/register/',{
          studentID:this.studentID,
          password:this.password,
          sname:this.sname,
          sex:this.sex,
        });
        const data=response.data
         if (data.status === "success") {
           this.$router.push({name:'login'})
         }
         else {
           this.message=data.message
         }
      } catch (error) {
        console.error(error);
      }
    },
    checkID(){
      let error=false;
					//获取用户获得用户名信息
						var ID=document.getElementById("studentID").value;
					//创建校验规则,用户名0-5个
						var reg=/^\d{12}$/
					//获取span对象
						var IDSpan=document.getElementById("IDSpan");
					//开始交验
						if(ID==""||ID==null){
							//输入校验结果
							IDSpan.innerHTML="*学号不能为空";
							IDSpan.style.color="red";
							error=true;
						}else if(reg.test(ID)){
							IDSpan.innerHTML = "*学号通过";
					        IDSpan.style.color = "green";
					        error=false;
							//输入校验结果
						}else{
							//输入校验结果
							IDSpan.innerHTML="*学号格式不符"
							IDSpan.style.color="red";
							error=true;
						}
                        return error;
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
                return error;
				//第一次密码为a123456，第二次密码为a1234567，则修改的第一次密码，确认密码也会重新校验
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
body{
			margin: 0px;
		}
		.top{
			background-image: url(https://pic1.zhimg.com/v2-0d9b049f1734e3448d6bc2fde650e584_b.webp);
		    background-size: 100% 100%;
			height: 100px;
		    padding: 80px 0px;
		}
		.logo{
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
		.register-view{
			background-color: white;
			box-shadow: 2px 2px 10px #708cf8;
			width: 300px;
			margin: 0px auto;
			height: 450px;
			margin-top: -30px;
			border-radius: 10px;
		}
		.info{
			height: 15px;
			line-height: 20px;
			text-align: center;
			width: 80%;
			padding: 28px 0px;
			margin: 0px auto;
		}
		.info input{
			height: 30px;
			border: none;
			border-bottom: 2px solid #e7e7e7;
		}
		.info img{
			margin: -9px auto;
			height: 25px;
			margin-right: 10px;
		}
        .btn1{
			text-align:center;
			width: 50%;
			height: 100px;
			float: left;
		}
		.btn2{
			text-align:center;
			width: 50%;
			height: 100px;
			float: left;
		}
		.zuce{
			margin-top: 20px;
			text-align: center;
			width: 90px;
			height: 40px;
			color: white;
			background: #708cf8 linear-gradient(to top,rgba(137,160,254,0),rgba(137,160,254,1));
			border-radius: 20px;
			border: none;
			box-shadow: 2px 2px 10px #708cf8;
		}
        .logo img{
            width: 100%;
        }
		.ID_num{
            font-family:"楷体";
			font-size: 17px;
			text-align: center;
		}
        h3 {
            text-align: center;
            color: red;
            margin-top: 5%;
        }
</style>