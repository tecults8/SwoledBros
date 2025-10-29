using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using SwoledBrosBE.Models;
using SwoledBrosBE.Models.FitnessApp.Models;

namespace SwoledBrosBE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ---------------- SIGNUP ----------------
        [HttpPost("signup")]
        public async Task<IActionResult> Signup(UserRegisterDto request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Username and password are required." });

            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                return BadRequest(new { message = "Username already exists." });

            // Generate salt
            byte[] saltBytes = RandomNumberGenerator.GetBytes(16);
            string salt = Convert.ToBase64String(saltBytes);

            // Hash password
            string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: request.Password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            // ✅ Generate unique random 3-digit ID
            var random = new Random();
            int randomId;
            do
            {
                randomId = random.Next(100, 1000); // generates a number between 100–999
            } while (await _context.Users.AnyAsync(u => u.Id == randomId));

            var user = new User
            {
                Id = randomId,
                Username = request.Username,
                Email = request.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully", userId = user.Id });
        }

        // ---------------- SIGNIN ----------------
        [HttpPost("signin")]
        public async Task<IActionResult> Signin(UserLoginDto request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Username and password are required." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            if (!VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
                return BadRequest(new { message = "Wrong password." });

            var token = CreateToken(user);

            return Ok(new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                token = token
            });
        }

        // ---------------- PASSWORD VERIFY ----------------
        private bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            string computedHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: saltBytes,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 32));

            return computedHash == storedHash;
        }

        // ---------------- TOKEN CREATION ----------------
        private string CreateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("email", user.Email ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(double.Parse(_config["Jwt:ExpireHours"] ?? "2")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // ---------------- DTOs ----------------
    public class UserRegisterDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
