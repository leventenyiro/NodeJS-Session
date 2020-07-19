using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Desktop
{
    public partial class FormInner : Form
    {
        private CookieContainer cookies;
        private HttpClientHandler handler;
        private HttpClient client;

        public FormInner()
        {
            InitializeComponent();

            var url = "http://localhost:8080/login";
            cookies = GlobalCookie.Cookies;
            handler = new HttpClientHandler();
            handler.CookieContainer = cookies;

            client = new HttpClient(handler);
            //IEnumerable<Cookie> responseCookies = cookies.GetCookies(new Uri(url)).Cast<Cookie>();
            

            HttpResponseMessage res = client.GetAsync(url).Result;
            var jsonString = res.Content.ReadAsStringAsync();
            jsonString.Wait();
            var user = JsonConvert.DeserializeObject<User>(jsonString.Result);

            lblUser.Text = user.name;
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            HttpResponseMessage res = client.PostAsync("http://localhost:8080/logout", null).Result;
            Close();
            new Login().Show();
        }
    }
}
