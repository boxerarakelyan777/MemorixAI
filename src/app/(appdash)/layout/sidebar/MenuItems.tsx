import {
  IconLayoutDashboard,
  IconBook, 
  IconFile3d,
  IconCards,
  IconDeviceGamepad,
} from "@tabler/icons-react";
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { uniqueId } from "lodash";


const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Memorix Tree",
  },
  {
    id: uniqueId(),
    title: "Text to Flashcards",
    icon: TextFieldsIcon,
    href: "/texttoflashcards",
  },
  {
    id: uniqueId(),
    title: "Doc to Flashcards",
    icon: IconFile3d,
    href: "/doctoflashcards",
  },

  {
    id: uniqueId(),
    title: "Saved Flashcards",
    icon: IconCards,
    href: "/savedflashcards",
  },
  {
    id: uniqueId(),
    title: "Games (Coming Soon)",
    icon: IconDeviceGamepad,
    href: "/games",
  },

];

export default Menuitems;