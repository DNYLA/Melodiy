using System.Text.Json.Serialization;

namespace melodiy.server.Models
{
	public class ServiceResponse<T> : IServiceResponse
	{
		public T? Data { get; set; }

		public bool Success { get; set; } = true;

		[JsonIgnore]
		public int StatusCode { get; set; } = 200;
		
		public string Message { get; set; } = string.Empty;
	}
}