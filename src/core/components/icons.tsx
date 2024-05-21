import { FaGithub } from 'react-icons/fa';
import { RxClock } from 'react-icons/rx';
import { BiLogIn } from 'react-icons/bi';
import { GiBlackBook, GiWhiteBook } from 'react-icons/gi';
import {
  BsPlus, BsThreeDots, BsThreeDotsVertical, BsTrash2Fill
} from 'react-icons/bs';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { HiBars4, HiOutlineStar, HiStar } from 'react-icons/hi2';
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { TiArrowBack } from 'react-icons/ti';
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
  HiPlusCircle
} from 'react-icons/hi';
import { GoCheck } from 'react-icons/go';
import { IoArrowForwardSharp, IoClose, IoEarth } from 'react-icons/io5';
import { FiFile, FiFileText } from 'react-icons/fi';

export const Icons = {
  close: IoClose,
  // spinner: Loader2,
  // chevronLeft: ChevronLeft,
  // chevronRight: ChevronRight,
  basket: BsTrash2Fill,
  trash: HiOutlineTrash,
  // page: File,
  // media: Image,
  // settings: Settings,
  // billing: CreditCard,
  // ellipsis: MoreVertical,
  ellipsisHorizontal: BsThreeDots,
  // add: Plus,
  // warning: AlertTriangle,
  // user: User,
  arrowRight: IoArrowForwardSharp,
  // arrowLeft: ArrowLeft,
  arrowLeftSline: RiArrowLeftSLine,
  arrowRightSline: RiArrowRightSLine,
  doubleArrowLeft: HiChevronDoubleLeft,
  doubleArrowRight: HiChevronDoubleRight,
  // help: HelpCircle,
  // pizza: Pizza,
  // gitHub: Github,
  // twitter: Twitter,
  documentDuplicate: HiOutlineDocumentDuplicate,
  check: GoCheck,
  github: FaGithub,
  google: FcGoogle,
  star: HiStar,
  starOutline: HiOutlineStar,
  threeDotVertical: BsThreeDotsVertical,
  clock: RxClock,
  logout: BiLogIn,
  menu: HiBars4,
  search: AiOutlineSearch,
  settings: AiOutlineSetting,
  plus: BsPlus,
  fillPlusCircle: HiPlusCircle,
  book: GiWhiteBook,
  arrowBack: TiArrowBack,
  page: FiFile,
  pageText: FiFileText,
  notebook: GiBlackBook,
  earth: IoEarth,
};
