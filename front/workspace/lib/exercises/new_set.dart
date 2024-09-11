import 'package:flutter/material.dart';
import '../workout_page/workoutPage.dart';
import 'exercise.dart';
import 'set.dart';
import 'package:dio/dio.dart';

class NewSet extends StatefulWidget {
  final int exerciseId;
  final int workoutId;
  const NewSet({super.key, required this.workoutId, required this.exerciseId});

  @override
  // ignore: no_logic_in_create_state
  State<NewSet> createState() => NewSetState(workoutId: workoutId, exerciseId: exerciseId);
}

class NewSetState extends State<NewSet> {
  final int exerciseId;
  final int workoutId;
  NewSetState({required this.workoutId, required this.exerciseId});

  TextEditingController weightController = TextEditingController();
  TextEditingController repsController = TextEditingController();

  dynamic showError(String error, String statusMessage)
  {
    // ignore: use_build_context_synchronously
    showDialog(
      context: context,
      builder: (BuildContext dialogContext) => AlertDialog(
        title: Text(error),
        content: Text(statusMessage),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text('OK'),
          ),
        ],
      )
    );
  }

  Widget setTextField(bool obscureText, String labelText, TextEditingController controller) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        style: const TextStyle(
          color: Colors.white
        ),
        decoration: InputDecoration(
          enabledBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white),
          ),
          labelText: labelText,
          hintStyle: const TextStyle(
            color: Colors.white,
          ),
          labelStyle: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  Future<void> sendSet(Function f) async
  {
    if (weightController.text.isEmpty) {
      showError('Add set failed', 'No weight found');
      return;
    }
      if (repsController.text.isEmpty) {
      showError('Add set failed', 'No reps found');
      return;
    }
    Response<dynamic> response = await postSet(workoutId, exerciseId, int.parse(weightController.text), int.parse(repsController.text));
    if (response.statusCode! < 300) {
      f();
    } else {
      showError('Add set failed', response.data['message']);
      print(response.toString());
    }
  }

  Widget setRoundRectangle(String text, Function f) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.blueAccent[400],
        borderRadius: BorderRadius.circular(15),
      ),
      margin: const EdgeInsets.all(10),
      height: 35,
      width: 200,
      child: TextButton(
        onPressed: () async {
          await sendSet(f);
        },
        child: Text(
          text,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }

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
            onPressed: () => Navigator.pop(this.context)
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
        body: SafeArea(
          minimum: const EdgeInsets.all(25),
          child: LayoutBuilder(
            builder: (context, constraints) => SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(minHeight: constraints.maxHeight),
                child: IntrinsicHeight(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      setTextField(false, 'Weight', weightController),
                      setTextField(false, 'Reps', repsController),
                      setRoundRectangle('Add', () {
                        return Navigator.pop(this.context);
                        // return Navigator.push(
                        //     context,
                        //     MaterialPageRoute(
                        //       builder: (context) => Exercise(exerciseId: exerciseId, workoutId: workoutId),
                        //     ),
                        //   );
                      }),
                    ],
                  ),
                ),
              ),
            ),
          ),
        )
      ),
    );
  }
}
