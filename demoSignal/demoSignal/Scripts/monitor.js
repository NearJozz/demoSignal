
function app(){
    this.dom;
    this.clients=[];
    this.begin=function(){
        this.dom=document.createElement('div');
        document.body.appendChild(this.dom);
        this.setStyle();
    }
    this.setStyle=function(){
        this.dom.style.width='800px';
        this.dom.style.height='600px';
        this.dom.style.backgroundColor='rgb(20,20,20)'
        this.dom.style.overflow='hidden';
        
    }
    this.addClient = function (id, name, status) {
        var nClient = new _client(id, name, status);
        this.clients.push(nClient);
        this.dom.appendChild(nClient.dom);
    };
    this.delClient = function (arg) {
        for (var e in this.clients) {
            if (this.clients[e].data.name == arg) {
                var obj = this.clients[e].dom;
                this.dom.removeChild(obj);
                this.clients.pop(this.clients[e]);
            }
        }
    }
    this.begin();
    
}
function _client(id,name,status){
    this.data={
        id:null,
        name:null,
        status:null
    }
    this.dom;
    this.name;
    this.indicador;
    this.watchDog;
    var it=this;
    this.begin=function(id,name,status){
        this.data.id=id;
        this.data.name=name;
        this.data.status=status;
        this.dom=document.createElement('div');
        this.name=document.createElement('p');
        this.name.innerHTML=this.data.name;
        this.indicador=document.createElement('div');
        this.dom.appendChild(this.name);
        this.dom.appendChild(this.indicador); 
        this.setStyle();
        this.watchDog=new MutationObserver(function(mut){
            mut.forEach(function(mut){
                console.log(mut.attributeName,'change');
      
                it.changeStatus(mut.attributeName,it.data.status);
                }
            )});
        
        this.watchDog.observe(this.dom,{attributes:true});
        this.setStatus(this.data.status);
        
    }
    this.setStyle=function(){
        this.dom.style.width='150px';
        this.dom.style.height='200px';
        this.dom.style.float='left';
        this.dom.style.backgroundColor='rgb(80,80,80)';
        this.name.style.width='100%';
        this.name.style.textAlign='center';
        this.indicador.style.width='30px';
        this.indicador.style.height='30px';
        this.indicador.style.borderRadius='50%'
        this.indicador.style.marginLeft='auto';
        this.indicador.style.marginRight='auto';
        this.indicador.style.backgroundColor='blue';
    };
    this.setStatus=function(arg){
          it.dom.setAttribute('status',arg);
    
    };
    this.changeStatus=function(){
        var edo=eval(it.dom.getAttribute('status'));
        console.log(edo,typeof(edo));
        if(edo==true){
            it.indicador.style.backgroundColor='green';
        }else if(edo==false){
            it.indicador.style.backgroundColor='red';
        }
    }
    if(id !=null && name!=null && status!=null){
    this.begin(id,name,status);
    }
}