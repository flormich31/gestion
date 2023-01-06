import { useState } from "react";
import { Calendar } from "react-multi-date-picker";

export default function Calendario() {
  const [value, setValue] = useState(new Date());

  return <Calendar></Calendar>;
}
