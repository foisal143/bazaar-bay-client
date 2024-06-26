import Container from '../../../components/Container/Container';
import UsreCard from '../../../components/UserCard/UsreCard';
import useUsers from '../../../hooks/useUsers';

const ManageUsers = () => {
  const { allUsers } = useUsers();
  console.log(allUsers);
  return (
    <Container>
      <h3 className="title-text mt-3">
        Manage All <span className="text-primary">Users</span>
      </h3>

      <div className="bg-white p-5 mt-5">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map(user => <UsreCard key={user._id} user={user} />)
        ) : (
          <h3 className="title-text text-center mt-5">No user found!</h3>
        )}
      </div>
    </Container>
  );
};

export default ManageUsers;
