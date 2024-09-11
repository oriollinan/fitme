import 'package:flutter/material.dart';
import '../login/login.dart';
import '../register/register.dart';

class Landing extends StatelessWidget {
  const Landing({super.key});

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
        onPressed: () {
          f();
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
    return Scaffold(
        backgroundColor: Colors.grey[900],
        body: SafeArea(
            minimum: const EdgeInsets.all(25),
            child: LayoutBuilder(
                builder: (context, constraints) => SingleChildScrollView(
                      child: ConstrainedBox(
                        constraints:
                            BoxConstraints(minHeight: constraints.maxHeight),
                        child: IntrinsicHeight(
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: <Widget>[
                                Container(
                                  margin: EdgeInsets.zero,
                                  child: Image.asset('assets/logo_gym1.png'),
                                ),
                                Column(
                                  children: [
                                    const Text(
                                      'Welcome to Fit Me',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 10,
                                    ),
                                    const Text(
                                      'Your favourite gym app!',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ],
                                ),
                                Column(
                                  children: [
                                    setRoundRectangle('Login', () {
                                      return Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => Login()),
                                      );
                                    }),
                                    const SizedBox(height: 10),
                                    setRoundRectangle('Register', () {
                                      return Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                const Register()),
                                      );
                                    }),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ))));
  }
}
