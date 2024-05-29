import Container from '../../../components/Container/Container';
import UsreCard from '../../../components/UserCard/UsreCard';
import useUsers from '../../../hooks/useUsers';

const ManageUsers = () => {
  const { allUsers } = useUsers();

  return (
    <Container>
      <h3 className="title-text mt-3">Manage Users</h3>

      <div className="bg-white p-5 mt-5">
        {allUsers && allUsers.length > 0 ? (
          allUsers.map(user => <UsreCard key={user._id} user={user} />)
        ) : (
          <h3>No user found!</h3>
        )}
      </div>
    </Container>
  );
};

export default ManageUsers;
