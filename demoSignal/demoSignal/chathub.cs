using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;

namespace demoSignal
{
    public class ChatHub2 : Hub
    {

        static List<nCliente> Clientes = new List<nCliente>();
        static monitor monitor = new monitor();
        public void conect(String name,Boolean status)
        {
            String id = Context.ConnectionId;
            bool nuevo=false;
        
                Clientes.Add(new nCliente(id, name,true));
            if (monitor.id != null) {
               Clients.Client(monitor.id).nuevo(id, name, true);
            }
            
            
           
        }
        public void conectMonitor()
        {
            monitor.id = Context.ConnectionId;
            monitor.name = "Admin";
        }
        public void send(String status)
        {
            var id = Context.ConnectionId;
          for(int i = 0; i < Clientes.Count; i++)
            {
                if(Clientes[i].UserID == id)
                {
                    
                }
            }
           
        }
        public void sendOtro(String name,String message)
        {
            Clients.All.habla(name, monitor.id);
            
        }
        public void getStatus()
        {
             if(monitor.id!=null && Clientes.Count > 0){
                for(int i = 0; i < Clientes.Count; i++)
                {
                    String id = Clientes[i].UserID;
                    var resp = Clients.Client(id).refreshStatus();//function refreshStatus
                    Clientes[i].Status = resp;
                    Clients.Client(monitor.id).refreshUser(Clientes[i].Name,resp);
                }
             }
        }
        public void cerrarSesion()
        {
            String id = Context.ConnectionId;
            for(int i = 0; i < Clientes.Count; i++)
            {
                if (Clientes[i].UserID == id)
                {
                    Clients.Client(monitor.id).userOff(Clientes[i].Name);
                    Clientes.Remove(Clientes[i]);
                   
                }
            }

        }
    }
   
}