<template>
<div class="content">
    <header>
        <div class="top">
            <div class="back">
                    <img @click="back" src="@/assets/img/chevron-back-outline.svg">
            </div>
            学杂缴费
        </div>
    </header>
        <div class="content1">
            <h2>缴费情况</h2>
            <div class="content1">
                <h3>学号：{{ studentID }}</h3>
                <h3>姓名：{{ sname }}</h3>
                <h3 style="float: left; width: 75%">学费：{{ tuition }}元</h3><h3 style="float: left; width: 25%">{{ tuition_status }}</h3>
                <h3 style="float: left; width: 75%">住宿费：{{ accommodation }}元</h3><h3 style="float: left; width: 25%">{{ accommodation_status }}</h3>
                <h3 style="color: red;float: left; width: 75%" id="num"></h3><button id="adminBtn" style="float: left; width: 25%">缴费</button>
            </div>
        </div>
    </div>
    <form action="/index/Water_electricity_fees/" method="POST" id="login" class="login" enctype='multipart/form-data'>
                <span><a id="closeBtn" href="javascript:void(0)">关闭</a></span>
        <div>
            <img src="@/assets/img/img.png">
        </div>
    </form>
</template>
<script>
import axios from 'axios';
export default {
data() {
    return {
      user: null,
      studentID:'',
      sname:'',
      tuition:'',
      accommodation:'',
      tuition_status:'',
      accommodation_status:'',
      rel:[],
      rel2:[],
      rel3:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },mounted:function(){
      this.tuition1();//需要触发的函数
    this.adminBtn();
    },
  methods: {
  adminBtn(){
    var login=document.getElementById('login');
    var adminBtn=document.getElementById('adminBtn');
            adminBtn.onclick=function(){
                login.style.display="block";
                return false;
            }
    var closeBtn=document.getElementById('closeBtn');
            closeBtn.onclick=function(){
                login.style.display="none";
                return false;
            }
  },

    back(){
    window.history.back();
  },
    async tuition1() {
      try {
        const response = await axios.post('/index/tuition/',{
          studentID:this.rel
        });
        this.rel2=response.data[0]
        this.studentID=this.rel2['studentID']
        this.sname=this.rel2['sname']
        this.tuition=this.rel2['tuition']
        this.tuition_status=this.rel2['tuition_status']
        this.accommodation=this.rel2['accommodation']
        this.accommodation_status=this.rel2['accommodation_status']
        let tuition=parseFloat(this.rel2.tuition);
        const response1 = await axios.post('/index/tuition2/',{
          studentID:this.rel
        });
        this.rel3=response1.data[0]
        if (response1.data.length === 0){
          let accommodation=0
          var q = [tuition,accommodation]
        }else {
          let accommodation=parseFloat(this.rel3.accommodation)
          var q = [tuition,accommodation]
        }
        let b=0
        q.forEach(function (item){
            b+=item
        })
        document.getElementById("num").innerText='合计缴费：'+b+'元';
      } catch (error) {
        console.error(error);
      }
    },
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
			position : relative;
	        width : 100%;
	        height : 500px;
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
            font-family:"楷体";
			font-weight: 400;
            padding: 5px 0px;
            text-align: center;
            background: #e3e2e2;
        }
        h3{
            padding: 5px 0px;
            font-family:"楷体";
			font-weight: 400;
        }
        button{
            margin-top: 5px;
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
        span{
            float: right;
            padding-right: 5px;
        }
</style>