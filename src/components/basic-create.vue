<style scoped src="../../static/assets/css/codemirrorBasic.css"></style>
<template>
<div id="codeModal" v-show="basiccreate">
    <div class="uiName">
      <input placeholder="UI名称" type="text" v-model="title" required="">
    </div>
    <div class="uiDesc">
      <input placeholder="UI简介" type="text" v-model="desc" required="">
    </div>
    <nav class="code-nav">
        <ul class="clear">
            <li class="active-code-nav"><a href="#" data-trigger="javascript">Html</a></li>
            <li><a href="#" data-trigger="jquery">Css</a></li>
             <li><a href="#" data-trigger="jquery">Demo</a></li>
        </ul>
    </nav>
    <div class="ModalGroup">
      <div class="Modal">
          <textarea  v-model.sync="htmlcode" id="basiccreateHtml"  >{{htmlcode}}</textarea>
      </div>
      <div class="Modal">
          <textarea v-model="csscode" id="basiccreateCss">{{csscode}}</textarea>
      </div>
      <div class="Modal">
          <iframe class="basiccreateDemo" id="basiccreateDemo"></iframe>
      </div>
    </div>
    <div class="modal-controls">
        <ul>
            <li>
                <a href="#" data-clipboard-target="javascriptCode" id="copyButton"></a>
            </li>
            <li><a href="#" class="effect-5" v-on:click="create"><span>添加</span></a></li>
            <li><a href="#" class="effect-5" v-on:click="closeBasieModal"><span>关闭</span></a></li>
        </ul>
    </div>
</div>

</template>

<script>
module.exports = {
  props: ['basiccreate','type'],
  ready () {
      window.basiccreateHtml = CodeMirror.fromTextArea(document.getElementById('basiccreateHtml'), {
        mode: 'htmlmixed',
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        lineWrapping: true,
        showCursorWhenSelecting: true,
        scrollbarStyle: null,
        autofocus: true
      })
      window.basiccreateHtml.setValue('<div class="linshui">zhaoying</div>')
      emmetCodeMirror(window.basiccreateHtml)

      window.basiccreateCss = CodeMirror.fromTextArea(document.getElementById('basiccreateCss'), {
        mode: 'css',
        theme: 'dracula',
        tabSize: 4,
        indentUnit: 4,
        lineWrapping: true,
        scrollbarStyle: null,
        showCursorWhenSelecting: true,
      });
      window.basiccreateCss.setValue('.linshui{color:red}')
      window.basiccreateCss.focus();
      emmetCodeMirror(window.basiccreateCss)
      //下面处理是为了让编辑器能够一打开就显示默认内容，这里是修复点击后才会显示内容的Bug
      let htmlsh = setInterval(() => {
        window.basiccreateHtml.refresh();
      }, 500); 
       window.basiccreateHtml.refresh();
      let csssh = setInterval(() => {
        window.basiccreateCss.refresh();
       this.htmlcode =  window.basiccreateHtml.getValue()
       this.csscode =  window.basiccreateCss.getValue()
       this.render();
      }, 500); 
       window.basiccreateCss.refresh();
      setTimeout(() => {
        clearInterval(htmlsh); 
        clearInterval(csssh);
      },3000)
      


       window.basiccreateHtml.on('change', () => {
        this.htmlcode = basiccreateHtml.getValue()
        console.log("htmlchange")
        this.render()
      })
       window.basiccreateCss.on('change', () => {
        this.csscode = basiccreateCss.getValue()
        this.render()
      })
  },
  methods: {
    clear () {

      window.basiccreateHtml.setValue('<div class="linshui">zhaoying</div>')

      window.basiccreateCss.setValue('.linshui{color:red}')
      this.title = ""
      this.desc = ""

    },
    closeBasieModal () {
      this.basiccreate = !this.basiccreate
      this.clear()
      // 清空内容
      // window.basiccreateHtml.setValue('')
    },
    render () {
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
      let sourceCode = () => {
        let html = this.htmlcode
        let css = this.csscode
        let src = ''
        // HTML
        src = baseTpl.replace('</body>', html + '</body>')
        // 内部CSS
        css = '<style>' + css + '</style>'
        src = src.replace('</head>', css + '</head>')
        return src
      }
      let iframe = document.querySelector('#basiccreateDemo')
      let render = () => {
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
                         htmlcode:this.htmlcode,
                         csscode:this.csscode,
                         type:this.type,
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
      
      this.basiccreate = !this.basiccreate
      this.clear()
    }
  },
  data () {
    return {
      title:'',
      desc:'',
      htmlcode: '',
      csscode: ''
    }
  }
}
</script>