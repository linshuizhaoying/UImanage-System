<style>
.CodeMirror {
    height: 340px!important;
    /* width: 206px!important; */
    margin-left: 180px;
}
a{
  cursor: pointer;
}
</style>
<template>
  <header>
      <div id="c-red" class="circle"></div>
      <div id="c-yellow" class="circle"></div>
      <div id="c-green" class="circle"></div>
      <h1><span id="c-gray"></span>临水照影</h1>
  </header>

  <nav>
      <h2>Working Files</h2>
      <ul>
          <li><a @click="showhtml" v-bind:class="{ 'active': swap == 'html',}" >index<span class="ft">.html</span></a>
          </li>
          <li><a @click="showcss" v-bind:class="{ 'active': swap == 'css',}" >style<span class="ft">.css</span></a>
          </li>
      </ul>
  </nav>

  <div style="outline: none">
      <div v-show="swap == 'html'">
        <textarea id="htmlcode" v-model="htmlcode" class="page">
        </textarea>
      </div>
      <div v-show="swap == 'css'">
        <textarea id="csscode" v-model="csscode"  class="page">
        </textarea>
      </div>
      <iframe id="demo">
          
      </iframe>
  </div>

  <footer>
      <p><span>1 Line</span>
      </p>
      <ul>
          <li>INS</li>
          <li id="fileType">HTML</li>
          <li id="color">■</li>
          <li>Tab Size: 4</li>
      </ul>
  </footer>
</template>

<script>

export default {
  ready () {
    if(window.localStorage.debug == "true"){
      $.get('/getUi/'+window.localStorage.debugid, (data) => {
        this.htmlcode = data.ui.htmlcode
        this.csscode = data.ui.csscode
        this.load()
      })
    }else{
        this.load()
    }
  },
  data () {
    return {
        htmlcode:'<div class="linshui">test</div>',
        csscode:'.linshui{color:red}',
        swap:'html'
    }
  },
  methods: {
    navToggle () {
      this.userProfile = !this.userProfile
    },
    showhtml () {
      this.swap = 'html'
    },
    showcss () {
      this.swap = 'css'
      window.editorCss.refresh()
      window.editorCss.focus()
    },
    load () {
       var editorHTML = document.editor = CodeMirror.fromTextArea(document.getElementById('htmlcode'), {
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
        var defaultHtml = this.htmlcode
        editorHTML.setValue(defaultHtml)
        emmetCodeMirror(editorHTML)

        window.editorCss = document.editor = CodeMirror.fromTextArea(document.getElementById('csscode'), {
            mode: 'css',
            keyMap: 'sublime',
            lineNumbers: true,
            lineWrapping: false,
            theme: 'dracula',
            tabSize: 4,
            indentUnit: 4,
            autoCloseBrackets: true,
        });
        this.editorCss = window.editorCss;
        var defaultCSS = this.csscode;
        window.editorCss.setValue(defaultCSS)
        emmetCodeMirror(window.editorCss)


    //下面处理是为了让编辑器能够一打开就显示默认内容，这里是修复点击后才会显示内容的Bug
        var htmlsh = setInterval(() => {
         editorHTML.refresh();
        }, 150); 
        editorHTML.refresh();

        var csssh = setInterval(() => {
         editorCss.refresh();
         this.htmlcode = editorHTML.getValue()
         this.csscode = editorCss.getValue()        
         this.render();
        }, 150); 
        editorCss.refresh();

        setTimeout(() => {
          clearInterval(htmlsh); 
          clearInterval(csssh);
        },4500)

        editorHTML.on('change', () => {
          this.htmlcode = editorHTML.getValue()
          this.render()
        })
        window.editorCss.on('change', () => {
          this.csscode = window.editorCss.getValue()
          this.render()
        })
    },
    render (loadjs) {
      // Base template
      var baseTpl =
          '<!doctype html>\n' +
          '<html>\n\t' +
          '<head>\n\t\t' +
          '<meta charset=\'utf-8\'>\n\t\t' +
          '<title>Test</title>\n\n\t\t\n\t' +
          '</head>\n\t' +
          '<body>\n\t\n\t' +
          '</body>\n' +
          '</html>'
      var sourceCode = () => {
        var html = this.htmlcode
        var css = this.csscode
        var js = this.jscode
        var src = ''
        // HTML
        src = baseTpl.replace('</body>', html + '</body>')
        // 内部CSS
        css = '<style>' + css + '</style>'
        src = src.replace('</head>', css + '</head>')
        // 内部Javascript
        if(loadjs == true){
          js = '<script>' + js + '<\/script>';
          var jsarrayList = $('#out-js').val(); 
          console.log(jsarrayList)
          var outjs ='';
          outjs += '<script src="' + jsarrayList +'"><\/script>'; 
          src = src.replace('</body>', outjs + js + '</body>'); 
        }
        return src
      }

      var iframe = document.querySelector('#Demo')
      var render = () => {
        var source = sourceCode()
        var iframeDoc = iframe.contentDocument
        iframeDoc.open()
        iframeDoc.write(source)
        iframeDoc.close()
      }
      render()
    }
  },
  components: {
  }
}
</script>
