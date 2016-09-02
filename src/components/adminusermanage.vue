<template>

<div class="page">
  <div class="content">
    <div class="header"> 
      <div class="title"><span class="name">Users </span>(<span class="count">{{users.length}}</span>)</div>
      <div class="functions">
        <div class="add">
          <div class="icon"> <i class="fa fa-plus"></i></div><span>Add user</span>
        </div>
      </div>
    </div>
    <div class="dataTable">
      <table>
        <thead>
          <tr>
            <th class="selectAll"> <i class="fa fa-square-o"></i></th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>邀请码</th>
            <th>注册日期</th>
          </tr>
        </thead>
        <tbody class="dataContent">
            <tr v-for="user in users" data-id={{{user._id}}} @click="selected(user._id)">
                <td><i class="checkbox fa fa-square-o"></i></td>
                <td>{{user.username}}</td>
                <td>{{user.email}}</td>
                <td>{{user.invitedcode}}</td>
                <td>{{user.created_time}}</td>
            </tr>
        </tbody>

      </table>
    </div>
  </div>
<div class="properties">
    <div class="slider"></div>
    <div class="propertyEditor">
        <table>
            <thead>
                <tr>
                    <th>当前选中用户:<span>{{selected_user.username}}</span></th>
                </tr>
            </thead>
        </table>
        <table>
            <tbody>
                <tr data-field="username" class="featured required text">
                    <td>用户名</td>
                    <td class="text">
                        <input type="text" v-model="selected_user.username" class="username">
                        <div class="hint"></div>
                        <div class="errors"></div>
                    </td>
                </tr>
                <tr data-field="email">
                    <td>邮箱</td>
                    <td>
                        <input type="email" v-model="selected_user.email" class="email">
                        <div class="hint"></div>
                        <div class="errors"></div>
                    </td>
                </tr>
                <tr data-field="password" class="featured required">
                    <td>密码</td>
                    <td>
                        <input  type="password" placeholder="Password"  v-model="selected_user.password" class="password">
                    </td>
                </tr>
                
                <tr data-field="invitedcode" class="featured required text">
                    <td>邀请码</td>
                    <td class="text">
                        <input type="text" required="required" v-model="selected_user.invitedcode" class="invitedcode">
                        <div class="hint"></div>
                        <div class="errors"></div>
                    </td>
                </tr>

                <tr data-field="limit" class="featured required text">
                    <td>权限</td>
                    <td class="text">
                        <input type="text" v-model="selected_user.limit" class="limit">  
                        <div class="hint"></div>
                        <div class="errors"></div>
                    </td>
                </tr>

                <tr data-field="avatar" class="featured required text">
                    <td>头像</td>
                    <td class="text">
                        <input type="text" v-model="selected_user.avatar" class="avatar">
                        <div class="hint"></div>
                        <div class="errors"></div>
                    </td>
                </tr>
                <tr>
                    <td class="button">
                      <button class="function updateUser" @click="updateUser"><span>更新用户</span></button>
                    </td>
                </tr>
                <tr >

                    <td class="button">
                        <button class="function updateUser" @click="deleteUser"><span>删除用户</span></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</div>
</template>

<script>
export default {
  ready () {
    this.fetch()
    $('.dataContent').on('click', 'tr', function (event) {
        //clear other class
        $('tr').each(function(){
           if ($(this).hasClass("selected")) {
              $(this).removeClass('selected')
           }
         });
        $(this).toggleClass('selected');
    });
  },
  data () {
    return {
      users:'',
      selected_user:'',
      current_id:'',
    }
  },
  methods: {
    fetch (){
      this.users = '';
      this.selected_user = '';
      $.get('/getUsers',  (data) => {
        console.log(data);
        this.users = data.users
      });
    },
    selected (id) {
      this.current_id = id;
      $.get('/getUser/'+id,  (data) => {
        console.log(data);
        this.selected_user = data.user
      });
      console.log(this.selected_user)
    },
    deleteUser (){
      if (window.confirm("确定要删除该用户吗?")) { 
        $.get('/deleteUser/'+this.current_id,  (result) => {
          if(result.status == "ok"){
            alert("删除用户成功!")
            this.fetch()
          }else{
            alert("删除用户失败!")
          }
        });
      }
    },
    updateUser (){
      if(this.current_id){
        $.post("/userUpdate",{
                           invitedcode:$(".invitedcode").val(),
                           username:$(".username").val(),
                           email:$(".email").val(),
                           avatar:$(".avatar").val(),
                           limit:$(".limit").val(),
                           id:this.current_id,
                           password:$('.password').val()
                          },
         (result) => {
          if(result.status === "ok"){
            alert("更新成功!");
            this.selected_user = ''
            this.fetch()
          }
          else{
            alert("更新失败!"+result.message);
          }
        });
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../static/assets/css/adminusermanage.css");
</style>
