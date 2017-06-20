    
 
var sessionCnf={
    label:'Nombre de Usuario',
    field:'Escribe un Nombre de Usuario',
    btn:'Aceptar'
}
function _session(arg){
    this.dom;
    this.label;
    this.field;
    this.btn;
    var it=this;
    this.begin=function(arg){
        this.dom=document.createElement('div');
        this.dom.className='sessionDom'
        this.label=document.createElement('p');
        this.label.className='sessionLabel'
        this.field=document.createElement('input');
        this.field.type='text';
        this.field.className='sessionField'
        this.btn=document.createElement('btn');
        this.btn.className='sessionBtn';
        this.dom.appendChild(this.label);
        this.dom.appendChild(this.field);
        this.dom.appendChild(this.btn);
        this.label.innerHTML=arg.label;
        this.field.placeHolder=arg.field;
        this.btn.innerHTML=arg.btn;
        this.btn.addEventListener('click',this.click,false);
    };
    this.click;
    this.begin(arg);
}

function _panel(){
    this.dom;
    this.user;
    this.status;
    this.btn;
    var it=this;
    this.begin=function(){
        this.dom=document.createElement('div');
        this.dom.className='panelDom';
        this.user=document.createElement('p');
        this.status=document.createElement('p');
        this.status.className='panelStatus';
        this.user.className='panelUser';
        this.btn=document.createElement('div');
        this.btn.className='panelBtn';
        this.btn.innerHTML='Activar/Desactivar';
        this.dom.appendChild(this.user);
        this.dom.appendChild(this.status);
        this.dom.appendChild(this.btn);
        this.btn.addEventListener('click',this.click,false);
        
        
    };
    this.click;
    this.begin();
}
    var root;
    var session;
    var panel;
    var core;
function app(){
    core=new _core();
}

    
function _core(){
    this.data = {};
    this.usrSession;
    this.edo;
    this.watcher;
    
    var it=this;
    this.begin=function(){
        root=document.createElement('div');
        root.className='root';
        session=new _session(sessionCnf);
        panel=new _panel();
        document.body.appendChild(root);
        root.appendChild(session.dom);
        root.appendChild(panel.dom); 
        
        this.watcher=new MutationObserver(function(mut){
            mut.forEach(function(mut){
                console.log(mut.attributeName)
                signal();
            })
        });
        
        this.cnf();
    };
    this.cnf=function(){
        console.log('configurando App',session.btn,iniciarSession) 
        session.btn.addEventListener('click',iniciarSession,false);
        panel.btn.addEventListener('click',edoSession,false);
        panel.dom.style.display='none';
        this.watcher.observe(panel.btn,{attributes:true});
        
    };
    this.begin();    
    }
function iniciarSession(){
    var name=session.field.value;
        if(name!='' || name!=null){
            core.data.name=name;
            session.dom.style.display='none';
            panel.dom.style.display='block';
            panel.user.innerHTML = name;
            this.usrSession = name;
            panel.btn.setAttribute('edo','activo'); 
            core.edo=true;
            edoSession();
        }
}
function edoSession(){
    core.edo=!core.edo;
        
        if(core.edo==true){
            panel.status.innerHTML='Activo';
            panel.btn.setAttribute('edo','activo')
            console.log('edo activo');
        }else{
            panel.status.innerHTML='Inactivo';
              panel.btn.setAttribute('edo','inactivo')
            console.log('edo Inactivo');
        }
}
function signal(){
    var edo=panel.btn.getAttribute('edo');
    if(!edo.localeCompare('activo')){
        console.log('SignalOn');
        sendActive()
    }else{
        console.log('SignalOff');
        sendInactive()
    }
}
