import Utility from "./utility.mjs";

import EAWKit from "https://s3-ap-northeast-1.amazonaws.com/websdk-cdn.evixar.com/ca9091b2af6c452f91994fba34180daa/2b6193cb42cf46a9aad08804aae34027/eawkit.js"

import $ from "./jquery.module.mjs";

//setting(not used)
let ContractAddress1 = "0x69fFC3572eEAc73190a1E13aa683B3a2234fc833";
let ContractAddress2 = "0x69fFC3572eEAc73190a1E13aa683B3a2234fc833";

// for audio
let audio_sample_rate = null;
let processor = null;
let audioContext = null;

//for debug
let enableDebugLog=false;
const resultText = document.getElementById("result");
//const debugRecord = document.getElementById("debugRecord");

//load modile
let EAW;
EAWKit().then(instance => {
  EAW = instance;
});

let useraddress = "";

// let meslist = [];
// let m = 0;
// let mesinterval;

window.onload = async () => {
    
//    await startmetamsk();
    
//    setmes("Your address is " + useraddress.substring(0,10)+"..." );

//     addmes("please enable mic.");
//     addmes("set your smartphone near speaker.");
//     startmes();

    while( useraddress[1] !== "x"){
        useraddress = prompt("please enter your wallet address")
        }

    navigator.mediaDevices
    .getUserMedia({ video: false, audio:true })
    .then(mediaDevicesOpened);
    
}


// function setmes(arg){
//     resetmes();
//     document.getElementById("message").innerHTML = arg;
// }

// async function nextmes(){
//     document.getElementById("message").innerHTML = meslist[m % meslist.length];
//     m = m + 1;
// }

// function startmes(){
//     mesinterval = setInterval( nextmes , 3000 );
// }

// function addmes(arg){
//     meslist.push(arg);
// }

// function resetmes(){
//     clearInterval(mesinterval);
//     meslist = [];
// }





//mainnet
//const ContractAddress = "";

//matic matic testnet(0) or matic network(1)
const network = 1;

//---------------------------------------------


//testnet or mainnet 
//rpclist = [ "" , "" ];
const explorerlist = [ "https://explorer-mumbai.maticvigil.com/tokens/" , "https://explorer-mainnet.maticvigil.com/tokens/" ];
const mintnandemotokenapilist = [ "https://mint.nandemotoken.com/api/v1/testnet/" , "https://mint.nandemotoken.com/api/v1/" ];
const opensealist = [ "https://testnets.opensea.io/account/" , "https://opensea.io/account/"];



async function airdrop_servermes(_meta){
        
    //await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random()*30)*1000));
  
    $.post( "https://airdrop.sushininja.tech/airdrop/" , { contractId: ContractAddress1 , userWallet: useraddress , meta: _meta } )
        .then( 
        result => {
            console.log(result)
            if (result.code == 222){
                console.log("dual get rejected");
            }
            if (result.code == 200){
                //alert("Okey! You can recieve NFT soon");
                localStorage.setItem("usedpc1",true);
            }
        } 
        , reason => {
            //alert(reason)
        } )

    //alert("あなたのアドレス：\n" + useraddress)

}





//-----------------------------

var mediaDevicesOpened = function(stream) {
  audioContext = new(window.AudioContext || window.webkitAudioContext)
  
  audio_sample_rate = audioContext.sampleRate;
  console.log("Opened sound device samplerate is "+audio_sample_rate+"Hz");

  var source = audioContext.createMediaStreamSource(stream);
  let currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
  
  EAW.createInstance(audioContext).then((instance)=> {
    processor=instance;

    processor.onready = function() {
      // if(debugRecord.checked){
      //   processor.enablerecord();
      // }
      processor.start(audio_sample_rate);
      if(enableDebugLog){console.log("sdk ready");}
    }

    processor.ondetect = function(result) {  
        let meta=result.meta;
        let pos=result.pos;
        resultText.innerHTML=meta;
        // if(pos!=null){
        //   resultText.innerHTML+="("+pos+"[msec])";
        // }
        // if(enableDebugLog){console.log("detected:"+meta+"("+pos+"[msec])");}
        //alert(meta);
        
        airdrop_servermes(meta);
            
        //if (meta==72039){
            //alert("72039")
            
            //nftip1();
            
        //}
        
        if (meta==72040){
            //alert("72040")
          resultText.style.display = "none";
          if(!getamadai){
             getamadai=true;
          setTimeout(() => {
              ninjaSushi('#ninja-box-1');
          }, 2000);
          getSushi();
            
            }
        }

      if (meta==72041){
            //alert("72041")
            resultText.style.display = "block";
        }
      
      if (meta==72042){
            //alert("72042")
            resultText.style.display = "none";
            if(!getsazae){
               getsazae=true;
            setTimeout(() => {
                ninjaSushi('#ninja-box-2');
            }, 2000);
            getSushi();
            }  
        }

      
    };
    processor.onstarted = function() {  
      if(enableDebugLog){console.log("process started");}
    }
    processor.onstopped = function() {  
      if(enableDebugLog){console.log("process stopped");}
        audioContext.close();  
    }
    processor.onrecorded = function(pcm) {  
      let audioData=pcm;
      let util=new Utility();
      let url=util.saveAudio(audioData,audio_sample_rate);
      downloadLink.href=url;
      let fname=util.wavFileName();
      downloadLink.download=fname;
      downloadLink.innerHTML="Download<br>(" + fname + ")";
      //downloadLink.click();//ダウンロードさせる場合はこちら
      if(enableDebugLog){console.log("wav saved");}
    }

    source.connect(processor.node);
    processor.node.connect(audioContext.destination);  
  });
};


let getamadai;
let getsazae;

function ninjaSushi(id){

    var box = $(id);

//    var ninjaDoor1 = '<div class="flip-card-inner"><div class="flip-card-front"><img src="assets/img/ninjawood.png" alt="ninja"></div><div class="flip-card-back"><img src="assets/img/tai.jpg" alt="sushi"></div></div></div>'      
      var ninjaDoor1 = '<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img src="assets/img/ninjawood.png" alt="ninja"></div><div class="flip-card-back"><img src="assets/img/tai.jpg" alt="sushi"></div></div></div>'      
  var ninjaDoor2 = '<a href="https://opensea.io/accounts/' + useraddress +  '" target="_blank"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img src="assets/img/ninjawood.png" alt="Avatar"></div><div class="flip-card-back"><img src="assets/img/sazae.jpg"></div></div></div></a>'

    if (id === '#ninja-box-1') {
        box.append(
            ninjaDoor1
        );
    }

    if (id === '#ninja-box-2') {
        box.append(
            ninjaDoor2
        );
    }
}


const visible = "-visible";
const transparency = "transparency";
//const $target = $(".bg");
const b = document.getElementById("bg")

function getSushi(){
    //$target.addClass(visible);
    //$target.addClass(transparency);
    b.classList.add(visible);
    b.classList.add(transparency);
  
    setTimeout(() => {
        b.classList.remove(visible);
    }, 2000);

    setTimeout(() => {
        b.classList.remove(transparency);
    }, 3000);

}

