import 'package:flutter/material.dart';
import 'workoutPage.dart';
import 'package:dio/dio.dart';
import '../auth/auth.dart';
import 'exercise_service.dart';

class NewWorkout extends StatefulWidget {
  const NewWorkout({Key? key}) : super(key: key);

  @override
  State<NewWorkout> createState() => _NewWorkoutState();
}

class _NewWorkoutState extends State<NewWorkout> {
  TextEditingController nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
  }

  dynamic showError(String error, String statusMessage) {
    // ignore: use_build_context_synchronously
    showDialog(
        context: context,
        builder: (_) => AlertDialog(
              title: Text(error),
              content: Text(statusMessage),
              actions: <Widget>[
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('OK'),
                ),
              ],
            ));
  }

  Future<void> workoutService(Function f) async {
    Response<dynamic> response = await postWorkout(nameController.text);

    if (response.statusCode! < 300) {
      f();
    } else {
      showError('Log in failed', response.data['message']);
    }
    print(response.toString());
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
          await workoutService(f);
        },
        child: Text(
          text,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }

  Widget setTextField(
      bool obscureText, String labelText, TextEditingController controller) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
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

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => WorkoutPage(),
                ),
              ),
            ),
          ),
          backgroundColor: Colors.grey[900],
          body: SafeArea(
            child: LayoutBuilder(
              builder: (context, constraints) => SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: BoxConstraints(minHeight: constraints.maxHeight),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SafeArea(
                        minimum: const EdgeInsets.all(25),
                        child: setTextField(false, "Name", nameController),
                      ),
                      setRoundRectangle('Add', () {
                        return Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => WorkoutPage(),
                          ),
                        );
                      }),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ));
  }
}
