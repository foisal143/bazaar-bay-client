const ManageOrderTableRow = ({ product, index, handlerStatusChanged }) => {
  const { name, buyer, image, status, category, _id } = product || {};
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{category}</div>
          </div>
        </div>
      </td>
      <td>{buyer}</td>
      <td>
        <select
          onChange={e => handlerStatusChanged(e, _id)}
          className="select-xs"
          defaultValue={status}
          name="status"
          id="status"
        >
          <option value="shipped">Shipped</option>
          <option value="recived">Recived</option>
        </select>
      </td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

export default ManageOrderTableRow;
