import Container from '../../../components/Container/Container';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoPricetagOutline, IoReturnDownBackOutline } from 'react-icons/io5';

import { VscVerifiedFilled } from 'react-icons/vsc';
import { MdHealthAndSafety } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ExperiencedSec = () => {
  return (
    <Container>
      <Link to="/expertise">
        <div className="bg-[#ffe8de]/50 font-semibold transition-all duration-200 cursor-pointer p-2 rounded-md hover:bg-[#ffe8de]">
          <ul className="flex flex-wrap justify-between items-center gap-5 ">
            <li className="flex justify-center items-center gap-1">
              <AiOutlineSafetyCertificate className="text-primary" /> Safe
              Payments
            </li>
            <li className="w-[2px] h-5 bg-gray-300"></li>
            <li className="flex justify-center items-center gap-1">
              <TbTruckDelivery className="text-green-500" /> Nationwide Delivery
            </li>
            <li className="w-[2px] h-5 bg-gray-300"></li>
            <li className="flex justify-center items-center gap-1">
              <IoReturnDownBackOutline className="text-purple-500" /> Free &
              Easy Return
            </li>
            <li className="w-[2px] h-5 bg-gray-300"></li>
            <li className="flex justify-center items-center gap-1">
              <IoPricetagOutline className="text-primary" /> Best Price
              Guaranteed
            </li>
            <li className="w-[2px] h-5 bg-gray-300"></li>
            <li className="flex justify-center items-center gap-1">
              <VscVerifiedFilled className="text-purple-500" /> 100% Authentic
              Products
            </li>
            <li className="w-[2px] h-5 bg-gray-300"></li>
            <li className="flex justify-center items-center gap-1">
              <MdHealthAndSafety className="text-primary" /> Bazaar Bay Verified
            </li>
          </ul>
        </div>
      </Link>
    </Container>
  );
};

export default ExperiencedSec;
