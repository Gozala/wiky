var Wiky = require('wiky/wiky')
require('wiky/wiky-lang')
require('wiky/wiky-math')

global.output = {
   menu: "outmnu",
   item: 0,
   inbox: null,
   outbox: null,
   init: function() { 
     this.inbox = document.getElementById("inbox");
     this.outbox = document.getElementById("outbox");
     this.inbox.curScroll = this.inbox.scrollTop;
     this.toggle(0);
   },
   onkeyup: [
     function() { output.outbox.innerHTML = Wiky.toHtml(output.inbox.value); output.scroll(); },
     function() { output.outbox.innerHTML = Wiky.toHtml(output.inbox.value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/(\r?\n)/g,"<br/>"); output.scroll(); },
     function() { output.outbox.innerHTML = Wiky.toWiki(Wiky.toHtml(output.inbox.value)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/(\r?\n)/g,"<br/>"); output.scroll(); }
   ],
   toggle: function(idx) { 
     var items = document.getElementById(this.menu).getElementsByTagName("a");
     items[this.item].className = "";
     items[this.item=idx].className = "active";
     this.outbox.style.fontFamily = idx==0 ? "serif" : "monospace";
     this.inbox.onkeyup = this.inbox.onfocus = this.onkeyup[idx];
     this.inbox.onmouseup = function(){output.scroll();}
     this.inbox.focus();
   },
   scroll: function() {
     if (this.inbox.curScroll != this.inbox.scrollTop) {
        this.inbox.curScroll = this.inbox.scrollTop;
        this.outbox.scrollTop = this.outbox.scrollHeight/this.inbox.scrollHeight*this.inbox.scrollTop;
     }
   }
};
global.helpMenu = {
   menu: "helpmnu",
   item: 0,
   toggle: function(idx) {
     var items = document.getElementById(this.menu).getElementsByTagName("a");
     document.getElementById(items[this.item].innerHTML).style.display = "none";
     items[this.item].className = "";
     items[this.item=idx].className = "active";
     document.getElementById(items[this.item].innerHTML).style.display = "block";
   }
};
global.example = function example(id) {
   document.getElementById('inbox').value = document.getElementById(id).innerHTML
                                                    .replace(/&amp;/g,'&')
                                                    .replace(/&lt;/g,'<')
                                                    .replace(/&gt;/g,'>')
                                                    .replace(/&quot;/g,'\"');
   window.output.inbox.focus();
}

exports.main = function main(scenario) {
    if (document.readyState == "complete") output.init();
    else window.addEventListener("load", main, false);
}

if (require.main == module) exports.main();