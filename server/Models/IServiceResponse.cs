namespace melodiy.server.Models
{
    public interface IServiceResponse
    {
		bool Success { get; set; }

		int StatusCode { get; set; }
		
		string Message { get; set; }
    }
}