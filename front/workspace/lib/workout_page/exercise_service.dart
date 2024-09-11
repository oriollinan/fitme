import 'package:dio/dio.dart';
import '../auth/auth.dart';

Future<dynamic> getExerciseName(int id) async {
  print(token);
  try {
    print(id);
    final response = await dio.get(
      '$apiUrl/exercises/name/$id',
      options: Options(
        headers: {
          'Authorization': 'Bearer $token',
        },
      ),
    );
    print(response.data);
    return response.data;
  } on DioError catch (e) {
    print(e.response!.data);
    return e.response!.data;
  }
}

Future<dynamic> getWorkout() async {
  print(token);
  try {
    final response = await dio.get(
      '$apiUrl/workouts',
      options: Options(
        headers: {
          'Authorization': 'Bearer $token',
        },
      ),
    );
    print(response.data);
    return response.data;
  } on DioError catch (e) {
    print(e.response!.data);
    return e.response!.data;
  }
}

Future<dynamic> postWorkout(String workout) async
{
  DateTime now = new DateTime.now();
  DateTime date = new DateTime(now.year, now.month, now.day, now.hour, now.minute, now.second, now.millisecond);
  Object data  = {'name': workout};
  try {
        final response = await dio.post(
      '$apiUrl/workouts',
      data: data,
      options: Options(
        headers: {
          'Authorization': 'Bearer $token',
        },
      ),
      );
    print(response);
    return response;
  } on DioError catch (e) {
    if (e.response != null) {
      print(e.response!.data);
    }
    return e.response;
  }
}
