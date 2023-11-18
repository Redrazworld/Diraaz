const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const db = require("../db");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();

//add to cart
router.post("/api/add/to/cart", requireLogin, (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product IDs to add to the cart from the request body
    const { productId } = req.body;
    // Ensure productId is an array (wrapping a single ID if needed)
    const productIds = Array.isArray(productId) ? productId : [productId];

    // Check if the user exists in the 'clients' table
    const userQuery = "SELECT * FROM clients WHERE _id = ?"; // Assuming 'id' is the primary key
    db.query(userQuery, [userId], (userError, userResults) => {
      if (userError) {
        console.error("Error:", userError);
        return res
          .status(500)
          .json({ message: "Failed to add products to the cart" });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve the current cart as a JSON string and convert it to an array
      const currentCartString = userResults[0].carts;
      const currentCartArray = currentCartString
        ? JSON.parse(currentCartString)
        : [];

      // Add the new productIds to the existing cart
      currentCartArray.push(...productIds);

      // Convert the updated cart back to a JSON string
      const updatedCartString = JSON.stringify(currentCartArray);

      // Update the 'carts' column in the 'clients' table with the updated cart
      const updateCartQuery = "UPDATE clients SET carts = ? WHERE _id = ?";
      db.query(updateCartQuery, [updatedCartString, userId], (updateError) => {
        if (updateError) {
          console.error("Error:", updateError);
          return res
            .status(500)
            .json({ message: "Failed to add products to the cart" });
        }

        res
          .status(200)
          .json({ message: "Products added to cart successfully" });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add products to the cart" });
  }
});

//remove one
router.post("/api/remove/from/cart", requireLogin, (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product ID to remove from the cart from the request body
    const { productId } = req.body;

    // Check if the user exists in the 'clients' table
    const userQuery = 'SELECT * FROM clients WHERE _id = ?'; // Assuming 'id' is the primary key
    db.query(userQuery, [userId], (userError, userResults) => {
      if (userError) {
        console.error("Error:", userError);
        return res.status(500).json({ message: "Failed to remove product from the cart" });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Parse the JSON 'carts' column
      const currentCart = JSON.parse(userResults[0].carts);

      // Find the index of the first occurrence of the specified product ID
      const indexToRemove = currentCart.findIndex((cartProductId) => cartProductId.toString() === productId.toString());

      if (indexToRemove !== -1) {
        // Remove the first occurrence of the specified product ID from the user's cart
        currentCart.splice(indexToRemove, 1);

        // Convert the updated cart back to a JSON string
        const updatedCartString = JSON.stringify(currentCart);

        // Update the 'carts' column in the 'clients' table with the updated cart
        const updateCartQuery = 'UPDATE clients SET carts = ? WHERE _id = ?';
        db.query(updateCartQuery, [updatedCartString, userId], (updateError) => {
          if (updateError) {
            console.error("Error:", updateError);
            return res.status(500).json({ message: "Failed to remove product from the cart" });
          }
          res.status(200).json({ message: "Product removed from cart successfully" });
        });
      } else {
        res.status(404).json({ message: "Product not found in the cart" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to remove product from the cart" });
  }
});

//remove all
router.post("/api/remove/all/from/cart", requireLogin, (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product ID to remove from the cart from the request body
    const { productId } = req.body;

    // Check if the user exists in the 'clients' table
    const userQuery = 'SELECT * FROM clients WHERE _id = ?'; // Assuming 'id' is the primary key
    db.query(userQuery, [userId], (userError, userResults) => {
      if (userError) {
        console.error("Error:", userError);
        return res.status(500).json({ message: "Failed to remove product from the cart" });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Parse the JSON 'carts' column
      const currentCart = JSON.parse(userResults[0].carts);

      // Remove all occurrences of the specified product ID from the user's cart
      const updatedCart = currentCart.filter((cartProductId) => cartProductId.toString() !== productId.toString());

      // Convert the updated cart back to a JSON string
      const updatedCartString = JSON.stringify(updatedCart);

      // Update the 'carts' column in the 'clients' table with the updated cart
      const updateCartQuery = 'UPDATE clients SET carts = ? WHERE _id = ?';
      db.query(updateCartQuery, [updatedCartString, userId], (updateError) => {
        if (updateError) {
          console.error("Error:", updateError);
          return res.status(500).json({ message: "Failed to remove product from the cart" });
        }
        res.status(200).json({ message: "Product removed from cart successfully" });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to remove product from the cart" });
  }
});

//get cart itms
router.post("/api/cart", requireLogin, (req, res) => {
  try {
    const ids = req.body.ids;
    // Create a placeholder for the SQL query parameters
    const placeholders = ids.map(() => '?').join(',');

    // Query the 'products' table to find products based on the provided product IDs
    const query = `SELECT * FROM products WHERE _id IN (${placeholders})`; // Assuming 'id' is the primary key
    db.query(query, ids, (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to get products" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

module.exports = router;
