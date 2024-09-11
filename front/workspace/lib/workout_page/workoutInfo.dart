class Workout {
  final int? id;
  final String name;
  final DateTime date;
  final List<WorkoutSet> sets;

  Workout({
    required this.id,
    required this.name,
    required this.date,
    required this.sets,
  });

  factory Workout.fromJson(Map<String, dynamic> json) {
    List<dynamic> jsonSets = json['Set'];
    List<WorkoutSet> sets = jsonSets
        .map((json) => WorkoutSet.fromJson(json))
        .toList()
        .cast<WorkoutSet>();
    return Workout(
      id: json['id'],
      name: json['name'],
      date: DateTime.parse(json['date']),
      sets: sets,
    );
  }
}

class WorkoutSet {
  final int? id;
  final int? reps;
  final int? weight;
  final String date;
  final int exerciseId;
  final int workoutId;

  WorkoutSet({
    required this.id,
    required this.reps,
    required this.weight,
    required this.date,
    required this.exerciseId,
    required this.workoutId,
  });

  factory WorkoutSet.fromJson(Map<String, dynamic> json) {
    return WorkoutSet(
      id: json['id'],
      reps: json['reps'],
      weight: json['weight'],
      date: json['date'],
      exerciseId: json['exerciseId'],
      workoutId: json['workoutId'],
    );
  }
}
