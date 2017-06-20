using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace demoSignal
{
    public class nCliente
    {
        
        public nCliente(String userid,String name,bool status)
        {
            UserID = userid;
            Name = name;
            Status = status;
        }
        public String UserID { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
    }
}