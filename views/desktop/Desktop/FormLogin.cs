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
    public partial class Login : Form
    {
        public CookieContainer cookies;
        public HttpResponseMessage res;

        public Login()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if (inputEmail.Text != "" && inputPassword.Text != "")
            {
                var url = "http://localhost:8080/login";
                var data = new Dictionary<string, string>
                {
                    { "email", inputEmail.Text },
                    { "password", inputPassword.Text }
                };

                cookies = new CookieContainer();
                HttpClientHandler handler = new HttpClientHandler();
                handler.CookieContainer = cookies;

                HttpClient client = new HttpClient(handler);
                res = client.PostAsync(url, new FormUrlEncodedContent(data)).Result;

                if (res.StatusCode == HttpStatusCode.OK)
                {
                    GlobalCookie.Cookies = cookies;
                    Hide();
                    new FormInner().Show();
                }
                else
                {
                    MessageBox.Show("Sikertelen bejelentkezés!");
                }
            }
            else
            {
                MessageBox.Show("Valami nincs kitöltve!");
            }
        }
    }
}
