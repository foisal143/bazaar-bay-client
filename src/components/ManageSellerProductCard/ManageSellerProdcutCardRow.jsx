import { FaEdit } from 'react-icons/fa';

const ManageSellerProdcutCardRow = ({ product, i, setProdcut }) => {
  const { name, category, status } = product || {};
  return (
    <tr>
      <th>{i + 1}</th>
      <td>{name}</td>
      <td>{category}</td>
      <td
        className={
          (status === 'pending' && 'text-red-500') ||
          (status === 'approved' && 'text-green-500')
        }
      >
        {status}
      </td>
      <td>
        <button
          onClick={() => {
            document.getElementById('my_modal_3').showModal(),
              setProdcut(product);
          }}
        >
          <FaEdit />
        </button>
      </td>
    </tr>
  );
};

export default ManageSellerProdcutCardRow;
