import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'HomePage.dart';

final TextEditingController emailController = TextEditingController();

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false, // set it to false
      backgroundColor: Color.fromARGB(255, 47, 46, 46),
      appBar: AppBar(
        title: const Text("Login Page"),
      ),
      body: Container(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Center(
                child: SizedBox(
                  height: 350,
                  width: 340,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        alignment: FractionalOffset.topCenter,
                        child: AspectRatio(
                          aspectRatio: 1.8,
                          child: Image.asset('assets/logo_gym1.png',
                              height: 286, width: 527, fit: BoxFit.fitWidth),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                        child: Center(
                          child: Text(
                            'Register Now',
                            style: GoogleFonts.robotoMono(
                              textStyle:
                                  TextStyle(color: Colors.white, fontSize: 25),
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 40, 0, 0),
                        child: Text(
                          'Name',
                          style: TextStyle(color: Colors.white, fontSize: 15),
                        ),
                      ),
                      SizedBox(height: 8),
                      TextField(
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                          ),
                          hintText: 'Type your name',
                          hintStyle: TextStyle(color: Colors.grey),
                        ),
                        style: TextStyle(fontSize: 15, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
              Center(
                child: SizedBox(
                  height: 110,
                  width: 340,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                        child: Text(
                          'Email',
                          style: TextStyle(color: Colors.white, fontSize: 15),
                        ),
                      ),
                      SizedBox(height: 8),
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                        child: TextField(
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            hintText: 'Enter valid email id as abc@gmail.com',
                            hintStyle: TextStyle(color: Colors.grey),
                          ),
                          style: TextStyle(fontSize: 15, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Center(
                child: SizedBox(
                  height: 150,
                  width: 340,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                        child: Text(
                          'Password',
                          style: TextStyle(color: Colors.white, fontSize: 15),
                        ),
                      ),
                      SizedBox(height: 8),
                      Padding(
                        padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                        child: TextField(
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                            ),
                            hintText: 'Enter secure password',
                            hintStyle: TextStyle(color: Colors.grey),
                          ),
                          style: TextStyle(fontSize: 15, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                child: Container(
                  height: 40,
                  width: 250,
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: TextButton(
                    onPressed: () {
                      print(emailController.text);
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => HomePage()),
                      );
                    },
                    child: const Text(
                      'Create account',
                      style: TextStyle(color: Colors.white, fontSize: 17),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}
