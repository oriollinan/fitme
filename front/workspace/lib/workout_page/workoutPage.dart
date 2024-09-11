import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:just_friends/workout_page/exercise_service.dart';
import 'package:just_friends/workout_page/workout_add.dart';
import 'dart:convert';
import 'workoutInfo.dart';
import 'workout_selector/workoutSelector.dart';

class WorkoutPage extends StatefulWidget {
  const WorkoutPage({Key? key}) : super(key: key);

  @override
  State<WorkoutPage> createState() => _WorkoutPageState();
}

class _WorkoutPageState extends State<WorkoutPage> {
  List<Workout> _workout = [];

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      // read the JSON file from assets
      String jsonStr =
          await rootBundle.loadString('lib/workout_page/workouts.json');
      print(
          'JSON string: $jsonStr'); // add print statement to see the JSON string
      print(json.decode(jsonStr));
      List<dynamic> jsonList = json.decode(jsonStr)['workouts'];
      print(
          'JSON decoded: $jsonList'); // add print statement to see the decoded JSON list

      // map the JSON data to Exercise objects
      _workout = jsonList
          .map((json) => Workout.fromJson(json))
          .toList()
          .cast<Workout>();
      setState(() {}); // update the UI with the new data
    } catch (e) {
      print(
          'Error fetching data: $e'); // add print statement to see the error message
      // handle error
    }
  }

  final items = List<String>.generate(10000, (i) => 'Item $i');

  Future<bool> showAlertDelete() async {
    return await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Confirm"),
          content: const Text("Are you sure you wish to delete this item?"),
          actions: <Widget>[
            TextButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: const Text("DELETE")),
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text("CANCEL"),
            ),
          ],
        );
      },
    );
  }

  @override
Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: Colors.grey[900],
    body: SafeArea(
      minimum: const EdgeInsets.all(25),
      child: ListView.builder(
        itemCount: _workout.length,
        itemBuilder: (context, index) {
          if (_workout.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return Dismissible(
              key: UniqueKey(),
              confirmDismiss: (DismissDirection direction) async {
                return showAlertDelete();
              },
              child: Card(
                color: Colors.blueAccent[400],
                child: GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            WorkoutSelector(workout: _workout[index]),
                      ),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: ListTile(
                      title: Text(
                        _workout[index].name,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          }
        },
      ),
    ),
    floatingActionButton: FloatingActionButton(
      child: const Icon(Icons.add),
      onPressed: () => Navigator.push(
        context,
        MaterialPageRoute(
          // ignore: prefer_const_constructors
          builder: (context) => NewWorkout(),
        ),
      ),
    ),
  );
}

}
