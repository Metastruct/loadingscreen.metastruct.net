(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{177:function(t,e,s){var n=s(191);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,s(25).default)("54b6170c",n,!0,{})},178:function(t,e,s){var n=s(193);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,s(25).default)("f0f87c74",n,!0,{})},179:function(t,e,s){var n=s(195);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,s(25).default)("35cd0c0e",n,!0,{})},180:function(t,e,s){var n=s(198);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,s(25).default)("798c3abc",n,!0,{})},182:function(t,e,s){t.exports=s.p+"img/9124c6a.png"},190:function(t,e,s){"use strict";var n=s(177);s.n(n).a},191:function(t,e,s){(t.exports=s(24)(!1)).push([t.i,"\n@-webkit-keyframes spinAround{\n0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)\n}\nto{-webkit-transform:rotate(359deg);transform:rotate(359deg)\n}\n}\n@keyframes spinAround{\n0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)\n}\nto{-webkit-transform:rotate(359deg);transform:rotate(359deg)\n}\n}\n.screenshot{display:block;margin:6px 0;text-align:center;max-width:384px;max-height:216px;width:384px;height:216px;border:1px solid #0f0f0f;overflow:hidden;position:relative\n}\n.screenshot>img{display:block;width:384px;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:50% 50%;object-position:50% 50%\n}\n.screenshot img{transition:-webkit-filter .33s ease-out;transition:filter .33s ease-out;transition:filter .33s ease-out,-webkit-filter .33s ease-out;-webkit-filter:blur(0);filter:blur(0)\n}\n.screenshot img.blurry{-webkit-filter:blur(4px);filter:blur(4px)\n}\n.screenshot .message{display:flex;justify-content:center;align-items:center;pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);opacity:1;transition:opacity .33s ease-in;color:#fff;font-size:2em\n}\n.screenshot .message:empty{opacity:0\n}\n.screenshot .details{justify-content:space-between;position:absolute;text-align:left;padding:6px;bottom:0;left:0;width:100%;background:rgba(0,0,0,.5);-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-transform-origin:center bottom;transform-origin:center bottom;opacity:0;transition:opacity .25s ease-in,-webkit-transform .25s ease-in;transition:transform .25s ease-in,opacity .25s ease-in;transition:transform .25s ease-in,opacity .25s ease-in,-webkit-transform .25s ease-in\n}\n.screenshot .details,.screenshot .details .votes{display:flex;align-content:center;align-items:center\n}\n.screenshot .details .votes .downvotes,.screenshot .details .votes .upvotes{display:inline-flex;align-content:center;align-items:center;margin-right:8px\n}\n.screenshot .details .votes .downvotes p,.screenshot .details .votes .upvotes p{margin:0 4px\n}\n.screenshot .details .votes .downvotes.unvoted,.screenshot .details .votes .upvotes.unvoted{-webkit-filter:grayscale(50%) brightness(75%);filter:grayscale(50%) brightness(75%)\n}\n.screenshot .status{display:flex;justify-content:space-between;align-content:center;align-items:center;position:absolute;text-align:left;padding:6px;top:0;left:0;width:100%;background:rgba(0,0,0,.5);-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-transform-origin:center top;transform-origin:center top;opacity:0;transition:opacity .25s ease-in,-webkit-transform .25s ease-in;transition:transform .25s ease-in,opacity .25s ease-in;transition:transform .25s ease-in,opacity .25s ease-in,-webkit-transform .25s ease-in\n}\n.screenshot .status.denied{color:#ff3860\n}\n.screenshot .status.approved{color:#23d160\n}\n.screenshot .status.pending{color:#ffdd57\n}\n.screenshot .status p{text-transform:uppercase\n}\n.screenshot .status .judge{display:flex;align-content:center;align-items:center\n}\n.screenshot .status .judge a{display:inline-flex;align-content:center;align-items:center\n}\n@media screen and (max-width:768px){\n.screenshot .details,.screenshot .status{-webkit-transform:translateY(0);transform:translateY(0);opacity:1\n}\n}\n.screenshot:hover .details,.screenshot:hover .status{-webkit-transform:translateY(0);transform:translateY(0);opacity:1\n}",""])},192:function(t,e,s){"use strict";var n=s(178);s.n(n).a},193:function(t,e,s){(t.exports=s(24)(!1)).push([t.i,"\n.screenshot-grid{display:flex;flex-wrap:wrap;align-items:flex-start;align-content:flex-start;justify-content:space-evenly\n}",""])},194:function(t,e,s){"use strict";var n=s(179);s.n(n).a},195:function(t,e,s){(t.exports=s(24)(!1)).push([t.i,'\n.google-loader{position:relative;margin:0 auto;width:100px\n}\n.google-loader:before{content:"";display:block;padding-top:100%\n}\n.circular{-webkit-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;height:100%;-webkit-transform-origin:center center;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto\n}\n.path{stroke-dasharray:1,200;stroke-dashoffset:0;-webkit-animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;stroke-linecap:round\n}\n@-webkit-keyframes rotate{\nto{-webkit-transform:rotate(1turn);transform:rotate(1turn)\n}\n}\n@keyframes rotate{\nto{-webkit-transform:rotate(1turn);transform:rotate(1turn)\n}\n}\n@-webkit-keyframes dash{\n0%{stroke-dasharray:1,200;stroke-dashoffset:0\n}\n50%{stroke-dasharray:89,200;stroke-dashoffset:-35px\n}\nto{stroke-dasharray:89,200;stroke-dashoffset:-124px\n}\n}\n@keyframes dash{\n0%{stroke-dasharray:1,200;stroke-dashoffset:0\n}\n50%{stroke-dasharray:89,200;stroke-dashoffset:-35px\n}\nto{stroke-dasharray:89,200;stroke-dashoffset:-124px\n}\n}\n@-webkit-keyframes color{\n0%,to{stroke:#d62d20\n}\n40%{stroke:#0057e7\n}\n66%{stroke:#008744\n}\n80%,90%{stroke:#ffa700\n}\n}\n@keyframes color{\n0%,to{stroke:#d62d20\n}\n40%{stroke:#0057e7\n}\n66%{stroke:#008744\n}\n80%,90%{stroke:#ffa700\n}\n}',""])},197:function(t,e,s){"use strict";var n=s(180);s.n(n).a},198:function(t,e,s){(t.exports=s(24)(!1)).push([t.i,"\n@-webkit-keyframes spinAround{\n0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)\n}\nto{-webkit-transform:rotate(359deg);transform:rotate(359deg)\n}\n}\n@keyframes spinAround{\n0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)\n}\nto{-webkit-transform:rotate(359deg);transform:rotate(359deg)\n}\n}\n.sidebar{position:fixed;display:flex;align-items:flex-end;pointer-events:none;z-index:3;height:100%;-webkit-transform:translateX(-100%);transform:translateX(-100%);transition:-webkit-transform .25s ease-in;transition:transform .25s ease-in;transition:transform .25s ease-in,-webkit-transform .25s ease-in\n}\n.sidebar .sidebar-background{position:absolute;display:block;transition:background-color .25s ease-in;height:125vh;width:125vw\n}\n.sidebar .menu{position:relative;overflow:auto;padding:1rem;max-width:15rem;width:100%;height:100%\n}\n.sidebar .menu,.sidebar button.collapse-button{background:#353535;box-shadow:0 0 16px rgba(0,0,0,.5)\n}\n.sidebar button.collapse-button{cursor:pointer;pointer-events:all;position:absolute;display:flex;align-items:center;justify-content:center;height:3.5rem;width:3.5rem;bottom:1.5rem;right:-1.5rem;-webkit-transform:translateX(100%);transform:translateX(100%);border:none;border-radius:50%;color:#e4e4e4;transition:-webkit-filter .05s ease-in;transition:filter .05s ease-in;transition:filter .05s ease-in,-webkit-filter .05s ease-in\n}\n.sidebar button.collapse-button i{font-size:2rem\n}\n.sidebar button.collapse-button:active{-webkit-filter:brightness(87.5%);filter:brightness(87.5%);padding:0\n}\n.sidebar.is-expanded{pointer-events:all;-webkit-transform:translateX(0);transform:translateX(0)\n}\n.sidebar.is-expanded .sidebar-background{background:rgba(0,0,0,.5)\n}\n.google-loading{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)\n}",""])},199:function(t,e,s){"use strict";s.r(e);var n=[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://metastruct.net"}},[e("img",{attrs:{src:s(182)}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero is-small is-primary is-bold"},[e("div",{staticClass:"hero-body"},[e("div",{staticClass:"container"},[e("h1",{staticClass:"title"},[this._v("Metastruct Loading Screen Gallery")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("b",[this._v("Developers")]),this._v("\ncan approve and deny screenshots to be showcased. If you think your screenshots should be approved, make sure to get a lot of ratings!")])}],r=(s(183),s(186),s(61),s(62),s(26),s(22)),a=s.n(r),i=s(101),o=s.n(i),l=(s(0),s(97),s(98),s(99),s(65)),c=s.n(l),u=s(181),d=s.n(u);function h(t){return new URLSearchParams(t).toString()}var p={props:["screenshot"],data:function(){return{isVisible:!1,message:"",timeout:null}},computed:{profileURL:function(){return"https://steamcommunity.com/profiles/"+d.a.fromIndividualAccountID(this.screenshot.accountid).getSteamID64()},screenshotURL:function(){var t=this.screenshot.url;return t.match(/^https?:\/\//i)||(t="http://"+t),t},timestamp:function(){return new Date(1e3*this.screenshot.created).toISOString().substring(0,10)}},methods:{visibilityChanged:function(t){this.isVisible=t},setMessage:function(t){var e=this;this.message=t,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.message=""},3e3)},onCopyGalleryURL:function(){this.setMessage("copied link to clipboard!")},getGalleryURL:function(){return location.origin+"/?id="+this.screenshot.id},vote:function(t,e){var s=this;if(this.$store.state.authed.success){var n=h({csrf_token:this.$store.state.authed.csrf_token});c.a.post("https://g2cf.metastruct.net/lsapi/vote/".concat(t,"/").concat(e,"?").concat(n)).then(function(t){if(t.data.errors)throw Error(t.data.errors.join("\n"));switch(e){case"up":case"down":s.setMessage(e+"voted!");break;case"delete":s.setMessage("vote removed!")}}).catch(function(n){n.response&&304==n.response.status&&"delete"!=e?s.vote(t,"delete"):console.error(n)})}else this.setMessage("log in to vote!")},setApproved:function(t,e){var s=this,n=h({csrf_token:this.$store.state.authed.csrf_token});c.a.post("https://g2cf.metastruct.net/lsapi/".concat(e,"/").concat(t,"?").concat(n)).then(function(t){if(t.data.errors)throw Error(t.data.errors.join("\n"));switch(e){case"approve":s.setMessage("approved!");break;case"deny":s.setMessage("denied!")}}).catch(function(t){return console.error(t)})},getOwnVote:function(t){if(!this.$store.state.myVotes.success)return null;var e=this.$store.state.myVotes.up.includes&&this.$store.state.myVotes.up.includes(t),s=this.$store.state.myVotes.down.includes&&this.$store.state.myVotes.down.includes(t);return e||!s&&null}}},f=(s(190),s(17)),m=Object(f.a)(p,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.visibilityChanged,expression:"visibilityChanged"}],staticClass:"screenshot"},[s("a",{attrs:{href:t.screenshotURL,target:"_blank"}},[t.isVisible?s("img",{class:{blurry:t.message},attrs:{src:"https://g2cf.metastruct.net/lsapi/i/"+t.screenshot.id+".jpg"}}):t._e()]),s("div",{staticClass:"message"},[t._v(t._s(t.message))]),s("div",{staticClass:"details"},[s("div",{staticClass:"votes"},[s("a",{staticClass:"upvotes has-text-success",class:{unvoted:0==t.getOwnVote(t.screenshot.id)},attrs:{title:"Upvote"},on:{click:function(e){t.vote(t.screenshot.id,"up")}}},[s("i",{staticClass:"material-icons"},[t._v("thumb_up")]),s("p",[t._v(t._s(t.screenshot.up))])]),s("a",{staticClass:"downvotes has-text-danger",class:{unvoted:1==t.getOwnVote(t.screenshot.id)},attrs:{title:"Downvote"},on:{click:function(e){t.vote(t.screenshot.id,"down")}}},[s("i",{staticClass:"material-icons"},[t._v("thumb_down")]),s("p",[t._v(t._s(t.screenshot.down))])])]),0!=t.screenshot.accountid?s("a",{staticClass:"has-text-primary",attrs:{href:t.profileURL,target:"_blank",title:"Author"}},[t._v(t._s(t.screenshot.name))]):s("p",{attrs:{title:"Author"}},[t._v(t._s(t.screenshot.name))])]),s("div",{staticClass:"status",class:{pending:null==t.screenshot.approval,denied:0==t.screenshot.approval,approved:1==t.screenshot.approval},attrs:{title:"Status"}},[null==t.screenshot.approval?s("p",[t._v("Pending")]):0==t.screenshot.approval?s("p",[t._v("Denied")]):1==t.screenshot.approval?s("p",[t._v("Approved")]):t._e(),s("p",{staticClass:"has-text-light"},[t._v(t._s(t.timestamp))]),s("div",{staticClass:"judge"},[t.$store.state.authed.admin?[s("a",{staticClass:"has-text-success",attrs:{title:"Approve"},on:{click:function(e){t.setApproved(t.screenshot.id,"approve")}}},[s("i",{staticClass:"material-icons"},[t._v("done")])]),s("a",{staticClass:"has-text-danger",attrs:{title:"Deny"},on:{click:function(e){t.setApproved(t.screenshot.id,"deny")}}},[s("i",{staticClass:"material-icons"},[t._v("clear")])])]:t._e(),s("a",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:t.getGalleryURL(),expression:"getGalleryURL()",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopyGalleryURL,expression:"onCopyGalleryURL",arg:"success"}],staticClass:"has-text-light",attrs:{title:"Share"}},[s("i",{staticClass:"material-icons"},[t._v("share")])])],2)])])},[],!1,null,null,null);m.options.__file="Screenshot.vue";var v={components:{Screenshot:m.exports},props:{screenshots:Array}},g=(s(192),Object(f.a)(v,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"screenshot-grid"},this._l(this.screenshots,function(t){return e("screenshot",{key:t.id,attrs:{screenshot:t}})}))},[],!1,null,null,null));g.options.__file="ScreenshotGrid.vue";var b=g.exports,y=(s(194),Object(f.a)({},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"google-loader"},[e("svg",{staticClass:"circular",attrs:{viewBox:"25 25 50 50"}},[e("circle",{staticClass:"path",attrs:{cx:"50",cy:"50",r:"20",fill:"none","stroke-width":"2","stroke-miterlimit":"10"}})])])},[],!1,null,null,null));y.options.__file="Loading.vue";var k,w=y.exports,_=s(196),x=s.n(_);c.a.defaults.withCredentials=!0;var C=(k={},o()(k,!0,1),o()(k,null,2),o()(k,void 0,2),o()(k,!1,3),k);function S(t,e){return t.approval==e.approval?t.id>e.id:C[t.approval]>C[e.approval]}var $={components:{ScreenshotGrid:b,Loading:w},data:function(){return{sidebar:!1,screenshots:[],sortMethods:["ID","Rating","Last added","Author"]}},methods:{pushQuery:function(t){this.$router.push({path:this.$route.path,query:a()({},this.$route.query,t)})},toggleSidebar:function(){this.sidebar=!this.sidebar}},mounted:function(){var t=this;c.a.get("https://g2cf.metastruct.net/lsapi").then(function(e){t.screenshots=e.data.result}),c.a.post("https://g2cf.metastruct.net/lsapi/auth").then(function(e){e.data&&e.data.success&&(t.$store.commit("updateAuthed",e.data),c.a.get("https://g2cf.metastruct.net/lsapi/myvotes").then(function(e){e.data&&e.data.success&&t.$store.commit("updateMyVotes",e.data)}))}).catch(function(t){t.response&&401==t.response.status||console.error(t)})},computed:{sortedScreenshots:function(){var t=this,e=this.screenshots.sort(function(e,s){switch(t.sortMethod){default:case 0:return S(e,s);case 1:var n=x()(e.up,e.up+e.down).left,r=x()(s.up,s.up+s.down).left;return n==r?S(e,s):n>r;case 2:return e.created==s.created?S(e,s):e.created>s.created;case 3:var a=e.name.toLowerCase(),i=s.name.toLowerCase();return a==i?S(e,s):a>i}});return this.sortMethodReverse&&(e=e.reverse()),e=(e=e.filter(function(e){return e.name.toLowerCase().includes(t.filterAuthor.toLowerCase())})).filter(function(e){return 1==e.approval&&t.filterStatus[0].enabled||null==e.approval&&t.filterStatus[1].enabled||0==e.approval&&t.filterStatus[2].enabled}),Number.isNaN(this.filterId)||(e=e.filter(function(e){return e.id==t.filterId})),e},sortMethod:function(){return null==this.$route.query.sortBy?1:parseInt(this.$route.query.sortBy)},sortMethodReverse:function(){return null==this.$route.query.reverse||JSON.parse(this.$route.query.reverse)},filterAuthor:function(){return this.$route.query.author||""},filterId:function(){return parseInt(this.$route.query.id||"")},filterStatus:function(){return[{name:"Approved",enabled:null==this.$route.query.approved||JSON.parse(this.$route.query.approved)},{name:"Pending",enabled:null==this.$route.query.pending||JSON.parse(this.$route.query.pending)},{name:"Denied",enabled:null!=this.$route.query.denied&&JSON.parse(this.$route.query.denied)}]}},watch:{filterStatus:function(){this.pushQuery({pending:this.filterStatus[1].enabled,approved:this.filterStatus[0].enabled,denied:this.filterStatus[2].enabled})},filterAuthor:function(){this.pushQuery({author:this.filterAuthor})}}},A=(s(197),Object(f.a)($,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("aside",{staticClass:"sidebar",class:{"is-expanded":t.sidebar}},[s("div",{staticClass:"sidebar-background",on:{click:t.toggleSidebar}}),s("div",{staticClass:"menu"},[t._m(0),s("p",{staticClass:"menu-label has-text-primary"},[t._v("Sort by")]),s("ul",{staticClass:"menu-list"},t._l(t.sortMethods,function(e,n){return s("a",{class:{"is-active":t.sortMethod==n},on:{click:function(e){t.pushQuery({sortBy:n})}}},[t._v(t._s(e))])})),s("p",{staticClass:"menu-label has-text-primary"},[t._v("Order")]),s("ul",{staticClass:"menu-list"},[s("a",{class:{"is-active":0==t.sortMethodReverse},on:{click:function(e){t.pushQuery({reverse:!1})}}},[t._v("Ascending")]),s("a",{class:{"is-active":1==t.sortMethodReverse},on:{click:function(e){t.pushQuery({reverse:!0})}}},[t._v("Descending")])]),s("p",{staticClass:"menu-label has-text-primary"},[t._v("Filter by")]),s("p",{staticClass:"menu-label has-text-grey-light",staticStyle:{margin:"0.5em 0"}},[t._v("ID")]),s("div",{staticClass:"control"},[s("input",{staticClass:"input",attrs:{type:"number"},on:{input:function(e){t.pushQuery({id:e.target.value})}}})]),s("p",{staticClass:"menu-label has-text-grey-light",staticStyle:{margin:"0.5em 0"}},[t._v("Author")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.filterAuthor,expression:"filterAuthor"}],staticClass:"input",attrs:{type:"text",placeholder:"Author"},domProps:{value:t.filterAuthor},on:{input:function(e){e.target.composing||(t.filterAuthor=e.target.value)}}}),s("p",{staticClass:"menu-label has-text-grey-light",staticStyle:{margin:"0.5em 0"}},[t._v("Status")]),t._l(t.filterStatus,function(e){return s("div",{staticClass:"control"},[s("label",{staticClass:"checkbox"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.enabled,expression:"filter.enabled"}],staticStyle:{"margin-right":"0.5em"},attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.enabled)?t._i(e.enabled,null)>-1:e.enabled},on:{change:[function(s){var n=e.enabled,r=s.target,a=!!r.checked;if(Array.isArray(n)){var i=t._i(n,null);r.checked?i<0&&t.$set(e,"enabled",n.concat([null])):i>-1&&t.$set(e,"enabled",n.slice(0,i).concat(n.slice(i+1)))}else t.$set(e,"enabled",a)},function(s){var n;t.pushQuery(((n={})[e.name.toLowerCase()]=e.enabled,n))}]}}),t._v(t._s(e.name))])])}),s("p",{staticClass:"menu-label has-text-primary"},[t._v("Actions")]),s("ul",{staticClass:"menu-list"},[t.$store.state.authed.success?s("p",[t._v("Logged in!")]):s("a",{staticStyle:{display:"flex"},attrs:{href:"https://g2cf.metastruct.net/lsapi/login"}},[s("i",{staticClass:"material-icons md-light"},[t._v("person")]),s("p",[t._v(" Login")])])])],2),s("button",{staticClass:"collapse-button",on:{click:t.toggleSidebar}},[t.sidebar?s("i",{staticClass:"material-icons md-light"},[t._v("keyboard_arrow_left")]):s("i",{staticClass:"material-icons md-light"},[t._v("keyboard_arrow_right")])])]),t._m(1),s("section",{staticClass:"hero is-small"},[s("div",{staticClass:"hero-body"},[s("div",{staticClass:"container"},[s("div",{staticClass:"content"},[s("h2",[t._v("Welcome!")]),s("p",[t._v("This is the gallery of screenshots displayed while you are loading into our servers."),s("br"),s("a",{attrs:{href:"https://g2cf.metastruct.net/lsapi/login"}},[t._v("Log in with Steam")]),t._v("\nin order to vote for your favorite screenshots!"),s("br"),t._v("You can use the\n"),s("a",{on:{click:t.toggleSidebar}},[t._v("sidebar")]),t._v("\nto sort and filter the grid to your convenience.")]),t._m(2)])])])]),s("section",{staticClass:"section"},[t.screenshots.length>0?s("screenshot-grid",{attrs:{screenshots:t.sortedScreenshots}}):s("div",{staticClass:"google-loading"},[s("Loading")],1)],1)])},n,!1,null,null,null));A.options.__file="index.vue";e.default=A.exports}}]);