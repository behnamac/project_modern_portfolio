// One gradient per testimonial, stable by index so a person always gets the
// same "photo".
export const GRADIENTS = [
  ["#8E7BFF", "#4A32C8"],
  ["#FFB25E", "#F0762B"],
  ["#5BD8A6", "#149B7A"],
  ["#FF8FA6", "#E8447A"],
  ["#5FC4FF", "#1F7FE0"],
];

export const gradientFor = (index) => GRADIENTS[index % GRADIENTS.length];

export const initialsOf = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
