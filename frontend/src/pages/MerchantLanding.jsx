import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addRestaurant } from "../data/restaurantsDB";

const CATEGORY_OPTIONS = [
  { id: "burger", label: "Burger" },
  { id: "pizza", label: "Pizza" },
  { id: "sushi", label: "Sushi" },
  { id: "healthy", label: "Healthy" },
  { id: "tacos", label: "Tacos" },
  { id: "asian", label: "Asian" },
];
