import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class ProductItem extends StatelessWidget {
  final Map<String, String> product;
  const ProductItem({
    Key? key,
    required this.product,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String originalAmount = "${product["quantity"]} (${product["unit"]})";
    String normalizedAmount = product["ml_quantity"] == null
        ? "Unavailable"
        : "${(double.parse(product["ml_quantity"]!) / 100).toStringAsFixed(2)}/100ml";
    return Container(
      padding: const EdgeInsets.all(8.0),
      color: const Color.fromARGB(5, 37, 220, 187),
      // height: 150.0,
      // width: 200.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 100,
            width: 100,
            child: Image.network(
              product["image"]!,
              fit: BoxFit.contain,
            ),
          ),
          // const SizedBox(
          //   height: 5,
          // ),
          SizedBox(
            height: 30,
            width: 100,
            child: Text(
              product["name"]!,
              overflow: TextOverflow.clip,
            ),
          ),
          Text(normalizedAmount),
          const SizedBox(
            height: 3,
          ),
          Row(
            children: [
              Text(
                originalAmount,
                maxLines: 1,
              ),
              const SizedBox(width: 16),
              Text(
                "${product["price"].toString()}\$",
                maxLines: 1,
              ),
            ],
          ),
          RatingBar.builder(
            initialRating: (double.parse(product["rating"]!) * 2).round() / 2,
            minRating: 0,
            direction: Axis.horizontal,
            allowHalfRating: true,
            itemCount: 5,
            itemSize: 30.0,
            itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
            itemBuilder: (context, _) => const Icon(
              Icons.star,
              color: Colors.amber,
            ),
            onRatingUpdate: (rating) {},
          ),
        ],
      ),
    );
  }
}
