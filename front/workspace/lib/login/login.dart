import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../register/register.dart';
import '../auth/auth.service.dart';
import '../auth/auth.dart';
import '../workout_page/workoutPage.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController emailController = TextEditingController();

  TextEditingController passwordController = TextEditingController();

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

  Widget setTextRedirection(String text, Function func) {
    return Container(
      child: TextButton(
        onPressed: () {
          func();
        },
        child: Text(
          text,
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  Widget setTextField(
      bool obscureText, String labelText, TextEditingController getInfo) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: TextField(
        controller: getInfo,
        obscureText: obscureText,
        style: const TextStyle(
          color: Colors.white,
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

  Future<void> logInUser(Function f) async {
    Response<dynamic> response =
        await postLogIn(emailController.text, passwordController.text);

    if (response.statusCode! < 300) {
      token = response.data['accessToken'];
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
          await logInUser(f);
        },
        child: Text(
          text,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
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
                        Container(
                          margin: EdgeInsets.zero,
                          child: Image.asset('assets/logo_gym1.png'),
                        ),
                        setTextField(false, 'Email', emailController),
                        setTextField(true, 'Password', passwordController),
                        setRoundRectangle('Login', () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const WorkoutPage(),
                          )
                        )),
                        setTextRedirection(
                          "Not a user? Sign up now",
                          () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Register(),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )),
    );
  }
}
