<style scoped src="../../static/assets/css/codemirror.css"></style>
<template>
<div id="codeModal" v-show="advancedcreate">
<div id="wrapper">
    <section id="utils">
        <input class="query" type="text" placeholder="UI名称" v-model="title">
        <input class="query" type="text" placeholder="UI描述" v-model="desc">
        <div class="code-swap">
            <span class="code-swap-html" href="#" v-bind:class="{ 'active': swapfunc == 'html',}" @click="showhtml">HTML</span>
            <span class="code-swap-css" href="#" v-bind:class="{ 'active': swapfunc == 'css',}" @click="showcss">CSS</span>
            <span class="code-swap-js" href="#" v-bind:class="{ 'active': swapfunc == 'js',}"  @click="showjs">JS</span>
        </div>

        <div class="code-tools">

            <span class="reset-editor" @click="reset">重置 &orarr;</span>
            <span class="clear-editor" @click="clear">清空 &osol;</span>
            <span class="run-script" @click="runjs">运行Js&raquo;</span>
            <span class="run-script" @click="create">添加&raquo;</span>
        </div>
        <div class="cdnjs-search">
            <input v-model="link" id="out-js" class="query" type="text" placeholder="cdnjs..." value="http://libs.baidu.com/jquery/2.0.0/jquery.min.js">
            <span class="close" @click="close">X</span>
        </div>

    </section>
    <section id="editor" class="advancededitor">
        <div class="code-pane">
            <div class="code-pane-html" v-show="swapfunc == 'html'">
                <textarea id="advancedcreateHtml"></textarea>
            </div>
            <div class="code-pane-css" v-show="swapfunc == 'css'">
                <textarea id="advancedcreateCss"></textarea>
            </div>
            <div class="code-pane-js" v-show="swapfunc == 'js'">
                <textarea id="advancedcreateJs"></textarea>
            </div>
        </div>
        <div class="preview-pane">
            <iframe id="advancedDemo" name="preview"></iframe>
        </div>
    </section>
</div>

</div>

</template>

