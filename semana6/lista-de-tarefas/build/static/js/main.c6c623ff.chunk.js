(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(24)},18:function(e,t,a){},24:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(7),r=a.n(i),o=a(1),s=a(2);a(18);function c(){const e=Object(o.a)(["\n  display: grid;\n  grid-auto-flow: column;\n  gap: 10px;\n"]);return c=function(){return e},e}function u(){const e=Object(o.a)(["\n  text-align: center;\n  list-style: none;\n  text-decoration: ",";\n"]);return u=function(){return e},e}function d(){const e=Object(o.a)(["\n  padding: 0;\n  width: 300px;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n"]);return d=function(){return e},e}const m=s.a.ul(d()),p=s.a.li(u(),({completa:e})=>e?"line-through":"none"),h=s.a.div(c());var f=class extends l.a.Component{constructor(...e){super(...e),this.state={tarefas:[],inputValue:"",filter:""},this.onChangeInput=(e=>{this.setState({inputValue:e.target.value})}),this.criaTarefa=(()=>{let e={id:Date.now(),texto:this.state.inputValue,completa:!1,delete:"(x)",edit:"----Editar----"};""===e.texto?alert("Esta tarefa \xe9 nula"):this.setState({tarefas:[...this.state.tarefas,e],inputValue:""})}),this.selectTarefa=(e=>{let t=this.state.tarefas.map(t=>t.id===e?{completa:!t.completa,texto:t.texto,id:Date.now(),delete:"(x)",edit:"----Editar----"}:t);this.setState({tarefas:t})}),this.onChangeFilter=(e=>{this.setState({filter:e.target.value})}),this.deleteItem=(e=>{let t=this.state.tarefas.map(t=>t.id===e?{}:t);this.setState({tarefas:t})}),this.editItem=(e=>{let t=prompt("Deseja editar? Insira o novo conte\xfado abaixo"),a=this.state.tarefas.map(a=>a.id===e?{texto:t,id:Date.now(),delete:"(x)",edit:"----Editar----"}:a);this.setState({tarefas:a})}),this.deleteStorage=(()=>{window.confirm("Voc\xea deseja excluir todos os dados?")&&(localStorage.clear(),window.location.reload(!1))})}componentDidUpdate(){localStorage.setItem("tasks",JSON.stringify(this.state.tarefas))}componentDidMount(){this.setState({tarefas:JSON.parse(localStorage.getItem("tasks"))||[]})}render(){let e=()=>5*Math.random();const t=this.state.tarefas.filter(e=>{switch(this.state.filter){case"pendentes":return!e.completa;case"completas":return e.completa;default:return!0}});return l.a.createElement("div",{className:"App"},l.a.createElement("div",null,l.a.createElement("h1",null,"To-Do List"),l.a.createElement(h,null,l.a.createElement("input",{value:this.state.inputValue,onChange:this.onChangeInput}),l.a.createElement("button",{onClick:this.criaTarefa},"Adicionar"),l.a.createElement("ul",null,l.a.createElement("li",null,'Para editar clique uma vez no "Editar"'),l.a.createElement("li",null,'Para excluir clique duas vezes no "x"'),l.a.createElement("li",null,"Para concluir clique na tarefa")),l.a.createElement("button",{onClick:this.deleteStorage},"Excluir Todas"))),l.a.createElement("br",null),l.a.createElement(h,null,l.a.createElement("label",null,"Filtro"),l.a.createElement("select",{value:this.state.filter,onChange:this.onChangeFilter},l.a.createElement("option",{value:""},"Nenhum"),l.a.createElement("option",{value:"pendentes"},"Pendentes"),l.a.createElement("option",{value:"completas"},"Completas"))),l.a.createElement(m,null,t.map(t=>l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{key:e()+1,onDoubleClick:()=>this.deleteItem(t.id)},l.a.createElement(p,{completa:t.completa,key:e(),onClick:()=>this.selectTarefa(t.id)},t.texto),t.delete),l.a.createElement("span",{onClick:()=>this.editItem(t.id)},t.edit)))))}};const E=document.getElementById("root");r.a.render(l.a.createElement(f,null),E)}},[[12,1,2]]]);
//# sourceMappingURL=main.c6c623ff.chunk.js.map