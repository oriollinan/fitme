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

Future<dynamic> postSet(int workoutId, int exerciseId, int weight, int reps) async
{
  Object data = {'workoutId': workoutId, 'exerciseId': exerciseId, 'reps': reps, 'weight': weight};

  try {
    final response = await dio.post(
      '$apiUrl/sets',
      data: data,
      options: Options(
        headers: {
          'Authorization': 'Bearer $token',
        },
      ),
      );
    return response;
  } on DioError catch (e) {
    print(e.response!.data);
    return (e.response);
  }
}