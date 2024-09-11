library flutter_library;
import 'package:flutter/material.dart';

  Widget _buildTextField(TextEditingController controller, String labelText,
      String hintText, double topSpacing) {
    return Padding(
      padding: EdgeInsets.fromLTRB(15, topSpacing, 15, 5),
      child: SizedBox(
        height: 40,
        width: 340,
        child: TextField(
          controller: controller,
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
            labelText: labelText,
            hintText: hintText,
            labelStyle: TextStyle(color: Colors.white),
            hintStyle: TextStyle(color: Colors.grey),
          ),
          style: const TextStyle(fontSize: 15, color: Colors.white),
        ),
      ),
    );
  }