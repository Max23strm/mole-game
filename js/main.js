score=0;
function estausRey(){
    return Math.random()>.9;
}
function tristezaIntervalo(){
    return Date.now() + 1000;
}
function irseIntervalo(){
    return Date.now() + Math.floor(Math.random()*18000)+2000;
}

function hambrientoIntervalo(){
    return Date.now() + Math.floor(Math.random()*3000) + 2000;
}
function feed(event){
    if (event.target.tagName !=="IMG"||!event.target.classList.contains("hambre")){
        return;
    }
    const mole=moles[parseInt(event.target.dataset.index)]
    mole.status="alimentado";
    mole.next=tristezaIntervalo();
    if (mole.king){
        score+=2;
        mole.node.children[0].src="img/mole-game/king-mole-fed.png"
    } else{
        score++;
    mole.node.children[0].src="img/mole-game/mole-fed.png";
    }
    mole.node.children[0].classList.remove=("hambre");
    
    if (score>=10){
        win();
    }
document.querySelector(".worm").style.width=`${10*score}%`;
}

function win(){
    document.querySelector(".princi").classList.toggle("hidden")
    document.querySelector(".win").classList.remove("hidden")
}
const moles=[
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node:document.getElementById("topo-0"),
    },
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node:document.getElementById("topo-1"),
    },
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node:document.getElementById("topo-2"),
    },
    {
        status:"triste",
        next:tristezaIntervalo(),
        king:false,
        node:document.getElementById("topo-3"),
    },
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node: document.getElementById("topo-4")
    },
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node: document.getElementById("topo-5")
    },
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node: document.getElementById("topo-6")},
    {
        status:"hambre",
        next:tristezaIntervalo(),
        king:false,
        node: document.getElementById("topo-7")
    }
    

        
]

function proximoEstado(mole){
    switch (mole.status){
        case "alimentado":
        case "triste":
            mole.next=tristezaIntervalo();
            mole.status="yendose";
            if (mole.king){
                mole.node.children[0].src="img/mole-game/king-mole-leaving.png"
            } else{
            mole.node.children[0].src="img/mole-game/mole-leaving.png"
            }
            break;
        case "yendose":
            mole.next=irseIntervalo();
            mole.status="fuera";
            mole.node.children[0].classList.add("hidden");
            break;
        case "fuera":
            mole.next=hambrientoIntervalo();
            mole.status="hambre";
            mole.king=estausRey();
            mole.node.children[0].classList.add("hambre")
            mole.node.children[0].classList.toggle("hidden", false);
            if (mole.king){

                mole.node.children[0].src="img/mole-game/king-mole-hungry.png"
            } else{
            mole.node.children[0].src="img/mole-game/mole-hungry.png"
            }
            break;
        case "hambre":
            mole.status="triste"
            mole.next=tristezaIntervalo();
            mole.node.children[0].classList.toggle("hambre", false);
            

            if (mole.king){

                mole.node.children[0].src="img/mole-game/king-mole-sad.png"
            } else{
                mole.node.children[0].src="img/mole-game/mole-sad.png";
            }
            break;
    }
}
                

                    
                    
let runAgainAt=Date.now() + 100;
function nextFrame(){
    const now= Date.now();
    if(runAgainAt<=now){
        for(let i=0; i<moles.length; i++){
            if (moles[i].next<=now){
                proximoEstado(moles[i]);
            }
        }
        runAgainAt=now+1000;
    }
    requestAnimationFrame(nextFrame);
};

document.querySelector(".juego").addEventListener("click", feed);

nextFrame();    