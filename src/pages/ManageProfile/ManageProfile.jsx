import Container from '../../components/Container/Container';
import useSingleUser from '../../hooks/useSingleUser';

const ManageProfile = () => {
  const { singleUser, refetch } = useSingleUser();
  return (
    <Container>
      <h3 className="mt-5 title-text">
        Manage My <span className="text-primary">Profile</span>
      </h3>
      <div className="mt-5  grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <div className="bg-white p-5 space-y-5">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Personal Profile</h3>{' '}
            <button className="text-blue-500">Edit</button>
          </div>
          <div>
            <h3 className="uppercase">{singleUser?.name}</h3>
            <p>{singleUser?.email}</p>
          </div>
        </div>
        <div className="bg-white p-5 space-y-5">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Address Book</h3>{' '}
            <button className="text-blue-500">Edit</button>
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
