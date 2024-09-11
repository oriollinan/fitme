import 'package:flutter/material.dart';
import 'landing/landing.dart';
import 'exercises/exercise.dart';
import 'exercises/new_set.dart';


void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Landing()
    )
  );
}