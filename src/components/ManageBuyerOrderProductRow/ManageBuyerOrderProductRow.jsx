const ManageBuyerOrderProductRow = ({
  product,
  index,
  handlerUpdateStatus,
}) => {
  const { name, image, price, status } = product;
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
      <td>
        <select
          onChange={e => handlerUpdateStatus(e, product._id)}
          defaultValue={status}
          name="status"
          id="status"
          className="select-xs"
        >
          <option value="shipped">Shipped</option>
          <option value="recived">Recived</option>
        </select>
      </td>
    </tr>
  );
};

export default ManageBuyerOrderProductRow;
