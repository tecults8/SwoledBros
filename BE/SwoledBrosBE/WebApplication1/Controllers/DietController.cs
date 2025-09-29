using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class DietController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
