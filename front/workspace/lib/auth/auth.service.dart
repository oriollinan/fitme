import 'package:dio/dio.dart';
import 'auth.dart';

Future<dynamic> postSignUp(String name, String email, String password) async
{
  Object data = {'name': name, 'email': email, 'password': password};
  final Response response;

  try {
    response = await dio.post('$apiUrl/auth/signup', data: data);
      print(response);
    return response;
  } on DioError catch (e) {
    if (e.response != null) {
      print(e.response!.data);
    }
    return e.response;
  }
}

Future<dynamic> postLogIn(String email, String password) async
{
  Object data  = {'email': email, 'password': password};
  final Response response;

  try {
    response = await dio.post('$apiUrl/auth/login', data: data);
    return response;
  } on DioError catch (e) {
    if (e.response != null) {
      print(e.response!.data);
    }
    return e.response;
  }
}
