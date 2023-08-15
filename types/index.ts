class ServiceResponse<T> {
  data: T | null = null;
  success: boolean = true;
  message: string = '';
}
