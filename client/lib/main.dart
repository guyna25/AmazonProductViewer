import 'dart:convert';

import 'package:http/http.dart';

import 'package:easy_search_bar/easy_search_bar.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const AppBase());
}

class AppBase extends StatefulWidget {
  const AppBase({Key? key}) : super(key: key);

  @override
  State<AppBase> createState() => _AppBaseState();
}

class _AppBaseState extends State<AppBase> {
  String searchValue = '';
  List<dynamic> _currProducts = [];
  final List<String> _suggestions = [
    'Ducks',
    'Lotion',
  ];

  void _sendQuery(String q_param) {
    get(
      Uri.parse("http://localhost:3000/search?q=${q_param}"),
    ).then((res) {
      setState(() {
        // _currProducts = res.body;
        _currProducts = json.decode(res.body);
        print("Updated products for search term: ${q_param}");
      });
    });
  }

  void _testServer() {
    get(
      Uri.parse("http://localhost:3000/products_test"),
    ).then((res) {
      setState(() {
        // _currProducts = res.body;
        _currProducts = json.decode(res.body);
        print("Updated products");
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Price Comparison',
        theme: ThemeData(primarySwatch: Colors.orange),
        home: Scaffold(
          appBar: EasySearchBar(
              title: const Text('Price Comparison'),
              searchHintText: 'Enter product name',
              onSearch: (value) => _sendQuery(value),
              suggestions: _suggestions),
          drawer: Drawer(
              child: ListView(padding: EdgeInsets.zero, children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('Drawer Header'),
            ),
            ListTile(
                title: const Text('Item 1'),
                onTap: () => Navigator.pop(context)),
            ListTile(
                title: const Text('Item 2'),
                onTap: () => Navigator.pop(context))
          ])),
          body: GridView.builder(
              gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 200,
                  childAspectRatio: 3 / 2,
                  crossAxisSpacing: 20,
                  mainAxisSpacing: 20),
              itemCount: _currProducts.length,
              itemBuilder: (BuildContext ctx, index) {
                return Container(
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                      color: Colors.amber,
                      borderRadius: BorderRadius.circular(15)),
                  child: Text(_currProducts[index]["name"]!),
                );
              }),
        ));
  }
}
