import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:just_friends/exercises/set.dart';
import '../workout_page/workoutPage.dart';
import 'new_set.dart';

class Exercise extends StatefulWidget {
  final int exerciseId;
  final int workoutId;
  const Exercise(
      {super.key, required this.workoutId, required this.exerciseId});

  @override
  State<Exercise> createState() =>
      _ExerciseState(workoutId: workoutId, exerciseId: exerciseId);
}

class _ExerciseState extends State<Exercise> {
  final int exerciseId;
  final int workoutId;
  _ExerciseState  ({required this.workoutId, required this.exerciseId});

  Future<String> exerciseName(int exerciseId) async {
    dynamic response =  await getExerciseName(exerciseId);
    return response['name'];
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => Navigator.pop(context),
          ),
          title: FutureBuilder(
            future: exerciseName(exerciseId),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!);
              } else if (snapshot.hasError) {
                return Center(
                  child: Text('Error: ${snapshot.error}'),
                );
              }
              return Container();
            }
          ),
        ),
        backgroundColor: Colors.grey[900],
        body: WeightChart.withSampleData(),
        floatingActionButton: FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: () => Navigator.push(
            context,
            MaterialPageRoute(
              // ignore: prefer_const_constructors
              builder: (context) => NewSet(
                workoutId: workoutId,
                exerciseId: exerciseId,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class WeightChart extends StatelessWidget {
  final List<charts.Series> seriesList;

  const WeightChart(this.seriesList, {super.key});

  factory WeightChart.withSampleData() {
    return WeightChart(
      _createSampleData(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return charts.TimeSeriesChart(
      seriesList as dynamic,
      primaryMeasureAxis: charts.NumericAxisSpec(
        tickProviderSpec:
            const charts.BasicNumericTickProviderSpec(zeroBound: false),
        tickFormatterSpec: charts.BasicNumericTickFormatterSpec(
          (value) => '${value}kg',
        ),
      ),
      domainAxis: const charts.DateTimeAxisSpec(
        tickProviderSpec: charts.DayTickProviderSpec(
          increments: [7],
        ),
        tickFormatterSpec: charts.AutoDateTimeTickFormatterSpec(
          day: charts.TimeFormatterSpec(
            format: 'd',
            transitionFormat: 'dd MMM',
          ),
        ),
      ),
    );
  }

  static List<charts.Series<WeightData, DateTime>> _createSampleData() {
    final data = [
      WeightData(DateTime(2022, 3, 1), 70.0),
      WeightData(DateTime(2022, 3, 8), 71.5),
      WeightData(DateTime(2022, 3, 15), 72.2),
      WeightData(DateTime(2022, 3, 22), 73.1),
      WeightData(DateTime(2022, 3, 29), 73.8),
    ];

    return [
      charts.Series<WeightData, DateTime>(
        id: 'Weight',
        colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
        domainFn: (WeightData data, _) => data.date,
        measureFn: (WeightData data, _) => data.weight,
        data: data,
      )
    ];
  }
}

class WeightData {
  final DateTime date;
  final double weight;

  WeightData(this.date, this.weight);
}
