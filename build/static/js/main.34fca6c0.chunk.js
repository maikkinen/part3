(window.webpackJsonppuhelinluettelo=window.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),l=t.n(u),o=t(2),c=t(3),i=t.n(c),s=function(){return i.a.get("/persons").then((function(e){return e.data}))},m=function(e){return i.a.post("/persons",e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat("/persons","/").concat(e),n).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat("/persons","/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.persons,t=e.filter,a=e.handleDelete,u=n,l=t;if(""!==t){var o=n.filter((function(e){return e.name.includes(l)}));return r.a.createElement("ul",null,o.map((function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(n){return a(e.id,n)}}," delete ")," ")})))}return r.a.createElement("ul",null,u.map((function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(n){return a(e.id,n)}}," delete "))})))},h=function(e){var n=e.filter,t=e.setFilter;return r.a.createElement("div",null,"show contacts with:",r.a.createElement("input",{className:"inputField",name:"filter",value:n,onChange:function(e){t(e.target.value)}}))},b=function(e){var n=e.newName,t=e.newNumber,a=e.handleTypingName,u=e.handleTypingNumber,l=e.handleAddPerson;return r.a.createElement("form",{style:{margin:10},onSubmit:l},r.a.createElement("div",null,"name: ",r.a.createElement("input",{className:"inputField",name:"name",value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{className:"inputField",name:"number",value:t,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.message;return null==n?null:r.a.createElement("div",{className:"error"},n)},v=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),c=Object(o.a)(l,2),i=c[0],v=c[1],E=Object(a.useState)(""),w=Object(o.a)(E,2),y=w[0],N=w[1],j=Object(a.useState)([]),O=Object(o.a)(j,2),T=O[0],k=O[1],C=Object(a.useState)(""),S=Object(o.a)(C,2),F=S[0],P=S[1];Object(a.useEffect)((function(){s().then((function(e){console.log(e),k(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:F}),r.a.createElement(h,{filter:y,setFilter:function(e){return N(e)}}),r.a.createElement("h2",null,"Add a New Contact"),r.a.createElement(b,{newName:t,newNumber:i,handleTypingName:function(e){return u(e.target.value)},handleTypingNumber:function(e){return v(e.target.value)},handleAddPerson:function(e){e.preventDefault();var n={name:t,number:i};if(T.map((function(e){return e.name})).includes(t)){var a=T.find((function(e){return e.name===t}));return console.log("updated Person",n),window.confirm("".concat(t," exists already. Would you like to update the number?"))&&d(a.id,n).then((function(e){P("Contact details of '".concat(t,"' have been updated.")),console.log("hey"),setTimeout((function(){P(null)}),3e3),k(T.map((function(n){return n.name!==t?n:e}))),u(""),v("")})).catch((function(e){P("Failed to update contact details.")})),console.log("sup")}if(i.length<=1)return window.alert("Please, give ".concat(t," an appropriate phone number!"));m(n).then((function(e){k(T.concat(e)),u(""),v(""),P("'".concat(e.name,"' has been added.")),console.log("response",e),console.log("errorMessage",F),setTimeout((function(){P(null)}),3e3)}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(p,{persons:T,filter:y,handleDelete:function(e,n){window.confirm("You sure u wanna do this?")&&(console.log("farewell firewall honey",e),n.preventDefault(n),f(e).then((function(n){P("That dude was deleted."),console.log("reesponse",n),console.log("errorMessage",F),setTimeout((function(){P(null)}),3e3),k(T.filter((function(n){return n.id!==e})))})).catch((function(e){P("(S)he was already removed from the server"),setTimeout((function(){P(null)}),3e3)})))}}))};t(36);l.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.34fca6c0.chunk.js.map