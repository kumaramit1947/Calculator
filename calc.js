let alertBox=document.getElementsByClassName("alertBox")[0];
let inpBox=document.getElementsByClassName("inputPart")[0];
let outTxt=document.getElementsByClassName("outputText")[0];
let alertMsg=document.getElementsByClassName("msg")[0];
let inpBut=document.getElementsByClassName("inputBut");
let brac=document.getElementsByClassName("brac");
let isAlert=false;
// function executed when any input button is clicked
function build(inStr){
    if(isAlert){
        return;
    }
    if(inStr=="C"){
        clearAll();
    }
    else if(inStr=="B"){
        delLast();
    }
    else if(inStr=="="){
        calc();
    }
    else{
        if(outTxt.textContent!="" && inpBox.textContent==""){
            inpBox.textContent=outTxt.textContent;
            outTxt.textContent="";
        }
        inpBox.textContent+=inStr;
        if(isOverflown(inpBox)){
            warnMsg("Input Overflow");
        }
    }
}
// ...........
// function to clear all the screen
function clearAll(){
    inpBox.textContent="";
    outTxt.textContent="";
}
// ........
// function to execute Backspace function
function delLast(){
    let txt=inpBox.textContent;
    inpBox.textContent=txt.slice(0,-1);
}
// ..........
// function to check if input expression crosses the limit
function isOverflown(ele){
    if(ele.offsetHeight<ele.scrollHeight){
        ele.style.overflow="hidden";
        delLast();
        return true;
    }
    else{
        return false;
    }
}
// ......
// Calculate function to calculate the input expression
function calc(){
    let txt=inpBox.textContent;
    try{
        let val=eval(txt);
        putOutput(val);
    }
    catch(err){
        warnMsg("Wrong Input");
    }
}
// .............
// It puts the calculated value in the output screen.
// Clips the overflown part of msg
function putOutput(val){
    outTxt.textContent=val;
    if(outTxt.clientWidth<outTxt.scrollWidth){
        warnMsg("Output Overflow");
        
    }
}
// ............
// Alert msgs if unwanted input or output occurs
function warnMsg(msg){
    isAlert=true;
    alertMsg.textContent=msg;
    alertBox.style.display="block";
    for(let i=0;i<inpBut.length;i++){
        inpBut[i].style.cursor="no-drop";
    }
    brac[0].style.cursor="no-drop";
    brac[1].style.cursor="no-drop";

}
// .......
// function exit out of the alert msg.
function exitMsg(){
    isAlert=false;
    alertBox.style.display="none";
    alertMsg.textContent="";
    for(let i=0;i<inpBut.length;i++){
        inpBut[i].style.cursor="pointer";
    }
    brac[0].style.cursor="pointer";
    brac[1].style.cursor="pointer";   
}
// ............