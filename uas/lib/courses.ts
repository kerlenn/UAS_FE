export type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  image: string;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Professional';
  videoCount: number;
  materi: 'Adobe' | 'Blender' | 'Roblox' | 'Programming';
  slug: string;
};

export const allCourses: Course[] = [
  {
    id: 1,
    title: "Adobe After Effects [2020]",
    description: "Kuasai motion graphics dan efek visual dari dasar hingga mahir dengan panduan lengkap dari pakar di bidangnya.",
    instructor: "Dengan Instruktur Darius",
    image: "/AdobeEA.jpeg",
    price: 120000,
    level: "Beginner",
    videoCount: 9,
    materi: "Adobe",
    slug: "/kursus_adobe"
  },
  {
    id: 2,
    title: "Kuliah Struktur Data [2020]",
    description: "Pelajari konsep fundamental struktur data seperti Array, Linked List, Stack, dan Queue untuk membangun algoritma yang efisien.",
    instructor: "Dengan Instruktur Darius",
    image: "/StrukturData.jpg",
    price: 230000,
    level: "Intermediate",
    videoCount: 13,
    materi: "Programming",
    slug: "/kursus_data_struktur"
  },
  {
    id: 3,
    title: "Roblox Studio untuk Prototyping Game [2025]",
    description: "Belajar membuat game pertamamu di platform Roblox. Mulai dari desain level, scripting dasar dengan Lua, hingga publikasi.",
    instructor: "Dengan Instruktur Darius",
    image: "/Roblox.jpg",
    price: 0,
    level: "Beginner",
    videoCount: 5,
    materi: "Roblox",
    slug: "/kursus_roblox"
  },
  {
    id: 4,
    title: "Blender 3D Modelling [2020]",
    description: "Ciptakan model 3D yang menakjubkan dari nol. Pelajari teknik-teknik sculpting, texturing, dan rendering di Blender.",
    instructor: "Dengan Instruktur Darius",
    image: "/Blender.jpg",
    price: 50000,
    level: "Intermediate",
    videoCount: 9,
    materi: "Blender",
    slug: "/kursus_blender"
  },
  {
    id: 5,
    title: "Object Oriented Programming [2020]",
    description: "Pahami pilar-pilar OOP (Encapsulation, Inheritance, Polymorphism) untuk menulis kode yang lebih bersih, modular, dan reusable.",
    instructor: "Dengan Instruktur Darius",
    image: "/OOP.jpg",
    price: 120000,
    level: "Professional",
    videoCount: 10,
    materi: "Programming",
    slug: "/kursus_oop"
  }
];