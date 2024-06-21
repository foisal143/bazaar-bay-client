import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import useSingleUser from '../../hooks/useSingleUser';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';

const ManageProfile = () => {
  const { singleUser } = useSingleUser();
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();
  const { name, email, gender, birthday } = singleUser || {};
  return (
    <Container>
      <h3 className="mt-5 title-text">
        Wellcome Back <span className="text-primary">{name}</span>{' '}
        <strong>
          {(isAdmin && '(Admin)') || (isSeller && '(Seller)') || ''}
        </strong>
      </h3>
      <div className="mt-5  grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <div className="bg-white p-5 space-y-5">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Personal Profile</h3>{' '}
            <Link to="/dashboard/personal/edit">
              <button className="text-blue-500">Edit</button>
            </Link>
          </div>
          <div>
            <h3 className="uppercase">
              <strong>{name}</strong>
            </h3>
            <div className="text-xs">
              <p>{email}</p>
              <p>{gender || ''}</p>
              {birthday && (
                <p>
                  <strong>DOB:</strong> {birthday || ''}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 space-y-5">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Address Book</h3>{' '}
            <Link to="/dashboard/address/edit">
              <button className="text-blue-500">Edit</button>
            </Link>
          </div>
          <p className="text-xs">DEFAULT DELIVERY ADDRESS</p>
          <div>
            <h3 className="uppercase font-bold">{singleUser?.name}</h3>
            <div className="text-xs">
              <p>{singleUser?.address || 'Not Found'}</p>
              <p>{singleUser?.phoneNumber || 'Not Found'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 space-y-5">
          <p className="text-xs uppercase pt-10">DEFAULT billing ADDRESS</p>
          <div>
            <h3 className="uppercase font-bold">{singleUser?.name}</h3>
            <div className="text-xs">
              <p>{singleUser?.address || 'Not Found'}</p>
              <p>{singleUser?.phoneNumber || 'Not Found'}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ManageProfile;
