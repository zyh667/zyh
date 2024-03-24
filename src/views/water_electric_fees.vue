<template>
<div class="content">
    <header>
        <div class="top">
            <div class="back">
                    <img @click="back" src="@/assets/img/chevron-back-outline.svg">
            </div>
            水电缴费
        </div>
    </header>
        <div class="content1">
            <h2>缴费情况</h2>
            <div class="content1" >
                <h3 v-for="dor in rel2" :key="dor.area">宿舍：{{ dor.area }}{{ dor.build }}{{ dor.floor }}{{ dor.number }}</h3>
                <h3 style="float: left; width: 80%" id="num"></h3><h3 onclick="window.open('/electric_rate','_self')"  style="float: left; width: 20%;color: #4747ef">查看</h3>
                <h3 style="float: left; width: 80%" id="num1"></h3><h3 onclick="window.open('/water_rate','_self')" style="float: left; width: 20%;color: #4747ef">查看</h3>
                <h3 style="color: red;float: left; width: 75%" id="num2"></h3><button id="adminBtn"  style="float: left; width: 25%">缴费</button>
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
      area:'',
      build:'',
      floor:'',
      number:'',
      rel:[],
      rel2:[],
      rel3:[],
      rel4:[],
      rel5:[],
      rel6:[],
    };
  },created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rel=this.user.studentID
  },mounted:function(){
      this.electric();//需要触发的函数
    this.electric2();
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
    async electric() {
      try {
        const response = await axios.post('/index/electric_rate/',{
          studentID:this.rel
        });
        this.rel2=response.data
      } catch (error) {
        console.error(error);
      }
    },
    async electric2() {
      try {
        const response = await axios.post('/index/electric_rate2/',{
          studentID:this.rel
        });
        const electricFees = response.data.map(item => parseFloat(item.electric));
        this.consumption = electricFees.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let d=0
        d=0.539*this.consumption
        d=Math.floor(d * 100) / 100;
        document.getElementById("num").innerText='需交电费：'+d+'元';
        const response1 = await axios.post('/index/water_rate2/',{
          studentID:this.rel
        });
        const waterFees = response1.data.map(item => parseFloat(item.water));
        this.volume = waterFees.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        let e=0
        e=2*this.volume
        e=Math.floor(e * 100) / 100;
        document.getElementById("num1").innerText='需交水费：'+e+'元';
        let f=0
        f=d+e
        f=Math.floor(f * 100) / 100;
        document.getElementById("num2").innerText='共需要交：'+f+'元';
      }catch (error) {
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