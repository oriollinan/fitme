import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../login/login.dart';
import '../auth/auth.service.dart';
import '../auth/auth.dart';
import '../workout_page/workoutPage.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {

  TextEditingController nameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmController = TextEditingController();

  dynamic showError(String error, String statusMessage)
  {
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
      )
    );
  }

  Widget setTextRedirection(String text, Function func, {Key? key}) {
    return Container(
      key: key,
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

  Widget setTextField(bool obscureText, String labelText, TextEditingController controller) {
    return Container(
      margin: const EdgeInsets.all(10),
      child: TextField(
        controller: controller,
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

  String validEmail(String email) {
    bool hasAt = false;
  
    for (int i = 0; i < email.length ; i++) {
      if (email[i] == '@') {
        hasAt = true;
      }
    }
    if (!hasAt) {
      return 'Not a valid email';
    }
    return '';
  }

  String validPassword(String password) {
    bool hasUpperCase = false;
    bool hasNumber = false;
    bool hasSpecial = false;
  
    if (password.length < 8) {
      return 'Password must be a minimum of 8 characters';
    }
    for (int i = 0; i < password.length; i++) {
      if (password[i].toUpperCase() == password[i] && password[i].toLowerCase() != password[i]) {
        hasUpperCase = true;
      } else if (int.tryParse(password[i]) != null) {
        hasNumber = true;
      } else if (!password[i].trim().contains(RegExp(r'[a-zA-z0-9]'))) {
        hasSpecial = true;
      }
    }
    if (!hasUpperCase) {
      return 'Password must contain a capital letter';
    }
    if (!hasNumber) {
      return 'Password must contain a number';
    }
    if (!hasSpecial) {
      return 'Password must contain a special character';
    }
    return '';
  }

  Future<void> signUpUser(Function f) async
  {
    dynamic response;
    String emailMessage = validEmail(emailController.text);
    String passwordMessage = validPassword(passwordController.text);

    if (emailMessage.isNotEmpty) {
      showError('Incorrect values', emailMessage);
      return;
    }
    if (passwordMessage.isNotEmpty) {
      showError('Incorrect values', passwordMessage);
      return;
    }
    if (passwordController.text != confirmController.text) {
      showError('Incorrect values', 'Passwords are different');
      return;
    }
    response = await postSignUp(nameController.text, emailController.text, passwordController.text);
    if (response.statusCode! < 300) {
      token = response.data['accessToken'];
      f();
    } else {
      showError('Sign up failed', response.data['message']);
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
          await signUpUser(f);
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
                        setTextField(false, 'Name', nameController),
                        setTextField(false, 'Email', emailController),
                        setTextField(true, 'Password', passwordController),
                        setTextField(true, 'Confirm password', confirmController),
                        setRoundRectangle('Register', () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const WorkoutPage(),
                          )
                        )),
                        setTextRedirection(
                          "Already a user? Sign in now",
                          () => Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Login(),
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
