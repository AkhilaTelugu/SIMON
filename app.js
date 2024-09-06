/*EVENT BUBBLING
let d=document.querySelector("div");
let uol=document.querySelector("ul");
let lis=document.querySelectorAll("li");
d.addEventListener("click",function(){
    console.log("div was clicked");
});
uol.addEventListener("click",function(event){
    event.stopPropagation();//stops event bubbling process
    console.log("ul was clicked");
});
for(l of lis)
{
l.addEventListener("click",function(){
        //event.stopPropagation();//stops event bubbling process
    console.log("li was clicked");
});
}*/
/*todo list
let btn=document.querySelector("button");
let uol=document.querySelector("ul");
let inp=document.querySelector("input");
btn.addEventListener("click",function(){
    let item=document.createElement("li");
    item.innerText=inp.value;

    let delbtn=document.createElement("button");
    delbtn.innerText="Delete";
    delbtn.classList.add("delete");
    item.appendChild(delbtn);
    
    uol.appendChild(item);
    inp.value="";//after appending to ul then input text box will become emptty
});*/
/*by clicking delete button it should delete whole item
let delbtns=document.querySelectorAll(".delete");//so 1st selecting all delete buttons
for(delbtn of delbtns){
    delbtn.addEventListener("click",function(){
        let parentele=this.parentElement;//=delbtn.parentElement; extracting parent ele of delete button so we are using navigatio
        console.log(" the following ele going to be deleted:");
        console.log(parentele);
        parentele.remove();//bcoz as we want to delete an list item ; delete button is child of an list item
        //this whole code 35-44 willn't work for newly added list items. It only applicable for existing elements of page (here for eat&sleep)
    });
}*/
/*to overcome disadv of 35-45 we are using event delegation
uol.addEventListener("click",function(event){
if(event.target.nodeName=="BUTTON")
    {
        let listitem=event.target.parentElement;
        listitem.remove();
        console.log("deleted");
    }//46-54 can delete existing as well as new ones
});*/
let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let h2tag=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false)
        {
            console.log("game is started");
            started=true;
            levelup();
        }
});
function gameflash(btn)
{
btn.classList.add("gameflash");//adding a new class whose functions/properties are in css file
setTimeout(function (){ btn.classList.remove("gameflash");},750);//after 250millisec the color of box should change from white(css styling .flash) to back state
}
//gameflash(activates only when ) will make into white color where as userflash will make into green color
function userflash(btn)
{
btn.classList.add("userflash");//adding a new class whose functions/properties are in css file
setTimeout(function (){ btn.classList.remove("userflash");},750);//after 250millisec the color of box should change from green(css styling .flash) to back state
}
function  levelup()
{
    userseq=[];
    level++;
    h2tag.innerText=`${level}`;
  let randidx= Math.floor(Math.random()*3); //choose an random button (as btns array has 4values so idx is from 0to3)
  let randcolor=btns[randidx];
  let randbtn=document.querySelector(`.${randcolor}`);
  console.log(randidx);
  console.log(randcolor);
  console.log(randbtn);
  gameseq.push(randcolor);
  console.log("the game sequence is:",gameseq);
 gameflash(randbtn);
}
function checkAns(idx){
    console.log("curr level:",level);
   // let idx=level-1;

    if(userseq[idx]===gameseq[idx])
        {
            if(userseq.length==gameseq.length){
       // console.log("same value");
      //  levelup();
      setTimeout(levelup,1000);
            }
    }
    else{
       // h2tag.innerText="Game over! press any key to start";
        h2tag.innerHTML=`Game over! Your score was <b> ${level}</b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";//denotes u lost game
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);//after 150milliseconds of displaying red bgcolor again it should display/come back to normal white colour
        reset();
    }
};
function btnpress()
{
    console.log("The following btn was pressed:");
    console.log(this);
    let bu=this;//bu=button
    //console.log(this);//detecting which button(i.e, box) was pressed
    userflash(bu);
  uColor=bu.getAttribute("id");
console.log(uColor);
userseq.push(uColor);
checkAns(userseq.length-1);
}//the button pressed by us & game both will activate flush function 
let allbtns= document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset()
{
 started=false;
 gameseq=[];
 userseq=[];
 level=0;
}

