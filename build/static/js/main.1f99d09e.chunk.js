(this.webpackJsonpcsvimport=this.webpackJsonpcsvimport||[]).push([[0],{33:function(t,e,n){},34:function(t,e,n){},58:function(t,e,n){"use strict";n.r(e);var c=n(0),i=n.n(c),a=n(24),s=n.n(a),o=(n(33),n(27)),l=n(7),r=(n(34),n(26)),d=n(12),j=n(28),u=n(10),b=n.n(u),h=n(25),f=n(2);var O=function(t){return Object(f.jsx)("div",{children:t.fileList.length>0?Object(f.jsxs)(h.a,{striped:!0,bordered:!0,hover:!0,children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"#"}),Object(f.jsx)("th",{children:"File Name"}),Object(f.jsx)("th",{children:"Date uploaded"}),Object(f.jsx)("th",{children:"Status"})]})}),Object(f.jsx)("tbody",{children:t.fileList.map((function(e,n){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:n+1}),Object(f.jsx)("td",{children:e.file_name}),Object(f.jsx)("td",{children:e.date_uploaded}),Object(f.jsx)("td",{children:t.status[e._id]?t.status[e._id]:e.status}),Object(f.jsx)("td",{children:e.file_content?e.file_content.length>0?e.file_content.map((function(t){return Object(f.jsxs)("div",{children:[t._id,"  ",t.total]},t._id)})):Object(f.jsx)("button",{onClick:function(){return t.getFileContent(e._id)},children:"View Data"}):Object(f.jsx)("button",{children:"View Data"})})]},e._id)}))})]}):null})};var p=function(){var t=Object(c.useState)(""),e=Object(l.a)(t,2),n=e[0],i=e[1],a=Object(c.useState)([]),s=Object(l.a)(a,2),u=s[0],h=s[1],p=Object(c.useState)(!1),x=Object(l.a)(p,2),m=x[0],v=x[1],g=Object(c.useState)(""),S=Object(l.a)(g,2),_=S[0],F=S[1],C=Object(c.useState)({}),w=Object(l.a)(C,2),L=w[0],y=w[1];return Object(c.useEffect)((function(){(b.a.get("http://localhost:3000/files",{params:{id:""}}).then((function(t){console.log("===== File List ======  ",t.data),h(t.data)})),m)||(new EventSource("http://localhost:3000/poll-status").onmessage=function(t){var e=JSON.parse(t.data);console.log("parseddd== ",e.data),y(e.data)});v(!0)}),[]),Object(f.jsxs)(r.a,{children:[Object(f.jsx)("div",{style:{marginTop:"3%"},children:Object(f.jsx)("h3",{children:"Import CSV file"})}),Object(f.jsx)("div",{children:Object(f.jsxs)(d.a,{onSubmit:function(t){return function(t){if(t.preventDefault(),n){if("csv"!==n.name.split(".").pop().toLowerCase())return F("Invalid file format"),void i("");if(n.size>5e6)return F("File size too big"),void i("");var e=new FormData;e.append("myFile",n,n.name),console.log(n),b.a.post("http://localhost:3000/save",e).then((function(t){console.log("save",t),t.data.success&&h([].concat(Object(o.a)(u),[t.data.data]))})),i("")}else F("Please select a file")}(t)},children:[Object(f.jsx)(d.a.Group,{children:Object(f.jsx)(d.a.File,{id:"custom-file",onChange:function(t){return e=t,F(""),console.log(e.target.files[0]),void i(e.target.files[0]);var e},label:n.name?n.name:"Upload file(upto 5MB size)",custom:!0})}),Object(f.jsx)("span",{children:_}),Object(f.jsx)("br",{}),Object(f.jsx)(j.a,{variant:"primary",type:"submit",children:"Submit"})]})}),Object(f.jsx)("br",{}),Object(f.jsx)(O,{fileList:u,getFileContent:function(t){return function(t){b.a.get("http://localhost:3000/file-content/".concat(t)).then((function(e){if(console.log("file content --- ",e),e.data.success){var n=u.map((function(n){return n._id===t&&(n.file_content=e.data.data),n}));h(n)}}))}(t)},status:L})]})},x=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(e){var n=e.getCLS,c=e.getFID,i=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),c(t),i(t),a(t),s(t)}))};n(57);s.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(p,{})}),document.getElementById("root")),x()}},[[58,1,2]]]);
//# sourceMappingURL=main.1f99d09e.chunk.js.map