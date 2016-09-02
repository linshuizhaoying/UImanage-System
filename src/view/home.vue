
<style>

@import url("../../static/assets/css/date-tip.css");
.uimanage{
  color:#FF7522;
}
.uimanage:hover{
  cursor: pointer;
}
</style>

<template>
    <!-- header logo: style can be found in header.less -->
    <header class="header">
        <a  class="logo">
                用户UI管理
            </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
        </nav>
    </header>
    <div class="wrapper row-offcanvas row-offcanvas-left">
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="left-side sidebar-offcanvas">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
                <!-- Sidebar user panel -->
                <div class="user-panel">
                    <div class="pull-left image">
                        <img src="../../static/assets/img/home.jpg" class="img-circle" alt="User Image" />
                    </div>
                    <div class="pull-left info">
                        <p>Hello, {{current_user}}</p>
                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                    </div>
                    <div class="pull-left info">
                        <a href="#" @click="logout()">退出登录</a>
                    </div>
                </div>

                <!-- /.search form -->
                <!-- sidebar menu: : style can be found in sidebar.less -->
                <ul class="sidebar-menu">
                    <li class="active">
                        <a>
                            <i class="fa fa-dashboard"></i> <span>项目管理</span>
                        </a>
                    </li>
                  
                </ul>
            </section>
            <!-- /.sidebar -->
        </aside>
        <aside class="right-side">
            <!-- Main content -->
            <section class="content">

                <!-- Main row -->

                <div class="row">
                    <div class="col-md-7">
                        <section class="panel tasks-widget">
                            <header class="panel-heading">
                                项目列表
                            </header>
                            <div class="panel-body">
                                <div class="task-content">
                                    <ul class="task-list">
                                        <li v-for="project in projects">
                              
                                            <div class="task-title" >
                                                <span class="task-title-sp data-tip-right uimanage" data-tip={{project.desc}} @click="uimanage(project._id)">{{project.projectname}}</span>
                                
                                                <span v-show="project.state == 1" class="label label-danger">完成</span>
                                                <span v-show="project.state == 0" class="label label-success">开发中</span>

                                                <div class="pull-right hidden-phone">
                                                    <button class="btn btn-default btn-xs"><a class="fa fa-pencil" data-toggle="modal" href="#tallModal" 
                                                    projectId={{{project._id}}}
                                                    @click="setCurrentId(project._id)"
                                                    ></a></button>
                                                    <button class="btn btn-default btn-xs"><a class="fa fa-times" data-toggle="modal" href="#shortModal"
                                                    @click="setCurrentId(project._id)"
                                                    ></a></button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class=" add-task-row">
                                    <a class="btn btn-success btn-sm pull-left" data-toggle="modal" href="#normalModal">添加新项目</a>
                                   
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <!-- row end -->
            </section>
            <!-- /.content -->
        </aside>
        <!-- /.right-side -->
    </div>

<div id="normalModal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">新建项目</h4>
      </div>
      <div class="modal-body">
         <br>
         <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">项目名称</label>
            <div class="col-sm-10">
              <input v-model="newProjectName" class="form-control" id="projectName" placeholder="请输入你的项目名">
            </div>
          </div>
          <br>
          <br>
         <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">项目描述</label>
            <div class="col-sm-10">
              <input v-model="newProjectDesc" class="form-control" id="desc" placeholder="请详细描述">
            </div>
          </div>
          <br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" v-on:click="addProject">保存并添加</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="shortModal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">删除项目?</h4>
      </div>
      <div class="modal-body">
        <p>删除项目后将无法恢复,确定删除吗？</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消删除</button>
        <button type="button" class="btn btn-primary" @click="deleteProject()">确定删除</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="tallModal" class="modal modal-wide fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">修改项目</h4>
      </div>
      <div class="modal-body">

         <br>
         <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">项目名称</label>
            <div class="col-sm-10">
              <input v-model="current_projectName" class="form-control" id="projectName" >
            </div>
          </div>
          <br>
          <br>
         <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">项目描述</label>
            <div class="col-sm-10">
              <input v-model="current_projectDesc" class="form-control" id="desc">
            </div>
          </div>
          <br>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">项目状态</label>
            <div class="col-sm-10">
              <div class="radio">
                <label>
                  <input type="radio" v-model="current_projectState" value="0" >
                   未完成
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" v-model="current_projectState" value="1">
                   已完成
                </label>
              </div>
            </div>

            <br>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消修改</button>
        <button type="button" class="btn btn-primary" @click="updateProject">确认</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>

<script>

module.exports = {
  props: ['type'],
  ready: function () {
    $.get('/getCurrentUser',  (result) => {
      if(result.status == "ok"){
        this.current_user = result.message
        window.localStorage.current_user = result.message
      }else{
        window.location.href="/login";
      }
    });
    $.get('/getCurrentUserId',  (result) => {
      if(result.status == "ok"){
        this.current_userid = result.message
        this.getProjectList()
      }
    });
    $("[data-toggle='offcanvas']").click(function(e) {
        e.preventDefault();

        //If window is small enough, enable sidebar push menu
        if ($(window).width() <= 992) {
            $('.row-offcanvas').toggleClass('active');
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $('.row-offcanvas').toggleClass("relative");
        } else {
            //Else, enable content streching
            $('.left-side').toggleClass("collapse-left");
            $(".right-side").toggleClass("strech");
        }
    });
  },
  methods: {
    getProjectList (){
      $.get('/getProjects/'+ this.current_userid, (results) => {
        this.projects = results.Projects;      
      });
    },
    addProject () {
      $.post("/addProject",{projectname:this.newProjectName,
                           desc:this.newProjectDesc,
                           user_id:this.current_userid
                          },
        (result) => {
          if(result.status === "ok"){
            alert("添加成功!");
            $('#normalModal').modal('hide');
            this.getProjectList()
          }
          else{
            alert("添加失败!"+result.message);
          }
        });
    },
    updateProject () {
        $.post("/updateProject",{projectname:this.current_projectName,
                                 desc:this.current_projectDesc,
                                 projectid:this.current_projectid,
                                 state:this.current_projectState
                                },
        (result) => {
          if(result.status === "ok"){
            alert("更新成功!");
            $('#tallModal').modal('hide');
            this.getProjectList()
          }
          else{
            alert("更新失败!"+result.message);
          }
        });

    },
    setCurrentId (id) {
      this.current_projectid = id;
      for (var i = 0; i < this.projects.length; i++) {
        if(this.projects[i]._id == id){
          this.current_projectName = this.projects[i].projectname
          this.current_projectDesc = this.projects[i].desc
          this.current_projectState = this.projects[i].state
        }
      }
    },
    deleteProject () {
      if (window.confirm("确定要删除该项目吗(删除项目后将无法恢复)?")) { 
        $.get('/deleteProject/'+this.current_projectid,  (result) => {
          if(result.status == "ok"){
            alert("删除项目成功!")
            $('#shortModal').modal('hide');
            this.getProjectList()
          }else{
            alert("删除项目失败!")
          }
        });
      }
    },
    uimanage (id) {
      window.localStorage.current_projectid = id
      window.location.href="/uimanage";
    },
    logout(){
      $.get('/logout', (result) => {
          if(result.status == "ok"){
            alert(result.message)
            window.location.href="/login";
          }
      });
    }
  },
  data: function () {
    return {
      current_user:'',
      current_userid:'',
      projects:'',
      newProjectName:'',
      newProjectDesc:'',
      current_projectid:'',
      current_projectName:'',
      current_projectDesc:'',
      current_projectState:''

    }
  },
  components: {
  }
}
</script>