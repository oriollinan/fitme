import 'dart:io';
import 'package:dio/dio.dart';

final dio = Dio();
final String apiUrl = Platform.isAndroid ? 'http://10.104.66.234:3030' : 'http://localhost:3030';
late final String token;
