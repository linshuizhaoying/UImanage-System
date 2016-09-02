<style src="../../static/assets/css/login.css"></style>
<template>
<div class="wrap_bg">
  <div id="main" class="login_wrap singUpActive">
    <div class="login_question_wrap">
      <div class="question_singUp ">
        <h2 class="title">还没有账号?</h2>
        <p>只需要拥有邀请码即可快速注册账号
        </p>
        <a href="javascript:void(0)" id="signUpBtn" class="btn btn_rounded">注册</a>
      </div>
      <div class="question_login ">
        <h2 class="title">已经有账号?</h2>
        <p>快速登录通道
        </p>
        <a href="javascript:void(0)" id="loginBtn" class="btn btn_rounded">登录</a>
      </div>
      <div class="action_singUp">

          <form>
            <fieldset>
              <legend class="title">注册</legend>
              <div class="errors">
                  <div class="bg_red text-center" v-if="valid_name">请输入用户名.</div>
                  <div class="bg_red text-center" v-if="valid_email && reg_email">请输入正确的邮箱.</div>
              </div>
              <div class="input_block">
                <div class="input_wrap">
                  <input v-model="invitedcode" type="text" id="invitedcode" class="input" placeholder="邀请码">
                  <label for="invitedcode" class="invitedcode"></label>
                </div>
                <div class="input_wrap">
                  <input  v-model="reg_name"  type="text" id="sing_name" class="input" placeholder="用户名">
                  <label for="sing_name" class="label_name"></label>
                </div>
                <div class="input_wrap">
                  <input v-model="reg_email" type="email" id="sing_email" class="input" placeholder="邮箱">
                  <label for="sing_email" class="label_mail"></label>
                </div>
                <div class="input_wrap">
                  <input v-model="reg_pass" type="password" id="sing_pass" class="input" placeholder="密码">
                  <label for="sing_pass" class="label_pass"></label>
                </div>
              </div>
              <a href="#" class="forgotPass">申请邀请码</a>
              <input type="submit" value="注册" class="btn btn_red submit" @click="addUser()">
            </fieldset>

          </form>
   
      </div>
      <div class="action_login">
        <form action="#">
          <fieldset>
            <legend class="title">登录</legend>
            <div class="input_block">
              <div class="input_wrap">
                <input type="text" id="username" class="input" placeholder="用户名">
                <label for="username" class="username"></label>
              </div>

              <div class="input_wrap">
                <input type="password" id="password" class="input" placeholder="密码">
                <label for="password" class="password"></label>
              </div>
            </div>
            <a href="#" class="forgotPass">忘记密码?</a>
            <a class="btn btn_red submit" @click="userLogin"> 登录</a>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="login_action_wrap ">
    </div>
  </div>
</div>
</template>

<script>
export default {
  ready () {
    var $wrap = $('#main');
    var $signUpBtn = $wrap.find('#signUpBtn');
    var $loginBtn = $wrap.find("#loginBtn");

    $signUpBtn.on('click', function() {
      $wrap.addClass('singUpActive');
      $wrap.removeClass('loginActive');
    });

    $loginBtn.on('click', function() {
      $wrap.addClass('loginActive');
      $wrap.removeClass('singUpActive');
    });
  },
  methods: {
    addUser: function() {
        $.post("/addUser",{invitedcode:$("#invitedcode").val(),
                           username:$("#sing_name").val(),
                           password:$("#sing_pass").val(),
                           email:$("#sing_email").val(),
                          },
        (result) => {
          if(result.status === "ok"){
            alert("注册成功!");
          }
          else{
            alert("注册失败!"+result.message);
          }
        });
      
    },
    userLogin:function() {
        $.post("/userLogin",{
                           username:$("#username").val(),
                           password:$("#password").val()
                          },
        function(result){
          if(result.status === "ok"){
            alert("登录成功~");
            if($("#username").val() == 'admin'){
              window.location.href="/admin";
            }else{
              window.location.href="/home";
            }
            
          }
          else{
            alert("登录失败!"+result.message);
          }
        });

    }
  },
  data () {
    return {
      invitedcode:'',
      reg_name:'',
      reg_email:'',
      reg_pass:'',
      login_name:'',
      login_pass:'',
      //表单验证

      formCheck:false

    }
  },
  computed: {
    valid_name: function () {
      return this.reg_name.length ==0
    },
    valid_email: function () {
      var emailRegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      return !emailRegExp.test(this.reg_email)
    },
  }
}
</script>


