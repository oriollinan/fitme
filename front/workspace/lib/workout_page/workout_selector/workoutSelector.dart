import 'package:flutter/material.dart';
import '../workoutInfo.dart';
import '../exercise_service.dart';
import '../../exercises/exercise.dart';

class WorkoutSelector extends StatefulWidget {
  final Workout workout;

  const WorkoutSelector({Key? key, required this.workout}) : super(key: key);

  @override
  _WorkoutSelectorState createState() => _WorkoutSelectorState(workout);
}

class _WorkoutSelectorState extends State<WorkoutSelector> {
  final Workout workout;
  Future<List<String>>? _futureExerciseNames;

  _WorkoutSelectorState(this.workout);

  @override
  void initState() {
    super.initState();
    _futureExerciseNames = fetchExerciseNames();
  }

  Future<List<String>> fetchExerciseNames() async {
    List<String> names = [];
    for (int i = 0; i < workout.sets.length; i++) {
      final data = await getExerciseName(workout.sets[i].exerciseId);
      names.add(data['name']);
    }
    return names;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[900],
      appBar: AppBar(
        title: Text(workout.name),
        backgroundColor: Colors.blueAccent[400],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Date: ${workout.date}',
              style: const TextStyle(color: Colors.white, fontSize: 18.0),
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              'Exercise:',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold),
            ),
          ),
          Expanded(
            child: FutureBuilder<List<String>>(
              future: _futureExerciseNames,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return ListView.builder(
                    itemCount: workout.sets.length,
                    itemBuilder: (context, index) {
                      final set = workout.sets[index];
                      final exerciseName = snapshot.data![index];
                      return ListTile(
                        title: GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      Exercise(exerciseId: set.exerciseId, workoutId: set.workoutId)),
                            );
                          },
                          child: Text(
                            exerciseName,
                            style: const TextStyle(color: Colors.white),
                          ),
                        ),
                      );
                    },
                  );
                } else if (snapshot.hasError) {
                  return Center(
                    child: Text('Error: ${snapshot.error}'),
                  );
                } else {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
