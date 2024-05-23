let e;function t(e){let t=document.querySelectorAll(e);if(t.length>1)throw Error("Multiple elements detected");if(t.length<1)throw Error("No elements detected, is the js file deferred?");return t[0]}const n=t("#game-elements"),l=t("#winner-text"),r=t("#start-game"),s=t("#current-player-turn");// @ts-ignore
function o(e,t,n){return{state:e,value:t,possibleMoves:n}}function i(e,t,n,l){let r=()=>[...document.querySelectorAll(".cell:not(.x):not(.o)")],s=()=>[...document.querySelectorAll(".cell")],o=async(n,l)=>new Promise(o=>{var i;if(i=function e(n){var r;let i=n.target,a=i.getAttribute("data-cell-index");l.editBoard(a,t),r=e,s().forEach(e=>e.removeEventListener("click",r)),o()},r().forEach(e=>{e.addEventListener("click",i)}),e){let e=s(),t=n.possibleMoves,l=0;for(let e=1;e<t.length;e++){let n=t[e]?.value??0,r=t[l]?.value??0;l=n>r?e:l}e[l].click()}});return{symbol:t,name:n,startTurn:o}}const a=function(){let e=["empty","empty","empty","empty","empty","empty","empty","empty","empty"],t=e=>document.querySelector(`.cell[data-cell-index='${e}']`),n=()=>{e.forEach((e,n)=>{"o"===e?t(n).classList.add("o"):"x"===e?t(n).classList.add("x"):"empty"===e&&(t(n).classList.remove("x"),t(n).classList.remove("o"))})},l=null;return{isWinner:t=>{let n=n=>e[n]===t,l=n(0)&&n(3)&&n(6),r=n(1)&&n(4)&&n(7),s=n(2)&&n(5)&&n(8),o=n(0)&&n(1)&&n(2),i=n(3)&&n(4)&&n(5),a=n(6)&&n(7)&&n(8),c=n(0)&&n(4)&&n(8),u=n(2)&&n(4)&&n(6);return l||r||s||o||i||a||c||u},isFilled:()=>!e.includes("empty"),editBoard:(t,r)=>{e[t]=r,l=t,n()},reset:()=>{e.fill("empty"),n()},getLastEditedIndex:()=>l,gameBoard:e}}();r.addEventListener("click",function(t){a.reset(),console.log("game starting"),e.start(),r.style.opacity="0",document.querySelector("#winner-text").textContent=""}),e=function(e,t,n){let r=()=>n.isWinner(e.symbol)||n.isWinner(t.symbol)||n.isFilled();async function i(e,t){s.textContent=`It's your turn, ${e.name}`,await e.startTurn(t,n),s.textContent=""}let a=function(){let e=o(["empty","empty","empty","empty","empty","empty","empty","empty","empty"],0,[]);return function e(l,r){let s=t(r.state);for(let i=0;i<9;i++)if("empty"===r.state[i]){s[i]=l;let a=o(t(s),0,[]),c=n(s,"x"),u=n(s,"o");c?a.value=1:u?a.value=0:a.value=.5,r.possibleMoves.push(a);let m=!(c||u);m&&e("x"===l?"o":"x",a),s[i]="empty"}else r.possibleMoves.push(null)}("o",e),e;function t(e){return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]]}function n(e,t){let n=n=>e[n]===t,l=n(0)&&n(3)&&n(6),r=n(1)&&n(4)&&n(7),s=n(2)&&n(5)&&n(8),o=n(0)&&n(1)&&n(2),i=n(3)&&n(4)&&n(5),a=n(6)&&n(7)&&n(8),c=n(0)&&n(4)&&n(8),u=n(2)&&n(4)&&n(6);return l||r||s||o||i||a||c||u}}(),c=async()=>{let s=a;for(;;){await i(e,s);let l=s;if(u(s=s.possibleMoves[n.getLastEditedIndex()],l),r()||(await i(t,s),l=s,u(s=s.possibleMoves[n.getLastEditedIndex()],l),r()))break}l.style.display="block",n.isWinner(e.symbol)?l.innerHTML=`${e.name} has won`:n.isWinner(t.symbol)?l.innerHTML=`${t.name} has won`:n.isFilled()&&(l.innerHTML="TIE!"),document.querySelector("#start-game").style.opacity="1"};return{start:c};// equation on page 10 of rl by barto and sutton second edition: V(S_t) <- V(S_t) + a[V(S_t+1) - V(S_t)]
function u(e,t){t.value=t.value+1*(e.value-t.value)}}(i(!1,"o","User",a),i(!0,"x","Reino",a),a),n.style.display="grid";//# sourceMappingURL=index.42a28bf5.js.map

//# sourceMappingURL=index.42a28bf5.js.map