
import {
  AlertTriangle, ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  Github,
  HelpCircle,
  Image,
  Loader2, MoreHorizontal,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  X,
} from "lucide-react"
import type { Icon as LucideIcon } from "lucide-react"
import { FaGithub, FaLinkedin, FaStar, FaTwitter } from "react-icons/fa";
// import { BiDotsVertical, BiLogIn, BsThreeDotsVertical, RxClock } from "react-icons/all";
import { RxClock } from "react-icons/rx";
import { BiDotsVertical, BiLogIn } from "react-icons/bi";
import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";
import { RxDoubleArrowLeft, RxDoubleArrowRight   } from "react-icons/rx";
import { HiBars4, HiStar, HiOutlineStar } from "react-icons/hi2";
import {AiOutlinePlus, AiOutlineSetting,AiOutlineSearch} from "react-icons/ai";

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  ellipsisHorizontal: MoreHorizontal,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  arrowLeftSline: RiArrowLeftSLine,
  arrowRightSline: RiArrowRightSLine,
  doubleArrowLeft: RxDoubleArrowLeft,
  doubleArrowRight: RxDoubleArrowRight,
  arrowLeft: ArrowLeft,
  help: HelpCircle,
  pizza: Pizza,
  gitHub: Github,
  twitter: Twitter,
  check: Check,
  github: FaGithub,
  star: HiStar,
  starOutline: HiOutlineStar,
  threeDotVertical: BsThreeDotsVertical,
  clock: RxClock,
  logout: BiLogIn,
  menu: HiBars4,
  search: AiOutlineSearch,
  setting: AiOutlineSetting,
  plus: BsPlus,
}
