import { FiEdit } from 'react-icons/fi';

const ManageProductsTableRow = ({ product, index }) => {
  const { name, image, price, _id, category } = product;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{category}</td>

      <th>
        <button title="Edit" className="btn btn-ghost btn-xs">
          <FiEdit />
        </button>
      </th>
    </tr>
  );
};

export default ManageProductsTableRow;