<script>
module.exports = {
  props: ['advancedcreate','type'],
  ready () {
    let editorHTML = document.editor = CodeMirror.fromTextArea(document.getElementById('advancedcreateHtml'), {
        mode: 'text/html',
        profile: 'html',
        keyMap: 'sublime',
        lineNumbers: true,
        lineWrapping: false,
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        autoCloseBrackets: true,
    });
    this.editorHTML = editorHTML;
    let defaultHtml = '<main>\n\n  <h1>LinshuiZhaoying</h1>\n\n  <p>Demo</p>\n\n</main>'
    editorHTML.setValue(defaultHtml)
    emmetCodeMirror(editorHTML)

    let editorCss = document.editor = CodeMirror.fromTextArea(document.getElementById('advancedcreateCss'), {
        mode: 'css',
        keyMap: 'sublime',
        lineNumbers: true,
        lineWrapping: false,
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        autoCloseBrackets: true,
    });
    this.editorCss = editorCss;
    let defaultCSS = '@import url(\"https:\/\/fonts.googleapis.com\/css?family=Droid+Sans:400,700\");\n\nhtml,body {\n    background-color: #282a36;\n    color: #fff;\n    font-family: \"Droid Sans\", sans-serif;\n    overflow: hidden;\n    text-align: center;\n}\n\nmain {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%,-50%);\n}\n\nh1 {\n    font-size: 2rem;\n    font-weight: 400;\n    margin: 0;\n}\n\np {\n    font-size: 1rem;\n    margin: 1rem 0;\n}';
       

    editorCss.setValue(defaultCSS)
    emmetCodeMirror(editorCss)

    let editorJs = document.editor = CodeMirror.fromTextArea(document.getElementById('advancedcreateJs'), {
        mode: 'javascript',
        keyMap: 'sublime',
        lineNumbers: true,
        lineWrapping: false,
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        autoCloseBrackets: true,
    });
    this.editorJs = editorJs;
    editorJs.setValue('alert("hello!LinshuiZhaoying")')
    emmetCodeMirror(editorJs)

//下面处理是为了让编辑器能够一打开就显示默认内容，这里是修复点击后才会显示内容的Bug
    let htmlsh = setInterval( () => {
     editorHTML.refresh();
    }, 300); 
    editorHTML.refresh();

    let jssh = setInterval( () => {
     editorJs.refresh();
    }, 300); 
    editorJs.refresh();

    let csssh = setInterval( () => {
     editorCss.refresh();
     this.advancedcreateHtml = editorHTML.getValue()
     this.advancedcreateCss = editorCss.getValue()
     this.advancedcreateJs = editorJs.getValue()

     this.render();
    }, 300); 
    editorCss.refresh();

    setTimeout( () => {
      clearInterval(htmlsh); 
      clearInterval(csssh);
      clearInterval(jssh);
    },4500)

    editorHTML.on('change',  () => {
      this.advancedcreateHtml = editorHTML.getValue()
      this.render()
    })
    editorCss.on('change',  () => {
      this.advancedcreateCss = editorCss.getValue()
      this.render()
    })
    editorJs.on('change',  () => {
      this.advancedcreateJs = editorJs.getValue()
      this.render()
    })

  },
  methods: {
    closeBasieModal () {
      this.advancedcreate = !this.advancedcreate
      // 清空内容
      // window.advancedadvancedcreateHtml.setValue('')
    },
    render: function (loadjs) {
      // Base template
      let baseTpl =
          '<!doctype html>\n' +
          '<html>\n\t' +
          '<head>\n\t\t' +
          '<meta charset=\'utf-8\'>\n\t\t' +
          '<title>Test</title>\n\n\t\t\n\t' +
          '</head>\n\t' +
          '<body>\n\t\n\t' +
          '</body>\n' +
          '</html>'
      let sourceCode =  () => {
        let html = this.advancedcreateHtml
        let css = this.advancedcreateCss
        let js = this.advancedcreateJs
        let src = ''
        // HTML
        src = baseTpl.replace('</body>', html + '</body>')
        // 内部CSS
        css = '<style>' + css + '</style>'
        src = src.replace('</head>', css + '</head>')
        // 内部Javascript
        if(loadjs == true){
          js = '<script>' + js + '<\/script>';
          let jsarrayList = $('#out-js').val(); 
          console.log(jsarrayList)
          let outjs ='';
          outjs += '<script src="' + jsarrayList +'"><\/script>'; 
          src = src.replace('</body>', outjs + js + '</body>'); 
        }
        return src
      }
        let iframe = document.querySelector('#advancedDemo')
      let render = function () {
        let source = sourceCode()
        let iframeDoc = iframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(source)
        iframeDoc.close()
      }
      render()
    },
    create () {
      $.post("/addUi",{  title:this.title,
                         desc:this.desc,
                         htmlcode:this.advancedcreateHtml,
                         csscode:this.advancedcreateCss,
                         jscode:this.advancedcreateJs,
                         type:this.type,
                         link:this.link,
                         project_id:window.localStorage.current_projectid,
                        },
      (result) => {
        if(result.status === "ok"){
          alert("添加成功!");
          window.location.reload();
        }
        else{
          alert("添加失败!"+result.message);
        }
      });
      this.advancedcreate = !this.advancedcreate
      this.clear()
    },
    showhtml: function () {
      this.swapfunc = 'html'
    },
    showcss: function () {
      this.swapfunc = 'css'
    },
    showjs: function () {
      this.swapfunc = 'js'
    },
    reset: function (){
      let defaultCSS = '@import url(\"https:\/\/fonts.googleapis.com\/css?family=Droid+Sans:400,700\");\n\nhtml,body {\n    background-color: #282a36;\n    color: #fff;\n    font-family: \"Droid Sans\", sans-serif;\n    overflow: hidden;\n    text-align: center;\n}\n\nmain {\n    left: 50%;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%,-50%);\n}\n\nh1 {\n    font-size: 2rem;\n    font-weight: 400;\n    margin: 0;\n}\n\np {\n    font-size: 1rem;\n    margin: 1rem 0;\n}';
      this.editorHTML.setValue('<main>\n\n  <h1>LinshuiZhaoying</h1>\n\n  <p>Demo</p>\n\n</main>')
      this.editorCss.setValue(defaultCSS)
      this.editorJs.setValue('alert("hello!LinshuiZhaoying")')

      
    },
    clear:function (){
      this.editorHTML.setValue('')
      this.editorCss.setValue('')
      this.editorJs.setValue('')
    },
    runjs:function (){
      this.render(true);
    },
    close:function (){
      this.advancedcreate = !this.advancedcreate
    }
  },
  data: function () {
    return {
      title:'',
      desc:'',
      editorHTML:'',
      editorJs:'',
      editorCss:'',
      advancedcreateHtml: '',
      advancedcreateCss: '',
      advancedcreateJs:'',
      link:'',
      swapfunc:'html'
    }
  }
}
</script>