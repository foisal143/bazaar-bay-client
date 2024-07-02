const ManageProductsTableRow = ({ product, index, handlerStatusChanged }) => {
  const { name, image, price, category, status, _id } = product;
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

      <td>
        <select
          onChange={e => handlerStatusChanged(e, _id)}
          className={`select-xs ${
            (status === 'pending' && 'text-yellow-500') ||
            (status === 'approved' && 'text-green-500') ||
            (status === 'denied' && 'text-red-500')
          }`}
          defaultValue={status}
          name="status"
          id="status"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
      </td>
    </tr>
  );
};

export default ManageProductsTableRow;
